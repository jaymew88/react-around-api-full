class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers; 
    this.baseUrl = baseUrl;
  }

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers,
  })
    .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject('Error: ' + res.status);
      }
    })
    .catch((err) => console.log(err)); 
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err)); 
  }

  newCard({ name, link }) {
    return fetch(this.baseUrl + '/cards', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name, 
        link
       })
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + '/cards/' + cardId, {
      method: "DELETE",
      headers: this.headers,
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      })
      .catch((err) => console.log(err)); 
  }

  updateLike(cardId, cardLiked) {
    return fetch(this.baseUrl + '/cards/likes/' + cardId, {
      method: cardLiked ? "PUT" : "DELETE",
      headers: this.headers,
  })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    })
    .catch((err) => console.log(err));
  }

  editUserInfo({ name: newName, about: newJob }) {
    return fetch(this.baseUrl + '/users/me', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ 
        name: newName, 
        about: newJob })
  })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      })
      .catch((err) => console.log(err));
  }

  setUserAvatar({ avatar }) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => {
          if (res.ok) {
              return res.json();
          } else {
              return Promise.reject(`Error: ${res.status}`);
          }
      })
      .catch((err) => console.log(err));
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    authorization: "221729e2-57e6-4114-b977-8051f88d50cb",
    "Content-Type": "application/json"
  }
});

export default api;