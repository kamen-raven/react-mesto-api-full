const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error.js'); // 404

const { // лимит создания профилей
  createAccountLimiter,
} = require('../middlewares/rate-limiter.js');

const { // валидация
  validationCreateLoginUser,
  validationAuth,
} = require('../middlewares/validations.js');

// routes
const { createUser, login } = require('../controllers/users.js');
const userRoutes = require('./users.js');
const cardRoutes = require('./cards.js');
const auth = require('../middlewares/auth.js');

router.post('/signin', validationCreateLoginUser, login); // вход
router.post('/signup', validationCreateLoginUser, createAccountLimiter, createUser); // регистрация

router.use(validationAuth, auth); // подключили проверку авторизации

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному пути не найдена'));
});

module.exports = router;
