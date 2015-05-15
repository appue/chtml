// var phoneApp = angular.module('phoneApp', ['ngRoute']);

// phoneApp.config(['$routeProvider', function ($routeProvider) {
//     $routeProvider
//     .when('/', {
//         templateUrl : 'templates/index.html'
//         // controller  : 'mainController'
//     });
// }]);





angular.module('phoneApp', ['ui.router', 'DelegateEvents'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        // abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/index',
        templateUrl: 'templates/index.html',
        controller: 'HomeIndexCtrl'
    })
    .state('msg', {
        url: '/msg/:id',
        templateUrl: 'templates/msg.html',
        controller: 'HomeMsgCtrl'
    })
    .state('msgChat', {
        url: '/msg/chat',
        templateUrl: 'templates/msg-chat.html',
        controller: 'HomeMsgChatCtrl'
    })
    .state('msgNotice', {
        url: '/msg/notice',
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
    .state('msgWhisper', {
        url: '/msg/whisper',
        templateUrl: 'templates/msg-whisper.html',
        controller: 'HomeMsgWhisperCtrl'
    })
    .state('setFeedback', {
        url: '/msg/feedback',
        templateUrl: 'templates/set-feedback.html',
        controller: 'HomeSetFeedbackCtrl'
    })

    // $urlRouterProvider.when('', '/index');
    $urlRouterProvider.otherwise('/index');
});
