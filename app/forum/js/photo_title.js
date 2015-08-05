/*
* 发现-一级栏目-列表
* /clump/#/cate/list-{id}.html
*/
angular.module('phoneApp')

.controller('tPhotoTitle', function (
    $scope,
    $state,
    $timeout,
    $location,
    $rootScope,
    $stateParams,
    $ionicActionSheet,
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

    if ($stateParams.type && $stateParams.type=="other") {
        $timeout(function () {
            var imageData = decodeURIComponent(sessionStorage.getItem('imageData')) || '';

            if (imageData) {
                onSuccess(imageData);
            }
        }, 0);
    }

    $scope.$watch("Deploy.currentImage", function () {
        if (!$scope.Deploy.currentImage) return;

        $scope.CameraImages.Images.push({
            ImageUrl: $scope.Deploy.currentImage
        });

        widget.cacheData("CameraImages", $scope.CameraImages);
    });



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



    $scope.dataDelete = function (key) {
        // $scope.DataList.ImagesList.splice(key, 1);
        $scope.CameraImages.Images.splice(key, 1);
        widget.cacheData("CameraImages", $scope.CameraImages);
    };


    $scope.addImage = function () {
        $scope.showSheet();
        // $scope.hideSheet = $ionicActionSheet.show({
        //     buttons: [
        //         { text: '拍照' },
        //         { text: '照片图库' }
        //     ],
        //     // destructiveText: 'Delete',
        //     // titleText: 'Modify your album',
        //     cancelText: '<b>取消</b>',
        //     cancel: function() {
        //       // add cancel code..
        //     },
        //     buttonClicked: function(index) {
        //         document.addEventListener("deviceready", onDeviceReady, false);

        //         function onDeviceReady() {
        //             switch (index) {
        //                 case 0:
        //                     window.navigator.camera.getPicture(onSuccess, onFail, { 
        //                         quality: 100,
        //                         // destinationType: Camera.DestinationType.DATA_URL,
        //                         destinationType: Camera.DestinationType.FILE_URI,
        //                         // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        //                         sourceType: Camera.PictureSourceType.CAMERA
        //                     });
        //                 break;

        //                 case 1:
        //                     window.navigator.camera.getPicture(onSuccess, onFail, { 
        //                         quality: 100,
        //                         // destinationType: Camera.DestinationType.DATA_URL,
        //                         destinationType: Camera.DestinationType.FILE_URI,
        //                         sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        //                     });
        //                 break;
        //             }
        //         }
        //     }
        // });
    }


    function onSuccess(imageData) {
        var canvas = angular.element(document.querySelector('#tmp'))[0],
            ctx = canvas.getContext("2d"),
            image = new Image();

        if ($scope.hideSheet) {
            $scope.hideSheet();
        }
        image.onload = function() {
            EXIF.getData(image, function() {
                var exif = EXIF.pretty(this),
                    orientation = exif ? exif.Orientation : 1;

                ctx.drawImage(image, 0, 0);

                var mpImg = new MegaPixImage(image);

                mpImg.render(canvas, {
                    maxWidth: 640,
                    orientation: orientation
                }, function () {
                    var data = canvas.toDataURL("image/jpeg");
                    $scope.Deploy.currentImage = data;
                });
            });
        };

        image.src = imageData;
    }


    function onFail(message) {
        console.log("获取图片失败！");
    }
});