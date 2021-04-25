import config from "./utils.js";

class Api {
  constructor({ address }) {
    this._address = address;
  }

  //возвращаем res
  _returnRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ошибка ${res.status}`);
  }

  //--------запросы к данным пользователя
  //запрос данных пользователя
  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._returnRes)
  }

  //запрос на обновление данных пользователя
  patchUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._returnRes)
  }

  //запрос на обновление аватара пользователя
  patchUserAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._returnRes)
  }

  //---------запросы к карточкам
  //запрос массива карточек
  getInitialCards() {
    return fetch(`${this._address}/cards `, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(this._returnRes)
  }

  //запрос добавления новой карточки
  postNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._returnRes)
  }

  //запрос на удаление карточки
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._returnRes)
  }

  //-----запросы к лайкам карточек
  //запрос на постановку лайка карточки
  putLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._returnRes)
  }

  //запрос на удаление лайка карточки
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._returnRes)
  }
}


const api = new Api(config);
export default api;
