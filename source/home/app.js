var phoneApp = angular.module('phoneApp', ['ngRoute']);

phoneApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'templates/index.html'
        // controller  : 'mainController'
    });
}]);

// var phoneApp = angular.module('phoneApp', ['ui.router']);

// phoneApp.config(function ($stateProvider, $urlRouterProvider) {
//     $stateProvider
//     .state('home', {
//         abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
//         url: '/home',
//         templateUrl: 'templates/index.html'
//     });
// });
