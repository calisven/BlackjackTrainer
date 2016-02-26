'use strict'

var Shuffle = require('shuffle');

var decks = [];
const DECK_SIZE = 52;
var numCardsDrawn = 0;



exports.getCard = function() {
    
    // TODO SVEN: Should shuffle everytime, as a user
    // will share this with all other users
    // This could however allow for a future
    // card counting add-on
    if( getHasToShuffle() === true ) {
        
        shuffleDecks(6);
    }
    
    var cardSelection = undefined;
    
    while ( cardSelection === undefined ) {
    
        var deckNumber = Math.floor(Math.random() * (decks.length))
        
        cardSelection = decks[deckNumber].draw(1);     
    }
    
    numCardsDrawn ++;
    
    return cardSelection;
}

// Shuffles the deck, resetting the game
// back to a full 6 decks
var shuffleDecks = function(numDecks) {
    
    decks = [];
    
    for ( var i=0; i < numDecks; i++ ) {
        decks.push(Shuffle.shuffle());
    }

}

// If too many cards have been drawn, 
// shuffle them
var getHasToShuffle = function() {
    
    var cardLimit = Math.floor(((3/5) * (decks.length * DECK_SIZE))); 
       
    return numCardsDrawn >= cardLimit;
}

exports.shuffleDecks = shuffleDecks;