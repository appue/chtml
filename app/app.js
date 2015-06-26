angular.module('phoneApp', [
    'ionic'
])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    //开始页面
    // .state('start', {
    //     url: '/start.htm',
    //     templateUrl: 'home/tp/start.html',
    //     controller: 'tStart'
    // })
    .state('home', {
        abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/home',
        templateUrl: 'home/tp/main.html'
    })
    //首页
    .state('home.index', {
        url: '/index.htm',
        templateUrl: 'home/tp/index.html',
        controller: 'tHome'
    })


    //消息中心
    .state('msg', {
        abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/msg',
        templateUrl: 'home/tp/main.html'
    })
    //消息中心首页
    .state('msg.index', {
        url: '/index.htm',
        templateUrl: 'home/tp/msg.html',
        controller: 'tMsgIndex'
    })
    //跟某一用户聊天
    .state('msg.chat', {
        url: '/chat-{uid}.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'home/tp/msg-chat.html',
        controller: 'tMsgChat'
    })
    //消息中心-通知
    .state('msg.notice', {
        url: '/notice.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'home/tp/msg-notice.html',
        controller: 'tMsgNotice'
    })
    //消息中心-评论
    .state('msg.comment', {
        url: '/comment.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'home/tp/msg-comment.html',
        controller: 'tMsgComment'
    })
    //消息中心-赞
    .state('msg.praise', {
        url: '/praise.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'home/tp/msg-praise.html',
        controller: 'tMsgPraise'
    })
    //消息中心-邀请好友
    .state('msg.search', {
        url: '/search.htm',
        templateUrl: 'home/tp/msg-search.html',
        controller: 'tMsgSearch'
    })
    //消息中心-私聊
    .state('msg.whisper', {
        url: '/whisper.htm',
        resolve: { isCheck: function () {
            return true;
        }},
        templateUrl: 'home/tp/msg-whisper.html',
        controller: 'tMsgWhisper'
    })





    //发现首页
    .state('findIndex', {
        url: '/clump/find.htm',
        templateUrl: 'clump/tp/find.html',
        controller: 'tFindIndex'
    })
    //发现-猜你喜欢
    .state('findLike', {
        url: '/clump/like.htm',
        templateUrl: 'clump/tp/like.html',
        controller: 'tFindLike'
    })
    //全部圈子
    .state('clubList', {
        url: '/club/list.htm',
        templateUrl: 'clump/tp/club_list.html',
        controller: 'tClubList'
    })
    //热门圈子
    .state('clubHot', {
        url: '/club/hot.htm',
        templateUrl: 'clump/tp/club_hot.html',
        controller: 'tClubHot'
    })
    //圈子详情页
    .state('clubDetail', {
        url: '/club/detail-{id}.htm',
        templateUrl: 'clump/tp/club_detail.html',
        controller: 'tClubDetail'
    })
    //圈子成员排行
    .state('clubRanking', {
        url: '/club/ranking-{id}.htm',
        templateUrl: 'clump/tp/club_ranking.html',
        controller: 'tClubRanking'
    })
    //活动列表
    .state('activityList', {
        url: '/activity/list.htm',
        templateUrl: 'clump/tp/activity_list.html',
        controller: 'tActivityList'
    })
    //活动详情
    .state('activityDetail', {
        url: '/activity/detail-{type}-{id}.htm',
        templateUrl: 'templates/activity_detail.html',
        controller: 'tActivityDetail'
    })
    //专题列表
    .state('subjectList', {
        url: '/subject/list.htm',
        templateUrl: 'clump/tp/subject_list.html',
        controller: 'tSubjectList'
    })
    //专题内容
    .state('subjectDetail', {
        url: '/subject/detail-{id}.htm',
        templateUrl: 'clump/tp/subject_detail.html',
        controller: 'tSubjectDetail'
    })
    /*------------------------------------
    * 点评列表
    * @params:
    *     id: 帖子ID
    */
    .state('list', {
        url: '/comment/list/{id}.htm',
        templateUrl: 'clump/tp/comment_list.html',
        controller: 'tCommentList'
    });

















    

    // $urlRouterProvider.when('', '/index');


    // 处理在状态配置中指定的路由之外的 url 请求
    var isShow = localStorage.getItem('PHONEAPP_START');

    if (isShow) {
        $urlRouterProvider.otherwise('/home/index.htm');
    } else {
        $urlRouterProvider.otherwise('/home/index.htm');
    }

});