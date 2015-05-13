// var phoneApp = angular.module('phoneApp', ['ngRoute']);

// phoneApp.config(['$routeProvider', function ($routeProvider) {
//     $routeProvider
//     .when('/', {
//         templateUrl : 'templates/index.html'
//         // controller  : 'mainController'
//     });
// }]);





angular.module('phoneApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/index',
        templateUrl: 'templates/index.html',
        controller: 'HomeIndexCtrl'
    })
    .state('msg', {
        url: '/msg',
        templateUrl: 'templates/msg.html',
        controller: 'HomeMsgCtrl'
    });

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/index');
});
