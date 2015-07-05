/*
* 消息-赞
* /home/#/msg/praise
*/
angular.module('phoneApp')

.controller('tMsgPraise', function(
    $scope, 
    $state,
    $ionicNavBarDelegate,
    $ionicHistory,
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
        PraiseList: []
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
                url: 'getMsgPraise',
                data: {},
                success: function (data) {
                    if (data.PraiseList && data.PraiseList.length > 0) {

                        $scope.Deploy.pageTotal = data.Total || 0;

                        $scope.DataList.PraiseList = $scope.DataList.PraiseList.concat(data.PraiseList);

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
    
    // $scope.$ionicGoBack = function () {
    //     $ionicHistory.goBack();
    // };

    // angular.extend($ionicNavBarDelegate, {
    //     showBackButton: true,
    //     viewTitle: "赞"
    // })
});