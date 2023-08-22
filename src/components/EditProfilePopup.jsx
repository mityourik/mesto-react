import React, { useContext, useEffect, useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { FormValidator } from '../utils/FormValidator';
import { validationSettings } from '../utils/constants';


function EditProfilePopup({ isOpen, onClose, isPreloading, onOverlayClose, onUpdateUser }) {
    
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const formRef = useRef(null);
    const formValidatorRef = useRef(null);//ref для FormValidator

    useEffect(() => {
        setName(currentUser ? currentUser.name : '');
        setDescription(currentUser ? currentUser.about : '');
    }, [currentUser, isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name, about: description });
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
            name="profile"
            title="Редактировать профиль"
            textButton={isPreloading ? 'Загрузка...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onOverlayClose={onOverlayClose}
        >
            <input
                id="name-profile"
                className="popup__input"
                type="text"
                name="profile-input_name"
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                required
                value={name ?? ''}
                onChange={(e) => setName(e.target.value)}
            />
            <span id="name-profile-error" className="popup__error"></span>
            <input
                id="description-profile"
                className="popup__input"
                type="text"
                name="profile-input_description"
                placeholder="О себе"
                minLength="2"
                maxLength="40"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description ?? ''}
            />
            <span 
                id="description-profile-error" 
                className="popup__error"
            >
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;