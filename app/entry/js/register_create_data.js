angular.module('phoneApp')
.controller('registerCreateCtrl', function ($scope, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': ['home/#/entry.htm']
    };

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

        routerRedirect.toJump({
            'url': ['entry/#/register/account.htm']
        });

    };

    $scope.chooseJob = function (e) { //岗位选择
        var $that = angular.element(e.delegationTarget);

        if ($that.length > 0) { //选择
            $scope.tmpJob = $that.find('label').text();
        } else { //确定
            $scope.inputVal.job = $scope.tmpJob;
        }

    };

});