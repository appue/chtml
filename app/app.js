angular.module('Tjoys', [
    'ui.router',
    'ui.router.router',
    'DelegateEvents'
])
.config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('mange', {
        abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/mange',
        templateUrl: 'code/tp/main.html',
    })

    //后台登录
    .state('mange.login', {
        // cache: false,
        url: '/login.htm',
        templateUrl: 'code/tp/login.html',
        controller: 'tLogin'
    })

    //后台登录
    .state('mange.index', {
        // cache: false,
        url: '/index.htm',
        templateUrl: 'code/tp/index.html',
        controller: 'tIndex'
    })

    //标签管理
    .state('mange.cate', {
        // cache: false,
        url: '/cate.htm',
        templateUrl: 'code/tp/cate.html',
        controller: 'tCate'
    })



    // $urlRouterProvider.when('', '/index.htm');
    $urlRouterProvider.otherwise('/mange/login.htm');

});
