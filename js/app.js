(function() {
    "use strict";

    angular.module("movieflix", ["ngRoute", "ui.bootstrap"]).config(moduleConfig).run(runConfig);

    function moduleConfig($routeProvider) {
        $routeProvider
            .when("/signin", {
                templateUrl: "views/signin.tmpl.html",
                controller: "SigninCtrl",
                controllerAs: "sCtrl"
            }).when("/browse", {
                templateUrl: "views/browse.tmpl.html",
                controller: "BrowseCtrl",
                controllerAs: "bCtrl"
            }).when("/browse/:category/", {
                templateUrl: "views/browse.tmpl.html",
                controller: "BrowseCtrl",
                controllerAs: "bCtrl"
            }).when("/browse/:category/:orderBy", {
                templateUrl: "views/browse.tmpl.html",
                controller: "BrowseCtrl",
                controllerAs: "bCtrl"
            }).when("/comments", {
                templateUrl: "views/comments.tmpl.html",
                controller: "CommentsCtrl",
                controllerAs: "cCtrl"
            }).when("/add-movie", {
                templateUrl: "views/admin.tmpl.html",
                controller: "AdminCtrl",
                controllerAs: "aCtrl"
            }).when("/edit-movie/:imdbID", {
                templateUrl: "views/admin.tmpl.html",
                controller: "AdminCtrl",
                controllerAs: "aCtrl"
            }).otherwise({
                redirectTo: "/signin"
            })
    }

    function runConfig($rootScope, $location, SessionService) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {

            var username = SessionService.getUser();
            $rootScope.isLoggedIn = (username != null);

            if ( !$rootScope.isLoggedIn ) {
                // no logged in user, we should be going to login page

                if ( next.templateUrl == "views/signin.tmpl.html" ) {
                    // already going to signin, no redirect needed
                } else {
                    // not going to signin, we should redirect now
                    $location.path( "/signin" );
                }
            }
            
            if (next.templateUrl == "views/admin.tmpl.html") {
                // Does user have admin privileges?
                if (!SessionService.isAdmin()) {
                    //If not an admin, stay wherever you are
                    alert("Error! You do not have admin access.")
                    event.preventDefault();
                }
            }
        });
    }

})();