'use strict';

/**
 * CarController
 * @constructor
 */
var PostController = function($scope, $http) {
    $scope.fetchPostsList = function() {
        $http.get('posts/').success(function(postList){
            $scope.posts = postList;
        });
    }

    $scope.addNewPost = function(newPost) {
    	var postx = {title: "title",text:newPost};
        $http.post('posts/',postx).success(function() {
            $scope.fetchPostsList();
        });
        $scope.postName = '';
    }

    $scope.removePost = function(post) {
        $http.delete('posts/' + post.id).success(function() {
            $scope.fetchPostsList();
        });
    }
    
    $scope.updatePost = function(post) {
    	post.title = 'title-updated';
    	post.text = 'text-updated';
        $http.put('posts/',post).success(function() {
            $scope.fetchPostsList();
        });
    }

    ;

    $scope.fetchPostsList();
}