var passport = require('passport');
var express = require('express');

module.exports = function(models) {
    var router = express.Router();

    router.post(
        '/login',
        function(req, res, next) {
            passport.authenticate(
                'login',
                function(err, user, info) {
                    console.log(err);
                    return res.json({
                        success: user ? true : false
                    });
                }
            )(req, res, next);
        }
    );

    router.all(
        '/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    )

    // Test the auth code.
    router.get(
        '/protected',
        passport.authenticate('session'),
        (req, res) => {
            if (req.isAuthenticated())
                res.send('You are logged in as: ' + req.user.name);
            else
                res.send('You aren\'t logged in.');
        }
    );

    return router;
}
