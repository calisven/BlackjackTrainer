'use strict'


var cardValidator = require('../common/cardEnums');
var path = require('path');
var deck = require('../common/shuffleModule');

const IMG_FOLDER = 'libraries/img/png-cards/';

exports.getCardImage = function(req, res)
{
    var suit = req.params['suit'] || '';
    
    var rank = req.params['rank'] || '';
    
    if (suit === '' || rank === '')
    {
        return res.status(400).json({error: "Card not provided."}).end();
    }
    
    var convertedSuit = cardValidator.convertSuit(suit);
    var convertedRank = cardValidator.convertRank(rank);
    
    if (convertedSuit !== null && convertedRank !== null)
    {

        var imgPath = IMG_FOLDER + convertedRank + "_of_" + convertedSuit + ".png";
        
        res.status(200).json({path: imgPath}).end();

    }
    else
    {
        return res.status(400).json({error: "Suit or rank values are invalid."}).end();
    }

}

exports.getCards = function(req, res) {
    
    var userCardOne = deck.getCard();
    var userCardTwo = deck.getCard();
    
    var dealerCard = deck.getCard();
    
    
    
    // Image paths
    var userCardPathOne = IMG_FOLDER + cardValidator.convertRank(userCardOne.description) + "_of_" + cardValidator.convertSuit(userCardOne.suit) + "s.png"; 
    var userCardPathTwo = IMG_FOLDER + cardValidator.convertRank(userCardTwo.description) + "_of_" + cardValidator.convertSuit(userCardTwo.suit) + "s.png";
    var dealerCardPath = IMG_FOLDER + cardValidator.convertRank(dealerCard.description) + "_of_" + cardValidator.convertSuit(dealerCard.suit) + "s.png";
    
    return res.status(200).json({
        
        userCardOne: userCardOne,
        userCardTwo: userCardTwo,
        dealerCard: dealerCard,
        userCardPathOne: userCardPathOne,
        userCardPathTwo: userCardPathTwo,
        dealerCardPath: dealerCardPath
        
    });
}
