var Sequelize = require('sequelize');

module.exports = function(sequelize, User, Route) {
    return sequelize.define('send', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true
        },

        style: Sequelize.INTEGER, /*onsight, redpoint etc*/

        sender_id: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },

        route_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Route,
                key: 'id'
            }
        }
    });
}
