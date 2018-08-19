const { Customer } = rootRequire('service');

async function handler({ params }) {
    const customer = await Customer.get(params.customerID);
    if (!customer) throw Boom.notFound(`no customer found with id ${params.customerID}`)
    return customer;
}

module.exports = async function(req, res, next) {
    handler(req).then((result) => {
        res.json(result);
    }).catch((err) => {
        logger.error(err);
        next(err);
    })
};