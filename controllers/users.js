const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
const OK = 200;
const CREATED = 201;

const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictError('Пользователь c таким email уже существует'));
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({ email, password: hash, name })
            .then((userData) => {
              res.status(CREATED).send(userData);
            })
            .catch(next);
        });
      return (next);
    })
    .catch(next);
  return (next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Пользователь с указанным email не найден'));
      }
      bcrypt.compare(password, user.password, ((err, isValid) => {
        if (err || !isValid) {
          return next(new UnauthorizedError('Передан неверный логин или пароль'));
        }
        if (isValid) {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: true,
          }).status(OK).send({ token });
        }
        return (next);
      }));
      return (next);
    })
    .catch(next);
};

const signOut = (req, res) => {
  res
    .status(OK)
    .clearCookie('jwt')
    .send({ message: 'Успешный выход из приложения' });
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id, { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы невалидные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Переданный email уже используется другим пользователем'));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  signOut,
  updateProfile,
};
