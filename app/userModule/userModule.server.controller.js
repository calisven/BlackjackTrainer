'use strict'

var db = require('./userModule.server.model');

exports.addUser = function(req, res) {
    
    var username = req.body.username || '';
    var password = req.body.password || '';
    
    if (username === '' || password === '') {
        return res.status(400).json({error: "Username and password required."});
    }

    var user = new db.userStatsModel();
    
    user.username = username;
    user.password = password;
    
    user.save(function(err, newUser) {
        
        if (err) {
            return res.status(400).json({error:err});
        }
        
        return res.status(200).json({user: newUser}).end();
    });
}

exports.getUser = function(req, res) {
    
    var username = req.body.username || '';
    var password = req.body.password || '';
    
    if (username === '' || password === '') {
        return res.status(400).json({error: "Username or password not provided."});
    }
    
    db.userStatsModel.findOne({username: username, password: password}, function(err, data) {
        
        if (err) {
            return res.status(400).json({error: err}).end();
        }
        
        return res.status(200).json({user: data}).end();
    });
}

exports.removeUser = function(req, res) {
    
    var id = req.body.id || '';
    
    if (id === '') {
        return res.status(400).json({error: "ID field required."});
    }
    
    db.userStatsModel.findByIdAndRemove(id, function(err) {
        
        if(err) {
            return res.status(400).json({error: err}).end();
        }
        return res.status(200).end();
    });
}

exports.updateUserStats = function(req, res) {
    
    var hasWonGame = req.body.hasWon;
    var id = req.body.id || '';
    
    if (hasWonGame === undefined || id === '') {
        return res.status(400).json({error: "Empty win/loss field or ID field given."});
    }
    
    if (hasWonGame === true) {
        
        db.userStatsModel.findByIdAndUpdate(id, {$inc: {gamesPlayed:1, winNum:1}}, function(err, data) {
            
            if (err) {
                return res.status(400).json({error: err}).end();
            }
            
            return res.status(200).json({data: data}).end();
        });
        
    }
    else if (hasWonGame === false) {
        
        db.userStatsModel.findByIdAndUpdate(id, {$inc: {gamesPlayed:1, lossNum:1}}, function(err, data) {
            
            if (err) {
                return res.status(400).json({error: err}).end();
            }
            
            return res.status(200).json({data: data}).end();
        });
    }
    else {
        return res.status(400).json({error: "Invalid win/loss boolean given."}).end();
    }
}