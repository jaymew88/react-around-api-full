
const Card = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/badrequest-err');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
   // .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new BadRequestErr('Card validation failed');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.id, owner: { _id: req.user._id} }) // { _id: req.params.cardId, owner: req.user._id }
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundErr('Card does not belong to user');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Invalid card id');
      }
    }).catch(next);
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  //  .populate('likes')
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundErr('Card not found');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Invalid card id');
      }
    }).catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
 // .populate('likes')
  .then((card) => {
    if (card) {
      res.send(card);
    } else {
      throw new NotFoundErr('Card not found');
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestErr('Invalid card id');
    }
  }).catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
