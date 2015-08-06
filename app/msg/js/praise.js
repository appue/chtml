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
        PraiseList: []
    };

    $scope.loadMore = function() {
        
        if (!$scope.Deploy.isLogin) return;

        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getMsgPraise',
            data: {
            },
            success: function (data) {
                if (data.PraiseList && data.PraiseList.length > 0) {

                    // $scope.Deploy.pageTotal = data.Total || 0;
                    $scope.DataList.PraiseList = $scope.DataList.PraiseList.concat(data.PraiseList);
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
    
    // $scope.$ionicGoBack = function () {
    //     $ionicHistory.goBack();
    // };

    // angular.extend($ionicNavBarDelegate, {
    //     showBackButton: true,
    //     viewTitle: "赞"
    // })
});