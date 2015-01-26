/**
 * Created by berthel on 02/01/15.
 */
'use strict';

angular.module('SideNav', [])
    .directive('sideNavDir', ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/sidenav/sidenav.html',
            link: function (scope) {

                $rootScope.$on('toggleMenu', function() {
                    $mdSidenav('left').toggle();
                });

                scope.close = function() {
                    $mdSidenav('left').close();
                };

                scope.clickOnButton = function(btnName) {
                    $rootScope.$emit('sideNavBtnClick', btnName);
                };
            }
        };
    }]);