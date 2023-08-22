import React, { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { FormValidator } from '../utils/FormValidator';
import { validationSettings } from '../utils/constants';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isPreloading, onOverlayClose }) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
  const formRef = useRef(null);
  const formValidatorRef = useRef(null);//ref для FormValidator

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen])

  useEffect(() => {
    if (isOpen && formRef.current) {
        if (!formValidatorRef.current) {
            formValidatorRef.current = new FormValidator(validationSettings, formRef.current);
            formValidatorRef.current.enableValidation();
        }
        formValidatorRef.current.resetValidation();//сброс ошибки валидации при открытии попапа
    }
  }, [isOpen]);

  return (
    <PopupWithForm
        ref={formRef}
        name="cell"
        title="Новое место"
        textButton={isPreloading ? 'Сохранение...' : 'Создать'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        onOverlayClose={onOverlayClose}
    >
        <input
            id="name-card"
            type="text"
            name="elements_input_name"
            className="popup__input"
            placeholder="Введите название места"
            minLength="2"
            maxLength="30"
            required
            value={placeName ?? ""}
            onChange={(e) => setPlaceName(e.target.value)}
        />
        <span 
            id="name-card-error" 
            className="popup__error"
        ></span>
        <input
            id="input-link"
            type="url"
            name="elements_input_link"
            className="popup__input popup__input_type_link"
            placeholder="Введите адрес картинки"
            required
            value={placeLink ?? ""}
            onChange={(e) => setPlaceLink(e.target.value)}
        />
        <span 
            id="input-link-error"
            className="popup__error"
        ></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;