class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _serverResCheck(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  registerUser(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: 'Jacques',
        about: 'Explorer',
        avatar: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
      }),
    }).then(this._serverResCheck);
  }

  loginUser(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }).then(this._serverResCheck);
    // .then((data) => {
    //   if (data.token) {
    //     localStorage.setItem('token', data.token);
    //     return data;
    //   } else {
    //     return
    //   }
   // })
  }

  checkUserValidity(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._serverResCheck);
    // .then((data) => data)
    // .catch((err) => console.log(err));
  }
}

const auth = new Auth({
  baseUrl: "https://api.jaymew88.students.nomoreparties.site",
  //baseUrl: "http://localhost:3001",
  headers: {
    "Accept" : "application/json",
    "Content-Type": "application/json",
  },
});

export default auth;
