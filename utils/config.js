require('dotenv').config();

const PORT = 3000;
const JWT_SECRET = '9ca3fee5da688f1d6bff80a523fc2591a7d0157be36a5482ca7dc7cd8fda07ca';
const MONGO_URL = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO_URL,
};
