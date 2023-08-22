import React, { useContext, useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { FormValidator } from '../utils/FormValidator';
import { validationSettings } from '../utils/constants';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading, onOverlayClose}) {
    const currentUser = useContext(CurrentUserContext);
    const inputAvatar = useRef();
    const formRef = useRef(null);
    const formValidatorRef = useRef(null);//ref для FormValidator
    const [avatarUrl, setAvatarUrl] = useState(''); //состояние для URL аватара
  
    useEffect(() => {
      if (isOpen && currentUser) {//если попап открыт и есть текущие данные юзера
          setAvatarUrl('');//очищаем поле юрл текущего юзера
      }
    }, [isOpen, currentUser]);
  
    function handleSubmit(e) {
      e.preventDefault();
      onUpdateAvatar({
        avatar: inputAvatar.current.value,
      })
    }

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
          name="avatar"
          title="Обновить аватар"
          textButton={isPreloading ? "Загрузка..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          onOverlayClose={onOverlayClose}
        >
          <input
            id="input-avatar"
            type="url"
            name="input_avatar_link"
            className="popup__input"
            placeholder="Ведите ссылку на аватар"
            required
            ref={inputAvatar}
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <span id="input-avatar-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;