var app = angular.module('catalog', []);
app.controller('catalogCtrl', function($scope, $http) {
    $http.get("data/movielist.json").then(function (response) {
        movielist = response.data;

        $scope.movielist = movielist.slice(0,12);
    });
});