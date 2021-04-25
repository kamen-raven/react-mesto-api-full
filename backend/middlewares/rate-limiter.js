const rateLimit = require('express-rate-limit');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // блокировка после 5 запросов
  message:
    'Слишком много аккаунтов создано с одного IP, пожалуйста, продолжите работу через час',
});

const createCardsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 25, // блокировка после 25 карточек
  message:
    'Слишком много карточек создано с одного IP, пожалуйста, продолжите работу через час',
});

module.exports = {
  createAccountLimiter,
  createCardsLimiter,
};
