import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const rootModal = document.getElementById('root-modal');

export const Modal = ({ bigImg, switchModal }) => {
  const handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      switchModal(event);
    }
  };

  useEffect(() => {
    const handleEsc = event => {
      if (event.code === 'Escape') {
        switchModal(event);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [switchModal]);

  return createPortal(
    <div className={css.Overlay} onClick={handleClickOverlay}>
      <div className={css.Modal}>
        <img src={bigImg} alt="Big Immage" />
      </div>
    </div>,
    rootModal
  );
};

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  switchModal: PropTypes.func.isRequired,
};
