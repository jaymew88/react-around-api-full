class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _serverResCheck(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  registerUser(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        // name: "Name",
        // about: "About",
        // avatar: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg"
      }),
    }).then(this._serverResCheck);
  }

  loginUser(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }).then((data) =>{
      localStorage.setItem('jwt', data.token)
      return data.user;
    }).then(this._serverResCheck);
  }

  checkUserValidity(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then(this._serverResCheck);
  }
}

const auth = new Auth({
  baseUrl: "http://api.jaymew88.students.nomoreparties.site",
  //baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;


