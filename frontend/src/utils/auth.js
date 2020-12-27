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
    }).then((data) =>{
      localStorage.setItem('token', data.token)
      return data.user;
    }).then(this._serverResCheck);
  }
  
  checkUserValidity(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`
      },
    }).then(this._serverResCheck);
  }
}

const auth = new Auth({
  baseUrl: "http://api.jaymew88.students.nomoreparties.site",
  //baseUrl: "https://register.nomoreparties.co",
  //baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  },
});

export default auth;


