const create = require('./create');
const getChildren = require('./get.children')

module.exports = (router) => {
    router.post('/ambassador', create);
    router.get('/ambassador/:customerID/children', getChildren);

};