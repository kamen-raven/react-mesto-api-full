const Card = require('../models/card.js');

// подключаем классы ошибок
const BadRequestError = require('../errors/bad-request-error.js'); // 400
const ForbiddenError = require('../errors/forbidden-error.js'); // 403
const NotFoundError = require('../errors/not-found-error.js'); // 404

// возвращает все карточки - GET
const getCards = (req, res, next) => {
  Card.find({}, '-__v')
    .then((cards) => res.send(cards))
    .catch(next);
};

// создаёт карточку - POST
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при создании карточки: ${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id пользователя: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// удаляет карточку по идентификатору - DELETE
const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId) // проверяем права пользователя на карточку
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        next(new ForbiddenError('Недостаточно прав для удаления карточки. Можно удалить только свою карточку!'));
      } else {
        Card.findByIdAndRemove(cardId) // и только тут удаляем, если права пользования подтверждены
          .then(() => {
            res.status(200).send({ message: 'Карточка успешно удалена' });
          });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id карточки: неверный формат идентификатора'));
      } else {
        next(err);
      }
    });
};

// поставить лайк карточке - PUT
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id: неверный формат идентификатора пользователя или карточки'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

// убрать лайк с карточки - DELETE
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Проблемы с _id: неверный формат идентификатора пользователя или карточки'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятии лайка.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
