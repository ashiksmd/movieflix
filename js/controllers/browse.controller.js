(function() {
    "use strict";

    angular.module("movieflix").controller("BrowseCtrl", BrowseCtrl);

    function BrowseCtrl(CatalogService, SessionService) {
        var bCtrl = this;

        //Page constants
        var PAGE_SIZE = 12;

        //Init values
        bCtrl.page = 1;
        bCtrl.data = [];
        bCtrl.numPages = 1;
        bCtrl.enableDetails = false;
        bCtrl.showPage = showPage;
        bCtrl.gotoPrev = gotoPrev;
        bCtrl.gotoNext = gotoNext;
        bCtrl.showDetails = showDetails;
        bCtrl.hideDetails = hideDetails;

        //Allow admin actions
        bCtrl.isAdmin = SessionService.isAdmin();

        // Retrieve a list of movies to be displayed
        CatalogService.getMovieList()
            .then(function (movielist) {
                bCtrl.data = movielist;
                bCtrl.numPages = Math.ceil(movielist.length/ PAGE_SIZE);
                bCtrl.showPage();
            }, function(err) {
                console.log(err);
            });

        function showPage() {
            var movielist = bCtrl.data;
            var total = movielist.length;
            var page = bCtrl.page;
            var start = (page-1) * PAGE_SIZE;
            var end = start + PAGE_SIZE;

            bCtrl.movielist = movielist.slice(start,end);
        }

        function gotoPrev() {
            if (bCtrl.page > 1) {
                bCtrl.page--;
                bCtrl.showPage();
            }
        }

        function gotoNext() {
            if (bCtrl.page < bCtrl.numPages) {
                bCtrl.page++;
                bCtrl.showPage();
            }
        }

        function showDetails(movie) {
            bCtrl.selectedMovie = movie;
            bCtrl.enableDetails = true;
        }

        function hideDetails() {
            bCtrl.enableDetails = false;
        }
    }
})();