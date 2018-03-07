var isAuthenticated = require('./is_authenticated.js');
var express = require('express');

module.exports = function(models) {
    var router = express.Router();

    router.get(
        '/sends/:user_id?',
        isAuthenticated,
        (req, res) => {
            res.send("Parameter: " + req.params.user_id);
        }
    );

    return router;
}
