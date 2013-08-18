'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
    config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/post/', {
                templateUrl: 'partials/partial1.html',
                controller: MyCtrl1
            })
            .when('/post/addPost', {
                templateUrl: 'partials/addPost.html',
                controller: AddPostCtrl
            }).
            when('/post/readPost/:id', {
                templateUrl: 'partials/readPost.html',
                controller: ReadPostCtrl
            }).
            when('/post/editPost/:id', {
                templateUrl: 'partials/editPost.html',
                controller: EditPostCtrl
            }).
            when('/post/deletePost/:id', {
                templateUrl: 'partials/deletePost.html',
                controller: DeletePostCtrl
            })
            .otherwise({redirectTo: '/post/'});
        $locationProvider.html5Mode(true);
    }]);