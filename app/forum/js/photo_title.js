/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tPhotoTitle', function (
    $rootScope,
    $scope, 
    $state, 
    $stateParams, 
    $location,
    $ionicViewSwitcher,
    widget
){

    $scope.Page = {
        Title: "详情",
        Next: "继续"
    };

    // var data = $rootScope.CameraImages;

    // $scope.DataList = {
    //     ImagesList: []
    // };

    //--设置返回按钮
    $scope.backParam = {
        'url': ['forum/#/photo/edit.htm']
    };

    $scope.nextPage = function () {

        if (($rootScope.CameraImages && $rootScope.CameraImages.length == 0) || !$rootScope.CameraImages) {
            widget.msgToast('哎哟，你总得发表点内容吧！');
            return;
        }

        var empty = false;
        
        angular.forEach($rootScope.CameraImages, function (v, k) {
            if (!v.Content) {
                empty = true;
                return;
            }
        });

        if (empty) {
            widget.msgToast('写点你想说的话吧！');
        } else {
            // routerRedirect.toJump({
            //     'url': ['forum/#/photo/cate-0.htm']
            // });
            $ionicViewSwitcher.nextDirection('forward');
            $state.go("forum.photo-cate");
        }
    };


    // angular.forEach(data, function (v, k) {
    //     $scope.DataList.ImagesList.push({
    //         ImageUrl: v.image,
    //         Content: v.content
    //     });
    // });

    // $scope.DataList.ImagesList = [
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Content: ''
    //     },
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Content: ''
    //     },
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Content: ''
    //     },
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Content: ''
    //     }
    // ];

    $scope.dataDelete = function (key) {
        // $scope.DataList.ImagesList.splice(key, 1);
        $rootScope.CameraImages.splice(key, 1);
    };
});