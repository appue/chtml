/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('HomeIndexCtrl', function (
    $scope, 
    $state,
    cachePool,
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.currentTab = 1;
    $scope.footerTab = 1;
    $scope.pageIndex = 1;

    $scope.checkLogin = function () {
        if (cachePool.pull('UserInfo')) {

            $scope.currentTab = 2;
            $scope.pageIndex = 1;

        } else {

            routerRedirect.toJump({
                url: [
                    'entry/#/login.htm'
                ]
            })

        }
    };

    $scope.loadMore = function () {
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
});