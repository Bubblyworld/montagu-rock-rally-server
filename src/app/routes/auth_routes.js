var passport = require('passport');
var express = require('express');

module.exports = function(models) {
    var router = express.Router();

    router.post(
        '/login',
        passport.authenticate(
            'login', {
                successRedirect: '/protected',
                failureRedirect: '/'
            }
        )
    );

    // Test the auth code.
    router.get(
        '/protected',
        passport.authenticate('session'),
        function(req, res) {
            if (req.isAuthenticated())
                res.send('You are logged in as: ' + req.user.name);
            else
                res.send('You aren\'t logged in.');
        }
    );

    return router;
}
