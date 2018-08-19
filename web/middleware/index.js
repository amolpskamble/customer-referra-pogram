const basic = require('./basic.middleware');
const handleError = require('./handleError.middleware');
const requestLogger = require('./requestLogger.middleware');
const enrichRequest = require('./enrichRequest.middleware');

module.exports = {
    basic,
    handleError,
    requestLogger,
    enrichRequest,
};