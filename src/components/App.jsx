import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true); 
  };

  const handleEscClose = (event) => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);//удаляем при размонтировании
    };
  }, []);

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
        />
        <span id="description-profile-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="cell"
        title="Новое место"
        textButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name-card"
          className="popup__input"
          type="text"
          name="elements_input_name"
          placeholder="Введите название места"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="name-card-error" className="popup__error"></span>
        <input
          id="input-link"
          className="popup__input"
          type="url"
          name="elements_input_link"
          placeholder="Введите адрес картинки"
          required
        />
        <span id="input-link-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        textButton="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="input-avatar"
          type="url"
          name="input_avatar_link"
          className="popup__input"
          placeholder="Ведите ссылку на аватар"
          required
        />
        <span id="input-avatar-error" className="popup__error"></span>
      </PopupWithForm>

      <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
    </div>
  );
}

export default App;