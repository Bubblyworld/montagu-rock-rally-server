var Sequelize = require('sequelize');

// Retrieves information about a user's sends for the /sends api call.
module.exports = function(models, user_id, callback) {
    // First check that the user exists!
    models.User
        .findById(user_id)
        .then((user) => {

            if (!user)
                return callback("No user found.");

            models.Send
                .findAll({
                    where: { sender_id: user_id },
                    include: {
                        model: models.Route
                    }
                })
                .then((sends) => {
                    var data = {
                        user_id: user_id,
                        routes: []
                    };

                    sends.forEach((send) => {
                        var route = {
                            id: send.route.id,
                            style: send.style,
                            grade: send.route.grade
                        };

                        data.routes.push(route);
                    });

                    callback(null, data);
                });
        })
        .catch((error) => {
            callback(error);
        });
}
