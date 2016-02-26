'use strict'

var routes = {};

routes.imageRoutes = require('./imageModule.server.controller');

module.exports = function(app) 
{
    app.get('/card/:suit/:rank', routes.imageRoutes.getCardImage);
    app.get('/card', routes.imageRoutes.getCards)
}