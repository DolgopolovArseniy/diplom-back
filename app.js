const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();

const globalErrorHandler = require('./controllers/errorController');
const transactionRouter = require('./routes/transactionRouter');

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/transactions/', transactionRouter);

app.use(globalErrorHandler);

module.exports = app;
