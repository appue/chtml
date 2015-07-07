/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tPhotoCate', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    widget
){
    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/photo/title.htm']
    };

    
});