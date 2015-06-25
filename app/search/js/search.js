/*
* 搜索首页
* /search/#/index
*/
angular.module('phoneApp')

.controller('tSearchIndex', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    cachePool,
    routerRedirect,
    widget
){

    //--设置返回
    $scope.backParam = { 'url': ['clump/#/find.htm'] };

    var key = cachePool.pull('Keyword') || [];

    $scope.DataList = {
        HistoryKey: []
    }

    angular.forEach(key, function (v, k) {
        $scope.DataList.HistoryKey.push({
            'Keyword': v,
            'SiteUrl': {
                'url': ['search/#/result?keyword='+ encodeURIComponent(v)]
            }
        })
    });

    //--清除历史记录
    $scope.clearHistory = function () {
        cachePool.remove("Keyword");
        $scope.DataList.HistoryKey = [];
    };


    widget.ajaxRequest({
        noMask: true,
        url: 'getSearch',
        data: {},
        success: function (data) {
            angular.forEach(data.KeywordList, function (v, k) {
                v.SiteUrl = {
                    'url': ['search/#/result?keyword='+ encodeURIComponent(v.Keyword)]
                };
            });

            angular.extend($scope.DataList, data);
        }
    });

});