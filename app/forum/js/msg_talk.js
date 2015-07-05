/*
* 消息-私聊
* /home/#/msg/whisper.htm
*/
angular.module('phoneApp')

.controller('tMsgTalk', function(
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
        TalkList: []
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
                url: 'getMsgTalk',
                data: {
                    PageIndex: $scope.Deploy.pageIndex,
                    PageSize: $scope.Deploy.pageSize
                },
                success: function (data) {
                    if (data.TalkList && data.TalkList.length > 0) {

                        $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.TalkList = $scope.DataList.TalkList.concat(data.TalkList);
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


    $scope.loadMore();
});