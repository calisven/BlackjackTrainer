'use strict'

angular.module('mainApp.menuButtonDirective', [])
    .directive('menubtn', function() {
        
        return {
            restrict: 'E',
            scope: {},
            controller: function($scope, SharedServices) {
                
                $scope.onMenuToggle = function() {
                    SharedServices.setMenuStatus();
                }
            },
            template: '<a ng-click="onMenuToggle()"  class="btn btn-default" id="menu-toggle">Menu</a>'
        }
})