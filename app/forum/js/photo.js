/*
* 编辑图片
* /forum/#/photo/edit.html
*/
angular.module('phoneApp')

.controller('tPhotoEdit', function (
    $rootScope,
    $scope,
    $state, 
    $stateParams, 
    $location,
    $timeout,
    $ionicViewSwitcher,
    widget
){

    var data = decodeURIComponent(sessionStorage.getItem('imageData')) || '';

    // $scope.data1 = data;
    // $scope.imageData = $base64.encode(data);
    // $scope.imageUrl = data;

    /*
    $scope.ImageData = {
        imageUrl:
        nw:
        nh:
        bw:
        bh:
    }
    */
    $scope.ImageData = {
        // imageUrl: 'themes/temp/9.jpg'
        imageUrl: data
    };

    $scope.CameraImages = widget.cacheData("CameraImages") || {
        Images: []
    };

    // var canvas = document.createElement('canvas');
    var canvas = angular.element(document.querySelector('#canvas'))[0],
        image = new Image();

    image.onload = function(){
        angular.extend($scope.ImageData, {
            nw: image.naturalWidth,
            nh: image.naturalHeight,
            bw: document.querySelector('.this_photo').offsetWidth,
            bh: document.querySelector('.this_photo').offsetHeight
        });

        canvas.width = $scope.ImageData.bw;
        canvas.height = $scope.ImageData.bh;

        var ctx = canvas.getContext('2d'),
            tmpcvs = angular.element(document.querySelector('#tmp'))[0],
            tmpctx = tmpcvs.getContext("2d");

        EXIF.getData(image, function() {
            var exif = EXIF.pretty(this);
            var orientation = exif ? exif.Orientation : 1;

            tmpctx.drawImage(image, 0, 0);

            var mpImg = new MegaPixImage(image);

            mpImg.render(tmpcvs, {
                maxWidth: 640,
                orientation: orientation
            }, function () {

                var data = tmpcvs.toDataURL("image/jpeg");

                if (!data) return;

                var cvsImage = new Image();

                cvsImage.onload = function() {
                    ctx.drawImage(cvsImage, 0, 0, $scope.ImageData.bw, $scope.ImageData.bh);

                    angular.element(document.querySelector('.this_photo')).append(canvas);
                };

                cvsImage.src = data;

            });
        });
    };

    image.src = $scope.ImageData.imageUrl;


    // 下一页
    $scope.nextPage = function () {

        $scope.cvsImageData = canvas.toDataURL("image/jpeg");

        if (!$scope.cvsImageData) return;

        var cvs = angular.element(document.querySelector('#tmp'))[0],
            ctx = cvs.getContext("2d"),
            cvsImage = new Image();

        cvsImage.onload = function() {
            ctx.drawImage(cvsImage, 0, 0);

            var mpImg = new MegaPixImage(cvsImage);

            mpImg.render(cvs, {
                maxWidth: 640,
                orientation: 1
            }, function () {

                var data = cvs.toDataURL("image/jpeg"),
                    isRepeat = false;

                angular.forEach($scope.CameraImages.Images, function (v, k) {
                    if (v.ImageUrl == data) {
                        isRepeat = true;
                        return;
                    }
                });

                if (!isRepeat) {
                    $scope.CameraImages.Images.push({
                        ImageUrl: data,
                        Content: ''
                    });

                    widget.cacheData("CameraImages", $scope.CameraImages);
                }

                $ionicViewSwitcher.nextDirection('forward');
                $state.go("forum.photo-title");

            });
        };

        cvsImage.src = $scope.cvsImageData;
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