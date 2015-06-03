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
        template: '<div class="mod_slide"></div>',
        controller: function ($scope, $element, $attrs) {
            
        }
    };
});