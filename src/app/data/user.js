// Retrieves information about a user for the /user api call.
module.exports = function(models, user_id, callback) {
    models.User
        .findById(user_id)
        .then((user) => {
            var data = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            return callback(null, data);
        })
        .catch((error) => {
            return callback(error);
        });
}
