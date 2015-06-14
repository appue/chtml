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
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/find.htm']
    };

    $scope.DataList = {
        ActivityList: []
    };

    $scope.loadMore = function () {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;
            
            widget.ajaxRequest({
                noMask: true,
                url: 'getListActivity',
                data: {
                    ActivityType: 0,
                    PageIndex: $scope.pageIndex,
                    PageSize: $scope.pageSize
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(data.ActivityList, function (v, k) {
                        v.SiteUrl = {
                            'url': ['clump/#/activity/detail/'+ (v.ActivityType == 1 ? 'article' : 'photo') +'-'+ v.ActivityId +'.htm']
                        };
                        $scope.DataList.ActivityList.push(v);
                    });

                    $scope.isLoading = false;
                }
            });
        }
    };

    $scope.loadMore();

});