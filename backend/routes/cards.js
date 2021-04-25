const router = require('express').Router();

const { // контроллеры
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

const { // валидация
  validationCreateCards,
  validationParamsCard,
} = require('../middlewares/validations.js');

const { // лимит создания карточек
  createCardsLimiter,
} = require('../middlewares/rate-limiter.js');

router.get('/', getCards); // возвращает все карточки
router.post('/', validationCreateCards, createCardsLimiter, createCard); // создаёт карточку

router.delete('/:cardId', validationParamsCard, deleteCardById); // удаляет карточку по идентификатору
router.put('/:cardId/likes', validationParamsCard, likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', validationParamsCard, dislikeCard); // убрать лайк с карточки

module.exports = router;
