angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.run(function() {
    FastClick.attach(document.body);
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*------------------------------------
    * 搜索首页
    */
    .state('index', {
        url: '/index',
        templateUrl: 'templates/search.html',
        controller: 'tSearchIndex'
    });

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/index');
});
