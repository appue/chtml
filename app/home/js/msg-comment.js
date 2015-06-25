angular.module('phoneApp')

.controller('tMsgComment', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
) {

    // $scope.headerTitle = $location.$$search.title || "";
    
    $scope.pageIndex = 0;
    $scope.pageSize = 15;
    $scope.isLoading = false;
    $scope.DataList = {
        CommentList: []
    };

    //--设置返回按钮
    $scope.backParam = {
        'url': ['home/#/msg.htm']
    };


    $scope.loadMore = function() {
        if (!$scope.isLoading) {
            
            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getMsgComment',
                data: {},
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