/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tPhotoTitle', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/photo/edit.htm']
    };
    $scope.nextPage = {
        'url': ['forum/#/photo/cate-0.htm']
    };
});