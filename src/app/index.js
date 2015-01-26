'use strict';

var app = angular.module('imageResizer', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'SideNav', 'NavBar', 'images-resizer', 'resizeToolBox']);

app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        })
        .state('404', {
            url: '/404.html',
            templateUrl: '404.html'
        });

        $urlRouterProvider.otherwise('/');
    });
