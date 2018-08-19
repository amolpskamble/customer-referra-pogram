const { Customer } = rootRequire('service');

async function handler({ body }) {
    return await Customer.create(body);
}

module.exports = async function(req, res, next) {
    handler(req).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        logger.error(err);
        next(err);
    })
};