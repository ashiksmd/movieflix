angular.module("mfRating", [])
    .directive("mfRating", mfRatingDirective);

function mfRatingDirective() {
    return {
        restrict: "E",
        template: '<ul class="rating">' +
                        '<li ng-repeat="star in stars" ng-class="{\'active\': star.filled}" ng-click="toggle($index)">' +
                            '\u2605' +
                        '</li>' +
                  '</ul>',
        scope: {
            ratingValue: "=",      //Value of rating. This many stars will be filled when displayed
            max: "=" ,             //Maximum value of rating. Number of stars displayed
            readonly: "@",
            onRatingSelected: "&?" //Callback on changing value
        },
        link: function (scope, elem, attrs) {
            //Defaults
            scope.max = scope.max || 5;
            scope.ratingValue = scope.ratingValue || 0;

            //Draw the stars when rating has been changed
            var updateStars = function() {
                scope.stars = [];

                for (var i=0; i<scope.max; i++) {
                    scope.stars.push({ filled: i<scope.ratingValue });
                }
            };

            //Watch for changes to rating
            scope.$watch("ratingValue", function(newVal, oldVal) {
                if (newVal != oldVal) {
                    updateStars();
                }
            });

            //Change rating on click of a star
            scope.toggle = function(index) {
                if (scope.readonly && scope.readonly == "true") {
                    return;
                }
                scope.ratingValue = index + 1;

                if(scope.onRatingSelected) {
                    console.log("on rating selected callback");
                    scope.onRatingSelected({newRating: index + 1});
                }
            };

            //First time draw stars
            updateStars();

        }
    }
}
