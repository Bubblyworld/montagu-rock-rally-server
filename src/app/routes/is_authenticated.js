// A simple middeware to block routes if the user isn't authenticated.
module.exports = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    else res.sendStatus(401);
}
