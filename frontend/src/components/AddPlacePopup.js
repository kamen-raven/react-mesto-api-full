import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup(props) {
  //стейт имени пользователя
  const [cardName, setCardName] = React.useState('');
  //обработчик инпута имени пользователя
  function handleInputCardName(event) {
    setCardName(event.target.value)
  }

  //стейт описания пользователя
  const [cardLink, setCardLink] = React.useState('');
  //обработчик инпута описания пользователя
  function handleInputCardLink(event) {
    setCardLink(event.target.value)
  }

  //обработчик отправки формы
  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    props.onAddPlace({
      link: cardLink,
      name: cardName
    });
  }

  return (
    <PopupWithForm name="card-add"
                  title="Новое место"
                  buttonText="Сохранить"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  onSubmit={handleSubmit} >
      <fieldset className="popup__fieldset">
        <input className="popup__input popup__input_card-add_name"
              id="input-card-name"
              type="text"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              autoComplete="off"
              required
              value={cardName}
              onChange={handleInputCardName} />
        <span className="popup__input-error"
              id="input-card-name-error">
        </span>
        <input className="popup__input popup__input_card-add_link"
              id="input-card-url"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              autoComplete="off"
              required
              value={cardLink}
              onChange={handleInputCardLink} />
        <span className="popup__input-error"
              id="input-card-url-error">
        </span>
      </fieldset>
    </PopupWithForm>
  )
}


