angular.module('ENTRY', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('entry', {
                abstract: true,
                url: '/entry'
            })
            .state('entry.login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            });

        // 处理在状态配置中指定的路由之外的 url 请求
        var isShowGuide = localStorage.getItem('EPBUY_SHOWED_GUIDE');
        if (isShowGuide && JSON.parse(isShowGuide).value === 1) {
            $urlRouterProvider.otherwise('/entry/login');
        } else {
            $urlRouterProvider.otherwise('/entry/guide');
        }

    });