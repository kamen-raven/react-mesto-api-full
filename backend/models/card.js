const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле name не может быть меньше 2 символов'],
    maxlength: [30, 'Поле name не может быть больше 30 символов'],
    required: [true, 'Поле name обязательно для заполнения'],
  },
  link: {
    type: String,
    validate: {
      validator: (link) => {
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-._:/?#!=%]{1,}\.[a-zA-Z0-9()]{1,}\b([a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)#?$/;
        return regex.test(link);
      },
      message: 'Укажите корректную ссылку на изображение http:// или https://',
    },
    required: [true, 'Поле link обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
