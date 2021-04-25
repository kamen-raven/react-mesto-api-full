export const address = 'https://api.kamen.mesto.project.nomoredomains.club';

function returnRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

export function register(email, password) {
  return fetch(`${address}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(returnRes);
}

export function login(email, password) {
  return fetch(`${address}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(returnRes);
}

export function checkToken(token) {
  return fetch(`${address}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then(returnRes);
}
