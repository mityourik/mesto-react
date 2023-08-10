import React from 'react';

function Card({ card, onCardClick }) {
    function handleClick() {
        onCardClick(card); //передаем карточку с кликом
    }

  return (
    <li className="elements__cell" onClick={handleClick}>
      <a href="#" className="elements__image-preview">
        <img
          className="elements__photo"
          src={card.link}
          alt={`Изображение ${card.name}`}
        />
      </a>
      <div className="elements__title-container">
        <h3 className="elements__title">{card.name}</h3>
        <div className="elements__like-group">
          <button className="button elements__like-button" type="button" aria-label="Кнопка Нравится"></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
