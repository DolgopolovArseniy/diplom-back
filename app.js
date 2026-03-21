const express = require('express');
const helmet = require('helmet');

const app = express();

const globalErrorHandler = require('./controllers/errorController');
const transactionRouter = require('./routes/transactionRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: '_',
//   })
// );
// app.use(xss());

//old versions xss + mongo sanutize

app.use('/api/v1/transactions/', transactionRouter);
app.use('/api/v1/users/', userRouter);

app.use(globalErrorHandler);

module.exports = app;
