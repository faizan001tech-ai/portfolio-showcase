const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'CastError') {
    err = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new ApiError(400, `Duplicate value for field: ${field}`);
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    err = new ApiError(400, messages.join(', '));
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
