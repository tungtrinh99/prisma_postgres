const router = require('./api');

exports.routers = (app) => {
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World'
        })
    });
    app.use('/api/v1', router)
}