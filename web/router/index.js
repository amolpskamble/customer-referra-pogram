const { requestLogger, enrichRequest } = require('../middleware');
const router = require('express').Router();

enrichRequest(router);
requestLogger(router);

router.get('/ping', (req, res, next) => res.send('server up and running'))

require('./api/customer')(router);
require('./api/ambassador')(router);

/**
 * Mounting respective paths.
 * @param {object} app Express instance
 */
module.exports = function(app) {
    app.use('/api/v1', router);
};