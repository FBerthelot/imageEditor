'use strict';

angular.module('imageResizer')
  .controller('MainCtrl', ['$scope', '$rootScope', 'readLocalPicService', 'resizeService', '$timeout', '$mdBottomSheet',
        function ($scope, $rootScope, readLocalPicService, resizeService, $timeout, $mdBottomSheet) {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        $scope.imageInitial = null;
        $scope.imageToModify = null;

        $scope.isImageToModify = false;

        $scope.uploadFile = function(element) {
            readLocalPicService.readFileInput(element).then(function(base64Img){
                console.log('base', base64Img);
                $scope.isImageToModify = true;
                $timeout(function(){
                    resizeCanvasToWindow();
                    resizeService.createImage(base64Img).then(function(image){
                        $scope.imageInitial = image;
                        $scope.imageToModify = image;
                        context.drawImage(image, 0, 0, image.width , image.height);
                    });
                });
            }, function(err){
                console.error(err);
            });
        };

        function resizeCanvasToWindow() {
            var canvasSize = canvas.getBoundingClientRect();
            if(canvasSize.right < window.innerWidth) {
                canvas.width = window.innerWidth - canvasSize.left;
            }
            if(canvasSize.bottom < window.innerHeight) {
                canvas.height = window.innerWidth - canvasSize.top;
            }
        }

        $rootScope.$on('resizeImg', function(event, width, height) {
            console.log($scope.imageToModify, 'yuio');
            resizeService.resizeImage($scope.imageToModify.src, {width: width, height: height}, function(err, imgResized) {
                if(err) {
                    console.error(err);
                    return;
                }
                resizeService.createImage(imgResized).then(function(image){
                    $scope.imageToModify = image;
                    context.clearRect ( 0 , 0 , $scope.imageInitial.width, $scope.imageInitial.height );
                    context.drawImage(image, 0, 0, image.width , image.height);
                });
            });
        });

        $rootScope.$on('sideNavBtnClick', function(event, btnName) {
            switch(btnName) {
                case 'resizeImg':
                    $mdBottomSheet.show({
                        templateUrl: 'components/resizeToolBox/resizeToolBox.html',
                        controller: 'resizeToolBoxCtrl',
                        locals: {
                            width: $scope.image ? $scope.image.width : null,
                            height: $scope.image ? $scope.image.height : null
                        }
                    });
                    break;
            }
        });

        $rootScope.$on('saveImg', function(){
            if(!$scope.imageToModify) { return; }
            window.location.href = $scope.imageToModify.src.replace('image/png', 'image/octet-stream');
        });
    }]);
