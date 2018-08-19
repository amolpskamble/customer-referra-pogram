const express = require('./express');
const mongoose = require('./mongoose');
const logger = require('./logger');

/**
 * Export all the common component/ server config
 */
module.exports = {
    express,
    mongoose,
    logger,
};