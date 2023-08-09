import React from "react";
import headerLogo from '../images/header__logo.svg';
import profileAvatar from '../images/profile__avatar.png';

function App() {
  return (
    <div className="page">
      <header className="header">
        <img src={headerLogo} alt="Лого Место" className="header__logo" />
      </header>
      <main className="main">
        <section className="profile">
          <div className="profile__config">
            <img src={profileAvatar} alt="Аватар места" className="profile__image" />
          </div>
          <h1 className="profile__title">владимир запутин</h1>
          <p className="profile__paragraph">Исследователь дна</p>
          <button className="button profile__edit-button profile__popup-open" type="button" aria-label="Кнопка Редактировать профиль"></button>
          <button className="button profile__add-icon" type="button" aria-label="Кнопка Добавить профиль"></button>
        </section>
        <section className="elements">
          <ul className="elements__cards">
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&copy; 2023 Mesto Russia</p>
      </footer>

      <div className="popup popup_content_profile">
        <div className="popup__container">
            <button className="button popup__close-button" type="button" aria-label="Кнопка Закрыть окно"></button>
            <h2 className="popup__title">Редактировать профиль</h2>
            <form className="popup__profile-form" name="profile-form" noValidate>
                <input id="name-profile" className="popup__input" type="text" name="profile-input_name" placeholder="Имя" minLength="2" maxLength="30" required />
                <span id="name-profile-error" className="popup__error"></span>
                <input id="description-profile" className="popup__input" type="text" name="profile-input_description" placeholder="О себе" minLength="2" maxLength="40" required />
                <span id="description-profile-error" className="popup__error"></span>
                <button className="button popup__save-button" type="submit" aria-label="Кнопка Сохранить">Сохранить</button>
            </form>
        </div>
      </div>

      <div className="popup popup_content_cell">
        <div className="popup__container">
            <button className="button popup__close-button" type="button" aria-label="Кнопка Закрыть окно"></button>
            <h2 className="popup__title">Новое место</h2>
            <form className="popup__profile-form popup__profile-form_content_cell" name="elements-form" noValidate>
                <input id="name-card" className="popup__input" type="text" name="elements_input_name" placeholder="Введите имя питомца" minLength="2" maxLength="30" required />
                <span id="name-card-error" className="popup__error"></span>
                <input id="input-link" className="popup__input" type="url" name="elements_input_link" placeholder="Введите адрес картинки" required />
                <span id="input-link-error" className="popup__error"></span>
                <button className="button popup__save-button" type="submit" name="elements_submit_button" aria-label="Кнопка Создать">Создать</button>
            </form>
        </div>
      </div>

      <div className="popup popup_content_preview">
        <div className="popup__container popup__container_content_image">
            <button className="button popup__close-button" type="button" aria-label="Кнопка Закрыть окно"></button>
            <img alt="Фото путешествия" className="popup__image-preview" src="#" />
            <h2 className="popup__preview-name"></h2>
        </div>
      </div>

      <div className="popup popup_content_confirm">
        <div className="popup__container">
            <button className="button popup__close-button" type="button" aria-label="Кнопка Закрыть окно"></button>
            <h2 className="popup__title popup__title_content_confirm">Вы уверены?</h2>
            <button className="button popup__save-button" type="submit" aria-label="Кнопка Да">Да</button>
        </div>
      </div>

      <div className="popup popup_content_avatar">
        <div className="popup__container">
            <button aria-label="Кнопка Закрыть" className="button popup__close-button" type="button"></button>
            <h2 className="popup__title popup__title_content_avatar">Обновить аватар</h2>
            <form className="popup__profile-form popup__profile-form_content_avatar" name="avatar-form" noValidate>
                <input id="input-avatar" type="url" name="input_avatar_link" className="popup__input" placeholder="Ведите ссылку на аватар" required />
                <span id="input-avatar-error" className="popup__error"></span>
                <button className="button popup__save-button" type="submit" aria-label="Кнопка Сохранить">Сохранить</button>
            </form>
        </div>
      </div>

      <template className="template-cell">
        <li className="elements__cell">
            <a href="#" className="elements__image-preview">
                <img className="elements__photo" src="#" alt="Фото пользователя" />
            </a>
            <button className="button elements__trash-button" type="button" aria-label="Кнопка Удалить карточку"></button>
            <div className="elements__title-container">
                <h3 className="elements__title"></h3>
                <div className="elements__like-group">
                  <button className="button elements__like-button" type="button" aria-label="Кнопка Нравится"></button>
                  <span className="elements__like-counter"></span>
                </div>
            </div>
        </li>
      </template>
    </div>
  )
}

export default App;
