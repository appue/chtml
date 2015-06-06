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
    // var data = decodeURIComponent(sessionStorage.getItem('imageData')) || '';

    // $scope.data1 = data;
    // $scope.imageData = $base64.encode(data);
    $scope.imageUrl = $base64.encode(unescape(encodeURIComponent('/Users/bear/Documents/mp3/iscroll-master/demos/carousel/warhol.jpg')));


    //--设置返回按钮
    $scope.backParam = {
        'url': [
            'home/#/index',
            'home/index.html#/index'
        ]
    };


});