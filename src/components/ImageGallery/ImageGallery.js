import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ state, switchModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {state.photos.map(({ id, desc, smallImg, bigImg }, idx) => (
        <ImageGalleryItem
          key={id}
          id={idx}
          desc={desc}
          smallImg={smallImg}
          bigImg={bigImg}
          switchModal={switchModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  state: PropTypes.object.isRequired,
  switchModal: PropTypes.func.isRequired,
};
