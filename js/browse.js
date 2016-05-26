var app = angular.module('catalog', []);
app.controller('catalogCtrl', function($scope, $http) {
    var pageSize = 12;

    $scope.data = [];
    $scope.page = 1;
    $scope.enableDetails = "";

    // Enable/Disable Prev nav button
    $scope.allowPrev = function() {
        if ($scope.page > 1) {
            return "";
        }
        return "disabled"
    }

    // Enable/Disable Next nav button
    $scope.allowNext = function() {
        var maxPages = Math.ceil($scope.data.length / pageSize);

        if ($scope.page < maxPages) {
            return "";
        }
        return "disabled"
    }

    // Display movies in current page
    $scope.showPage = function() {
        var movielist = $scope.data;
        var total = movielist.length;
        var page = $scope.page;
        var start = (page-1)*pageSize;
        var end = start + pageSize;

        $scope.movielist = movielist.slice(start,end);
    }

    // Go to previous page
    $scope.gotoPrev = function() {
        if ($scope.page > 1) {
            $scope.page--;
            $scope.showPage();
        }
    }

    // Go to next page
    $scope.gotoNext = function() {
        var maxPages = Math.ceil($scope.data.length / pageSize);
        if ($scope.page < maxPages) {
            $scope.page++;
            $scope.showPage();
        }
    }

    // Show details of the movie in a floating panel
    $scope.showDetails = function(movie) {
        $scope.selectedMovie = movie;
        $scope.enableDetails = "enabled";

    }

    // Hide the details view
    $scope.closeDetails = function() {
        $scope.enableDetails = "";
    }

    // Retrieve a list of movies to be displayed
    $http.get("data/movielist.json").then(function (response) {
        $scope.data = response.data;
        $scope.showPage();
    });
});