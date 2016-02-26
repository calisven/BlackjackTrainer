'use strict'

angular.module('mainApp.ruleServices', []).factory('RuleServices', ['$http', function($http) {
    
    return {
        
        validateAnswer: function(gameType, answer, userCardOne, userCardTwo, dealerCard) {
            
            if ( !gameType || gameType === null ) 
            {
                return "Error: Game type not specified.";
            }
           
            return $http.post('/validate', {gameType: gameType, answer: answer, userCardOne: userCardOne,
                                          userCardTwo: userCardTwo, dealerCard: dealerCard});
        }
    }
    
}]);