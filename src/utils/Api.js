class Api {
  constructor() {
    this._url = "https://mesto.nomoreparties.co/v1/cohort-64/";
    this._headers = {
      authorization: "45c7ab21-c601-4d3e-824d-76630cdc55cf",
      "Content-Type": "application/json",
    };
  }

  _checkStatusResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`,
      {
        method: "GET",
        headers: this._headers,
      }).then(this._checkStatusResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}cards`,
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      }).then(this._checkStatusResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkStatusResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`,
      {
        method: "GET",
        headers: this._headers,
      }).then(this._checkStatusResponse);
  }

  changeUserInfo({ data }) {
    return fetch(`${this._url}users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      }).then(this._checkStatusResponse);
  }

  changeUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        })
      }).then(this._checkStatusResponse);
  }

  addLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkStatusResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
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