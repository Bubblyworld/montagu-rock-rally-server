var Sequelize = require('sequelize');

module.exports = function(sequelize, User, Route) {
    var Send = sequelize.define('send', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true
        },

        style: Sequelize.INTEGER, /*onsight, redpoint etc*/
        sender_id: Sequelize.INTEGER,
        route_id: Sequelize.INTEGER
    });

    Send.belongsTo(User, { foreignKey: 'sender_id' });
    Send.belongsTo(Route, { foreignKey: 'route_id' });

    return Send;
}
