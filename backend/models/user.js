/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../errors/unauthorized-error.js'); // 401

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле name не может быть меньше 2 символов'],
    maxlength: [30, 'Поле name не может быть больше 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле about не может быть меньше 2 символов'],
    maxlength: [30, 'Поле about не может быть больше 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-._:/?#!=%]{1,}\.[a-zA-Z0-9()]{1,}\b([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)#?$/;
        return regex.test(link);
      },
      message: 'Укажите корректную ссылку на изображение http:// или https://',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле email обязательно для заполнения'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    minlength: [8, 'Пароль не может быть короче 8 символов'],
    select: false,
    required: [true, 'Поле password обязательно для заполнения'],
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверный ввод почты или пароля'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверный ввод почты или пароля'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
