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
routes.delete('/cards/:cardId', deleteCard);
routes.put('/cards/:cardId/likes', likeCard);
routes.delete('/cards/:cardId/likes', dislikeCard);

routes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    link: Joi.string().required().pattern(new RegExp('^https?:\\/\\/(www\\.)?[\\S^~<>]+\\.[\\S^~<>]+#?')),
  }),
}), createCard);

module.exports = routes;