(function() {
    'use strict';
    
    var app = angular.module('admin', ['ui.bootstrap']);
    app.controller('adminCtrl', function($scope, $http, $location) {
        var imdbID = $location.search().imdbID;

        $scope.movie = [];

        if(imdbID) {
            // Client side search for demo, temporary until API is available
            $http.get("data/movielist.json").then(function (response) {
                var movieList = response.data;

                for (var i = 0; i < movieList.length; i++) {
                    var movie = movieList[i];
                    if (movie.imdbID === imdbID) {
                        $scope.movie = movie;
                        break;
                    }
                }
            });
        }
    });
})();
