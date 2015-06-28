/*
* 发现-猜你喜欢
* /clump/#/like.html
*/
angular.module('phoneApp')

.controller('tFindLike', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $timeout,
    widget,
    ENV
){
    //--设置返回按钮
    $scope.backParam = { 'route': '#/forum/clump/find.htm' };

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 5,
        isLoading: false
    };


    $scope.DataList = {
        ArticleList: []
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getFindLike',
        data: {},
        success: function (data) {

            // angular.forEach(data.PhotoList, function (v, k) {
            //     if (ENV.isHybrid) {
            //         v.SiteUrl = {
            //             'url': [v.AppUrl]
            //         };
            //     } else {
            //         v.SiteUrl = {
            //             'url': [v.H5Url]
            //         };
            //     }
            // });

            angular.forEach(data.ArticleList, function (v, k) {
                v.SiteUrl = '#/forum/thread-'+ v.ArticleId +'.htm';

                $scope.DataList.ArticleList.push(v);
            });

            $timeout($scope.setFalls, 0);
        }
    });
});