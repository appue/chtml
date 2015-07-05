/*
* 搜索首页
* /search/#/index
*/
angular.module('phoneApp')

.controller('tSearchIndex', function (
    $scope,
    $ionicLoading,
    cachePool,
    widget
){
    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    var key = cachePool.pull('Keyword') || [];

    $scope.DataList = {
        HistoryKey: []
    };

    angular.forEach(key, function (v, k) {
        $scope.DataList.HistoryKey.push({
            'Keyword': v
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
            angular.extend($scope.DataList, data);
            $ionicLoading.hide();
        },
        error: function (data) {
            $ionicLoading.hide();
        }
    });

});