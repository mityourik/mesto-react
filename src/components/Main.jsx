import React, { useEffect, useState } from 'react';
import profileAvatar from '../images/profile__avatar.png';
import { api } from '../utils/Api';
import Card from './Card';

// состояния для информации о пользователе и карточках
function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

//получение информации о пользователе и карточках с сервера при монтировании компонента
  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(initialCards);
      })
      .catch(error => {
        console.error('Ошибка загрузки с сервера:', error);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__config">
          <img
          src={userAvatar || profileAvatar}//с сервера или дефолтный
          alt="Аватар пользователя" 
          className="profile__image"
          onClick={onEditAvatar} />
        </div>
        <h1 className="profile__title">{userName}</h1>
        <p className="profile__paragraph">{userDescription}</p>
        <button
          className="button profile__edit-button profile__popup-open"
          type="button"
          aria-label="Кнопка Редактировать профиль"
          onClick={onEditProfile}
        ></button>
        <button
          className="button profile__add-icon"
          type="button"
          aria-label="Кнопка Добавить профиль"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
