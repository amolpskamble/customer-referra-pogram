function formatter(err) {
    const obj = {
        name: err.isBoom ? err.output.payload.error : err.name || 'ERROR',
        message: err.message,
        status: err.isBoom ? err.output.statusCode : err.statusCode || 500,
        data: err.data,
    };
    return obj;
}


function getJoiErrors(error) {
    if (error && error.isJoi) {
        const errors = error.details.map((error) => {
            return error.message;
        });
        return errors.join(',');
    }
    return '';
}

module.exports = function(app) {
    // Error: 404
    app.use((req, res, next) => {
        res.status(404).json(formatter(Boom.notFound()))
    });
    // Error: All
    app.use((err, req, res, next) => {
        let error = {}
        if (err.isJoi) {
            err.message = getJoiErrors(err);
            error = formatter(Boom.badRequest(err.message))
        } else {
            error = formatter(err)
        }
        res.status(error.status || 500).json(error);
    });
};