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
    routerRedirect,
    widget
){
    //--设置返回按钮
    $scope.backParam = {
        'url': ['home/#/index']
    };

    var data = decodeURIComponent(sessionStorage.getItem('imageData')) || '';

    // $scope.data1 = data;
    // $scope.imageData = $base64.encode(data);
    // $scope.imageUrl = data;


    $scope.ImageData = {
        // imageUrl: '../themes/temp/9.jpg',
        imageUrl: data
    };


    var image = new Image();

    image.onload = function(){

        $scope.ImageData.nw = image.naturalWidth,
        $scope.ImageData.nh = image.naturalHeight,
        $scope.ImageData.bw = document.querySelector('.this_photo').offsetWidth,
        $scope.ImageData.bh = document.querySelector('.this_photo').offsetHeight;

        var canvas = document.createElement('canvas');
        canvas.width = $scope.ImageData.bw;
        canvas.height = $scope.ImageData.bh;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, $scope.ImageData.bw, $scope.ImageData.bh);

        angular.element(document.querySelector('.this_photo')).append(canvas);


    };
    image.src = $scope.ImageData.imageUrl;




    $scope.nextPage = function () {

        var canvas = document.querySelector('#tmp');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        var mpImg = new MegaPixImage(image);

        mpImg.render(canvas, {
            maxHeight: 100
        }, function () {

            // var data = ctx.toDataURL("image/jpeg");

            // sessionStorage.setItem('a', data);
            var isRepeat = false,
                ctx = document.querySelector('#tmp'),
                data = ctx.toDataURL("image/jpeg"),
                lastData = $rootScope.CameraImages || [];

            
            angular.forEach(lastData, function (v, k) {
                if (v.ImageUrl == data) {
                    isRepeat = true;
                    return;
                }
            });

            if (!isRepeat) {
                lastData.push({
                    ImageUrl: data,
                    Content: ''
                });
            }

            $rootScope.CameraImages = lastData;

            routerRedirect.toJump({
                'url': ['forum/#/photo/title.htm']
            });
        });

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