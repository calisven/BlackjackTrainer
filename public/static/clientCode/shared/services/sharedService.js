'use strict'

angular.module('mainApp.sharedService', []).factory('SharedServices', ['$window', function($window) {
   
    var showMenu = true;
    
    return {
        
        getMenuStatus: function() {
            return showMenu;
        },
        setMenuStatus: function() {
            showMenu = !showMenu;
        },
        setWindowUsername: function(username) {
            $window.sessionStorage.username = username;
        },
        setUserId: function(id) {
            $window.sessionStorage.userId = id;  
        },
        setWindowWins: function(wins) {
            $window.sessionStorage.wins = wins;
        },
        setWindowLosses: function(losses) {
            $window.sessionStorage.losses = losses;
        },
        setWindowPlayed: function(played) {
            $window.sessionStorage.played = played;  
        },
        setLoggedIn: function(val) {
            $window.sessionStorage.loggedIn = val;  
        },
        getLoggedIn: function() {
            return $window.sessionStorage.loggedIn || 'false';  
        },
        getWindowPlayed: function() {
            return parseInt($window.sessionStorage.played) || 0;  
        },
        getUserId: function() {
            return $window.sessionStorage.userId;  
        },
        getWindowUsername: function() {
            return $window.sessionStorage.username;
        },
        getWindowWins: function() {
            return parseInt($window.sessionStorage.wins) || 0;
        },
        getWindowLosses: function() {
            return parseInt($window.sessionStorage.losses) || 0;
        }
        
    };
}]);