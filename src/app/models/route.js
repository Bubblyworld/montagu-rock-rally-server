var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('route', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },

        name: Sequelize.STRING,
        area: Sequelize.STRING,
        crag: Sequelize.STRING,
        wall: Sequelize.STRING,
        grade: Sequelize.INTEGER
    });
}
