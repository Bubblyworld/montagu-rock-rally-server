var isAuthenticated = require('./is_authenticated.js');
var getUser = require('./../data/user.js');
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

    router.get(
        '/user/:user_id?',
        isAuthenticated,
        (req, res) => {
            var user_id = req.params.user_id || req.user.id;
            getUser(models, user_id, (error, data) => {
                // TODO this might be an ISE and not a user not found.
                if (error) return res.send(404);

                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            });
        }
    );

    return router;
}
