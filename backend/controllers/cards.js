
const Card = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const BadRequestErr = require('../errors/badrequest-err');

const getCards = (req, res, next) => {
  Card.find()
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      throw new BadRequestErr({ message: 'Card validation failed' })
    } else {
      throw err;
    }
  }).catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundErr({ message: 'Card does not belong to user' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr({ message: 'Invalid card id' });
      } else {
        throw err;
      }
    }).catch(next);
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundErr({ message: 'Card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr({ message: 'Invalid card id' });
      } else {
        throw err;
      }
    }).catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .populate('likes')
  .then((card) => {
    if (card) {
      res.send({ data: card });
    } else {
      throw new NotFoundErr({ message: 'Card not found' });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestErr({ message: 'Invalid card id' });
    } else {
      throw err;
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
