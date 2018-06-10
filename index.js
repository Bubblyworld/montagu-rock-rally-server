var fs = require('fs');
var path = require('path');
var https = require('https');
var uuid = require('uuid/v1');
var helmet = require('helmet');
var express = require('express');
var passport = require('passport');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var session = require('express-session');
var forceHttps = require('express-force-https');

// Grab environment variables.
var sslCertFile = process.env.SSL_CERT;
var sslKeyFile = process.env.SSL_KEY;
var sslPass = process.env.SSL_PASS;

// Grab SSL certificate credentials.
var sslCert = fs.readFileSync(sslCertFile, 'utf-8');
var sslKey = fs.readFileSync(sslKeyFile, 'utf-8');
var creds = {
    cert: sslCert,
    key: sslKey,
    passphrase: sslPass
};

// Set up a SQL connection, create models and config passport.js.
var sequelize = require('./src/config/database.js');
var models = require('./src/app/models/models.js')(sequelize);
require('./src/config/passport.js')(passport, models);

// Set up express middleware.
var app = express();
app.use(forceHttps);
app.use(helmet());
app.use(
    session({
        secret: uuid(),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

// // Enable CORS.
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Set up view engine.
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

// Routing.
app.use('/', require('./src/app/routes/routes.js')(models));

// Sync the database and start the server.
sequelize
    .sync()
    .then(() => {
        https
            .createServer(creds, app)
            .listen(8081);
    });
