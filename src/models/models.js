var _User = require('./user.js');
var _Send = require('./send.js');
var _Route = require('./route.js');

module.exports = function(sequelize) {
    const User = _User(sequelize);
    const Route = _Route(sequelize);
    const Send = _Send(sequelize, User, Route);

    return { User, Route, Send };
};
