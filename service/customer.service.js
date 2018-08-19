const Joi = require('joi')
const assert = require('assert')
const { CustomerDAO } = rootRequire('dao')
const { DATABASE_ERROR_CODE, PAYBACK_AMOUNT } = rootRequire('constants')
    /**
     * Class - Custoomer
     * All Customer specific functionality
     */
class Customer {
    constructor(customerId) {
        assert(customerId, 'customerId of customer is required')
        this._customerID = customerId;
    }

    /**
     * Create the customer
     * Give the payback to referring customer if referr is given
     * @param {*} customer 
     */
    static async create(customer = {}) {
        this.validateNewCustomer(customer)
        try {
            if (customer.referral) await this.validateCustomerID(customer.referral)
            this.customer = await CustomerDAO.save(customer)
            if (customer.referral) this.givePayBack(customer.referral).then(res => logger.info(`payback given for customer ${this.customer.customerId}`)).catch(err => logger.error(err))
            return this.customer;
        } catch (err) {
            switch (err.code) {
                case DATABASE_ERROR_CODE.DUPLICATE:
                    throw Boom.conflict(`customer already exists with email ${customer.email}`)
                default:
                    throw err
            }
        }

    }

    /**
     * Get the customer details by customer id
     * throw error if customer details not found with given customer id
     * @param {*} customerID 
     */
    static async get(customerID) {
        Joi.assert(customerID, Joi.number().label('customerID'))
        const customer = await CustomerDAO.findOne({ baseQuery: { customerId: customerID } })
        if (!customer) throw Boom.notFound(`no customer found with ${customerID}`)
        return customer
    }

    /**
     * Check if given customer exists
     * @param {*} customerID 
     */
    static async isExists(customerID) {
        return !!await this.get(customerID)
    }

    /**
     * Wrapper for the get method
     * @param {*} customerID 
     */
    static async validateCustomerID(customerID) {
        return this.get(customerID)
    }

    /**
     * Check if the given customer is an ambassdaor
     * @param {*} customerID 
     */
    static async isAmbassador(customerID) {
        const customer = await this.get(customerID);
        return customer.isAmbassador;
    }

    /**
     * Add the referral - update the referral field of customer schema
     * @param {*} param0 
     */
    static async addReferral({ customerID, referral }) {
        Joi.assert({ customerID, referral }, Joi.object().options({ abortEarly: false }).keys({
            customerID: Joi.number().required().label('customerID'),
            referral: Joi.number().required().label('referral')
        }))
        const customer = await this.get(customerID);
        if (customer.referral) throw Boom.badData(`customer ${customerID} already refferd by ${customer.referral}`)
        await CustomerDAO.findOneAndUpdate({ customerId: customerID }, { referral: referral })
        this.givePayBack(referral).then(res => logger.info(`payback given for customer ${customerID}`)).catch(err => logger.error(err))
        return true;
    }

    /**
     * Get the all children of the customer by customer id
     * @param {*} customerID 
     */
    static async getChildrens(customerID) {
        await this.validateCustomerID(customerID)
        return await CustomerDAO.find({ baseQuery: { referral: customerID } })
    }

    /**
     * Get children of a customer at nth level
     * @param {*} param0 
     */
    static async getChildrenAtNthLevel({ customerID, level }) {
        Joi.assert({ customerID, level }, Joi.object().options({ abortEarly: false }).keys({
            customerID: Joi.number(),
            level: Joi.number()
        }))
        await this.validateCustomerID(customerID)
        return await CustomerDAO.getAllChlidren({ customerID, level })
    }

    /**
     * Get all the customer with their referral count 
     * @param {*} query 
     */
    static async getAllWithReferralCount(query) {
        return CustomerDAO.getAllWithReferralCount(query);
    }

    /**
     * Get the payback to the referring customer
     * If parent of the referring customer is an ambassador then give payback to ambassdaor too
     * @param {*} referral 
     */
    static async givePayBack(referral) {
        Joi.assert(referral, Joi.number().label('referral'))
        const customer = await this.get(referral);
        await CustomerDAO.payback(customer.customerId, PAYBACK_AMOUNT.DIRECT_PARENT)
        if (customer.referral) {
            const amabassadorParentOfReferral = await CustomerDAO.findOne({ baseQuery: { customerId: customer.referral, isAmbassador: true } })
            if (amabassadorParentOfReferral) await CustomerDAO.payback(amabassadorParentOfReferral.customerId,
                PAYBACK_AMOUNT.FIRST_LEVEL_AMBASSADOR)
        }
        return true;
    }

    /**
     * Conver the existing customer to an ambassdaor
     * @param {*} customerID 
     */
    static async convertToAmbassdaor(customerID) {
        if (await this.isAmbassador(customerID)) throw Boom.badData(`customer is already an amabassador`)
        await CustomerDAO.findOneAndUpdate({ customerId: customerID }, { isAmbassador: true })
        return true;
    }

    /**
     * Validate the new customer before saving to db
     * @param {*} customer 
     */
    static validateNewCustomer(customer) {
        Joi.assert(customer, Joi.object().options({ abortEarly: false }).keys({
            email: Joi.string().email().required(),
            referral: Joi.number().optional().strict(),
            isAmbassador: Joi.boolean().default(false),
        }).required().label('customer'))
    }

    /**
     * Get CustomerDAO instance
     */
    static getCustomerDAO() {
        return CustomerDAO;
    }
}

module.exports = Customer;