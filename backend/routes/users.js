const router = require('express').Router();

const { // контроллеры
  getUsers,
  getUserById,
  getCurrentUser,
  editProfile,
  editAvatar,
} = require('../controllers/users.js');

const { // валидация
  validationGetUserById,
  validationEditProfile,
  validationEditAvatar,
} = require('../middlewares/validations.js');

router.get('/', getUsers); // возвращает всех пользователей
router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе

router.patch('/me', validationEditProfile, editProfile); // обновляет профиль
router.patch('/me/avatar', validationEditAvatar, editAvatar); // обновляет аватар

router.get('/:userId', validationGetUserById, getUserById); // возвращает пользователя по _id

module.exports = router;
