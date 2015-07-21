// 猜你喜欢
angular.module('phoneApp')

.controller('tFindLike', function (
    $scope,
    widget
){
    $scope.Page = {
        Title: "猜你喜欢"
    };

    $scope.Deploy = {
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
        url: 'getFindLike',
        data: {},
        success: function (data) {
            angular.extend($scope.DataList, data);

            if (data.ArticleList && data.ArticleList.length > 0) {
                $scope.setFalls();
            } else {
                $scope.Deploy.isMore = false;
            }
        }
    });
});