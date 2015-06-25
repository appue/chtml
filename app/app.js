angular.module('phoneApp', [
    'ionic',
    'pasvaz.bindonce'
])
.config(function ($stateProvider, $urlRouterProvider) {
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
        url: '/msg.htm',
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
     * 消息中心-通知
     */
    .state('msgNotice', {
        url: '/msg/notice.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-notice.html',
        controller: 'tMsgNotice'
    })

    /*------------------------------------
     * 消息中心-评论
     */
    .state('msgComment', {
        url: '/msg/comment.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-comment.html',
        controller: 'tMsgComment'
    })

    /*------------------------------------
     * 消息中心-赞
     */
    .state('msgPraise', {
        url: '/msg/praise.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'templates/msg-praise.html',
        controller: 'tMsgPraise'
    })

    /*------------------------------------
     * 消息中心-邀请好友
     */
    .state('msgSearch', {
        url: '/msg/search.htm',
        templateUrl: 'templates/msg-search.html',
        controller: 'tMsgSearch'
    })

    /*------------------------------------
     * 消息中心-私聊
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