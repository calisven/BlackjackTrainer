'use strict'

var routes = {};

routes.userModule = require('./userModule.server.controller');

module.exports = function(app) {
    
    app.post('/user/auth', routes.userModule.getUser);
    
    app.post('/user', routes.userModule.addUser);
    
    app.put('/user', routes.userModule.updateUserStats);
}