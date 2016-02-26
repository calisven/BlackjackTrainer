'use strict'

// Tests the validate answer function,
// determining if the user selected the
// correct action
var test = require('./rulesModule');

var options = {
    
    playerCards : ["Ace", "Seven"],
    dealerCard : "Three",
    gameType : "Whatever",
    userAnswer : "P"
}

console.log(test.validateAnswer(options));