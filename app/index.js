'use strict'

var express = require('express');
var app = module.exports = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



// Important!: What is 'app.use'? It is middleware. Anything you
// add to this call intercepts specific app calls before they reach
// their final destination. For example, if a middleware is added to
// intercept all http calls, whatever logic is added to handle that
// 'app.use' case will have to pass through that layer first before
// reaching their final destination (if at all)
app.use(express.static(__dirname + '/../public/static'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.set('view engine', 'jade');

require('./paths.js')(app); // Appends every route in this file by passing in the 'app' parameter
console.log(__dirname);
app.listen(8080);
console.log("App listening on port 8080");
