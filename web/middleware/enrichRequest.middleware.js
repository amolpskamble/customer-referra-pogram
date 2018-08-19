const { enrichRequest } = rootRequire('utils');

function requestLogger(router) {
  router.use((req, res, next) => {
    enrichRequest(req);
    next();
  });
}

module.exports = requestLogger;