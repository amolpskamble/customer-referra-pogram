const Customer = require('./customer.service')
const Joi = require('joi')

/**
 * Class - Ambassador
 * Ambassdaor specific functionality
 */
class Ambassador extends Customer {
    constructor(customerID) {}

    /**
     * Create the ambassdaor
     * @param {*} ambassador 
     */
    static async create(ambassador = {}) {
        if (ambassador.isAmbassador === false) throw Boom.badRequest(`invalid input for isAmbassador`)
        ambassador.isAmbassador = true;
        return await Customer.create(ambassador)
    }

    /**
     * Get the children of the ambassador
     * @param {*} customerID 
     */
    static async getChildrens(customerID) {
        if (!await this.isAmbassador(customerID)) throw Boom.badData(`${customerID} is not an ambassadaor`)
        return await this.getCustomerDAO().find({ baseQuery: { referral: customerID } })
    }
}

module.exports = Ambassador;