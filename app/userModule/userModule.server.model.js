'use strict'

var mongoose = require('../common/databaseConnection.js');

var Schema = mongoose.mongooseConnection.Schema;

// User schema. TODO Add more fields to this
var UserStats = new Schema({
    // Unlike a relational DB, the fields do not have to have a set 
    // design
    username: { type: String, required: true, unique: true },
    // Says the date and time of the server backup
    // If queried, the DAY AND TIME should be the only 
    // return values
    password: { type: String, required: true, minLength:1 }, //select: false ?? Sven
    winNum: {type: Number, default: 0},
    lossNum: {type: Number, default: 0},
    gamesPlayed: {type: Number, default: 0}
    }
);

UserStats.methods.comparePassword = function(password, cb) {
    
    // De-hash the password and compare to what was input
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if ( err ) {
            return cb(err);
        }
        cb(isMatch);
    });
};

// Automatically excludes the 'password' field
// whenever Mongoose returns the user object
// (such as during user creation, or searches)
UserStats.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password
  return obj
}

// Define the models for use
var userStatsModel = mongoose.mongooseConnection.model('UserStats', UserStats);

// Export the models to make them accessible (i.e. User = require('loginUserDb'))
exports.userStatsModel = userStatsModel;