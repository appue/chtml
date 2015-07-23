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
    widget
){

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
        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getListActivity',
            data: {
                ActivityType: 0
            },
            success: function (data) {
                if (data.ActivityList && data.ActivityList.length > 0) {
                    $scope.Deploy.pageTotal = data.Total || 0;

                    angular.forEach(data.ActivityList, function (v, k) {
                        var type = (v.ActivityType == 1) ? "article" : "photo";

                        v.SiteUrl = {
                            options: {
                                type: type,
                                id: v.ActivityId
                            }
                        }
                    });

                    $scope.DataList.ActivityList = $scope.DataList.ActivityList.concat(data.ActivityList);

                    $scope.Deploy.isLoading = false;

                    $scope.$broadcast('scroll.infiniteScrollComplete');

                } else {

                    $scope.Deploy.isMore = false;
                    $scope.Deploy.isLoading = true;

                }
            }
        });
    };

    $scope.loadMore();
    
});