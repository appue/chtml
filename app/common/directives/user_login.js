angular.module('phoneApp')

.directive('userLogin', function (
    $state,
    $ionicViewSwitcher,
    $window,
    cachePool,
    widget,
    ENV
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/user_login.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {

            $scope.tInput = {}; //初始化ng-model

            $scope.closeLogin = function () {
                $element.removeClass("this_show");
            }

            //去登录
            $scope.toLogin = function () {
                if (!$scope.tInput.phone) {
                    widget.msgToast('请输入手机号');
                    return;
                }

                if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($scope.tInput.phone)) {
                    widget.msgToast('手机号格式不合法');
                    return;
                }

                if (!$scope.tInput.password) {
                    widget.msgToast('请输入密码');
                    return;
                }

                if ($scope.tInput.password.length <= 5) {
                    widget.msgToast('新密码必须大于或等于6位');
                    return;
                }


                $scope.closeLogin();

                $timeout(function (){

                }, 300);

                widget.ajaxRequest({
                    url: 'getLogin',
                    data: {
                        Phone: $scope.tInput.phone,
                        Password: $scope.tInput.Password
                    },
                    success: function (data) {

                        if (data.Response && data.Response.State) {
                            // $scope.Deploy.isLogin = true;
                        } else {
                            // $scope.Deploy.isLogin = false;
                        }

                    },
                    error: function (data) {
                    }
                });
                
            };
        }
    };
});