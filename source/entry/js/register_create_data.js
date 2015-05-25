userEntry.controller('registerCreateCtrl', function ($scope, $cacheFactory, routerRedirect, widget) {

    $scope.backParam = { //--设置返回按钮
        'url': [
            'entry/#/',
            'entry/index.html#/'
        ]
    };

    $scope.inputVal = widget.cacheData('personalData') || { //数据初始化
        gender: 1,
        post: '园长',
        tmpPost: '园长',
        cityId: '1',
        cityName: '上海',
        villageId: '11',
        villageName: '长宁区',
        tmpCityId: '1',
        tmpCityName: '上海',
        tmpVillageId: '11',
        tmpVillageName: '长宁区'
    };

    $scope.goNextStep = function () { //检查手机号码

        if (!$scope.inputVal.nickname) {
            widget.msgToast('请输入昵称');
            return;
        }

        widget.cacheData('personalData', $scope.inputVal);

        routerRedirect.toJump({
            'url': [
                'entry/#/register/account.htm',
                'entry/index.html#/register/account.htm'
            ]
        });

    };

    $scope.itemClick = function (e) { //所在地选择
        var $that = angular.element(e.delegationTarget),
            name = $that.text(),
            cityId = $that.attr('data-cityId'),
            villageId = $that.attr('data-villageId');

        $that.parent('ul').find('li').removeClass('current');

        $that.addClass('current');

        if (cityId) {
            $scope.inputVal.tmpCityId = cityId;
            $scope.inputVal.tmpCityName = name;
        }

        if (villageId) {
            $scope.inputVal.tmpVillageId = cityId;
            $scope.inputVal.tmpVillageName = name;
        }

    };

});