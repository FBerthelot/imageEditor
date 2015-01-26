/**
 * Created by berthel on 25/01/15.
 */
'use strict';

angular.module('resizeToolBox', [])
    .controller('resizeToolBoxCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.resize = function() {
            $rootScope.$emit('resizeImg', $scope.width, $scope.height);
        };
}]);