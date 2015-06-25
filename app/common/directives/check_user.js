angular.module('phoneApp')

/*
* 检查用户是否登录
*/
.directive('checkUser', function (
    $rootScope,
    cachePool,
    widget,
    routerRedirect
) {
    return {
        controller: function () {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){

                var currentUrl = widget.getCurrentUrl();

                var uid = 0,
                    UserInfo = cachePool.pull('UserInfo') || '';

                if (UserInfo) {
                    uid = UserInfo.UserId;
                }

                if (toState.resolve && toState.resolve.isCheck() && !uid) {
                    routerRedirect.toJump({
                        url: ['entry/#/login.htm?from='+ currentUrl]
                    });
                    return;
                }
            });
        }
    };
});