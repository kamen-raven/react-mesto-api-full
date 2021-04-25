// импорт модулей
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

// импорт роутов
const router = require('./routes/index');

// импорт миддлвэров
const errorHandler = require('./middlewares/error-handler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');

const app = express();

app.use(helmet()); // подключение защиты helmet
app.use(cors()); // подключение cors
app.use(requestLogger); // подключение логгера запросов

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router); // все внутренние роуты

app.use(errorLogger); // подключение логгера ошибок
app.use(errors()); // обработчик ошибок валидации celebrate
app.use(errorHandler); // централизованный обработчик ошибок запросов

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env; // порт

app.listen(PORT);
