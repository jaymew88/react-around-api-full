require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { login, createUser } = require('./controllers/users');
const NotFoundErr = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// for reviewers
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(express.static('build'));
app.use(express.json(), cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp('^https?:\\/\\/(www\\.)?[\\S^~<>]+\\.[\\S^~<>]+#?')),
    email: Joi.string().required().pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')),
    password: Joi.string().trim().min(1).required(),
  }),
}), createUser);

app.use('/', auth, cards);
app.use('/', auth, users);
app.use('*', () => {
  throw new NotFoundErr('Requested Resource not found');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
