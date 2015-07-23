// 猜你喜欢
angular.module('phoneApp')

.controller('tFindLike', function (
    $scope,
    widget
){

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
        url: 'getFindLike',
        data: {},
        success: function (data) {
            angular.extend($scope.DataList, data); //todo...

            if (data.ArticleList && data.ArticleList.length > 0) {
                $scope.Deploy.pageTotal = data.Total || 0;
                $scope.Deploy.isLoading = false;
                $scope.setFalls();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
                $scope.Deploy.isLoading = true;
                $scope.Deploy.isMore = false;
            }
        }
    });
});