// Retrieves information all users for the /users api call.
module.exports = function(models, callback) {
    models.User
        .findAll()
        .then((users) => {
            if (!users)
                return callback("No users.");

            var data = [];
            users.forEach(user => {
                var newUser = {
                    id: user.id,
                    name: user.name
                };

                data.push(newUser);
            });

            return callback(null, data);
        })
        .catch((error) => {
            return callback(error);
        });
}
