const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

routes.get('/cards', getCards);

routes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    link: Joi.string().required().pattern(new RegExp('^https?:\\/\\/(www\\.)?[\\S^~<>]+\\.[\\S^~<>]+#?')),
  }),
}), createCard);
routes.delete('/cards/:cardId', celebrate({
  headers: Joi.object().keys({
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
      params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);
routes.put('/cards/likes/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);
routes.delete('/cards/likes/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object({
  cardId: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);


module.exports = routes;