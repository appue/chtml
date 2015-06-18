/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tPhotoEdit', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget,
    $base64
){
    var data = decodeURIComponent(sessionStorage.getItem('imageData')) || '';

    // $scope.data1 = data;
    // $scope.imageData = $base64.encode(data);
    $scope.imageUrl = "../themes/temp/9.jpg";

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/photo/edit.htm']
    };
    $scope.nextPage = {
        'url': ['forum/#/photo/cate.htm']
    };

    $scope.currentTab = true;

    $scope.myScrollOptions = { 
        'wrapper1': {},
        'wrapper2': {}
    };

    $scope.changeTab = function () {
        $scope.currentTab = !$scope.currentTab;

        if ($scope.currentTab) {
            $scope.eventScroll = "wrapper1";
        } else {
            $scope.eventScroll = "wrapper2";
        }
    }
});