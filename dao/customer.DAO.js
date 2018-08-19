const MODEL = rootRequire('models').Customer;
const DAO = require('./DAO');
const mongoose = require('mongoose')

const { PAYBACK_RETRY } = rootRequire('constants')

/**
 * DAO class for the customer schema
 */
class CustomerDAO extends DAO {
    constructor() {
        super()
        this.Model = MODEL
    }

    /**
     * Get All the children by customer id at nth level
     */
    async getAllChlidren({ customerID, level = -1, orderColumn = 'customerId', order }) {
        const sort = {}
        let graphLookup = {}
        let nthChild = {}
        sort[orderColumn] = order === 'desc' ? -1 : 1;
        graphLookup = {
            from: "customers",
            startWith: "$referral",
            connectFromField: "referral",
            connectToField: "customerId",
            as: "path",
        }
        nthChild = { 'path.customerId': { $eq: +customerID } }

        if (level > -1) {
            graphLookup.maxDepth = +level + 1;
            nthChild.path = { $size: +level + 1 }
        }
        return this.aggregate({
            queryPipe: [{
                    $graphLookup: graphLookup
                },
                { $match: nthChild },
                { $sort: sort }
            ],
            model: this.Model
        })
    }

    /**
     * Get all the customers with their referral count
     */
    async getAllWithReferralCount({ order, orderColumn = 'totalReferral' }) {
        const sort = {}
        sort[orderColumn] = order === 'desc' ? -1 : 1;
        return this.aggregate({
            queryPipe: [{
                    $graphLookup: {
                        from: "customers",
                        startWith: "$customerId",
                        connectFromField: "referral",
                        connectToField: "referral",
                        as: "referrals"
                    }
                },
                {
                    $project: {
                        customerId: 1,
                        email: 1,
                        created_at: 1,
                        updated_at: 1,
                        payback: 1,
                        totalReferral: { $size: "$referrals" }
                    }
                },
                { $sort: sort }
            ],
            model: this.Model
        })
    }


    /**
     * Give the payback amouunt to referring customer id
     * If nonce value is not matching old value then retry after certain interval
     * @param {*} referral 
     * @param {*} amount 
     * @param {*} retry 
     */
    async payback(referral, amount, retry = PAYBACK_RETRY.maxRetry) {
        const customer = await this.findOne({ baseQuery: { customerId: referral } })
        const data = { payback: (!customer.payback ? 0 : customer.payback) + +amount }
        data.nonce = new mongoose.Types.ObjectId;
        const result = await this.findOneAndUpdate({ customerId: referral, nonce: customer.nonce }, data)
        if (!result && retry > 0) {
            await new Promise(resolve => setTimeout(() => resolve(true), retry.interval))
            await this.payback(referral, amount, retry--)
        }
        return true;
    }
}

module.exports = new CustomerDAO();