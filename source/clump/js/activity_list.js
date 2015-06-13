/*
* 发现-活动
* /clump/#/activity/list.html
*/
angular.module('phoneApp')

.controller('tActivityList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/find.htm']
    };


    // $scope.DataList = {   
    //     ActivityList: [
    //         {
    //             ActivityId: 1,
    //             ActivityName: '【晒萌照】4D绘本',
    //             ActivityType: 2, //---活动类型(1、文字类型；2、图片类型)
    //             ImageUrl: '../themes/temp/img_1.jpg',
    //             Description: '涂一涂，扫一扫，涂鸦一秒变动画',
    //             SiteUrl: {
    //                 'url': [
    //                     'clump/#/activity/detail/photo-1.htm'
    //                 ]
    //             }
    //         },
    //         {
    //             ActivityId: 2,
    //             ActivityName: '【晒萌照】4D绘本',
    //             ActivityType: 2, //---活动类型(1、文字类型；2、图片类型)
    //             ImageUrl: '../themes/temp/img_2.jpg',
    //             Description: '涂一涂，扫一扫，涂鸦一秒变动画',
    //             SiteUrl: {
    //                 'url': [
    //                     'clump/#/activity/detail/photo-2.htm'
    //                 ]
    //             }
    //         },
    //         {
    //             ActivityId: 3,
    //             ActivityName: '【晒萌照】4D绘本',
    //             ActivityType: 1, //---活动类型(1、文字类型；2、图片类型)
    //             ImageUrl: '../themes/temp/img_3.jpg',
    //             Description: '涂一涂，扫一扫，涂鸦一秒变动画',
    //             SiteUrl: {
    //                 'url': [
    //                     'clump/#/activity/detail/article-3.htm'
    //                 ]
    //             }
    //         },
    //         {
    //             ActivityId: 4,
    //             ActivityName: '【晒萌照】4D绘本',
    //             ActivityType: 1, //---活动类型(1、文字类型；2、图片类型)
    //             ImageUrl: '../themes/temp/img_4.jpg',
    //             Description: '涂一涂，扫一扫，涂鸦一秒变动画',
    //             SiteUrl: {
    //                 'url': [
    //                     'clump/#/activity/detail/article-4.htm'
    //                 ]
    //             }
    //         }
    //     ]
    // };

    $scope.DataList = {
        ActivityList: []
    };

    $scope.loadMore = function () {
        if (!$scope.isLoading) {

            $scope.pageIndex++;
            $scope.isLoading = true;

            console.log($scope.pageTotal);
            console.log($scope.pageIndex * $scope.pageSize);

            widget.ajaxRequest({
                noMask: true,
                url: 'getListActivity',
                data: {
                    ActivityType: 0,
                    PageIndex: $scope.pageIndex,
                    PageSize: $scope.pageSize
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;
                    $scope.isLoading = false;

                    var res = data;

                    angular.forEach(res.ActivityList, function (v, k) {
                        v.ActivityName = "【晒萌照】4D绘本";
                        v.ImageUrl = "../themes/temp/img_2.jpg";
                        v.Description = '涂一涂，扫一扫，涂鸦一秒变动画';

                        v.SiteUrl = {
                            'url': ['clump/#/activity/detail/'+ (v.ActivityType == 1 ? 'article' : 'photo') +'-'+ v.ActivityId +'.htm']
                        };
                        
                        $scope.DataList.ActivityList.push(v);
                    });

                }
            });
        }
    };

    $scope.loadMore();

});