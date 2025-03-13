function errorsHandler(err, req, res, next) {
  res.status(500);
  res.jason({
    error: "Errors Handler",
    message: "errore interno al server",
  });
}

module.exports = errorsHandler;
