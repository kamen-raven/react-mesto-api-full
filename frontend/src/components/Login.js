import React, { useState } from 'react';

export default function Login({ onLogin }) {
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
    onLogin(data)
  }

  return (
    <div className="page">
      <section className="auth-page">
        <div className="auth-page__container">
          <h2 className="auth-page__title">
            Вход
          </h2>
          <form className="auth-page__form"
                name=""
                noValidate
                onSubmit={handleSubmit}>
            <fieldset className="auth-page__fieldset">
              <input className="auth-page__input auth-page__input_login_email"
                      id="input-login-email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={data.email}
                      onChange={handleInputChange} />
              <span className="auth-page__input-error"
                    id="input-login-email-error">
              </span>
              <input className="auth-page__input auth-page__input_login_password"
                      id="input-login-pass"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      minLength="3"
                      maxLength="20"
                      required
                      value={data.password}
                      onChange={handleInputChange} />
              <span className="auth-page__input-error"
                    id="input-login-pass-error">
              </span>
            </fieldset>
            <button className="auth-page__sumbit-button"
                    type="submit">
              Войти
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
