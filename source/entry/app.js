var userEntry = angular.module('phoneApp', ['ui.router', 'DelegateEvents']);

userEntry.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state(' ', { //入口页面
            url: '/',
            templateUrl: 'templates/entry.html',
            controller: 'entryCtrl'
        })
        .state('login', { //登录页
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        });

    // 处理在状态配置中指定的路由之外的 url 请求
    // var isShowGuide = localStorage.getItem('EPBUY_SHOWED_GUIDE');
    // if (isShowGuide && JSON.parse(isShowGuide).value === 1) {
    //     $urlRouterProvider.otherwise('/login');
    // } else {
    //     $urlRouterProvider.otherwise('/');
    // }

});