(function() {
    'use strict';
    
    var app = angular.module('comments', ['ui.bootstrap']);
    app.controller('commentsCtrl', function($scope, $http) {
        $scope.comments = [];

        $http.get("data/comments.json").then(function (response) {
            $scope.comments = response.data;
        });
    });
})();
