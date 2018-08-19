const { Customer } = rootRequire('service');

async function handler({ params }) {
    return await Customer.getChildrens(params.customerID);
}

module.exports = async function(req, res, next) {
    handler(req).then((result) => {
        res.json(result);
    }).catch((err) => {
        logger.error(err);
        next(err);
    })
};