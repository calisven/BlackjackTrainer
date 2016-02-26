'use strict'

var test = require('./rulesModule.server.module');

exports.validateAnswer = function(req, res) {
 
    var answer = req.body.answer || '';
    
    var userCardOne = req.body.userCardOne || '';
    var userCardTwo = req.body.userCardTwo || '';
    
    var dealerCard = req.body.dealerCard || '';
    
    var gameType = req.body.gameType || '';
    
    var username = req.body.username || '';
    
    if (answer === '' || userCardOne === '' || userCardTwo === ''
         || dealerCard === '') {
        
        return res.status(400).json({error: "Error: Invalid answer parameters provided."}).end();
    }
    
    var options = {
    
        playerCards : [userCardOne, userCardTwo],
        dealerCard : dealerCard,
        gameType : gameType,
        userAnswer : answer
    }

    return res.status(200).json({data: test.validateAnswer(options)}).end();
}