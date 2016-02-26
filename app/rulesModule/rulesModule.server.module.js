'use strict'

var cardData = require('../data/newData.json');

const MAX_VALUES = 13;

var rules = {};

rules.CardEnum = 
{
        "Two": 0,
        "Three": 1,
        "Four": 2,
        "Five": 3,
        "Six": 4,
        "Seven": 5,
        "Eight": 6,
        "Nine": 7,
        "Ten": 8,
        "Jack": 8,
        "Queen": 8,
        "King": 8,
        "Ace": 9   
}

rules.TenEnum = 
{
    "Jack": 'Ten',
    "Queen": 'Ten',
    "King": 'Ten',
    "Ace": 'Ten'
}

exports.validateAnswer = function(options, callback) {
    
    var playerCards = options.playerCards;
    var dealerCard = options.dealerCard;
    var gameType = options.gameType;
    var userAnswer = options.userAnswer;
    
    if( !playerCards || !dealerCard || !gameType || !userAnswer ) {
        console.log("Error: All parameters not given.");
        return;
    }
    var firstUserCard = playerCards[0];
    
    var secondUserCard = playerCards[1];
    
    if (rules.TenEnum[firstUserCard]) {
        firstUserCard = rules.TenEnum[firstUserCard];
    }
    if (rules.TenEnum[secondUserCard]) {
        secondUserCard = rules.TenEnum[secondUserCard];
    }
    if (rules.TenEnum[dealerCard]) {
        dealerCard = rules.TenEnum[dealerCard];
    }
    
    var answerArray = cardData[firstUserCard][secondUserCard].split(",");
    
    var correctAnswer = answerArray[convertDealerCard(dealerCard)];
    
    var response = {};
    
    // If it isn't a special rule
    if( correctAnswer.indexOf("/") > -1 ) {
        
        response.data = correctAnswer.indexOf(userAnswer) > -1;
        response.answer = correctAnswer;
        
        return response;
    }
    else {
        
        response.data = correctAnswer === userAnswer;
        response.answer = correctAnswer;
        
        return response;
    }
    
}

var convertDealerCard = function(card) {
    
    return rules.CardEnum[card];
}