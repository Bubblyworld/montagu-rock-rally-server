var express = require('express');

module.exports = function(models) {
    var router = express.Router();

    router.use('/api', require('./api_routes.js')(models));
    router.use('/auth', require('./auth_routes.js')(models));

    // Basic index for now.
    router.get('/', function(req, res) {
        res.render('index.ejs');
    });

    return router;
}
