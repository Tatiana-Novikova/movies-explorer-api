const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');

// const isURL = (v) => {
//   const result = validator.isURL(v, { require_protocol: true });
//   if (result) {
//     return v;
//   }
//   throw new Error('Неверный формат ссылки.');
// };

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    trailer: Joi.string(),
    thumbnail: Joi.string(),
    movieId: Joi.number(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
  }),
});

const validateMovieCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserId,
  validateUpdateProfile,
  validateCreateMovie,
  validateMovieCardId,
};
