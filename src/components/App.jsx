import React, { useState, useEffect } from 'react';
import Header from './Header';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';

function App() {//cостояния для управления открытием/закрытием попапов и выбранной карточкой
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isPreloading, setIsPreloading] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (//добавил обработчик только в случае, если хотя бы один попап открыт
        e.key === 'Escape' &&
        (isEditProfilePopupOpen ||
          isAddPlacePopupOpen ||
          isEditAvatarPopupOpen ||
          isImagePopupOpen ||
          isConfirmationPopupOpen)
      ) {
        closeAllPopups();
      }
    };
  
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isImagePopupOpen ||
      isConfirmationPopupOpen
    ) {
      document.addEventListener('keydown', handleEscClose);
    }
  
    return () => {//удалить обработчик при размонтировании компонента или изменении состояния
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isImagePopupOpen,
    isConfirmationPopupOpen,
  ]);  

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => alert(err))
  }, []);

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
    setIsConfirmationPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true); 
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeRequest = isLiked ? api.removeCardLike(card._id) : api.pushCardLike(card._id);

    likeRequest.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
  };

  function handleUpdateUser(value) {
    setIsPreloading(true)
    api
      .setUserInfoApi(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleUpdateAvatar(value) {
    setIsPreloading(true)
    api.patchUserAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleAddPlaceSubmit(card) {
    setIsPreloading(true);
    api.putNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleConfirmDelete() {
    if (cardToDelete) {
      setIsPreloading(true);
        api.deleteCard(cardToDelete._id)
            .then(() => {
                setCards(state => state.filter((c) => c._id !== cardToDelete._id));
                handleCloseConfirmation();
                setCardToDelete(null);
            })
            .catch((err) => alert(err))
            .finally(() => setIsPreloading(false))
    }
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    handleOpenConfirmation();
  }

  function handleOpenConfirmation() {
    setIsConfirmationPopupOpen(true);
  }

  function handleCloseConfirmation() {
    setIsConfirmationPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          isPreloading={isPreloading}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPreloading={isPreloading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          isPreloading={isPreloading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <ConfirmationPopup 
          isOpen={isConfirmationPopupOpen} 
          onClose={handleCloseConfirmation} 
          onConfirm={handleConfirmDelete}
          isPreloading={isPreloading}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;