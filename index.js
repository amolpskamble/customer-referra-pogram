const path = require('path');
// load environment variables
require('dotenv').config({ path: path.join(__dirname, '/.env') });
// load globals
require('./globals');

const { mongoose } = require('./component');

let appServer;

/**
 *  bootstrap function
 */
async function init() {
    logger.info('Initialization Started...');
    // Intialise Mongoose
    await new Promise((reslove) => {
        mongoose.init(() => {
            return reslove(true);
        });
    });
    logger.info('Initialization Completed...');
    return true;
}

/**
 * Intialize the app
 */
init().then(() => {
    // Start the web server
    appServer = require('./web/server').appServer;
}).catch((err) => {
    logger.error('Error in Initialization');
    logger.error(err);
    throw err;
});

module.exports = appServer;