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
    widget,
    ENV
){
    //初始化用户信息
    widget.initUser($scope);

    angular.extend($scope.Deploy, {
        currentImage: false
    });

    $scope.isApp = false;
    if (ENV.isHybrid) {
        $scope.isApp = true;
    }

    // $rootScope.CameraImages = {
    //     Images: [
    //         {
    //             ImageUrl: 图片地址
    //             Content: 图片内容
    //         }
    //     ],

    //     CateId: 栏目ID
    //     ClubId: 圈子ID
    //     ActivityId: 活动ID
    // };
    $scope.CameraImages = widget.cacheData("CameraImages") || {
        Images: []
    };

    $scope.ImageData = {url: ""};

    $scope.$watch("Deploy.currentImage", function () {
        if (!$scope.Deploy.currentImage) return;
        
        $scope.CameraImages.Images.push({
            ImageUrl: $scope.Deploy.currentImage
        });
    });


    // $scope.Photo = {
    //     Files: "",
    //     ImageUrl: ""
    // };

    // console.log($scope.Photo.Files);
    // $scope.$watch("Photo.Files", function () {
    //     console.log(console.log($scope.Photo.Files));
    // });

    // var data = $rootScope.CameraImages;

    $scope.nextPage = function () {

        if ($scope.CameraImages.Images.length == 0) {
            widget.msgToast('哎哟，你总得发表点内容吧！');
            return;
        }

        var empty = false;
        
        angular.forEach($scope.CameraImages.Images, function (v, k) {
            if (!v.Description) {
                empty = true;
                return;
            }
        });

        if (empty) {
            widget.msgToast('写点你想说的话吧！');
        } else {
            widget.cacheData("CameraImages", $scope.CameraImages);

            $ionicViewSwitcher.nextDirection('forward');
            $state.go("forum.photo-cate");
        }
    };


    // angular.forEach(data, function (v, k) {
    //     $scope.DataList.ImagesList.push({
    //         ImageUrl: v.image,
    //         Description: v.Description
    //     });
    // });

    // $scope.DataList.ImagesList = [
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Description: ''
    //     },
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Description: ''
    //     },
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Description: ''
    //     },
    //     {
    //         ImageUrl: '../themes/temp/7.jpg',
    //         Description: ''
    //     }
    // ];

    $scope.dataDelete = function (key) {
        // $scope.DataList.ImagesList.splice(key, 1);
        $scope.CameraImages.Images.splice(key, 1);
        widget.cacheData("CameraImages", $scope.CameraImages);
    };
});