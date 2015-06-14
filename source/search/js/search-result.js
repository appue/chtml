/*
* 搜索结果
* /search/#/result
*/
angular.module('phoneApp')

.controller('tSearchResult', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.currentTab = 1;
    $scope.pageIndex = 0;

    $scope.keyword = $location.$$search.keyword || '';

    //--设置返回
    $scope.backParam = { 'url': ['search/#/index'] };

    widget.ajaxRequest({
        noMask: true,
        url: 'getSearchContent',
        data: {
            Keyword: $scope.keyword,
            Type: $scope.currentTab
        },
        success: function (data) {
            console.log(1);
        }
    });

});