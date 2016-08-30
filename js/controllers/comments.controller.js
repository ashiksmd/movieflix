(function() {
    "use strict";

    angular.module("movieflix").controller("CommentsCtrl", CommentsCtrl);

    function CommentsCtrl(CatalogService, $routeParams) {
        var cCtrl = this;

        cCtrl.imdbID = $routeParams.imdbID;

        cCtrl.newRating = 0;
        cCtrl.newReview = "";
        cCtrl.addComment = addComment;

        cCtrl.comments = [];

        CatalogService.getComments(cCtrl.imdbID)
            .then(function(comments) {
                cCtrl.comments = comments;
            }, function(err) {
                console.log(err);
            });

        function addComment() {
            console.log("Adding a new comment")
            CatalogService.addComment(cCtrl.imdbID, cCtrl.newRating, cCtrl.newReview)
                .then(function(comment) {
                    cCtrl.comments.push(comment);
                    cCtrl.newRating = 0;
                    cCtrl.newReview = "";
                }, function(err) {
                    console.log(err);
                });

        }
    }
})();