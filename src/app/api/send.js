// Post a new send for the given user_id.
module.exports = function(models, user_id, route_id, style, callback) {
    // First we check that the route and user exist.
    models.User
        .findById(user_id)
        .then(user => {
            if (!user) return callback("No such user found.");

            else return models.Route.findById(route_id);
        })
        .then(route => {
            if (!route) return callback("No such route found.");

            return models.Send
                .build({ sender_id: user_id, route_id, style })
                .save();
        })
        .then(() => callback(null, true))
        .catch(error => {
            return callback(error);
        });
}
