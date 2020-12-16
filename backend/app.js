require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const app = express();

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    // name: Joi.string().required().min(2).max(40),
    // about: Joi.string().min(2),
    // avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cards);
app.use('/users', users);

app.get('*',(req,res)=>{
  return res.status(404).send({ "message": "Requested resource not found" });
 });

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
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