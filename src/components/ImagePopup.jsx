import React from 'react';

function ImagePopup({ card, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleContainerClick(e) {
    e.stopPropagation();//блокирование всплытия обработчика до оверлея
  }

  return (
    <div className={`popup popup_content_preview ${card ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container popup__container_content_image" onClick={handleContainerClick}>
        <button
          className="button popup__close-button button_close_preview"
          type="button"
          aria-label="Кнопка Закрыть окно"
          onClick={onClose}
        ></button>
        <img
          alt={`Фото путешествия ${card?.name}`}//применение опциональной цепочки
          className="popup__image-preview"
          src={card?.link}
        />
        <h2 className="popup__preview-name">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
