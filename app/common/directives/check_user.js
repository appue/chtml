angular.module('phoneApp')

// 检查用户是否登录
.directive('checkUser', function (
    $state,
    $rootScope,
    cachePool,
    widget
) {
    return {
        controller: function () {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
                var uid = 0,
                    UserInfo = cachePool.pull('UserInfo') || '';

                if (UserInfo) {
                    uid = UserInfo.UserId;
                }
                console.log(uid);

                if (toState.resolve && toState.resolve.isCheck() && !uid) {
                    console.log(1231231);

                    // $state.go("/entry/login.htm");
                    window.location.href = "/#/entry/login.htm"
                    return;
                }
            });
        }
    };
});