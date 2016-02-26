'use strict'

angular.module('userModule.services', []).factory('UserServices', ['$http', '$window', function($http, $window) {
    
    return {
        addUser: function(username, password) {
            return $http.post('/user', {username: username, password: password});
        },
        
        authenticateUser: function(username, password) {
            return $http.post('/user/auth', {username: username, password: password});
        },
        
        updateUserStats: function(hasWon) {
            
            if (hasWon === true && $window.sessionStorage.userId) {
                
                return $http.put('/user', {id: $window.sessionStorage.userId, hasWon: true});
            }
            else if(hasWon === false && $window.sessionStorage.userId) {
                
                return $http.put('/user', {id: $window.sessionStorage.userId, hasWon: false});
            }
        }
    }
    
}]);