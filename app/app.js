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