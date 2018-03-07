var isAuthenticated = require('./is_authenticated.js');
var getSends = require('./../api/sends.js');
var getUser = require('./../api/user.js');
var express = require('express');

module.exports = function(models) {
    var router = express.Router();

    router.get(
        '/sends/:user_id?',
        isAuthenticated,
        (req, res) => {
            var user_id = req.params.user_id || req.user.id;
            getSends(models, user_id, (error, data) => {
                if (error) return res.sendStatus(404);

                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            });
        }
    );

    router.get(
        '/user/:user_id?',
        isAuthenticated,
        (req, res) => {
            var user_id = req.params.user_id || req.user.id;
            getUser(models, user_id, (error, data) => {
                // TODO this might be an ISE and not a user not found.
                if (error) return res.sendStatus(404);

                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            });
        }
    );

    return router;
}
