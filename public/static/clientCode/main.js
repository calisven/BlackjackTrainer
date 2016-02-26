'use strict'

var options = {};
options.api = {};
options.api.baseUrl = "http://localhost:8080";

// Load everything into the main module
var mainApp = angular.module('mainApp', ['ui.router', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'mainApp.gameController', 
                           'mainApp.navController', 'mainApp.imageServices', 'mainApp.ruleServices',
                                        'mainApp.sharedService', 'mainApp.aboutController', 'userModule',
                                        'mainApp.menuButtonDirective', 'rulesModule']);
    
// This is dependency injection along with annotating (annotating is needed for minified)    
mainApp.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    
    // Any other URL given, go to '/'
    $urlRouterProvider.otherwise('/');
    
    // If you get 'home' in the URL, return 'index.html'
    // state name = what is referenced by $state variable (i.e. state.go('nav.home'))
    // The 'nav' state will always return 'nav-panel.html', and at least one of the
    // child pages below
    $stateProvider
    
        .state('nav', {
            url: '/',
            views: {
                "mainDisplay": { // The path is defined (I think...) in index.js (server side)
                    templateUrl: "clientCode/angular-templates/nav-panel.html",
                    controller: 'navCtrl'
                }
            },
            abstract: true
        })
        .state('nav.home', {
            url: '',
            templateUrl: 'clientCode/angular-templates/game.html',
            controller: 'gameCtrl',
            directive: 'menubtn'
        })
        .state('nav.login', {
            url: '',
            templateUrl: 'clientCode/angular-templates/login.html',
            controller: 'userCtrl',
            directive: 'menubtn'
        })
        .state('nav.rules', {
            url: '',
            templateUrl: 'clientCode/angular-templates/rules.html',
            controller: 'rulesCtrl',
            directive: 'menubtn'
        })
        .state('nav.about', {
            url: '',
            templateUrl: 'clientCode/angular-templates/about.html',
            controller: 'aboutCtrl',
            directive: 'menubtn'
        })

}]);