const { express } = rootRequire('component');
const assert = require('assert');

const app = express();
const appServer = require('http').Server(app);

// mounting middlewares
const { basic, handleError } = require('./middleware');

basic(app);

// mounting routes
require('./router')(app);

handleError(app);

assert.ok(process.env.PORT)
appServer.listen(process.env.PORT, (err) => {
    if (err) {
        logger.error(`Error while starting server at port ${process.env.PORT} | Error: ${err.message}`);
    }
    logger.info(`Environment: ${process.env.port}`);
    logger.info(`Express Server Up and Running @PORT: ${process.env.PORT} | at ${process.env.NODE_ENV}`);
});

module.exports = { app, appServer };