

'use strict'


angular.module('mainApp.imageServices', []).factory('ImageServices', [ '$http', function($http) {
	
	return {
		
        // Gets single card
        getCardImage: function(suit, rank) 
        {
            return $http.get(options.api.baseUrl + '/card/' + suit + '/' + rank );   
        },
        
        // Gets three cards; one for dealer
        // two for user
        getNewHand: function()
        {
            return $http.get(options.api.baseUrl + '/card');
        }
    
	}
}]);