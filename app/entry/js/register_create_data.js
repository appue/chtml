angular.module('phoneApp')

.controller('registerCreateCtrl', function (
    $scope,
    $state,
    $ionicPopup,
    $ionicViewSwitcher,
    widget
) {

    $scope.inputVal = widget.cacheData('personalData') || { //数据初始化
        sex: 1,
        job: '园长',
        city: {
            Id: 2,
            Name: '北京'
        },
        village: {
            Id: 23,
            Name: '朝阳区'
        }
    };

    $scope.goNextStep = function () { //下一步按钮

        if (!$scope.inputVal.nickname) {
            widget.msgToast('请输入昵称');
            return;
        }

        widget.cacheData('personalData', $scope.inputVal);

        $ionicViewSwitcher.nextDirection("forward");
        $state.go('forum.registerAccount');

    };

});