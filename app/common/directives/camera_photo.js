angular.module('phoneApp')

// 上传图片
.directive('appFilereader', function(
    $q,
    $parse,
    widget
) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function() {
                    // alert(2);
                };

                element.bind('change', function(e) {
                    var element = e.target;

                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (!values || values.length == 0) {
                                return;
                            };

                            if (element.multiple) {

                                angular.forEach(values, function (v, k) {
                                    pushImages(v);
                                });

                            } else {

                                pushImages(values[0]);

                            }

                            widget.cacheData("CameraImages", scope.CameraImages);
                        });

                    function readFile(file) {
                        var deferred = $q.defer(),
                            reader = new FileReader();

                        reader.onload = function(e) {
                            deferred.resolve(e.target.result);
                        };

                        reader.onerror = function(e) {
                            deferred.reject(e);
                        };

                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                    function pushImages(imageData) {
                        var canvas = angular.element(document.querySelector('#tmp'))[0],
                            ctx = canvas.getContext("2d"),
                            image = new Image();

                        image.onload = function() {

                            EXIF.getData(image, function() {
                                var exif = EXIF.pretty(this);

                                var orientation = exif ? exif.Orientation : 1;

                                ctx.drawImage(image, 0, 0);

                                var mpImg = new MegaPixImage(image);

                                mpImg.render(canvas, {
                                    maxWidth: 640,
                                    orientation: orientation
                                }, function () {
                                    var data = canvas.toDataURL("image/jpeg");

                                    ngModel.$setViewValue(data);
                                });
                            });
                        };


                        image.src = imageData;
                    }

                }); //change

            } //link
    }; //return
})


.directive('addPhoto', function (
    $state,
    $parse, 
    $timeout,
    $compile,
    $ionicViewSwitcher,
    widget,
    ENV
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            element.on("click", function () {

                widget.initUser(scope);

                if (!scope.Deploy.isLogin) {
                    scope.showLogin();

                    return;
                };

                if (ENV.isHybrid) {

                    var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-photo>相册</li><li ng-camera>拍照</li></ul></div><section>'),
                        el = document.querySelector('.js_mod_camera');

                    if (el) {
                        el.style.display = "block";
                    } else {
                        // $element.after(toastTpl($scope));
                        angular.element(document.querySelector('.pane')).after(toastTpl(scope));
                    }

                    scope.noScroll = {
                        'overflow-y': 'hidden'
                    };

                } else {

                    $ionicViewSwitcher.nextDirection("forward");
                    $state.go("forum.photo-title");

                }

            });


            scope.hideCamera = function (e) {
                var $that = angular.element(e.delegationTarget);
                
                $that.parent().css('display', 'none');

                scope.noScroll = {
                    'overflow-y': 'auto'
                };
            };

        }
    };
})


// 图片列表
.directive('addImage', function (
    $state,
    $parse, 
    $timeout,
    $compile,
    $ionicActionSheet,
    $ionicViewSwitcher,
    widget,
    ENV
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            element.on("click", function () {

                widget.initUser(scope);

                if (!scope.Deploy.isLogin) {
                    scope.showLogin();

                    return;
                };

                $ionicActionSheet.show({
                    buttons: [
                        { text: '拍照' },
                        { text: '照片图库' }
                    ],
                    // destructiveText: 'Delete',
                    // titleText: 'Modify your album',
                    cancelText: '<b>取消</b>',
                    cancel: function() {
                      // add cancel code..
                    },
                    buttonClicked: function(index) {
                        document.addEventListener("deviceready", onDeviceReady, false);

                        function onDeviceReady() {
                            switch (index) {
                                case 0:
                                    window.navigator.camera.getPicture(onSuccess, onFail, { 
                                        quality: 100,
                                        // destinationType: Camera.DestinationType.DATA_URL,
                                        destinationType: Camera.DestinationType.FILE_URI,
                                        // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                                        sourceType: Camera.PictureSourceType.CAMERA
                                    });
                                break;

                                case 1:
                                    window.navigator.camera.getPicture(onSuccess, onFail, { 
                                        quality: 100,
                                        // destinationType: Camera.DestinationType.DATA_URL,
                                        destinationType: Camera.DestinationType.FILE_URI,
                                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                                    });
                                break;
                            }
                        }


                        return true;
                    }
                });


                function onSuccess(imageData) {
                    var canvas = angular.element(document.querySelector('#tmp'))[0],
                        ctx = canvas.getContext("2d"),
                        image = new Image();

                    image.onload = function() {
                        EXIF.getData(image, function() {
                            var exif = EXIF.pretty(this);

                            var orientation = exif ? exif.Orientation : 1;

                            ctx.drawImage(image, 0, 0);

                            var mpImg = new MegaPixImage(image);

                            mpImg.render(canvas, {
                                maxWidth: 640,
                                orientation: orientation
                            }, function () {
                                var data = canvas.toDataURL("image/jpeg");
                                scope.Deploy.currentImage = data;
                            });
                        });
                    };

                    image.src = imageData;
                }


                function onFail(message) {
                    console.log("获取图片失败！");
                }

            });

        }
    };
})


