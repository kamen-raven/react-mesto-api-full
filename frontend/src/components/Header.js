import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo"
            alt="лого Mesto"
            src={logo}
      />
      <ul className="header__list">
        <Route path="/sing-up">
          <li className="header__links">
            <Link className="header__link"
                  to="/sing-in">
              Войти
              </Link>
          </li>
        </Route>
        <Route path="/sing-in">
          <li className="header__links">
            <Link className="header__link"
                  to="/sing-up">
              Регистрация
              </Link>
          </li>
        </Route>
        <Route exact path="/">
          <li className="header__links header__link_type_email">
            {props.userEmail}
          </li>
          <li className="header__links">
            <button className="header__signout-button"
                    onClick={props.onSignout}>
              Выйти
              </button>
          </li>
        </Route>
      </ul>
    </header>
  )
}
