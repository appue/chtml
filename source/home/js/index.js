/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('HomeIndexCtrl', function (
    $scope, 
    $state,
    $q,
    cachePool,
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.currentTab = 1;
    $scope.footerTab = 1;

    $scope.isLoading = false;
    $scope.pageIndex = 0;
    $scope.pageSize = 6;

    $scope.checkLogin = function () {
        if (cachePool.pull('UserInfo')) {

            $scope.currentTab = 2;
            $scope.pageIndex = 1;

        } else {

            routerRedirect.toJump({
                url: ['entry/#/login.htm?from='+ currentUrl]
            });

        }
    };

    $scope.loadMore = function (currentTab) {

        if ($scope.isLoading) {
            console.log(111111);
            return;
        }
        
        $scope.pageIndex++;

        switch (currentTab) {
            case 1:
                //--获取最新列表
                widget.ajaxRequest({
                    noMask: true,
                    url: 'getHomeArticle',
                    data: {
                        PageIndex: $scope.pageIndex, //---当前页码
                        PageSize: $scope.pageSize //-----每页显示多少条记录
                    },
                    success: function (data) {
                        console.log('1success');
                        $scope.isLoading = false;
                    },
                    error: function (data) {
                        console.log('1error');
                        $scope.isLoading = false;
                    }
                });
                console.log(1);
            break;

            case 2:
                //--关注列表
                widget.ajaxRequest({
                    noMask: true,
                    url: 'getHomeFollow',
                    data: {
                        PageIndex: $scope.pageIndex,
                        PageSize: $scope.pageSize
                    },
                    success: function (data) {
                        console.log('2success');
                        $scope.isLoading = false;
                    },
                    error: function (data) {
                        console.log('2error');
                        $scope.isLoading = false;
                    }
                });
                console.log(2);
            break;
        }

        $scope.DataList.ArticleList.push(
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/6.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } }
        );
    };

    $scope.DataList = {
        ArticleList: [
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/1.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 162 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl, 'forum/index.html#/thread-1.htm?from='+currentUrl] } }
        ]
    };


    //--获取幻灯片图片
    widget.ajaxRequest({
        noMask: true,
        url: 'getHomeImage',
        success: function (data) {
             console.log('success');
        },
        error: function (data) {
             console.log('error');
        }
    });
    
    $scope.loadMore(1);

});
