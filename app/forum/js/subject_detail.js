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
    $ionicLoading,
    widget
){
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.Deploy = {
        currentTab: 1,
        pageIndex: 0,
        pageSize: 5,
        isLoading: false,
        isMore: true
    };
    $scope.DataList = {
        ArticleList: []
    };


    $scope.redirectUrl = {};
    
    widget.ajaxRequest({
        noMask: true,
        url: 'getContentSubject',
        data: {
            SubjectId: $stateParams.id
        },
        success: function (data) {

            if (data.ClubId) {
                $scope.redirectUrl.Club = "forum.club-detail({id: "+ data.ClubId +"})";
            }

            angular.extend($scope.DataList, data);
        }
    });


    $scope.loadMore = function() {
        if (!$scope.Deploy.isLoading) {

            $scope.Deploy.isLoading = true;
            $scope.Deploy.pageIndex++;

            if ($scope.Deploy.pageTotal && ($scope.Deploy.pageIndex * $scope.Deploy.pageSize - $scope.Deploy.pageTotal)>$scope.Deploy.pageSize) {
                $scope.Deploy.isMore = false;
                return;
            }

            widget.ajaxRequest({
                noMask: true,
                url: 'getListArticle',
                data: {
                    CateId: $stateParams.id,
                    PageSize: $scope.Deploy.PageSize,
                    PageIndex: $scope.Deploy.PageIndex
                },
                success: function (data) {
                    if (data.ArticleList && data.ArticleList.length > 0) {
                        $scope.Deploy.pageTotal = data.Total || 0;

                        $scope.DataList.ArticleList = $scope.DataList.ArticleList.concat(data.ArticleList);

                        $timeout($scope.setFalls, 0);

                        $scope.Deploy.isLoading = false;

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    } else {

                        $scope.Deploy.isLoading = true;
                        $scope.Deploy.isMore = false;

                    }

                    $ionicLoading.hide();
                },
                error: function (data) {
                    $ionicLoading.hide();
                }
            });
        }
    };


    $scope.loadMore();
});