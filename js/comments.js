(function() {
    'use strict';
    
    var app = angular.module('comments', ['ui.bootstrap', 'service']);
    app.controller('commentsCtrl', function($scope, $http, CatalogService) {
        $scope.comments = [];

        CatalogService.getComments()
            .then(function(comments) {
                $scope.comments = comments;
            }, function(err) {
                console.log(err);
            })
    });
})();
