const express = require('express');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { MONGO_URL, PORT } = require('./config');
const { CORS } = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const { limiter } = require('./middlewares/rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');

const app = express();

mongoose.connect(MONGO_URL, {
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
