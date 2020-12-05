const routes = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

routes.get('/', getCards);

routes.post('/', bodyParser.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    link: Joi.string().required().uri(),
  }),
}), createCard);

routes.delete('/:cardId', deleteCard);
routes.put('/:cardId/likes', likeCard);
routes.delete('/:cardId/likes', dislikeCard);


module.exports = routes;