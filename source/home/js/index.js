/*
* 首页
* /home/#/index
*/
angular.module('phoneApp')

.controller('HomeIndexCtrl', function (
    $scope, 
    $state,
    $timeout,
    cachePool,
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.DataList = {
        ArticleList: []
    };

    $scope.currentTab = 1;
    $scope.footerTab = 1;

    $scope.pageIndex = 0;
    $scope.pageSize = 6;
    $scope.isLoading = false;


$scope.pageTotal = 100;

    $scope.checkLogin = function () {
        if (cachePool.pull('UserInfo')) {

            $scope.currentTab = 2;
            $scope.pageIndex = 1;
            $scope.isLoading = false;

        } else {

            routerRedirect.toJump({
                url: ['entry/#/login.htm?from='+ currentUrl]
            });

        }
    };




    //--获取幻灯片图片
    widget.ajaxRequest({
        noMask: true,
        url: 'getHomeImage',
        success: function (data) {
        },
        error: function (data) {
        }
    });

    $scope.loadMore = function (currentTab) {

        if (!$scope.isLoading) {

            $scope.pageIndex++;
            $scope.isLoading = true;

            switch (currentTab) {
                case 1:
                    //--获取最新列表
                    widget.ajaxRequest({
                        isDrop: true,
                        noMask: true,
                        url: 'getHomeArticle',
                        data: {
                            PageIndex: $scope.pageIndex,
                            PageSize: $scope.pageSize
                        },
                        success: function (data) {
                            console.log('1success');
                            $timeout(function(){
                                $scope.isLoading = false;
                                $scope.pageTotal = 100;
                                angular.element(document.querySelector('.mod_list_loading')).css('display', 'none');
                            }, 5000);
                        },
                        error: function (data) {
                            var data = [
                                {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/1.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 162 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
                                {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/2.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 250 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
                                {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/3.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 300 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
                                {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/4.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 280 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
                                {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/5.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 280 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } }
                            ];

                            angular.forEach(data, function (v, k) {
                                $scope.DataList.ArticleList.push(v);
                            });

                            $timeout($scope.setFalls, 0);
                            
                        }
                    });
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
                break;
            }
        }
    };


    
    $scope.loadMore(1);

});
