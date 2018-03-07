var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        name: Sequelize.STRING,
        email: Sequelize.STRING,
        hash: Sequelize.STRING
    });
}
