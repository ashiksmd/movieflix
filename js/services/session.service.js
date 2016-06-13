(function() {

    angular.module('SessionService', [])
        .service('SessionService', SessionService);


    function SessionService() {
        var service = this;

        service.login = login;
        service.logout = logout;
        service.getUser = getUser;
        service.isAdmin = isAdmin;

        function login(email) {
            localStorage.setItem("username", email);
        }

        function logout() {
            localStorage.removeItem("username");
        }

        function getUser() {
            return localStorage. getItem("username");
        }

        function isAdmin() {
            //Do a server-side check in the final implementation
            //Hard-coding admin email address for now
            return (getUser() === "admin@movieflix.com")
        }
    }

})();
