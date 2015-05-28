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

    /*------------------------------------
    * 搜索结果
    */
    .state('result', {
        url: '/result',
        templateUrl: 'templates/search-result.html',
        controller: 'tSearchResult'
    });

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/index');
});
