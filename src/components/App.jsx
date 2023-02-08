import { useState, useEffect } from 'react';
import { fetchApi } from 'services/fetchApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);

  let state = { query, photos, page };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const handleSubmin = event => {
    const query = event.target.elements.query.value.trim();
    setQuery(query);
    setPhotos([]);
    setPage(1);
    setTotalHits(0);
  };

  const switchModal = event => {
    const { id } = event.target.parentNode;
    setShowModal(!showModal);
    setId(id);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
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
        setTotalHits(totalHits);
        setPhotos(prev => [...prev, ...photos]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmin} />
      <ImageGallery state={state} switchModal={switchModal} />
      {isLoading && <Loader />}
      {photos.length > 0 && photos.length < totalHits && !isLoading && (
        <Button onClick={handleClick} />
      )}
      {showModal && (
        <Modal bigImg={photos[id].bigImg} switchModal={switchModal} />
      )}
    </div>
  );
};
