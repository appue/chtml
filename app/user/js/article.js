angular.module('phoneApp')

.controller('tUserArticle', function (
    $scope,
    $stateParams,
    $timeout,
    widget
) {

    $scope.Deploy = {
        currentTab: 1,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true,

        UserId: $stateParams.uid,
        CateId: $stateParams.id
    };

    $scope.Page = {
        Title: "发布"
    };

    $scope.DataList = {
        ArticleList: []
    };

    $scope.loadMore = function() {
        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getUserArticle',
            data: {
                UserId: $scope.Deploy.UserId,
                CateId: $scope.Deploy.CateId
            },
            success: function (data) {
                if (data.ArticleList && data.ArticleList.length > 0) {

                    $scope.Deploy.pageTotal = data.Total || 0;
                    $scope.DataList.ArticleList = $scope.DataList.ArticleList.concat(data.ArticleList);
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