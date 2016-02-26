'use strict'

/*
Gets a simple heartbeat from the server
*/
angular.module('mainApp.gameController', []).controller('gameCtrl', ['$scope', '$window', 'ImageServices', 'RuleServices', 'SharedServices',        'UserServices', 
    function($scope, $window, ImageServices, RuleServices, SharedServices, UserServices) {

        $scope.card = {};
        $scope.suit = "spade";
        $scope.rank = "ace";

        $scope.message = "Select a move";

        $scope.userCardImageOne = '';

        $scope.hasAnswered = false;

        $scope.setUiWins = function() {
            return SharedServices.getWindowWins();
        }
        $scope.setUiLosses = function() {
            return SharedServices.getWindowLosses();
        }
        $scope.setUiPlayed = function() {
            return SharedServices.getWindowPlayed();
        }
        
        $scope.setUiPercent = function() {
            return ((SharedServices.getWindowWins() / SharedServices.getWindowPlayed()) * 100) || 0;
        }
        
        $scope.setUiUsername = function() {
            return SharedServices.getWindowUsername();
        }
        

        $scope.onNewHandClick = function() {

            ImageServices.getNewHand()
                .success(function(result) {

                    $scope.hasAnswered = false;

                    $scope.userCardImageOne = result.userCardPathOne;
                    $scope.userCardImageTwo = result.userCardPathTwo;
                    $scope.userCardOne = result.userCardOne;
                    $scope.userCardTwo = result.userCardTwo;
                    // description = rank
                    // suit = suit

                    $scope.dealerCard = result.dealerCard;
                    $scope.dealerCardImage = result.dealerCardPath;

                    $scope.message = "Select a move";

                })
                .error(function(err) {
                    console.log(err);
                });
        }

        $scope.onActionSelect = function(choice) {

            RuleServices.validateAnswer('normal', choice, $scope.userCardOne.description, $scope.userCardTwo.description, 
                                         $scope.dealerCard.description, $window.sessionStorage.username)
                .success(function(data) {
                    // TODO: Move much of this logic to a service.
                    $scope.hasAnswered = true;
                    var hasWon = false;

                    if(data.data.data.toString() === 'true') {
                        
                        hasWon = true;
                        $scope.message = "Correct!"
                        
                        // Update local stats, not user specific
                        if (SharedServices.getLoggedIn() === 'false') {
                            
                            SharedServices.setWindowWins(SharedServices.getWindowWins() + 1);
                            SharedServices.setWindowPlayed(SharedServices.getWindowPlayed() + 1);
                        }
                    }
                    else {

                        if(data.data.answer === "S") {
                            data.data.answer = "Stand";
                        }
                        else if (data.data.answer === "H") {
                            data.data.answer = "Hit";
                        }
                        else if (data.data.answer === "P") {
                            data.data.answer = "Split";
                        }
                        else if (data.data.answer === "D") {
                            data.data.answer = "Double Down";
                        }

                        $scope.message = "Sorry, the correct answer is: " + data.data.answer;
                        
                        // Update local stats, not user specific
                        if (SharedServices.getLoggedIn() === 'false') {

                            SharedServices.setWindowLosses(SharedServices.getWindowLosses() + 1);
                            SharedServices.setWindowPlayed(SharedServices.getWindowPlayed() + 1);
                        }
                    }

                    // Update user stats if they are logged in
                    if (SharedServices.getLoggedIn() === 'true') {

                        UserServices.updateUserStats(hasWon)
                            .success(function(data) {
                                
                                SharedServices.setWindowWins(data.data.winNum);
                                SharedServices.setWindowLosses(data.data.lossNum);
                                SharedServices.setWindowPlayed(data.data.gamesPlayed);
                            
                            })
                            .error(function(err) {
                                console.log(err);
                            });
                    }

                })
                .error(function(err) {
                    console.log("Error validating answer: " + err.error);
                });
        }
        
        // Start a new game on page load
        $scope.onNewHandClick();
    
}]);
