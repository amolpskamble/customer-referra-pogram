const pino = require('pino');

if (process.env.LOGGER_LEVEL == null) {
    throw new Error('LOGGER_LEVEL is missing in .env');
}

const pretty = pino.pretty();
pretty.pipe(process.stdout);

const log = pino({
    name: process.env.NODE_ENV,
    safe: true,
    level: process.env.LOGGER_LEVEL,
});

module.exports = log;