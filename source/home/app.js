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
    'DelegateEvents',
    'ng-slide'
])
.run(function() {
    FastClick.attach(document.body);
})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('index', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/index',
        templateUrl: 'templates/index.html',
        controller: 'HomeIndexCtrl'
    })

    .state('msg', {
        url: '/msg',
        templateUrl: 'templates/msg.html',
        controller: 'HomeMsgCtrl'
    })

    /*------------------------------------
    * 跟某一用户聊天
    * @params:
    *     uid: 用户ID
    */
    .state('msgChat', {
        url: '/msg/chat-{uid}.htm',
        templateUrl: 'templates/msg-chat.html',
        controller: 'HomeMsgChatCtrl'
    })

    /*------------------------------------
    * 通知
    * @params:
    */
    .state('msgNotice', {
        url: '/msg/notice.htm',
        templateUrl: 'templates/msg-notice.html',
        controller: 'HomeMsgNoticeCtrl'
    })

    .state('msgPraise', {
        url: '/msg/praise',
        templateUrl: 'templates/msg-praise.html',
        controller: 'HomeMsgPraiseCtrl'
    })

    .state('msgSearch', {
        url: '/msg/search',
        templateUrl: 'templates/msg-search.html',
        controller: 'HomeMsgSearchCtrl'
    })


    /*------------------------------------
    * 私聊
    * @params:
    */
    .state('msgWhisper', {
        url: '/msg/whisper.htm',
        templateUrl: 'templates/msg-whisper.html',
        controller: 'HomeMsgWhisperCtrl'
    })

    .state('setFeedback', {
        url: '/set/feedback',
        templateUrl: 'templates/set-feedback.html',
        controller: 'HomeSetFeedbackCtrl'
    })

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/index');
});
