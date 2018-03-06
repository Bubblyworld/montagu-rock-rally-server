var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

module.exports = function(passport, models) {
    passport.use(
        'login',
        new LocalStrategy(
            function(username, password, done) {
                models.User
                    .findOne({ where: { name: username } })
                    .then(user => {
                        if (!user)
                            return done(null, false);

                        bcrypt.compare(password, user.hash, (error, result) => {
                            if (error)
                                return done(error);

                            return done(null, result ? user : false);
                        });
                    })
                    .catch(error => {
                        return done(error);
                    });
            }
        )
    )
}
