angular.module('phoneApp')

/*
* 幻灯片播放
*/
.directive('slide', function (
    $parse, 
    $timeout
) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="mod_slide ng-transclude"></div>',
        controller: function ($scope, $element, $attrs) {
            // $scope.setSlide = function () {
            //     console.log(1);
            // };

            // $scope.setSlide();

            $scope.setSlide = {
                init: function () {
                    // alert(1);
                }
            };

            $scope.setSlide.init();
        }
    };
});