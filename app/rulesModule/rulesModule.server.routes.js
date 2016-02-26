'use strict'

var routes = {};

routes.rulesModule = require('./rulesModule.server.controller');

module.exports = function(app) {
    
    app.post('/validate', routes.rulesModule.validateAnswer);
    
}