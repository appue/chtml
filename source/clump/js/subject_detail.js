/*
* 专题-内容
* /clump/#/subject/detail.html
*/
angular.module('phoneApp')

.controller('tSubjectDetail', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    $timeout,
    routerRedirect,
    widget
){

    var currentUrl = widget.getCurrentUrl();

    $scope.pageIndex = 0;
    $scope.pageSize = 5;
    $scope.isLoading = false;
    $scope.DataList = {
        ArticleList: []
    };
    $scope.redirectUrl = {};

    //--设置返回按钮
    // var isFrom = $location.$$search.isFrom || '';
    $scope.backParam = { 'url': ['clump/#/subject/list.htm'] };


    //--设置横向滚动
    $scope.myScrollOptions = {'wrapper': {} };
    
    widget.ajaxRequest({
        noMask: true,
        url: 'getContentSubject',
        data: {
            SubjectId: $stateParams.id
        },
        success: function (data) {

            if (data.ClubId) {
                $scope.redirectUrl.Club = {
                    'url': ['clump/#/club/detail-'+ data.ClubId +'.htm?from='+ currentUrl]
                }
            }

            angular.forEach(data.CategoryList, function (v, k) {
                v.SiteUrl = {
                    'url': ['forum/#/cate/list-sub-'+ v.CateId +'.htm?from='+ currentUrl]
                };
            });

            angular.extend($scope.DataList, data);
        }
    });


    $scope.loadMore = function() {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getListArticle',
                data: {
                    CateId: $stateParams.id
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(data.ArticleList, function (v, k) {
                        v.SiteUrl = {
                            'url': ['forum/#/thread-'+ v.ArticleId +'.htm?from='+ currentUrl]
                        };

                        $scope.DataList.ArticleList.push(v);
                    });

                    $timeout($scope.setFalls, 0);
                    $scope.isLoading = false;
                }
            });
        }
    };

    $scope.loadMore();
});