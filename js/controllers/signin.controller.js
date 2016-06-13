(function() {
    "use strict";

    angular.module("movieflix").controller("SigninCtrl", SigninCtrl);

    function SigninCtrl(SessionService) {

        var sCtrl = this;
        sCtrl.email = "";
        sCtrl.password = "";

        sCtrl.login = function() {
            console.log("Logging you in")
            SessionService.login(sCtrl.email);
        };
    }
})();