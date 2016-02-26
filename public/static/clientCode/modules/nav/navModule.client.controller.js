'use strict'

// Controls the navigation bar menu on the left side 
// of the page
angular.module('mainApp.navController', []).controller('navCtrl', ['$scope', 'SharedServices', function($scope, SharedServices) {
    
    // Controls the sliding menu navigation
    $scope.navCollapsed = true;
    $scope.showMenu = SharedServices.getMenuStatus();
    
    $scope.getMenuStatus = function() {
        return SharedServices.getMenuStatus();
    };
    
    $scope.isLoggedIn = function() {
        
        // TODO: This is called far more often than
        // I think it should be
        return SharedServices.getLoggedIn();  
    };
    
    $scope.logOut = function() {
        
        SharedServices.setWindowUsername(undefined);
        SharedServices.setWindowWins(0);
        SharedServices.setWindowLosses(0);
        SharedServices.setWindowPlayed(0);
        SharedServices.setUserId(undefined);
        SharedServices.setLoggedIn(false);
    }
    
}]);