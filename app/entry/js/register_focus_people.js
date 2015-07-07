angular.module('phoneApp')
    .controller('registerFocusCtrl', function ($scope, widget) {

        widget.ajaxRequest({
            url: 'getLogin',
            data: {
                Phone: $scope.inputVal.phone,
                Password: md5($scope.inputVal.password)
            },
            success: function (data) { //todo...
                cachePool.push('UserInfo', {
                    Auth: data.Auth,
                    UserId: data.UserId
                }, 2 / 24);
            }
        });

        $scope.popupConfirm = function (arg) {
            console.log(arg);
        };

        $scope.itemClick = function (e) {
            var $that = angular.element(e.delegationTarget);

            console.log($that);

            //todo...

            // 注：
            // e 原始的event对象，但是增加了delegationTarget => 代理target元素
            //
            // 对于selector这块，如果引用了jQuery的话，则支持的是jquery的选择器
            // 对于支持matchesSelector的浏览器来说，支持的就是标准的选择器；
            // 否则的话只能支持tagName...
        };

    });