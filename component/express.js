const app = require('express')();

module.exports = () => {
  app.disable('x-powered-by');
  return app;
};