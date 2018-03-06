module.exports = function(passport, models) {
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
    })
}
