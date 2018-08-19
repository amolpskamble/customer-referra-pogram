const shortid = require('shortid');
const moment = require('moment');
const Joi = require('joi');

function getJoiErrors(error) {
    if (error && error.isJoi) {
        const errors = error.details.map((error) => {
            return error.message;
        });
        return errors.join(',');
    }
    return '';
}

function enrichRequest(req) {
    const metaData = {};
    metaData.requestID = generateRequestID();
    metaData.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    metaData.clientID = req.headers['x-client-id'];
    req.metaData = metaData;
    return req;
}

function generateRequestID() {
    return `${shortid()}-${Date.now()}${Math.floor((Math.random() * 1000) + 1)}`;
}

module.exports = {
    getJoiErrors,
    generateRequestID,
    enrichRequest
};