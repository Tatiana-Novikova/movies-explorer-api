const jwt = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV } = process.env;
const { JWT_SECRET } = NODE_ENV === 'production' ? process.env : require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
  return (next);
};

module.exports = auth;
