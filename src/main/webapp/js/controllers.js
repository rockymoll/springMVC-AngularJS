'use strict';

/* Controllers */

function MyCtrl1($scope, $http) {
  $http.get('/post/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data;
      console.log($scope);
    });
}

function AddPostCtrl($scope, $http, $location) {
    $scope.form = {};
    $scope.submitPost = function () {
        $http.post('/post/posts', $scope.form).
            success(function(data) {
                $location.path('/');
            });
    };
}

function ReadPostCtrl($scope, $http, $routeParams) {
    $http.get('/post/posts/' + $routeParams.id).
        success(function(data) {
            $scope.post = data.post;
        });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/post/posts/' + $routeParams.id).
        success(function(data) {
            $scope.form = data.post;
        });

    $scope.editPost = function () {
        $http.put('/post/posts/' + $routeParams.id, $scope.form).
            success(function(data) {
                $location.url('/readPost/' + $routeParams.id);
            });
    };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
    $http.get('/post/posts/' + $routeParams.id).
        success(function(data) {
            $scope.post = data.post;
        });

    $scope.deletePost = function () {
        $http.delete('/post/posts/' + $routeParams.id).
            success(function(data) {
                $location.url('/');
            });
    };

    $scope.home = function () {
        $location.url('/');
    };
}
