// setting up path root path resolver
global.rootRequire = function(name) {
    return require(`${__dirname}/${name}`);
};
// setting up environment
global.isDevelopment = process.env.NODE_ENV === 'development';
global.isStaging = process.env.NODE_ENV === 'staging';
global.isProduction = process.env.NODE_ENV === 'production';

// setting up logger
global.logger = require('./component').logger;
// global restify errors
global.Boom = require('boom');