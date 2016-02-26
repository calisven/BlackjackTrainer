'use strict'

angular.module('userModule.controller', []).controller('userCtrl', ['$scope', '$state', 'SharedServices', 'UserServices', function($scope, $state, SharedServices, UserServices) {
    
    $scope.input = {};
    
    $scope.input.username = '';
    $scope.input.password = '';
    $scope.input.isRegistering = false;
    
    $scope.onSubmit = function() {
        
        // CHECK IF REGISTER CHECKBOX CHECKED
        if ($scope.input.isRegistering) {
            
            UserServices.addUser($scope.input.username, $scope.input.password)
                .success(function(data) {
                    
                    setUser(data.user);
                
                    $state.go('nav.home');
            })
                .error(function(err) {
                    console.log(err);
            })
        }
        else {
            
            UserServices.authenticateUser($scope.input.username, $scope.input.password)
                .success(function(data) {
                    
                    setUser(data.user);
                
                    $state.go('nav.home');
            })
                .error(function(err) {
                    console.log(err);
            })
            
        }
    }
    
    $scope.authenticate = function(username, password) {
        
    }
    
    var setUser = function(user) {
        
        if (user === null) {
            return;
        }
        
        SharedServices.setWindowUsername(user.username);
        SharedServices.setWindowWins(user.winNum);
        SharedServices.setWindowLosses(user.lossNum);
        SharedServices.setWindowPlayed(user.gamesPlayed);
        SharedServices.setUserId(user._id);

        SharedServices.setLoggedIn(true);
        
    }
    
}]);