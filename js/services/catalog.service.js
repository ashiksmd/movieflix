(function() {

    angular.module("movieflix")
        .service("CatalogService", CatalogService);


    function CatalogService($http, $q) {
        var service = this;
        service.getMovieList = getMovieList;
        service.getMovieByID = getMovieByID;
        service.getComments = getComments;
        service.addComment = addComment;

        function getMovieList() {
            var deferred = $q.defer();

            $http.get("data/movielist.json")
                .then(function(res) {
                    deferred.resolve(res.data)
                })
                .catch(function(e) {
                    deferred.reject(e.data)
                });

            return deferred.promise;
        }

        function getMovieByID(imdbID) {
            var deferred = $q.defer();

            // Searching through list of movies on client side for now, until server-side component is available
            $http.get("data/movielist.json")
                .then(function(res) {
                    var movieList = res.data;
                    var match = null;
                    for (var i = 0; i < movieList.length; i++) {
                        var movie = movieList[i];
                        if (movie.imdbID === imdbID) {
                            match = movie;
                            break;
                        }
                    }

                    deferred.resolve(match);
                })
                .catch(function(e) {
                    deferred.reject(e.data)
                });

            return deferred.promise;
        }

        function getComments(imdbID) {
            var deferred = $q.defer();

            $http.get("data/comments.json")
                .then(function(res) {
                    deferred.resolve(res.data)
                })
                .catch(function(e) {
                    deferred.reject(e.data)
                });

            return deferred.promise;
        }

        function addComment(imdbID, rating, text) {
            //Should send to server when the component becomes available
            return $q.when({
                rating: rating,
                text: text
            });
        }

    }

})();