/**
 * Created by berthel on 02/01/15.
 */
'use strict';

angular.module('NavBar', [])
    .directive('navBarDir', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/navbar/navbar.html',
            link: function (scope) {
                scope.toggleMenu = function() {
                    $rootScope.$emit('toggleMenu');
                };
                
                scope.saveImg = function() {
                    $rootScope.$emit('saveImg');
                };
            }
        };
    }]);
