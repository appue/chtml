// var phoneApp = angular.module('phoneApp', ['ngRoute']);

// phoneApp.config(['$routeProvider', function ($routeProvider) {
//     $routeProvider
//     .when('/', {
//         templateUrl : 'templates/index.html'
//         // controller  : 'mainController'
//     });
// }]);

angular.module('phoneApp', [
    'ui.router',
    'ui.router.router',
    'DelegateEvents'
]).run(function () {
    FastClick.attach(document.body);
}).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('start', {
        url: '/start.htm',
        templateUrl: 'templates/start.html',
        controller: 'tHomeStart'
    })

    /*------------------------------------
     * 入口页面
     */
    .state('entry', {
        url: '/entry.htm',
        templateUrl: 'templates/entry.html',
        controller: 'entryCtrl'
    })

    .state('index', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/index',
        templateUrl: 'templates/index.html',
        controller: 'HomeIndexCtrl'
    })

    .state('msg', {
        url: '/msg',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg.html',
        controller: 'tMsg'
    })

    /*------------------------------------
     * 跟某一用户聊天
     * @params:
     *     uid: 用户ID
     */
    .state('msgChat', {
        url: '/msg/chat-{uid}.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-chat.html',
        controller: 'tMsgChat'
    })

    /*------------------------------------
     * 通知
     * @params:
     */
    .state('msgNotice', {
        url: '/msg/notice.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-notice.html',
        controller: 'tMsgNotice'
    })

    .state('msgPraise', {
        url: '/msg/praise',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-praise.html',
        controller: 'tMsgPraise'
    })

    .state('msgSearch', {
        url: '/msg/search',
        templateUrl: 'templates/msg-search.html',
        controller: 'tMsgSearch'
    })

    /*------------------------------------
     * 私聊
     * @params:
     */
    .state('msgWhisper', {
        url: '/msg/whisper.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-whisper.html',
        controller: 'tMsgWhisper'
    })

    .state('setFeedback', {
        url: '/set/feedback',
        templateUrl: 'templates/set-feedback.html',
        controller: 'tSetFeedback'
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