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
    routerRedirect,
    widget,
    ENV
){
    if (ENV.isApple) {
        $scope.appStyle = {
            'padding-top': '64px'
        }
    } else {
        $scope.appStyle = {
            'padding-top': '44px'
        }
    }

    var currentUrl = widget.getCurrentUrl();

    $scope.DataList = {};

    //--设置返回按钮
    $scope.backParam = { 'url': ['clump/#/find.htm'] };


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
            });

            angular.extend($scope.DataList, data);

            $scope.eventSlide = true;

            $timeout($scope.setFalls, 0);
        }
    });

});