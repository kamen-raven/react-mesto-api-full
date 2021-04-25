import React from 'react';
import Card from "./Card.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main(props) {
  //подписываемся на контекст данных текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-button"
                  onClick={props.onEditAvatar}>
            <img className="profile__avatar"
                  src={currentUser.avatar}
                  alt="аватарка" />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">
              {currentUser.name}
            </h1>
            <button className="profile__edit-button"
                    type="button"
                    aria-label="редактировать профиль"
                    onClick={props.onEditProfile}>
            </button>
            <p className="profile__subtitle">
              {currentUser.about}
            </p>
          </div>
          <button className="profile__add-button"
                  type="button"
                  aria-label="добавить фото"
                  onClick={props.onAddPlace}>
          </button>
        </section>
        <section className="cards">
          {props.cards.map(card =>
            <Card card={card}
                  key={card._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete} />
          )}
        </section>
      </main>
  )
}
