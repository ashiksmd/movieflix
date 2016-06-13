(function() {
    "use strict";

    angular.module("movieflix").controller("BrowseCtrl", BrowseCtrl);

    function BrowseCtrl(CatalogService, SessionService, $rootScope, $scope, $routeParams, $filter) {
        var bCtrl = this;

        //Page constants
        var PAGE_SIZE = 12;

        //Values in root scope (Used for links in page headers)
        //TODO: Look into ui-router to avoid using root scope like this
        $rootScope.category = $routeParams.category || "";
        $rootScope.orderBy = $routeParams.orderBy || "";
        $rootScope.searchQuery = "";
        $rootScope.$watch("searchQuery", filterResults);

        //Init values
        bCtrl.page = 0;
        bCtrl.data = [];
        bCtrl.pagedData = [];
        bCtrl.enableDetails = false;
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

                //Apply filters
                filterResults();
            }, function(err) {
                console.log(err);
            });

        function gotoPrev() {
            if (bCtrl.page > 0) {
                bCtrl.page--;
            }
        }

        function gotoNext() {
            if (bCtrl.page < bCtrl.pagedData.length - 1) {
                bCtrl.page++;
            }
        }

        function showDetails(movie) {
            bCtrl.selectedMovie = movie;
            bCtrl.enableDetails = true;
        }

        function hideDetails() {
            bCtrl.enableDetails = false;
        }

        function filterResults() {
            // Filter matching items
            var filteredItems = $filter('filter')(bCtrl.data, function (item) {
                if ($rootScope.category != "" && item.Type != $rootScope.category) return false;

                for(var attr in item) {
                    if (searchMatch(item[attr], $rootScope.searchQuery))
                        return true;
                }
                return false;
            });

            // Take care of the sorting order
            if ($rootScope.orderBy !== '') {
                filteredItems = $filter('orderBy')(filteredItems, $rootScope.orderBy);
            }

            bCtrl.page = 0;
            // now group by pages
            groupToPages(filteredItems);
        }

        ////////////////////////////////
        //Utility functions
        ////////////////////////////////

        function searchMatch(haystack, needle) {
            if (!needle) {
                return true;
            }

            if (typeof haystack === "string") {
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            }
            return false;
        };

        function groupToPages(filteredItems) {
            bCtrl.pagedData = [];

            for (var i = 0; i < filteredItems.length; i++) {
                if (i % PAGE_SIZE === 0) {
                    //New page
                    bCtrl.pagedData[Math.floor(i / PAGE_SIZE)] = [ filteredItems[i] ];
                } else {
                    //Add to current page
                    bCtrl.pagedData[Math.floor(i / PAGE_SIZE)].push(filteredItems[i]);
                }
            }
        }
    }
})();