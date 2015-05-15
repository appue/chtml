var userEntry = angular.module('phoneApp', ['ui.router', 'DelegateEvents']);

userEntry.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state(' ', { //入口页面
            url: '/',
            templateUrl: 'templates/entry.html',
            controller: 'entryCtrl'
        })
        //登录页
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })
        //登录-忘记密码页
        .state('loginForget', {
            url: '/login/forget',
            templateUrl: 'templates/login_forget_password.html',
            controller: 'loginForgetCtrl'
        })
        //登录-重置密码页
        .state('loginReset', {
            url: '/login/reset?phone',
            templateUrl: 'templates/login_reset_password.html',
            controller: 'loginResetCtrl'
        })
        //注册-创建资料页
        .state('register', {
            url: '/register/create',
            templateUrl: 'templates/register_create_data.html',
            controller: 'registerCreateCtrl'
        })
        //注册-设置账号密码页
        .state('registerAccount', {
            url: '/register/account',
            templateUrl: 'templates/register_set_account.html',
            controller: 'registerAccountCtrl'
        })
        //注册-验证码页
        .state('registerVcode', {
            url: '/register/vcode',
            templateUrl: 'templates/register_vcode.html',
            controller: 'registerVcodeCtrl'
        })
        //注册-完成页
        .state('registerDone', {
            url: '/register/done',
            templateUrl: 'templates/register_done.html',
            controller: 'registerDoneCtrl'
        })
        //注册-关注感兴趣栏目页
        .state('registerColumn', {
            url: '/register/column',
            templateUrl: 'templates/register_take_column.html',
            controller: 'registerColumnCtrl'
        })
        //注册-关注感兴趣的人页
        .state('registerPeople', {
            url: '/register/people',
            templateUrl: 'templates/register_focus_people.html',
            controller: 'registerFocusCtrl'
        });

    // 处理在状态配置中指定的路由之外的 url 请求
    // var isShowGuide = localStorage.getItem('EPBUY_SHOWED_GUIDE');
    // if (isShowGuide && JSON.parse(isShowGuide).value === 1) {
    //     $urlRouterProvider.otherwise('/login');
    // } else {
    //     $urlRouterProvider.otherwise('/');
    // }

});