require('dotenv').config();

const {
  NODE_ENV = 'development',
  PORT = 3000,
  JWT_SECRET = '9ca3fee5da688f1d6bff80a523fc2591a7d0157be36a5482ca7dc7cd8fda07ca',
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGO_URL,
};
