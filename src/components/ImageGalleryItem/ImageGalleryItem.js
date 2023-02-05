import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  desc,
  smallImg,
  bigImg,
  switchModal,
}) => {
  return (
    <li className={css.ImageGalleryItem} id={id} onClick={switchModal}>
      <img src={smallImg} alt={desc} className={css.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  switchModal: PropTypes.func.isRequired,
};
