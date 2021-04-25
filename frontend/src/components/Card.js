import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card(props) {
  //подписываемся на контекст данных текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную c `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__remove-button ${isOwn ? 'card__remove-button_visible' : ''}`
  );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(item => item === currentUser._id);

  // Создаём переменную c `className` для кнопки лайка
  const cardLikeButtonClassName =(
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  //открытие большой картинки
  function handleClick() {
    props.onCardClick(props.card);
  }

  //функция постановик лайка
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  //функция удаления карточки
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card">
      <button className={cardDeleteButtonClassName}
              type="button"
              aria-label="удалить"
              onClick={handleDeleteClick}>
      </button>
      <button className="card__image-button"
        type="button">
        <img className="card__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick} />
      </button>
      <div className="card__body">
        <h2 className="card__title">
          {props.card.name}
        </h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName}
            type="button"
            aria-label="поставить лайк"
            onClick={handleLikeClick}>
          </button>
          <p className="card__like-counter">
            {props.card.likes.length}
          </p>
        </div>
      </div>
    </div>
  )
}

