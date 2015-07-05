angular.module('phoneApp')

.controller('tCommentList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    $ionicLoading,
    routerRedirect,
    widget
) {
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    // $scope.headerTitle = $location.$$search.title || "";
    
    $scope.pageIndex = 0;
    $scope.pageSize = 15;
    $scope.isLoading = false;
    $scope.DataList = {
        CommentList: []
    };

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/thread-'+ $stateParams.id  +'.htm']
    };


    $scope.loadMore = function() {
        if (!$scope.isLoading) {
            
            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getListComment',
                data: {
                    SortType: 1,
                    ArticleId: $stateParams.id,
                    PageIndex: $scope.pageIndex,
                    PageSize: $scope.pageSize
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(data.CommentList, function (v, k) {
                        $scope.DataList.CommentList.push(v);
                    });

                    $scope.isLoading = false;
                }
            });
        }
    };

    $scope.loadMore();
});