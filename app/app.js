angular.module('phoneApp', [
    'ionic',
    'pasvaz.bindonce'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    //开始页面
    .state('start', {
        url: '/start.htm',
        templateUrl: 'tp/start.html',
        controller: 'tStart'
    })
    //首页
    .state('index', {
        url: '/index',
        templateUrl: 'tp/index.html',
        controller: 'tHome'
    })
    //消息中心首页
    .state('msgIndex', {
        url: '/msg/index.htm',
        templateUrl: 'tp/index.html',
        controller: 'tMsgIndex'
    })

    // $urlRouterProvider.when('', '/index');


    // 处理在状态配置中指定的路由之外的 url 请求
    var isShow = localStorage.getItem('PHONEAPP_START');

    if (isShow) {
        $urlRouterProvider.otherwise('/index');
    } else {
        $urlRouterProvider.otherwise('/start.htm');
    }

});