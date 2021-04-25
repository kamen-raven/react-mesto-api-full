import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  //начальные значения данных инпутов
  const initialData = {
    email: '',
    password: ''
  };
  //стейт данных пользователя
  const [data, setData] = useState(initialData);

  //обработчик инпута
  function handleInputChange(event) {
    const { name, value } = event.target;
    setData(data => ({
      ...data,
      [name]: value
    }));
  }

  //обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    onRegister(data)
  }

  return (
    <div className="page">
      <section className="auth-page">
        <div className="auth-page__container">
          <h2 className="auth-page__title">
            Регистрация
          </h2>
          <form className="auth-page__form"
                name="form-singup"
                noValidate
                onSubmit={handleSubmit}>
            <fieldset className="auth-page__fieldset">
              <input className="auth-page__input auth-page__input_singup_email"
                      id="input-singup-email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      required
                      value={data.email}
                      onChange={handleInputChange}/>
              <span className="auth-page__input-error"
                    id="input-singup-email-error">
              </span>
              <input className="auth-page__input auth-page__input_singup_password"
                      id="input-singup-pass"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      minLength="3"
                      maxLength="20"
                      autoComplete="off"
                      required
                      value={data.password}
                      onChange={handleInputChange} />
              <span className="auth-page__input-error"
                    id="input-singup-pass-error">
              </span>
            </fieldset>
            <button className="auth-page__sumbit-button"
                    type="submit">
              Зарегистрироваться
            </button>
          </form>
          <div className="auth-page__caption-text">
            <p className="auth-page__link-text">
              Уже зарегистрированы?
            </p>
            <Link className="auth-page__link"
                  to="sing-in">
              Войти
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
