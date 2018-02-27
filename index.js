var fs = require('fs');
var https = require('https');
var helmet = require('helmet');
var express = require('express');
var passport = require('passport');
var forceHttps = require('express-force-https');
var Sequelize = require('sequelize');

// Grab environment variables.
var sslCertFile = process.env.SSL_CERT;
var sslKeyFile = process.env.SSL_KEY;
var sslPass = process.env.SSL_PASS;
var mysqlHost = process.env.MYSQL_HOST;
var mysqlDb = process.env.MYSQL_DB;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPass = process.env.MYSQL_PASS;

// Grab SSL certificate credentials.
var sslCert = fs.readFileSync(sslCertFile, 'utf-8');
var sslKey = fs.readFileSync(sslKeyFile, 'utf-8');
var creds = {
    cert: sslCert,
    key: sslKey,
    passphrase: sslPass
};

// Set up a SQL connection.
var sequelize = new Sequelize(mysqlDb, mysqlUser, mysqlPass, {
    host: mysqlHost,
    dialect: 'mysql',
    operatorsAliases: false
});

// Set up express middleware.
var app = express();
app.use(forceHttps);
app.use(helmet());

// Routing.
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// Start our server.
var server = https.createServer(creds, app);
server.listen(8080);
