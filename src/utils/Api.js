class Api {
  constructor() {
    this._url = "http://127.0.0.1:3000";
  }

  _checkStatusResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка`);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`,
      {
        method: "GET",
        // headers: this._headers,
        // headers: `Bearer ${token}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(this._checkStatusResponse);
  }

  addCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards`,
      {
        method: "POST",
        // headers: this._headers,
        // headers: `Bearer ${token}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          link: link,
        })
      }).then(this._checkStatusResponse);
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/cards/${cardId}`,
      {
        method: "DELETE",
        // headers: this._headers,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(this._checkStatusResponse);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    // debugger
    return fetch(`${this._url}/users/me`,
      {
        method: "GET",
        // headers: this._headers,
        // headers: `Bearer ${token}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(this._checkStatusResponse);
  }

  changeUserInfo(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me`,
      {
        method: "PATCH",
        // headers: this._headers,
        // headers: `Bearer ${token}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      }).then(this._checkStatusResponse);
  }

  changeUserAvatar(link) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: "PATCH",
        // headers: this._headers,
        // headers: `Bearer ${token}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: link,
        })
      }).then(this._checkStatusResponse);
  }

  addLike(cardId) {
    const token = localStorage.getItem('jwt');
    debugger
    return fetch(`${this._url}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(this._checkStatusResponse);
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('jwt');
    debugger
    return fetch(`${this._url}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then(this._checkStatusResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

}
const api = new Api();
export default api;