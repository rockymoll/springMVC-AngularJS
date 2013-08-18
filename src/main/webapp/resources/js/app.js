'use strict';

var AngularSpringApp = {};

var App = angular.module('AngularSpringApp', ['AngularSpringApp.filters', 'AngularSpringApp.services', 'AngularSpringApp.directives']);

// Declare app level module which depends on filters, and services
App.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/posts', {
        templateUrl: 'posts/layout',
        controller: PostController
    });

//    $routeProvider.when('/trains', {
//        templateUrl: 'trains/layout',
//        controller: TrainController
//    });

    $routeProvider.otherwise({redirectTo: '/posts'});
}]);
