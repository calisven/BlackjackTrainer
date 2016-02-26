'use strict'

var RankEnum = 
    {
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "jack": "jack",
        "queen": "queen",
        "king": "king",
        "ace": "ace"   
    }

var Suits = ['spade', 'heart', 'club', 'diamond'];

exports.convertSuit = function(suit)
{
    if(suit === undefined)
    {
        return null;
    }

    suit = suit.toLowerCase();
    
    if (Suits.indexOf(suit) > -1)
    {
        return suit;
    }
    
    return null;
}

exports.convertRank = function(rank)
{
    if(rank === undefined)
    {
        return null;
    }
    
    rank = rank.toLowerCase();
    
    return RankEnum[rank];
}
