angular.module('phoneApp')

.directive('footerBar', function (
    $state, 
    routerRedirect
) {
    var obj = [
        ['home/#/index', 'home/index.html#/index'],
        ['clump/#/find.htm', 'clump/index.html#/find.htm'],
        ['home/#/index', 'home/index.html#/index'],
        ['home/#/msg', 'home/index.html#/msg'],
        ['member/#/index', 'member/index.html#/index']
    ];

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/footer_bar.html',
        controller: function ($scope, $rootScope, $compile, $timeout) {
            // var currentUrl = $state.current.url.replace(/^\//g, '');
            var current = $scope.footerTab;

            $scope.menuChange = function(e) {
                if (e.target.nodeName == 'LI') {

                    var $that = angular.element(e.target);

                    var direction = 'up',
                        id = $that.attr('data-id');

                    $scope.footerTab = id;

                    if (id == 3) {
                        var toastTpl = $compile('<section class="js_mod_camera" ngd-click="hideCamera($event)" selector="div"><div class="mod_camera"><ul><li ng-click="getPhoto()">相册</li><li ng-click="setPhoto()">拍照</li></ul></div><section>');
                        angular.element(document.getElementsByTagName('body')[0]).append(toastTpl($scope));


                        return;
                    }

                    if (id < current) {
                        direction = 'down';
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
                            destinationType: Camera.DestinationType.DATA_URL,
                            // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            sourceType: Camera.PictureSourceType.CAMERA
                        });

                        function onSuccess(imageData) {
                            // alert(imageData);
                            // var image = document.getElementById('myImage');
                            // image.src = "data:image/jpeg;base64," + imageData;
                            // var div = angular.element(document.getElementById('abc'));
                            // div.html("<img src=data:image/jpeg;base64," + imageData + " />");
                            $rootScope.imageData = imageData;

                            sessionStorage.setItem('imageData', imageData);

                            routerRedirect.toJump({
                                'url': [
                                    'forum/#/photo/index.htm',
                                    'forum/index.html#/photo/index.htm',
                                ]
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
});