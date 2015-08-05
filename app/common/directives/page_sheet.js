angular.module('phoneApp')

.directive('pageSheet', function (
    $state,
    $timeout,
    $ionicBackdrop,
    $ionicViewSwitcher,
    $window,
    cachePool,
    widget,
    ENV
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/page_sheet.html',
        controller: function ($scope, $element, $rootScope, $compile) {

            $scope.hideSheet = function () {
                $element.removeClass("this_show");
            };

            $scope.showSheet = function () {
                var $that = $element.css("display", "block");
                
                $timeout( function () {
                    $element.addClass('this_show');
                }, 50);
            };

            $scope.toSheet = function (e) {
                var $that = angular.element(e.delegationTarget),
                    type = $that.attr('data-type');

                switch (type) {
                    case 'photo':
                        document.addEventListener("deviceready", onDeviceReady, false);
                        window.navigator.camera.getPicture(onSuccess, onFail, { 
                            quality: 100,
                            // destinationType: Camera.DestinationType.DATA_URL,
                            destinationType: Camera.DestinationType.FILE_URI,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        });
                    break;

                    case 'camera':
                        document.addEventListener("deviceready", onDeviceReady, false);
                        window.navigator.camera.getPicture(onSuccess, onFail, { 
                            quality: 100,
                            // destinationType: Camera.DestinationType.DATA_URL,
                            destinationType: Camera.DestinationType.FILE_URI,
                            // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            sourceType: Camera.PictureSourceType.CAMERA
                        });
                    break;

                    default:
                        console.log(1);

                }
            };


            function onSuccess(imageData) {
                var canvas = angular.element(document.querySelector('#tmp'))[0],
                    ctx = canvas.getContext("2d"),
                    image = new Image();

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
        }
    };
});