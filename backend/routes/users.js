const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  userInfo,
} = require('../controllers/users');

routes.get('/users', getUsers);
routes.get('/users/me', userInfo);
routes.get('/users/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required().length(24).required(),
    }),
  }), getUserById);
routes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
routes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp('^https?:\\/\\/(www\\.)?[\\S^~<>]+\\.[\\S^~<>]+#?')),
  }),
}), updateAvatar);

module.exports = routes;
