const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

// ------------------ВАЛИДАЦИЯ AUTH------------------ //

// валидация проверки авторизации
const validationAuth = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .required()
      .messages({
        'any.required': 'Доступ запрещен. Необходима авторизация',
      }),
  }).unknown(true),
});

// ------------------ВАЛИДАЦИЯ USER------------------ //

// валидация контроллера регистрации пользователя - createUser
// валидация контроллера входа пользователя - login
const validationCreateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Укажите корректную почту');
      })
      .messages({
        'any.required': 'Введите почту для регистрации',
      }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.min': 'Пароль должен быть минимум 8 символов',
        'any.required': 'Введите пароль',
      }),
  }).unknown(true),
});

// валидация контроллера возвращения пользователя по _id - getUserById
const validationGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Проблемы с _id пользователя: неверный формат идентификатора');
      }),
  })
    .unknown(true),
});

// валидация контроллера обновления профиля - editProfile
const validationEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .default('Жак-Ив Кусто')
      .messages({
        'string.min': 'Имя пользователя не может быть менье 2 символов',
        'string.max': 'Имя пользователя не может быть больше 30 символов',
      }),
    about: Joi.string()
      .min(2)
      .max(30)
      .default('Исследователь')
      .messages({
        'string.min': 'Описание пользователя не может быть менье 2 символов',
        'string.max': 'Описание пользователя не может быть больше 30 символов',
      }),
  }).unknown(true),
});

// валидация контроллера обновления аватара - editAvatar
const validationEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Укажите корректную ссылку на изображение http:// или https://');
      })
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }).unknown(true),
});

// ------------------ВАЛИДАЦИЯ CARD ------------------ //

// валидация контроллера создания карточки - createCard
const validationCreateCards = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Название места не может быть менье 2 символов',
        'string.max': 'Название места не может быть больше 30 символов',
        'any.required': 'Введите название карточки Места',
      }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Укажите корректную ссылку на изображение');
      })
      .messages({
        'any.required': 'Введите ссылку на изображение Места',
      }),
  }).unknown(true),
});

// валидация контроллера удаления карточки по идентификатору - deleteCardById
const validationParamsCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Проблемы с _id карточки: неверный формат идентификатора');
      }),
  })
    .unknown(true),
});

module.exports = {
  // авторизация
  validationAuth,
  // пользователь
  validationCreateLoginUser,
  validationGetUserById,
  validationEditProfile,
  validationEditAvatar,
  // карточки
  validationCreateCards,
  validationParamsCard,
};
