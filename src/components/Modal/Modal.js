import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const rootModal = document.getElementById('root-modal');

export class Modal extends Component {
  handleEsc = event => {
    if (event.code === 'Escape') {
      this.props.switchModal(event);
    }
  };

  handleClickOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.switchModal(event);
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClickOverlay}>
        <div className={css.Modal}>
          <img src={this.props.bigImg} alt="Big Immage" />
        </div>
      </div>,
      rootModal
    );
  }
}

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  switchModal: PropTypes.func.isRequired,
};
