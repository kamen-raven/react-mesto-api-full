import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {
  //подписываемся на контекст данных текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  //стейт имени пользователя
  const [name, setName] = React.useState('');
  //обработчик инпута имени пользователя
  function handleInputName(event) {
    setName(event.target.value)
  }

  //стейт описания пользователя
  const [description, setDescription] = React.useState('');
  //обработчик инпута описания пользователя
  function handleInputAbout(event) {
    setDescription(event.target.value)
  }

  //обработчик отправки формы
  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile-edit"
                  title="Редактировать профиль"
                  buttonText="Сохранить"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  onSubmit={handleSubmit} >
      <fieldset className="popup__fieldset">
        <input className="popup__input popup__input_profile-edit_name"
                id="input--profile-name"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                autoComplete="off"
                required
                value={name || ""}
                onChange={handleInputName} />
        <span className="popup__input-error"
              id="input--profile-name-error">
        </span>
        <input className="popup__input popup__input_profile-edit_about"
              id="input-profile-about"
              type="text"
              name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              autoComplete="off"
              required
              value={description || ""}
              onChange={handleInputAbout} />
        <span className="popup__input-error"
              id="input-profile-about-error">
        </span>
      </fieldset>
    </PopupWithForm>
  )
}


