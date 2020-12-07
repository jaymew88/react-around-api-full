const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestErr = require('../errors/badrequest-err');
const UnauthorizedErr = require('../errors/unauth-err');
const NotFoundErr = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if(user) {
        res.send({ data: user });
      } else {
        throw new NotFoundErr({ message: 'User ID not found'});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr({ message: 'Invalid user ID'})
      } else {
        throw err;
      }
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(eq.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundErr('User ID does not exist');
      }
    })
    .catch(err => {
      if (err.name === 'CastError') {
        throw new BadRequestErr({ message: 'Invalid user ID'})
      } else {
        throw err;
      }
    }).catch(next);
}

const createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;

  bcrypt.hash(req.body.password, 10).then((hash) => {
  User.create({ name, about, avatar, email, password:hash })
    .then((user) => res.send({ data: user }))
    .catch(next)
  });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr({ message: 'User validation failed' })
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr({ message: 'User validation failed' })
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' }
    );
    res.cookie('token', token, { httpOnly: true });
    res.send({ token });
  })
  .catch(() => {
    throw new UnauthorizedErr({ message: 'User ID or Email incorrect' });
  }).catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMe
};