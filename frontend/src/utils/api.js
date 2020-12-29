class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers; 
    this.baseUrl = baseUrl;
  }

  _serverResCheck(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  setHeaders

  getInitialCards(token) {
    return fetch(this.baseUrl + '/cards', {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    }).then(this._serverResCheck);
  }

  getUserInfo(token) {
    return fetch(this.baseUrl + '/users/me', {
     headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    }).then(this._serverResCheck);    
  }

  newCard({name, link}, token) {
    return fetch(this.baseUrl + '/cards', {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
       })
    }).then(this._serverResCheck);
  }

  deleteCard(cardId, token) {
    return fetch(this.baseUrl + '/cards/' + cardId, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
  }).then(this._serverResCheck);
  }

  updateLike(cardId, cardLiked, token) {
    return fetch(this.baseUrl + '/cards/likes/' + cardId, {
      method: cardLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
  }).then(this._serverResCheck);
  }

  editUserInfo({name, about}, token) {
    return fetch(this.baseUrl + '/users/me', {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name: name, 
        about: about })
  }).then(this._serverResCheck);
  }

  setUserAvatar({ avatar }, token) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ avatar: avatar })
    }).then(this._serverResCheck);
  }
}

const api = new Api({
  baseUrl: "https://api.jaymew88.students.nomoreparties.site",
  //baseUrl: "http;//localhost:3000",
});

export default api;