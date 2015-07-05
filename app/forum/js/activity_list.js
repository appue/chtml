/*
* 发现-活动
* /clump/#/activity/list.html
*/
angular.module('phoneApp')

.controller('tActivityList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $ionicLoading,
    widget
){

    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 10,
        isLoading: false,
        isMore: true
    };
    $scope.DataList = {
        ActivityList: []
    };

    $scope.loadMore = function () {
        if (!$scope.Deploy.isLoading) {

            $scope.Deploy.isLoading = true;
            $scope.Deploy.pageIndex++;

            if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
                $scope.Deploy.isMore = false;
                return;
            }
            
            widget.ajaxRequest({
                noMask: true,
                url: 'getListActivity',
                data: {
                    ActivityType: 0,
                    PageIndex: $scope.Deploy.pageIndex,
                    PageSize: $scope.Deploy.pageSize
                },
                success: function (data) {
                    if (data.ActivityList && data.ActivityList.length > 0) {
                        $scope.Deploy.pageTotal = data.Total || 0;

                        $scope.DataList.ActivityList = $scope.DataList.ActivityList.concat(data.ActivityList);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    } else {

                        $scope.Deploy.isMore = false;
                        $scope.Deploy.isLoading = true;

                    }

                    $ionicLoading.hide();
                },
                error: function (data) {
                    $scope.Deploy.isLoading = false;
                    $ionicLoading.hide();
                }
            });
        }
    };


    $scope.loadMore();
});