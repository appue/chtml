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
    widget
){

    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 15,
        isLoading: false,
        isMore: true
    };
    $scope.DataList = {
        SubjectList: []
    };
            

    $scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getListSubject',
            data: {
                SortType: 1
            },
            success: function (data) {
                if (data.SubjectList && data.SubjectList.length > 0) {
                    
                    $scope.Deploy.pageTotal = data.Total || 0;
                    $scope.DataList.SubjectList = $scope.DataList.SubjectList.concat(data.SubjectList);
                    $scope.Deploy.isLoading = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');

                } else {

                    $scope.Deploy.isLoading = true;
                    $scope.Deploy.isMore = false;

                }
            }
        });
    };

    $scope.loadMore();

});