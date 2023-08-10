import React from 'react';

function PopupWithForm({ name, title, textButton, isOpen, children, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleContainerClick(e) {
    e.stopPropagation();//блокирование всплытия обработчика до оверлея
  }

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__container" onClick={handleContainerClick}>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Кнопка Закрыть окно"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__profile-form popup__profile-form_content_${name}`}
          name={`${name}-form`}
        >
          {children}
          <button className="button popup__save-button" type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;