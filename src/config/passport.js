var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

module.exports = function(passport, models) {
    // Set up login strategy.
    passport.use(
        'login',
        new LocalStrategy(
            function(username, password, done) {
                console.log("TEST");
                console.log(username);
                console.log(password);
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
    );

    // Configure session details.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        models.User
            .findById(id)
            .then(function(user) {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });
}
