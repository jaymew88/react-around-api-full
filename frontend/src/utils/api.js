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

  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    }).then(this._serverResCheck);
  }

  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, { 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then(this._serverResCheck);    
  }

  newCard({name, link}, token) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
       })
    }).then(this._serverResCheck);
  }

  deleteCard(cardId, token) {
    return fetch(`${this.baseUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
  }).then(this._serverResCheck);
  }

  updateLike(cardId, cardLiked, token) {
    console.log(cardId);
    console.log(idLiked);
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {  //
      method: cardLiked ? "PUT" : "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
  }).then(this._serverResCheck);
  }

  editUserInfo({name, about}, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name: name, 
        about: about })
  }).then(this._serverResCheck);
  }

  setUserAvatar({ avatar }, token) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ avatar: avatar })
    }).then(this._serverResCheck);
  }
}

const api = new Api({
  baseUrl: "https://api.jaymew88.students.nomoreparties.site",
 //baseUrl: "http://localhost:3001"
});

export default api;