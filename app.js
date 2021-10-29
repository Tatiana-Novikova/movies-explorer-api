require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { CORS } = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const { limiter } = require('./middlewares/rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');

const app = express();

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');
app.use(rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.use(CORS);
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
