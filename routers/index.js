const router = require('./api');

exports.routers = (app) => {
    app.use('/api/v1', router)
}