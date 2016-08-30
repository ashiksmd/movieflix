(function() {
    "use strict";

    angular.module("movieflix").controller("CommentsCtrl", CommentsCtrl);

    function CommentsCtrl(CatalogService) {
        var cCtrl = this;

        cCtrl.comments = [];

        CatalogService.getComments()
            .then(function(comments) {
                cCtrl.comments = comments;
            }, function(err) {
                console.log(err);
            })
    }
})();