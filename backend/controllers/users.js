const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

// подключаем классы ошибок
const BadRequestError = require('../errors/bad-request-error.js'); // 400
const NotFoundError = require('../errors/not-found-error.js'); // 404
const ConflictError = require('../errors/conflict-error.js'); // 409

// регистрация пользователя - POST
const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Необходимо указать email и пароль');
  }
  if (password.length < 8) {
    throw new BadRequestError('Пароль не может быть короче 8 символов');
  }
  bcrypt.hash(password, 10) // хэшируем пароль
    .then((hash) => {
      User.create({ email, password: hash })
        .then((user) => res.status(201).send(user.toJSON()))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`Некорректный ввод данных пользователя: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else if (err.name === 'CastError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          } else if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError('Пользователь с указанной почтой уже существует'));
          } else {
            next(err);
          }
        });
    });
};

// вход пользователя - POST
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
    .catch((err) => {
      next(err);
    });
};

// возвращает всех пользователей - GET
const getUsers = (req, res, next) => {
  User.find({}, '-__v')
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// возвращает пользователя по _id - GET
const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId, '-__v')
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// возвращает информацию о текущем пользователе - GET
const getCurrentUser = (req, res, next) => {
  const myId = req.user._id;
  User.findById(myId, '-__v')
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// обновляет профиль - PATCH
const editProfile = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении профиля: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// обновляет аватар - PATCH
const editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении аватара: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  editProfile,
  editAvatar,
};
