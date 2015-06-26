/*
* 发专题-列表
* /clump/#/subject/list.html
*/
angular.module('phoneApp')

.controller('tSubjectList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    var currentUrl = widget.getCurrentUrl();

    $scope.pageIndex = 0;
    $scope.pageSize = 15;
    $scope.isLoading = false;
    $scope.DataList = {
        SubjectList: []
    };
            
    //--设置返回按钮
    $scope.backParam = { 'url': ['clump/#/find.htm'] };

    $scope.loadMore = function () {
        if (!$scope.isLoading) {

            $scope.isLoading = true;
            $scope.pageIndex++;

            widget.ajaxRequest({
                noMask: true,
                url: 'getListSubject',
                data: {
                    SortType: 1,
                    PageIndex: $scope.pageIndex,
                    PageSize: $scope.pageSize
                },
                success: function (data) {
                    $scope.pageTotal = data.Total || 0;

                    angular.forEach(data.SubjectList, function (v, k) {
                        v.SiteUrl = {
                            'url': ['clump/#/subject/detail-'+ v.SubjectId +'.htm']
                        };

                        $scope.DataList.SubjectList.push(v);
                    });

                    $scope.isLoading = false;
                }
            });
        }
    };

    $scope.loadMore();

});