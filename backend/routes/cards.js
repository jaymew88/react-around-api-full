const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routes.get('/cards', getCards);
routes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(new RegExp('^https?:\\/\\/(www\\.)?[^\\s~<>]+\\.[^\\s~<>]+#?')),
  }),
}),
createCard);
routes.put('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().length(24).hex(),
  }),
}),
likeCard);
routes.delete('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().length(24).hex(),
  }),
}),
dislikeCard);
routes.delete('/cards/:id', celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}),
deleteCard);

routes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    link: Joi.string().required().pattern(new RegExp('^https?:\\/\\/(www\\.)?[\\S^~<>]+\\.[\\S^~<>]+#?')),
  }),
}), createCard);

module.exports = routes;
