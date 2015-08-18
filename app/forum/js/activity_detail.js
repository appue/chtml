/*
* 发现-活动-晒图活动页
* /clump/#/activity/detail/photo-{id}.htm
*/
angular.module('phoneApp')

.controller('tActivityDetail', function (
    $scope,
    $state,
    $location,
    $stateParams,
    $ionicViewSwitcher,
    widget
){
    $scope.Page = {};
    
    $scope.Deploy = {
        isType: $stateParams.type == "photo" ? true : false,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };
    $scope.DataList = {
        ArticleList: []
    };

    widget.initUser($scope);

    if ($stateParams.type == "photo") {

        //--获取活动的基本信息
        widget.ajaxRequest({
            scope: $scope,
            url: 'getActivityInfo',
            data: {
                ActivityId: $stateParams.id,
            },
            success: function (data) {
                $scope.Page.Title = data.Content.ActivityName;

                angular.extend($scope.DataList, data);

                $scope.DataList.Content.CateId = 9;
            }
        });


        //--获取活动的帖子列表
        $scope.loadMore = function () {
            widget.ajaxRequest({
                scope: $scope,
                showPage: true,
                url: 'getListArticle',
                data: {
                    ActivityId: $stateParams.id
                },
                success: function (data) {
                    if (data.ArticleList && data.ArticleList.length > 0) {

                        // $scope.Deploy.pageTotal = data.Total || 0;
                        $scope.DataList.ArticleList = $scope.DataList.ArticleList.concat(data.ArticleList);
                        $scope.setFalls();
                        // $scope.Deploy.isLoading = false;
                    //     $scope.$broadcast('scroll.infiniteScrollComplete');

                    // } else {

                    //     $scope.Deploy.isLoading = true;
                    //     $scope.Deploy.isMore = false;

                    }
                }
            });
        };

        $scope.loadMore();

    } else {

        //--获取帖子内容
        widget.ajaxRequest({
            scope: $scope,
            url: 'getContentArticle',
            data: {
                ArticleId: $stateParams.id
            },
            success: function (data) {
                angular.extend($scope.DataList, data);

                // if (userInfo.UserId == data.Author.UserId) {
                //     $scope.isOwner = true;  
                // } else {
                //     $scope.isOwner = false;
                // }
            }
        });
    

        $scope.headerScroll = function () {
            widget.changeOpacity();
        };
    
    }



    // 发布帖子
    $scope.setArticle = function () {
        if (!$scope.Deploy.isLogin) {
            $scope.showLogin();
            return;
        }
        
        $ionicViewSwitcher.nextDirection('forward');

        $state.go('forum.photo-title', {
            activity: $stateParams.id,
            cate: $scope.DataList.Content.CateId
        }, { inherit: false });
    };

});