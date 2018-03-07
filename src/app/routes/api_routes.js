var isAuthenticated = require('./is_authenticated.js');
var getSends = require('./../api/sends.js');
var getUsers = require('./../api/users.js');
var getUser = require('./../api/user.js');
var addSend = require('./../api/send.js');
var express = require('express');

module.exports = function(models) {
    var router = express.Router();

    router.get(
        '/send/:route_id/:style',
        isAuthenticated,
        (req, res) => {
            var user_id = req.user.id;
            var route_id = req.params.route_id;
            var style = req.params.style;

            addSend(models, user_id, route_id, style, (error, result) => {
                if (error) console.log(error);
                if (error) return res.sendStatus(404);

                res.sendStatus(200);
            });
        }
    );

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

    router.get(
        '/users',
        isAuthenticated,
        (req, res) => {
            getUsers(models, (error, data) => {
                if (error) return res.sendStatus(404);

                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            });
        }
    );

    return router;
}
