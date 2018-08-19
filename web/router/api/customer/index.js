const create = require('./create');
const get = require('./get');
const getChildren = require('./get.children');
const addReferral = require('./addReferral');
const getAllWithReferralCount = require('./getAllWithReferralCount')
const getChildrenAtNthLevel = require('./getChildrenAtNthLevel')
const convertToAmbassdaor = require('./convertToAmbassador')


module.exports = (router) => {
    router.post('/customer', create);
    router.get('/customer/:customerID', get);
    router.put('/customer/:customerID/referral/:referral', addReferral);
    router.get('/customer/:customerID/children', getChildren);
    router.put('/customer/:customerID/to/ambassador', convertToAmbassdaor);
    router.get('/customer/total/referral', getAllWithReferralCount);
    router.get('/customer/:customerID/children/:level', getChildrenAtNthLevel);
};