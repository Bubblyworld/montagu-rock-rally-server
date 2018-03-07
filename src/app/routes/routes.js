var express = require('express');
var router = express.Router();

router.use('/api', require('./api_routes.js'));
router.use('/', require('./auth_routes.js'));

module.exports = router;
