angular.module('phoneApp', [
        'ionic',
        'DelegateEvents'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        /*========root========*/
        .state('forum', {
            abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
            url: '/forum'
        })


        /*==========首页==========*/
        //首页
        .state('forum.index', {
            // cache: false,
            url: '/index.htm',
            templateUrl: 'home/tp/index.html',
            controller: 'tDefault'
        })
        //开始页
        .state('forum.start', {
            // cache: false,
            url: '/start.htm',
            templateUrl: 'home/tp/start.html',
            controller: 'tStart'
        })


        /*========注册登录========*/
        //入口页
        .state('forum.entry', {
            url: '/entry.htm',
            templateUrl: 'entry/tp/entry.html',
            controller: 'entryCtrl'
        })
        //登录页
        .state('forum.login', {
            url: '/login.htm',
            templateUrl: 'entry/tp/login.html',
            controller: 'loginCtrl'
        })
        //登录-忘记密码页
        .state('forum.loginForget', {
            url: '/login/forget.htm',
            templateUrl: 'entry/tp/login_forget_password.html',
            controller: 'loginForgetCtrl'
        })
        //登录-重置密码页
        .state('forum.loginReset', {
            url: '/login/reset/:phone', //@params:phone
            templateUrl: 'entry/tp/login_reset_password.html',
            controller: 'loginResetCtrl'
        })
        //注册-创建资料页
        .state('forum.registerCreate', {
            url: '/register/create.htm',
            templateUrl: 'entry/tp/register_create_data.html',
            controller: 'registerCreateCtrl'
        })
        //注册-设置账号密码页
        .state('forum.registerAccount', {
            url: '/register/account.htm',
            templateUrl: 'entry/tp/register_set_account.html',
            controller: 'registerAccountCtrl'
        })
        //注册-验证码页
        .state('forum.registerVcode', {
            url: '/register/vcode/:phone', //@params:phone
            templateUrl: 'entry/tp/register_vcode.html',
            controller: 'registerVcodeCtrl'
        })
        //注册-完成页
        .state('forum.registerDone', {
            url: '/register/done.htm',
            templateUrl: 'entry/tp/register_done.html',
            controller: 'registerDoneCtrl'
        })
        //注册-关注感兴趣栏目页
        .state('forum.registerColumn', {
            url: '/register/column.htm',
            templateUrl: 'entry/tp/register_take_column.html',
            controller: 'registerColumnCtrl'
        })
        //注册-关注感兴趣的人页
        .state('forum.registerPeople', {
            url: '/register/people.htm',
            templateUrl: 'entry/tp/register_focus_people.html',
            controller: 'registerFocusCtrl'
        })

        /*==========发现==========*/
        //发现首页
        .state('forum.find', {
            // cache: false,
            url: '/find.htm',
            templateUrl: 'forum/tp/find.html',
            controller: 'tFindIndex'
        })
        //发现-猜你喜欢
        .state('forum.like', {
            // cache: false,
            url: '/like.htm',
            templateUrl: 'forum/tp/like.html',
            controller: 'tFindLike'
        })

        /*==========发帖==========*/
        //编辑图片
        .state('forum.photo-edit', {
            // cache: false,
            url: '/photo/edit.htm',
            templateUrl: 'forum/tp/photo.html',
            controller: 'tPhotoEdit'
        })
        //编辑内容
        .state('forum.photo-title', {
            // cache: false,
            url: '/photo/title.htm',
            templateUrl: 'forum/tp/photo_title.html',
            controller: 'tPhotoTitle'
        })
        //选择栏目
        .state('forum.photo-cate', {
            // cache: false,
            url: '/photo/cate-{id}.htm',
            templateUrl: 'forum/tp/photo_cate.html',
            controller: 'tPhotoCate'
        })

        /*==========圈子==========*/
        //热门圈子
        .state('forum.club-hot', {
            // cache: false,
            url: '/club/hot.htm',
            templateUrl: 'forum/tp/club_hot.html',
            controller: 'tClubHot'
        })
        //全部圈子
        .state('forum.club-list', {
            // cache: false,
            url: '/club/list.htm',
            templateUrl: 'forum/tp/club_list.html',
            controller: 'tClubList'
        })
        //圈子详情页
        .state('forum.club-detail', {
            // cache: false,
            url: '/club/detail-{id}.htm',
            templateUrl: 'forum/tp/club_detail.html',
            controller: 'tClubDetail'
        })
        //圈子成员排行
        .state('forum.club-ranking', {
            // cache: false,
            url: '/club/ranking-{id}.htm',
            templateUrl: 'forum/tp/club_ranking.html',
            controller: 'tClubRanking'
        })

        /*==========活动==========*/
        //活动列表
        .state('forum.activity-list', {
            // cache: false,
            url: '/activity/list.htm',
            templateUrl: 'forum/tp/activity_list.html',
            controller: 'tActivityList'
        })
        //活动详情
        .state('forum.activity-detail', {
            // cache: false,
            url: '/activity/detail-{type}-{id}.htm',
            templateUrl: 'forum/tp/activity_detail.html',
            controller: 'tActivityDetail'
        })
        
        /*==========专题==========*/
        //专题列表
        .state('forum.subject-list', {
            // cache: false,
            url: '/subject/list.htm',
            templateUrl: 'forum/tp/subject_list.html',
            controller: 'tSubjectList'
        })
        //专题内容
        .state('forum.subject-detail', {
            // cache: false,
            url: '/subject/detail-{id}.htm',
            templateUrl: 'forum/tp/subject_detail.html',
            controller: 'tSubjectDetail'
        })

        /*==========栏目==========*/
        //栏目列表
        .state('forum.cate', {
            // cache: false,
            url: '/cate/list-{id}.htm',
            templateUrl: 'forum/tp/cate_list.html',
            controller: 'tCateList'
        })
        //帖子内容 id: 帖子ID
        .state('forum.detail', {
            // cache: false,
            url: '/thread-{id}.htm',
            templateUrl: 'forum/tp/article_detail.html',
            controller: 'tArticleDetail'
        })

        /*==========点评==========*/
        //点评列表
        .state('forum.comment-list', {
            // cache: false,
            url: '/comment/list-{id}.htm',
            templateUrl: 'forum/tp/comment_list.html',
            controller: 'tCommentList'
        })

        /*==========搜索==========*/
        //搜索首页
        .state('forum.search', {
            // cache: false,
            url: '/search/index',
            templateUrl: 'forum/tp/search.html',
            controller: 'tSearchIndex'
        })
        //搜索结果
        .state('forum.search-result', {
            // cache: false,
            url: '/search/result?keyword',
            templateUrl: 'forum/tp/search-result.html',
            controller: 'tSearchResult'
        })

        /*==========聊天==========*/
        //跟某一用户聊天
        .state('forum.chat', {
            // cache: false,
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
            // cache: false,
            url: '/msg/index.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'msg/tp/index.html',
            controller: 'tMsgIndex'
        })
        //消息中心-通知
        .state('forum.msg-notice', {
            // cache: false,
            url: '/msg/notice.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'msg/tp/notice.html',
            controller: 'tMsgNotice'
        })
        //消息中心-评论
        .state('forum.msg-comment', {
            // cache: false,
            url: '/msg/comment.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'msg/tp/comment.html',
            controller: 'tMsgComment'
        })
        //消息中心-赞
        .state('forum.msg-praise', {
            // cache: false,
            url: '/msg/praise.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'msg/tp/praise.html',
            controller: 'tMsgPraise'
        })
        //消息中心-邀请好友
        .state('forum.msg-search', {
            // cache: false,
            url: '/msg/search.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'msg/tp/search.html',
            controller: 'tMsgSearch'
        })
        //消息中心-私聊
        .state('forum.msg-talk', {
            // cache: false,
            url: '/msg/talk.htm',
            resolve: {
                isCheck: function () {
                    return true;
                }
            },
            templateUrl: 'msg/tp/talk.html',
            controller: 'tMsgTalk'
        })

        /*==========会员中心==========*/
        //个人主页（主、客人态）
        .state('forum.user-index', {
            // cache: false,
            url: '/user/index.htm?id',
            templateUrl: 'user/tp/index.html',
            controller: 'tUserIndex'
        })
        //关于我们
        .state('forum.user-about', {
            url: '/user/about.htm',
            templateUrl: 'user/tp/about.html',
            controller: 'tUserAbout'
        })
        //意见反馈
        .state('forum.user-feedback', {
            url: '/user/feedback.htm',
            templateUrl: 'user/tp/feedback.html',
            controller: 'tUserFeedback'
        })
        //等级说明
        .state('forum.user-level', {
            url: '/user/level.htm',
            templateUrl: 'user/tp/level.html',
            controller: 'tUserLevel'
        })
        //设置
        .state('forum.user-set', {
            url: '/user/set.htm',
            templateUrl: 'user/tp/set.html',
            controller: 'tUserSet'
        })



        //个人主页-查看所有
        .state('forum.user-all', {
            url: '/user/{id}-all.htm',
            templateUrl: 'user/tp/personal_all.html',
            controller: 'tUserAll'
        })
        //个人主页-发布
        .state('forum.userIssue', {
            url: '/user/{id}-issue.htm',
            templateUrl: 'user/tp/personal_issue.html',
            controller: 'tUserIssue'
        })
        //个人主页-粉丝页
        .state('forum.userFans', {
            url: '/user/{id}-fans.htm',
            templateUrl: 'user/tp/personal_fans.html',
            controller: 'tUserFans'
        })
        //个人主页-关注页
        .state('forum.userAttention', {
            url: '/user/{id}-attention.htm',
            templateUrl: 'user/tp/personal_attention.html',
            controller: 'tUserAttention'
        })
        //个人主页-圈子
        .state('forum.userCircle', {
            url: '/user/{id}-circle.htm',
            templateUrl: 'user/tp/personal_circle.html',
            controller: 'userCircleCtrl'
        })
        //个人主页-用户等级
        .state('forum.userLevel', {
            url: '/user/{id}-level.htm',
            templateUrl: 'user/tp/personal_level.html',
            controller: 'userLevelCtrl'
        })
        //他人主页-查看资料
        .state('forum.userData', {
            url: '/user/{id}-data.htm',
            templateUrl: 'user/tp/personal_data.html',
            controller: 'userDataCtrl'
        })
        //个人主页-设置
        .state('forum.userSet', {
            url: '/user/{id}-set.htm',
            templateUrl: 'user/tp/personal_set.html',
            controller: 'userSetCtrl'
        })
        //个人主页-设置-修改密码
        .state('forum.userSetPassword', {
            url: '/user/{id}-set-password.htm',
            templateUrl: 'user/tp/personal_set_password.html',
            controller: 'userSetPasswordCtrl'
        })
        //个人主页-设置-账号绑定
        .state('forum.userSetBind', {
            url: '/user/{id}-set-bind.htm',
            templateUrl: 'user/tp/personal_set_bind.html',
            controller: 'userSetBindCtrl'
        })
        //个人主页-设置-关于我们
        .state('forum.userSetAboutus', {
            url: '/user/{id}-set-aboutus.htm',
            templateUrl: 'user/tp/personal_set_aboutus.html',
            controller: 'userSetAboutusCtrl'
        });

        // $urlRouterProvider.when('', '/index');

        // 处理在状态配置中指定的路由之外的 url 请求
        var isShow = localStorage.getItem('PHONEAPP_START');

        if (isShow) {
            $urlRouterProvider.otherwise('/forum/start.htm');
        } else {
            $urlRouterProvider.otherwise('/forum/start.htm');
        }

    });