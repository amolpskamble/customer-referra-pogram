const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

function basicMiddlewares(app) {
    app.use(bodyParser.json({
        strict: true,
    }));

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(morgan(':method :status :res[content-length] - :response-time ms', { stream: logger.stream }));
    app.use(cors());
}

module.exports = basicMiddlewares;