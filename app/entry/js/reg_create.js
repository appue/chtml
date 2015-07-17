angular.module('phoneApp')

.controller('tRegCreate', function (
    $scope,
    $state,
    $ionicPopup,
    $ionicViewSwitcher,
    widget
) {

    $scope.DataList = {};
    
    $scope.cInput = {
        nickname: '', //--用户昵称
        sex: 1, //--------性别：1.男；2.女
        city: 0, //-------位置ID
        job: 0, //--------岗位：1.园长; 2.保教主任; 3.教师; 4.其他

        locateName: "请选择位置",
        jobName: "请选择岗位",
    };

    $scope.$watch('cInput.job', function () {
        switch ($scope.cInput.jpb) {
            case 1: 
                $scope.cInput.jobName = "园长";
            break;
            case 2: 
                $scope.cInput.jobName = "保教主任";
            break;
            case 3: 
                $scope.cInput.jobName = "教师";
            break;
            case 4: 
                $scope.cInput.jobName = "其他";
            break;
        }
    });

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

        if (!$scope.cInput.nickname) {
            widget.msgToast('请输入昵称！');
            return;
        }

        // widget.cacheData('personalData', $scope.inputVal);

        if (!$scope.cInput.city) {
            widget.msgToast('请选择位置！');
            return;
        }

        if (!$scope.cInput.job) {
            widget.msgToast('请选择岗位！');
            return;
        }

        $ionicViewSwitcher.nextDirection("forward");
        $state.go('forum.reg-account');

    };

});