/*
* 发现-活动-晒图活动页
* /clump/#/activity/detail/photo.html
*/
angular.module('phoneApp')

.controller('tActivityDetailPhoto', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
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

    $scope.pageIndex = 1;

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/activity/list.htm']
    };

    $scope.loadMore = function() {
        $scope.pageIndex++;
        
        $scope.DataList.ArticleList.push(
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/6.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/7.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 200 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/8.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 300 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } }
        );
    };
    $scope.DataList = {
        ArticleList: [
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/1.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 162 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/2.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 124 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/4.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 321 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/5.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } }
        ]
    };


    $scope.DataList = {
        Content: {}
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getPhotoActivityInfo',
        data: {
            ActivityId: $stateParams.id,
        },
        success: function (data) {
            var res = data;

            angular.extend($scope.DataList, res.Content);

            console.log($scope.DataList);
        }
    });

    $scope.loadMore = function () {
        if (!$scope.isLoading) {

            $scope.pageIndex++;
            $scope.isLoading = true;

            widget.ajaxRequest({
                noMask: true,
                url: 'getPhotoActivityInfo',
                data: {
                    ActivityId: $stateParams.id,
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;
                    $scope.isLoading = false;

                    console.log(data);
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

                    console.log($scope.DataList);
                }
            });
        }
    };

    // $scope.loadMore();



});