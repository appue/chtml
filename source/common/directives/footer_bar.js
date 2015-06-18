angular.module('phoneApp')

.directive('footerBar', function (
    $state,
    cachePool,
    routerRedirect
) {

    var uid = 0,
        UserInfo = cachePool.pull('UserInfo') || '';

    if (UserInfo) {
        uid = UserInfo.UserId;
    }

    var obj = [
        ['home/#/index'],
        ['clump/#/find.htm'],
        ['home/#/index'],
        ['home/#/msg'],
        ['member/#/personal-'+ uid +'.htm']
    ];

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/footer_bar.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {
            // var currentUrl = $state.current.url.replace(/^\//g, '');
            var currentUrl = widget.getCurrentUrl(),
                current = $scope.footerTab;

            $scope.menuChange = function(e) {
                if (e.target.nodeName == 'LI') {

                    var $that = angular.element(e.target);

                    var direction = 'left',
                        id = $that.attr('data-id');

                    $scope.footerTab = id;

                    if (id == 3) {
                        var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-photo>相册</li><li ng-camera>拍照</li></ul></div><section>'),
                            el = document.querySelector('.js_mod_camera');

                        if (el) {
                            el.style.display = "block";
                        } else {
                            $element.after(toastTpl($scope));
                        }

                        return;
                    }

                    if (id == 5 && !uid) {
                        routerRedirect.toJump({
                            url: ['entry/#/login.htm?from='+ currentUrl]
                        });
                        return;
                    }

                    if (id < current) {
                        direction = 'right';
                    }

                    $that.addClass('current');

                    routerRedirect.toJump({
                        'opts': {
                            'direction': direction
                        },
                        'url': obj[id-1]
                    });
                }
            };

            $scope.hideCamera = function (e) {
                var $that = angular.element(e.delegationTarget);
                
                $that.parent().css('display', 'none');
            };

            $scope.getPhoto = function () {
                navigator.camera.getPicture(onSuccess, onFail, { 
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                });

                function onSuccess(imageData) {
                    // alert(imageData);
                    // var image = document.getElementById('myImage');
                    // image.src = "data:image/jpeg;base64," + imageData;
                    var div = angular.element(document.getElementById('abc'));
                    div.html("<img src=data:image/jpeg;base64," + imageData + " />");
                }

                function onFail(message) {
                    console.log("fail");
                }
            };

            $scope.setPhoto = function () {
                // document.addEventListener("deviceready", onDeviceReady, false);
                // function onDeviceReady() {
                    
                //     $timeout(function() {
                        navigator.camera.getPicture(onSuccess, onFail, { 
                            quality: 50,
                            // destinationType: Camera.DestinationType.DATA_URL,
                            destinationType: Camera.DestinationType.FILE_URI,
                            // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            sourceType: Camera.PictureSourceType.CAMERA
                        });

                        function onSuccess(imageData) {
                            // alert(imageData);
                            // var image = document.getElementById('myImage');
                            // image.src = "data:image/jpeg;base64," + imageData;
                            // var div = angular.element(document.getElementById('abc'));
                            // div.html("<img src=data:image/jpeg;base64," + imageData + " />");
                            // $rootScope.imageData = imageData;

                            sessionStorage.setItem('imageData', encodeURIComponent(imageData));

                            routerRedirect.toJump({
                                'url': ['forum/#/photo/edit.htm']
                            });
                        }

                        function onFail(message) {
                            console.log("fail");
                        }
                    // }, 0);
                // }
            };
        }
    };
})


.directive('ngPhoto', function (
    $parse, 
    $timeout
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

            element.on('click', function () {
                navigator.camera.getPicture(onSuccess, onFail, { 
                    quality: 100,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                });
            });

            function onSuccess(imageData) {
                // alert(imageData);
                // var image = document.getElementById('myImage');
                // image.src = "data:image/jpeg;base64," + imageData;
                var div = angular.element(document.getElementById('abc'));
                div.html("<img src=data:image/jpeg;base64," + imageData + " />");
            }

            function onFail(message) {
                console.log("fail");
            }

        }
    };
})

.directive('ngCamera', function (
    $parse, 
    $timeout
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            
            element.on('click', function () {
                navigator.camera.getPicture(onSuccess, onFail, { 
                    quality: 50,
                    // destinationType: Camera.DestinationType.DATA_URL,
                    destinationType: Camera.DestinationType.FILE_URI,
                    // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                    sourceType: Camera.PictureSourceType.CAMERA
                });
            });

            function onSuccess(imageData) {
                // alert(imageData);
                // var image = document.getElementById('myImage');
                // image.src = "data:image/jpeg;base64," + imageData;
                // var div = angular.element(document.getElementById('abc'));
                // div.html("<img src=data:image/jpeg;base64," + imageData + " />");
                // $rootScope.imageData = imageData;

                sessionStorage.setItem('imageData', encodeURIComponent(imageData));

                routerRedirect.toJump({
                    'url': ['forum/#/photo/edit.htm']
                });
            }

            function onFail(message) {
                console.log("fail");
            }

        }
    };
});