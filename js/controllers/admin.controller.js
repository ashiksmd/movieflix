(function() {
    "use strict";

    angular.module("movieflix").controller("AdminCtrl", AdminCtrl);

    function AdminCtrl(CatalogService, SessionService, $routeParams, $location) {

        var aCtrl = this;
        aCtrl.movie = [];

        var imdbID = $routeParams.imdbID;
        if(imdbID) {
            CatalogService.getMovieByID(imdbID)
                .then(function (movie) {
                    aCtrl.movie = movie;
                }, function(err) {
                    console.log(err);
                });
        }
    }
})();