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



    // $urlRouterProvider.when('', '/index.htm');
    $urlRouterProvider.otherwise('/mange/login.htm');

});
