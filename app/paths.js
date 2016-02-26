//const DEBUG = require('./helperFunctions/etc/debugFlag').DEBUG;

var child = require('child_process');

// module.exports gives you access to the parent application 
// object. This allows you to render things to the website 
// even though the application is defined elsewhere.
module.exports = function(app){
      
	app.get('/', function(req, res) {

		res.sendfile('public/static/index.html');
	});
    
    // Sets every modules REST routes
    require('./imageModule/imageModule.server.routes')(app);
    require('./userModule/userModule.server.routes')(app);
    require('./rulesModule/rulesModule.server.routes')(app);
    
}

