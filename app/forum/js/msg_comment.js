angular.module('phoneApp')

.controller('tMsgComment', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $ionicLoading,
    widget
) {
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
        CommentList: []
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
                url: 'getMsgComment',
                data: {
                    PageIndex: $scope.Deploy.pageIndex,
                    PageSize: $scope.Deploy.pageSize
                },
                success: function (data) {
                    if (data.CommentList && data.CommentList.length > 0) {

                        $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.CommentList = $scope.DataList.CommentList.concat(data.CommentList);
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