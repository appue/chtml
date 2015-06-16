var userEntry = angular.module('phoneApp', ['ui.router', 'DelegateEvents']);

userEntry.run(function () {
    FastClick.attach(document.body);
}).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        //登录页
        .state('login', {
            url: '/login.htm',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })
        //登录-忘记密码页
        .state('loginForget', {
            url: '/login/forget.htm',
            templateUrl: 'templates/login_forget_password.html',
            controller: 'loginForgetCtrl'
        })
        //登录-重置密码页
        .state('loginReset', {
            url: '/login/reset/:phone', //@params:phone
            templateUrl: 'templates/login_reset_password.html',
            controller: 'loginResetCtrl'
        })
        //注册-创建资料页
        .state('registerCreate', {
            url: '/register/create.htm',
            templateUrl: 'templates/register_create_data.html',
            controller: 'registerCreateCtrl'
        })
        //注册-设置账号密码页
        .state('registerAccount', {
            url: '/register/account.htm',
            templateUrl: 'templates/register_set_account.html',
            controller: 'registerAccountCtrl'
        })
        //注册-验证码页
        .state('registerVcode', {
            url: '/register/vcode/:phone', //@params:phone
            templateUrl: 'templates/register_vcode.html',
            controller: 'registerVcodeCtrl'
        })
        //注册-完成页
        .state('registerDone', {
            url: '/register/done.htm',
            templateUrl: 'templates/register_done.html',
            controller: 'registerDoneCtrl'
        })
        //注册-关注感兴趣栏目页
        .state('registerColumn', {
            url: '/register/column.htm',
            templateUrl: 'templates/register_take_column.html',
            controller: 'registerColumnCtrl'
        })
        //注册-关注感兴趣的人页
        .state('registerPeople', {
            url: '/register/people.htm',
            templateUrl: 'templates/register_focus_people.html',
            controller: 'registerFocusCtrl'
        });

    $urlRouterProvider.otherwise('/');

});