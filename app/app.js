angular.module('Tjoys', [
    'ui.router',
    'ui.router.router',
    'DelegateEvents'
])
.run( function (
    $rootScope,
    $state,
    cachePool
) {
    $rootScope.Thumb = "themes/img/thumb.jpg";

    // 获取本地用户信息
    $rootScope.UserInfo = (function () {
        var UserInfo = cachePool.pull('UserInfo');

        if (!UserInfo) {
            UserInfo = { UserId: 0 };
        }

        return UserInfo;
    })();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'mange.login') {
			$rootScope.showHeader = false;
            //if ($rootScope.UserInfo || $rootScope.UserInfo.Auth) {
            //    $state.go('mange.index');
            //}
            return;
        }         

        // 用户不存在
        if (!$rootScope.UserInfo || !$rootScope.UserInfo.Auth) {
			$rootScope.showHeader = false;
            event.preventDefault();
            $state.go('mange.login', {from: fromState.name, w: 'notLogin'});
        } else {
			$rootScope.showHeader = true;
		}
    });
})
.config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('mange', {
        abstract: true, // 为子状态提供一个 base url，其下所有子状态的 url 都是相对父状态的
        url: '/mange',
        templateUrl: 'code/tp/main.html',
    })

    // 后台登录
    .state('mange.login', {
        // cache: false,
        url: '/login.htm',
        templateUrl: 'code/tp/login.html',
        controller: 'tLogin'
    })
    // 修改密码
    .state('mange.password', {
        url: '/password.htm',
        templateUrl: 'code/tp/password.html',
        controller: 'tPassword'
    })

    // 后台首页
    .state('mange.index', {
        // cache: false,
        url: '/index.htm',
        templateUrl: 'code/tp/index.html',
        controller: 'tIndex'
    })

    // 标签管理
    .state('mange.cate', {
        // cache: false,
        url: '/cate.htm',
        templateUrl: 'code/tp/cate.html',
        controller: 'tCate'
    })



    /**
     * 帖子列表
     * type: yes(推荐过的图片)、no(未推荐过的图片)、home(首页推荐的图片)、不存在是显示所有推荐、未推荐的图片
     * cateid: 栏目ID
     */
    .state('mange.list', {
        url: '/list.htm?type&cateid&page',
        templateUrl: 'code/tp/list.html',
        controller: 'tList'
    })
    .state('mange.list-detail', {
        url: '/list/detail/{id}.htm?type',
        templateUrl: 'code/tp/list_detail.html',
        controller: 'tListDetail'
    })

    // 专题管理
    .state('mange.subject', {
        url: '/subject.htm',
        templateUrl: 'code/tp/subject.html',
        controller: 'tSubject'
    })
    // 专题内容
    .state('mange.subject-content', {
        url: '/subject/content-{id}.htm',
        templateUrl: 'code/tp/subject_content.html',
        controller: 'tSubjectContent'
    })
    // 添加专题
    .state('mange.subject-add', {
        url: '/subject/add.htm',
        templateUrl: 'code/tp/subject_add.html',
        controller: 'tSubjectAdd'
    })

    // 活动管理
    .state('mange.activity', {
        url: '/activity.htm',
        templateUrl: 'code/tp/activity.html',
        controller: 'tActivity'
    })
    // 添加活动
    .state('mange.activity-add', {
        url: '/activity/add.htm',
        templateUrl: 'code/tp/activity_add.html',
        controller: 'tActivityAdd'
    })

    // 评论管理
    .state('mange.comment', {
        url: '/comment.htm',
        templateUrl: 'code/tp/comment.html',
        controller: 'tComment'
    })

    // 圈子管理
    .state('mange.club', {
        url: '/club.htm',
        templateUrl: 'code/tp/club.html',
        controller: 'tClub'
    })
    // 添加圈子
    .state('mange.club-add', {
        url: '/club/add.htm',
        templateUrl: 'code/tp/club_add.html',
        controller: 'tClubAdd'
    })
    // 圈子帖子管理
    .state('mange.club-thread', {
        url: '/club/thread-{id}.htm',
        templateUrl: 'code/tp/club_thread.html',
        controller: 'tClubThread'
    })

    // 用户管理
    .state('mange.user', {
        url: '/user.htm',
        templateUrl: 'code/tp/user.html',
        controller: 'tUser'
    })
    // 用户管理
    .state('mange.role', {
        url: '/role.htm',
        templateUrl: 'code/tp/role.html',
        controller: 'tRole'
    })
    // 用户管理
    .state('mange.role-add', {
        url: '/role/add.htm',
        templateUrl: 'code/tp/role_add.html',
        controller: 'tRoleAdd'
    })

    // $urlRouterProvider.when('', '/index.htm');
    $urlRouterProvider.otherwise('/mange/login.htm');

});
