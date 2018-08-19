const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

function init(cb) {
  const options = {
    keepAlive: 300000,
    connectTimeoutMS: 300000,
    useMongoClient: true,
  };

  const db = mongoose.connect(`mongodb://${process.env.DB_URI}/${process.env.DB}`,
    Object.assign({}, { config: { autoIndex: false } }, options));

  autoIncrement.initialize(db);

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection open');
    cb(true);
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose default connection error: ${err}`);
    throw err;
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  rootRequire('models');
}


module.exports = { init };