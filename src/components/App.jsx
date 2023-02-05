import { Component } from 'react';
import { fetchApi } from 'services/fetchApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    photos: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    showModal: false,
  };

  handleSubmin = event => {
    const query = event.target.elements.query.value.trim();
    this.setState({ query: query, photos: [], page: 1, totalHits: 0 });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  switchModal = event => {
    const { id } = event.target.parentNode;
    this.setState({ showModal: !this.state.showModal, id });
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ isLoading: true });
      fetchApi(query, page)
        .then(json => {
          if (json.data.totalHits === 0) {
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          const { totalHits, hits } = json.data;
          const photos = hits.map(item => ({
            id: item.id,
            desc: item.tags,
            smallImg: item.webformatURL,
            bigImg: item.largeImageURL,
          }));
          this.setState({
            totalHits,
            photos: [...this.state.photos, ...photos],
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmin} />
        <ImageGallery state={this.state} switchModal={this.switchModal} />
        {this.state.isLoading && <Loader />}
        {this.state.photos.length > 0 &&
          this.state.photos.length < this.state.totalHits &&
          !this.state.isLoading && <Button onClick={this.handleClick} />}
        {this.state.showModal && (
          <Modal
            bigImg={this.state.photos[this.state.id].bigImg}
            switchModal={this.switchModal}
          />
        )}
      </div>
    );
  }
}
