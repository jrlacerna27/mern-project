const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // server error

  res.status(statusCode);

  res.json({ message: err.message, isError: true });
};

module.exports = errorHandler;
