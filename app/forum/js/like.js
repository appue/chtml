// 猜你喜欢
angular.module('phoneApp')

.controller('tFindLike', function (
    $scope,
    $timeout,
    widget
){

    $scope.Deploy = {
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        noMask: true,
        url: 'getFindLike',
        data: {},
        success: function (data) {
            angular.extend($scope.DataList, data);

            if (data.ArticleList && data.ArticleList.length > 0) {
                $timeout($scope.setFalls, 0);
            } else {
                $scope.Deploy.isMore = false;
            }
        },
        error: function (data) {
        }
    });
});