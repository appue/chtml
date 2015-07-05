angular.module('phoneApp', [
        'ionic',
        'DelegateEvents'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        /*------------------------首页模块------------------------*/
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


        /*------------------------登录注册模块------------------------*/
        .state('entry', {
            abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
            url: '/entry',
            templateUrl: 'entry/tp/main.html'
        })
        //入口页
        .state('entry.entry', {
            url: '/entry.htm',
            templateUrl: 'entry/tp/entry.html',
            controller: 'entryCtrl'
        })
        //登录页
        .state('entry.login', {
            url: '/login.htm',
            templateUrl: 'entry/tp/login.html',
            controller: 'loginCtrl'
        })
        //登录-忘记密码页
        .state('entry.loginForget', {
            url: '/login/forget.htm',
            templateUrl: 'entry/tp/login_forget_password.html',
            controller: 'loginForgetCtrl'
        })
        //登录-重置密码页
        .state('entry.loginReset', {
            url: '/login/reset/:phone', //@params:phone
            templateUrl: 'entry/tp/login_reset_password.html',
            controller: 'loginResetCtrl'
        })
        //注册-创建资料页
        .state('entry.registerCreate', {
            url: '/register/create.htm',
            templateUrl: 'entry/tp/register_create_data.html',
            controller: 'registerCreateCtrl'
        })
        //注册-设置账号密码页
        .state('entry.registerAccount', {
            url: '/register/account.htm',
            templateUrl: 'entry/tp/register_set_account.html',
            controller: 'registerAccountCtrl'
        })
        //注册-验证码页
        .state('entry.registerVcode', {
            url: '/register/vcode/:phone', //@params:phone
            templateUrl: 'entry/tp/register_vcode.html',
            controller: 'registerVcodeCtrl'
        })
        //注册-完成页
        .state('entry.registerDone', {
            url: '/register/done.htm',
            templateUrl: 'entry/tp/register_done.html',
            controller: 'registerDoneCtrl'
        })
        //注册-关注感兴趣栏目页
        .state('entry.registerColumn', {
            url: '/register/column.htm',
            templateUrl: 'entry/tp/register_take_column.html',
            controller: 'registerColumnCtrl'
        })
        //注册-关注感兴趣的人页
        .state('entry.registerPeople', {
            url: '/register/people.htm',
            templateUrl: 'entry/tp/register_focus_people.html',
            controller: 'registerFocusCtrl'
        })



        /*------------------------发现模块------------------------*/
        .state('forum', {
            abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
            url: '/forum',
            templateUrl: 'forum/tp/main.html'
        })
        //发现首页
        .state('forum.find', {
            url: '/find.htm',
            templateUrl: 'forum/tp/find.html',
            controller: 'tFindIndex'
        })
        //发现-猜你喜欢
        .state('forum.like', {
            url: '/like.htm',
            templateUrl: 'forum/tp/like.html',
            controller: 'tFindLike'
        })

        /*==========圈子==========*/
        //热门圈子
        .state('forum.club-hot', {
            url: '/club/hot.htm',
            templateUrl: 'forum/tp/club_hot.html',
            controller: 'tClubHot'
        })
        //全部圈子
        .state('forum.club-list', {
            url: '/club/list.htm',
            templateUrl: 'forum/tp/club_list.html',
            controller: 'tClubList'
        })
        //圈子详情页
        .state('forum.club-detail', {
            url: '/club/detail-{id}.htm',
            templateUrl: 'forum/tp/club_detail.html',
            controller: 'tClubDetail'
        })
        //圈子成员排行
        .state('forum.club-ranking', {
            url: '/club/ranking-{id}.htm',
            templateUrl: 'forum/tp/club_ranking.html',
            controller: 'tClubRanking'
        })

        /*==========活动==========*/
        //活动列表
        .state('forum.activity-list', {
            url: '/activity/list.htm',
            templateUrl: 'forum/tp/activity_list.html',
            controller: 'tActivityList'
        })
        //活动详情
        .state('forum.activity-detail', {
            url: '/activity/detail-{type}-{id}.htm',
            templateUrl: 'forum/tp/activity_detail.html',
            controller: 'tActivityDetail'
        })
        
        /*==========专题==========*/
        //专题列表
        .state('forum.subject-list', {
            url: '/subject/list.htm',
            templateUrl: 'forum/tp/subject_list.html',
            controller: 'tSubjectList'
        })
        //专题内容
        .state('forum.subject-detail', {
            url: '/subject/detail-{id}.htm',
            templateUrl: 'forum/tp/subject_detail.html',
            controller: 'tSubjectDetail'
        })

        /*==========栏目==========*/
        //栏目列表
        .state('forum.cate', {
            url: '/cate/list-{id}.htm',
            templateUrl: 'forum/tp/cate_list.html',
            controller: 'tCateList'
        })
        //帖子内容 id: 帖子ID
        .state('forum.detail', {
            url: '/thread-{id}.htm',
            templateUrl: 'forum/tp/article_detail.html',
            controller: 'tArticleDetail'
        })

        /*==========点评==========*/
        //点评列表
        .state('forum.comment-list', {
            url: '/comment/list-{id}.htm',
            templateUrl: 'forum/tp/comment_list.html',
            controller: 'tCommentList'
        })

        /*==========搜索==========*/
        //搜索首页
        .state('forum.search', {
            url: '/search/index',
            templateUrl: 'forum/tp/search.html',
            controller: 'tSearchIndex'
        })
        //搜索结果
        .state('forum.search-result', {
            url: '/search/result',
            templateUrl: 'forum/tp/search-result.html',
            controller: 'tSearchResult'
        })


        /*==========聊天==========*/
        //跟某一用户聊天
        .state('forum.chat', {
            url: '/chat-{uid}.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'forum/tp/chat.html',
            controller: 'tMsgChat'
        })



        /*==========消息中心==========*/
        //消息中心首页
        .state('forum.msg-index', {
            url: '/msg/index.htm',
            templateUrl: 'forum/tp/message_index.html',
            controller: 'tMsgIndex'
        })
        //消息中心-通知
        .state('forum.msg-notice', {
            url: '/msg/notice.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'forum/tp/message_notice.html',
            controller: 'tMsgNotice'
        })
        //消息中心-评论
        .state('forum.msg-comment', {
            url: '/msg/comment.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'forum/tp/message_comment.html',
            controller: 'tMsgComment'
        })
        //消息中心-赞
        .state('forum.msg-praise', {
            url: '/msg/praise.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'forum/tp/message_praise.html',
            controller: 'tMsgPraise'
        })
        //消息中心-邀请好友
        .state('forum.msg-search', {
            url: '/msg/search.htm',
            templateUrl: 'forum/tp/message_search.html',
            controller: 'tMsgSearch'
        })
        //消息中心-私聊
        .state('forum.msg-whisper', {
            url: '/msg/whisper.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'forum/tp/message_whisper.html',
            controller: 'tMsgWhisper'
        })

        // $urlRouterProvider.when('', '/index');

        // 处理在状态配置中指定的路由之外的 url 请求
        var isShow = localStorage.getItem('PHONEAPP_START');

        if (isShow) {
            $urlRouterProvider.otherwise('/home/index.htm');
        } else {
            $urlRouterProvider.otherwise('/home/index.htm');
        }

    });