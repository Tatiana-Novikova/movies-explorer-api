const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const validLink = /https?:\/\/(www\.)?[a-zA-Zа-яА-Я0-9._~:/?#[\]@!$&’()*+,;=\\-]+#?/g;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" (страна) должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" (режиссёр) должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" (хронометраж) должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" (год выпуска) должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" (описание) должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" (постер) должно быть заполнено'],
    validate: {
      validator: (v) => {
        validLink.test(v);
        const isValid = isURL(v);
        return isValid;
      },
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" (ссылка на трейлер) должно быть заполнено'],
    validate: {
      validator: (v) => {
        validLink.test(v);
        const isValid = isURL(v);
        return isValid;
      },
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" (миниатюрное изображение) должно быть заполнено'],
    validate: {
      validator: (v) => {
        validLink.test(v);
        const isValid = isURL(v);
        return isValid;
      },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Поле "owner" (владелец) должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" (Id фильма) должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" (название на русском) должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" (название на английском) должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
