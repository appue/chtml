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
        controller: function ($scope, $rootScope, $compile) {
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

                alert(1);
                // document.addEventListener("deviceready", onDeviceReady, false);
                // function onDeviceReady() {
                
                //     navigator.camera.getPicture(onSuccess, onFail, { 
                //         quality: 50,
                //         destinationType: Camera.DestinationType.DATA_URL
                //     });

                //     function onSuccess(imageData) {
                //         var image = document.getElementById('myImage');
                //         image.src = "data:image/jpeg;base64," + imageData;
                //     }

                //     function onFail(message) {
                //         alert('Failed because: ' + message);
                //     }
                // }
            }

            $scope.setPhoto = function () {

                alert(2);
                document.addEventListener("deviceready", onDeviceReady, false);
                function onDeviceReady() {
                
                    navigator.camera.getPicture(onSuccess, onFail, { 
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL
                    });

                    function onSuccess(imageData) {
                        var image = document.getElementById('myImage');
                        image.src = "data:image/jpeg;base64," + imageData;
                    }

                    function onFail(message) {
                        alert('Failed because: ' + message);
                    }
                }
            }
        }
    };
});