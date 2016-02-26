'use strict'

var mongoose = require('mongoose'); // Database library

var mongodbURL = 'mongodb://localhost/blackjack';
var mongodbOptions = {};


mongoose.connect(mongodbURL, mongodbOptions, function(err, res) {
   
    if ( err ) {
        console.log('Connection refused to database: ' + mongodbURL);
        console.log(err);
    }
    
    else {
        console.log('Connection to ' + mongodbURL + ' successful!');   
    }
});

exports.mongooseConnection = mongoose;