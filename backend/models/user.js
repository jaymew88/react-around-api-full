const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorer",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/.test(v);
      },
    },
  },
    email: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
       unique: true,
      },
    password: {
      type: String,
      required: true,
      select: false,
    }
  },
});

usersSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select(+password).then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect password or email'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', usersSchema);