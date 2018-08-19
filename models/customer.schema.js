const assert = require('assert');
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
let Schema = null;

function init() {
    const Customer = Schema({
        // nonce added to prevent concurrent updates
        nonce: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId },
        customerId: { type: Number, unique: true },
        email: { type: String, unique: true },
        referral: Number,
        payback: { type: Number, default: 0 },
        isAmbassador: Boolean,
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });
    // Auto increment plugin - customer id
    Customer.plugin(autoIncrement.plugin, { model: 'customer', field: 'customerId', startAt: 1, incrementBy: 1 });
    //Unique indexes to prevent duplicate entries
    Customer.index({ customerId: 1 }, { unique: true })
    Customer.index({ email: 1 }, { unique: true })

    return Customer;
}




module.exports = (schema) => {
    assert.ok(schema);
    Schema = schema;
    return init();
};