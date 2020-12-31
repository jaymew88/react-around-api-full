class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
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
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
       },
      body: JSON.stringify({
        email: email,
        password: password,
        name: 'Jacques',
        about: 'Explorer',
        avatar: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
      }),
    }).then(this._serverResCheck)
    .then((res) => {
      console.log("register", res);
      return res;
    }); // ADDED (do I need?)
  }

  loginUser(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
     },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }).then(this._serverResCheck)
    .then((data) => {
      console.log("login", data);
      return data;
    });  // ADDED (Do I need??)
  }

  checkUserValidity(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._serverResCheck)
    .then((data) => {
      console.log("validate", data);
      return data;
    });
  }
}

const auth = new Auth({
 baseUrl: "https://api.jaymew88.students.nomoreparties.site",
  //baseUrl: "http://localhost:3001",
});

export default auth;
