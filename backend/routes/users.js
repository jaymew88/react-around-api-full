const routes = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  userInfo
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/:id', getUserById);
routes.get('/me', userInfo);

routes.patch('/me', bodyParser.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
routes.patch('/me/avatar', bodyParser.json(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);

module.exports = routes;


