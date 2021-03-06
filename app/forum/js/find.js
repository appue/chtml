/*
* 发现首页
* /clump/#/find.html
*/
angular.module('phoneApp')

.controller('tFindIndex', function (
    $scope, 
    $state, 
    $stateParams, 
    $location,
    widget
){
    
    $scope.footerTab = 2;
    
    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
        url: 'getFindHome',
        data: {},
        success: function (data) {
            var i = 0,
                res = data;

            res.CateList = [];

            angular.forEach(res.CategoryList, function(v, k) {
                if (res.CateList[i]) {
                    res.CateList[i].push(v);
                } else {
                    res.CateList[i] = [];
                    res.CateList[i].push(v);
                }

                if ((k + 1) % 6 == 0) {
                    i++;
                }
            });

            $scope.DataList = res;
        }
    });
});