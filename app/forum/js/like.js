// 猜你喜欢
angular.module('phoneApp')

.controller('tFindLike', function(
    $scope,
    widget
) {

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 5, //todo....分接口？
        isLoading: false,
        isMore: true
    };

    $scope.DataList = {
        PhotoList: [],
        ArticleList: []
    };

    widget.initUser($scope);

    $scope.loadMore = function() {
        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getFindLike',
            data: {},
            success: function(data) {

                $scope.DataList.PhotoList = data.PhotoList || [];

                if (data.ArticleList && data.ArticleList.length > 0) {
                    angular.forEach(data.ArticleList, function(v, k) {
                        $scope.DataList.ArticleList.push(v);
                    });
                    $scope.setFalls();
                }
            }
        });
    };

    if ($scope.Deploy.isLogin) {
        $scope.loadMore();
    }

});