angular.module('phoneApp')

.controller('tMsgComment', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    widget
) {

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
        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getMsgComment',
            data: {
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
            }
        });
    };

    $scope.loadMore();
});