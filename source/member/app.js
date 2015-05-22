angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 个人主页[主、客人态]
    */
    .state('Index', {
        url: '/index',
        templateUrl: 'templates/index.html',
        controller: 'tMemberIndex'
    });

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/index');
});
