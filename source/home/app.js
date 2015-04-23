angular.module('phoneApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
           .when('/', {
                templateUrl : 'layout/index.html'
                // controller  : 'mainController'
            });
});