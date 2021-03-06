const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestErr = require('../errors/badrequest-err');
const UnauthorizationErr = require('../errors/unauth-err');
const NotFoundErr = require('../errors/not-found-err');
const ConflictErr = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users === undefined) {
        throw new NotFoundErr('No users found');
      }
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundErr('User ID not found');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Invalid user ID');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// GETS current user info
const userInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundErr('User ID does not exist');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Invalid user ID');
      } else {
        throw err;
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        throw new ConflictErr('User already exists.');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          }))
          .then((user) => {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              { expiresIn: '7d' },
            );
            res.send({
              data: {
                name: user.name,
                about: user.about,
                avatar: user.avatar,
                email: user.email,
                _id: user.id,
              },
              token,
            });
          });
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr('User validation failed');
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
        throw new BadRequestErr('User validation failed');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizationErr('Invalid email or password');
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  userInfo,
};
