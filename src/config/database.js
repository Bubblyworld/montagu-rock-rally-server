var Sequelize = require('sequelize');

// Grab db environment variables - don't want to bake creds in the code.
var mysqlHost = process.env.MYSQL_HOST;
var mysqlDb = process.env.MYSQL_DB;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPass = process.env.MYSQL_PASS;

module.exports = new Sequelize(mysqlDb, mysqlUser, mysqlPass, {
    host: mysqlHost,
    dialect: 'mysql',
    operatorsAliases: false
});
