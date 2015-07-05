/*
* 消息-通知
* /home/#/msg/notice.htm
*/
angular.module('phoneApp')
.controller('tMsgNotice', function(
    $scope, 
    $state,
    $ionicLoading,
    widget
){

    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 15,
        isLoading: false,
        isMore: true
    };

    $scope.DataList = {
        NoticeList: []
    };

    $scope.loadMore = function() {
        if (!$scope.Deploy.isLoading) {

            $scope.Deploy.isLoading = true;
            $scope.Deploy.pageIndex++;

            if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
                $scope.Deploy.isMore = false;
                return;
            }

            widget.ajaxRequest({
                noMask: true,
                url: 'getMsgNotice',
                data: {},
                success: function (data) {
                    if (data.NoticeList && data.NoticeList.length > 0) {

                        $scope.Deploy.pageTotal = data.Total || 0;

                        $scope.DataList.NoticeList = $scope.DataList.NoticeList.concat(data.NoticeList);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    } else {

                        $scope.Deploy.isLoading = true;
                        $scope.Deploy.isMore = false;

                    }

                    $ionicLoading.hide();
                },
                error: function (data) {
                    $ionicLoading.hide();
                }
            });
        }
    };


    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });

});