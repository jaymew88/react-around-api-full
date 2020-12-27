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

  setHeaders(token) {
    this.headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    return
  } 

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers,
    }).then(this._serverResCheck);
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers,
    }).then(this._serverResCheck);    
  }

  newCard({ name, link }) {
    return fetch(this.baseUrl + '/cards', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name, 
        link
       })
    }).then(this._serverResCheck);
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + '/cards/' + cardId, {
      method: "DELETE",
      headers: this.headers,
  }).then(this._serverResCheck);
  }

  updateLike(cardId, cardLiked) {
    return fetch(this.baseUrl + '/cards/likes/' + cardId, {
      method: cardLiked ? "PUT" : "DELETE",
      headers: this.headers,
  }).then(this._serverResCheck);
  }

  editUserInfo({ name: newName, about: newJob }) {
    return fetch(this.baseUrl + '/users/me', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ 
        name: newName, 
        about: newJob })
  }).then(this._serverResCheck);
  }

  setUserAvatar({ avatar }) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar })
    }).then(this._serverResCheck);
  }
}

const api = new Api({
  baseUrl: "http://api.jaymew88.students.nomoreparties.site",
 //baseUrl: "http://localhost:3000",
});

export default api;