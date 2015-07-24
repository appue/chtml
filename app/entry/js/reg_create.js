angular.module('phoneApp')

.controller('tRegCreate', function (
    $scope,
    $state,
    $ionicPopup,
    $ionicViewSwitcher,
    widget
) {

    $scope.DataList = {};
    
    $scope.cInput = widget.cacheData('regUserData') || {
        UserName: '', //--用户昵称
        Sex: 1, //--------性别：1.男；2.女
        City: 0, //-------位置ID
        Job: 0, //--------岗位：1.园长; 2.保教主任; 3.教师; 4.其他

        CityName: "请选择位置",
        JobName: "请选择岗位"
    };

    // $scope.inputVal = widget.cacheData('regUserData') || { //数据初始化
    //     sex: 1,
    //     job: '园长',
    //     city: {
    //         Id: 2,
    //         Name: '北京'
    //     },
    //     village: {
    //         Id: 23,
    //         Name: '朝阳区'
    //     }
    // };

    $scope.goNextStep = function () { //下一步按钮

        if (!$scope.cInput.UserName) {
            widget.msgToast('请输入昵称！');
            return;
        }

        if (!$scope.cInput.City) {
            widget.msgToast('请选择位置！');
            return;
        }

        if (!$scope.cInput.Job) {
            widget.msgToast('请选择岗位！');
            return;
        }

        widget.cacheData('regUserData', $scope.cInput);

        $ionicViewSwitcher.nextDirection("forward");
        $state.go('forum.reg-account');

    };

});