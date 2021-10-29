const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const validLink = /https?:\/\/(www\.)?[a-zA-Zа-яА-Я0-9._~:/?#[\]@!$&’()*+,;=\\-]+#?/g;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        validLink.test(v);
        const isValid = isURL(v);
        return isValid;
      },
      message: 'Неправильный формат ссылки',
    },
  },
  trailer: {
    type: String,
    required: true,
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
    required: true,
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
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);