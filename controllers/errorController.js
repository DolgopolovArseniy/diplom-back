module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let statusCode = err.statusCode;
  let payload = { status: err.status, message: err.message };

  if (process.env.NODE_ENV === 'development') {
    payload = { ...payload, stack: err.stack, error: err };
  } else if (!err.isOperational) {
    statusCode = 500;
    payload = { status: 'error', message: 'Something went wrong' };
  }

  return res.status(statusCode).json(payload);
};
