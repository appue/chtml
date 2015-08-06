angular.module('phoneApp')

.controller('tMsgTalk', function(
    $scope, 
    $state,
    $location,
    $stateParams,
    widget
) {

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 15,
        isLoading: false,
        isMore: true
    };

    widget.initUser($scope);

    $scope.DataList = {
        TalkList: []
    };

    $scope.loadMore = function() {

        if (!$scope.Deploy.isLogin) return;

        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getMsgTalk',
            data: {
            },
            success: function(data) {
                if (data.TalkList && data.TalkList.length > 0) {

                    // $scope.Deploy.pageTotal = data.Total || 0;
                    $scope.DataList.TalkList = $scope.DataList.TalkList.concat(data.TalkList);
                    // $scope.Deploy.isLoading = false;
                    // $scope.$broadcast('scroll.infiniteScrollComplete');

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