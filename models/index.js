const mongoose = require('mongoose');
const bluebird = require('bluebird');

// Setting default SYSTEM PROMISE
mongoose.Promise = bluebird;

const Schema = mongoose.Schema;

// loading all the models
const Customer = mongoose.model('customer', require('./customer.schema')(Schema));

// registring models
const model = {
    Customer
};

module.exports = model;