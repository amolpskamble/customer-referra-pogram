const { Ambassador } = rootRequire('service');

async function handler({ body }) {
    return await Ambassador.create(body);
}

module.exports = async function(req, res, next) {
    handler(req).then((result) => {
        res.json(result);
    }).catch((err) => {
        logger.error(err);
        next(err);
    })
};