function requestLogger(router) {
  router.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });
}

module.exports = requestLogger;