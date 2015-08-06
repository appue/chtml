/*
* 消息-通知
* /home/#/msg/notice.htm
*/
angular.module('phoneApp')
.controller('tMsgNotice', function(
    $scope, 
    $state,
    widget
){
    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 15,
        isLoading: false,
        isMore: true
    };

    widget.initUser($scope);

    $scope.DataList = {
        NoticeList: []
    };

    $scope.loadMore = function() {
        
        if (!$scope.Deploy.isLogin) return;

        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getMsgNotice',
            data: {
            },
            success: function (data) {
                if (data.NoticeList && data.NoticeList.length > 0) {

                    // $scope.Deploy.pageTotal = data.Total || 0;
                    $scope.DataList.NoticeList = $scope.DataList.NoticeList.concat(data.NoticeList);
                //     $scope.Deploy.isLoading = false;
                //     $scope.$broadcast('scroll.infiniteScrollComplete');

                // } else {

                //     $scope.Deploy.isLoading = true;
                //     $scope.Deploy.isMore = false;

                }
            }
        });
    };


    if ($scope.Deploy.isLogin) {
        $scope.loadMore();
    }

});