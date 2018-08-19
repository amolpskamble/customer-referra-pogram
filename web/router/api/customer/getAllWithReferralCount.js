const { Customer } = rootRequire('service');

async function handler({ query }) {
    return await Customer.getAllWithReferralCount(query);
}

module.exports = async function(req, res, next) {
    handler(req).then((result) => {
        res.json(result);
    }).catch((err) => {
        logger.error(err);
        next(err);
    })
};