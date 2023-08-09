export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleOverlayClick.bind(this));
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
  }
}
