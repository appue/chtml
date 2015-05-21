userEntry.controller('registerCreateCtrl', function ($scope, $cacheFactory, routerRedirect, widget) {

    var personalData = $cacheFactory.get('personalData');

    if (personalData) {
        $scope.inputVal = personalData.info();
    } else {
        $scope.inputVal = {
            gender: 1,
            post: '园长',
            tmpPost: '园长'
        };
    }

    $scope.goNextStep = function () { //检查手机号码

        if (!$scope.inputVal.nickname) {
            widget.msgToast('请输入昵称');
            return;
        }

        if (personalData) {
            personalData.destroy();
        }

        $cacheFactory('personalData', $scope.inputVal); //缓存数据

        routerRedirect.toJump({
            'module': 'entry',
            'hash': 'registerAccount',
            'url': '/register/account'
        });
    };

    $scope.popupConfirm = function () {
        console.log($scope.inputVal);
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