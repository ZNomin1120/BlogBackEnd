const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  if (!err.statusCode) {
    console.log(err);
    error.message = "Сервер дээр алдаа гарлаа.";
  }
  res.status(err.statusCode).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorHandler;
