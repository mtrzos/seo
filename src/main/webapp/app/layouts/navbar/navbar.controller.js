(function() {
    'use strict';

    angular
        .module('seoApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', '$scope'];

    function NavbarController ($state, Auth, Principal, ProfileService, LoginService, $scope) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.account = null;
        $scope.$on('authenticationSuccess', function() {
                    getAccount();
                });

                getAccount();

                function getAccount() {
                    Principal.identity().then(function(account) {
                        console.log('Sending a request for the user');
                        vm.account = account;
                        vm.isAuthenticated = Principal.isAuthenticated;
                        console.log('is Auth: ' + Principal.isAuthenticated);
                    });
                }

        Principal.identity().then(function(account) {
            vm.account = account;
            vm.isAuthenticated = Principal.isAuthenticated;
        });

        function login() {
            console.log('Opening modal');
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
    }
})();
