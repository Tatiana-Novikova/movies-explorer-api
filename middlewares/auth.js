const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET = 'dev-key' } = process.env;

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
