const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { PORT, MONGO_URL } = require('./utils/config');
const errorHandler = require('./middlewares/error-handler');
const { limiter } = require('./middlewares/rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cors({
  origin: [
    'http://movies-explorer.nomoredomains.work',
    'https://movies-explorer.nomoredomains.work',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');
app.use(rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
