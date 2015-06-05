/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tPhotoIndex', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    var data = sessionStorage.getItem('imageData');

    alert(data);
    
    //--设置返回按钮
    $scope.backParam = {
        'url': [
            'home/#/index',
            'home/index.html#/index'
        ]
    };


});