.directive('ngPhoto', function (
    $state,
    $parse, 
    $timeout,
    $ionicLoading,
    $ionicViewSwitcher,
    widget
) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function () {

                // $ionicLoading.show({
                //     templateUrl: 'common/directives/mod_loading.html'
                // });

                document.addEventListener("deviceready", onDeviceReady, false);

                function onDeviceReady() {
                    window.navigator.camera.getPicture(onSuccess, onFail, { 
                        quality: 50,
                        // destinationType: Camera.DestinationType.DATA_URL,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                    });
                }
            });

            function onSuccess(imageData) {
                sessionStorage.setItem('imageData', encodeURIComponent(imageData));
                $ionicViewSwitcher.nextDirection("forward");
                $state.go('forum.photo-title', {
                    type: 'other'
                });
            }

            function onFail(message) {
                console.log("获取图片失败！");
            }
        }
    };
})


.directive('ngCamera', function (
    $state,
    $parse, 
    $timeout,
    $ionicLoading,
    $ionicViewSwitcher,
    widget
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            
            element.on('click', function () {

                widget.initUser(scope);

                if (!scope.Deploy.isLogin) {
                    scope.showLogin();

                    return;
                };

                // $ionicLoading.show({
                //     templateUrl: 'common/directives/mod_loading.html'
                // });

                document.addEventListener("deviceready", onDeviceReady, false);
                
                function onDeviceReady() {
                    navigator.camera.getPicture(onSuccess, onFail, { 
                        quality: 50,
                        // destinationType: Camera.DestinationType.DATA_URL,
                        destinationType: Camera.DestinationType.FILE_URI,
                        // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        sourceType: Camera.PictureSourceType.CAMERA
                    });
                }
            });

            function onSuccess(imageData) {
                sessionStorage.setItem('imageData', encodeURIComponent(imageData));
                $ionicViewSwitcher.nextDirection("forward");
                $state.go('forum.photo-title', {
                    type: 'other'
                });
            }

            function onFail(message) {
                console.log("获取图片失败！");
            }

        }
    };
});

// 下面是为有编辑图片用的，不能删除代码ToDo
// .directive('ngPhoto', function (
//     $state,
//     $parse, 
//     $timeout,
//     $ionicViewSwitcher,
//     widget
// ) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {

//             element.on('click', function () {
//                 // alert(1);
//                 // document.addEventListener("deviceready", onDeviceReady, false);

//                 // function onDeviceReady() {
//                 //     alert(2);
//                     window.navigator.camera.getPicture(onSuccess, onFail, { 
//                         quality: 100,
//                         // destinationType: Camera.DestinationType.DATA_URL,
//                         destinationType: Camera.DestinationType.FILE_URI,
//                         sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//                     });
//                 // }
//             });

//             function onSuccess(imageData) {
//                 console.log("获取图片成功！");

//                 sessionStorage.setItem('imageData', encodeURIComponent(imageData));

//                 // $ionicViewSwitcher.nextDirection("forward");
//                 // $state.go('forum.photo-edit');
//                 $ionicViewSwitcher.nextDirection("none");
//                 $state.go('forum.photo-title');

//             }

//             function onFail(message) {
//                 console.log("获取图片失败！");
//             }

//         }
//     };
// })


// .directive('ngCamera', function (
//     $state,
//     $parse, 
//     $timeout,
//     $ionicViewSwitcher,
//     widget
// ) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {
            
//             element.on('click', function () {

//                 widget.initUser(scope);

//                 if (!scope.Deploy.isLogin) {
//                     scope.showLogin();

//                     return;
//                 };



//                 document.addEventListener("deviceready", onDeviceReady, false);
                
//                 function onDeviceReady() {
//                     navigator.camera.getPicture(onSuccess, onFail, { 
//                         quality: 50,
//                         // destinationType: Camera.DestinationType.DATA_URL,
//                         destinationType: Camera.DestinationType.FILE_URI,
//                         // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//                         sourceType: Camera.PictureSourceType.CAMERA
//                     });
//                 }
//             });

//             function onSuccess(imageData) {
//                 // alert(imageData);
//                 // var image = document.getElementById('myImage');
//                 // image.src = "data:image/jpeg;base64," + imageData;
//                 // var div = angular.element(document.getElementById('abc'));
//                 // div.html("<img src=data:image/jpeg;base64," + imageData + " />");
//                 // $rootScope.imageData = imageData;
//                 console.log("获取图片成功！");


//                 sessionStorage.setItem('imageData', encodeURIComponent(imageData));


//                 // $ionicViewSwitcher.nextDirection("forward");
//                 // $state.go('forum.photo-edit');
//                 $ionicViewSwitcher.nextDirection("none");
//                 $state.go('forum.photo-title');
//             }

//             function onFail(message) {
//                 console.log("获取图片失败！");
//             }

//         }
//     };
// });