angular.module('Tjoys')

.directive('cityList', function (
    $http,
    $state,
    $ionicViewSwitcher,
    $window,
    cachePool,
    widget,
    ENV
) {
    /*
    $scope.City = {
        tmpName:
        tmpMname:

        tmpCityId:
        tmpMid:
        tmpSid:
    }
     */
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/city_list.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {

            if (!$scope.City) {
                $scope.City = {};
            }

            if (!$scope.City.tmpName) {
                $scope.City.tmpName = "选择城市";
            }

            $http({
                method: 'GET',
                url: 'data/getCityList.json',
                timeout: 15000
            })
            .success(function (data) {
                $scope.CityList = data;
            });

            // 点击显示子城市
            $scope.toggleCity = function (e) {
                var $that = angular.element(e.delegationTarget);

                if ($that.parent('dl').hasClass('open')) {
                    $scope.City.tmpMid = 0;
                    return;
                }

                $scope.City.tmpMname = $that.attr('data-name');
                $scope.City.tmpMid   = $that.attr('data-mid');
            };

            // 点击选择城市
            $scope.selectCity = function (e) {
                var $that = angular.element(e.delegationTarget);

                $scope.City.tmpName = $scope.City.tmpMname +" "+ $that.attr('data-name');
                $scope.City.tmpSid = $that.attr('data-sid');
                $scope.City.tmpCityId = $scope.City.tmpSid;
            };

            // 取消城市选择
            $scope.cancleCity = function (e) {
                $scope.City.tmpMid = 0;
                $scope.City.tmpSid = 0;
                $scope.City.tmpCityId = 0;
                $scope.City.tmpName = "选择城市";

                $scope.styleScroll = {'overflow-y': 'auto'};
                $scope.hideCity();
            };

            // 确认城市选择
            $scope.submitCity = function (e) {
                if (!$scope.City.tmpCityId) {
                    widget.msgToast('请选择您所在的位置！');
                    return;
                }

                $scope.cInput.Area = $scope.City.tmpCityId;
                $scope.cInput.AreaName = $scope.City.tmpName;

                if (!$scope.Page) {
                    $scope.Page = {};
                };
                $scope.Page.isModify = true;

                $scope.hideCity();
            };


            // 显示城市列表
            $scope.showCity = function () {
                var $that = $element.css("display", "block");

                $scope.styleScroll = {'overflow-y': 'hidden'};
                
                $timeout( function () {
                    $element.addClass('this_show');
                }, 50);
            };

            // 隐藏城市列表
            $scope.hideCity = function () {
                $element.removeClass("this_show");
            };


            // 显示城市选择
            $scope.choiceCity = function () {
                if (!$scope.CityList || $scope.CityList.length == 0) {
                    widget.msgToast('网络错误，请稍后再试！');
                    return;
                }

                angular.forEach($scope.CityList, function (v, k) {
                    angular.forEach(v.sub, function (n, i) {
                        if (n.id == $scope.cInput.Area) {
                            $scope.City.tmpMid = v.id;
                            $scope.City.tmpMname = v.name;
                        }
                    });
                });

                $scope.City.tmpSid    = $scope.cInput.Area;
                $scope.City.tmpCityId = $scope.cInput.Area;
                $scope.City.tmpName   = $scope.cInput.AreaName;

                $scope.showCity();
            };
        }
    };

});