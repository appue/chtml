angular.module('phoneApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
           .when('/', {
                templateUrl : 'templates/index.html'
                // controller  : 'mainController'
            });
});