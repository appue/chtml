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

    $scope.DataList = {};

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/photo/edit.htm']
    };
    $scope.nextPage = function () {
        var empty = false;
        angular.forEach($scope.DataList.ImagesList, function (v, k) {
            if (!v.Content) {
                empty = true;
                return;
            }
        });

        if (empty) {
            widget.msgToast('请填您想说的话哦！');
        } else {
            routerRedirect.toJump({
                'url': ['forum/#/photo/cate-0.htm']
            });
        }
    };

    $scope.DataList.ImagesList = [
        {
            ImageUrl: '../themes/temp/7.jpg',
            Content: ''
        },
        {
            ImageUrl: '../themes/temp/7.jpg',
            Content: ''
        },
        {
            ImageUrl: '../themes/temp/7.jpg',
            Content: ''
        },
        {
            ImageUrl: '../themes/temp/7.jpg',
            Content: ''
        }
    ];

    $scope.dataDelete = function (key) {
        $scope.DataList.ImagesList.splice(key, 1);
    };
});