angular.module('phoneApp')

/*
* 幻灯片播放
*/
.directive('ngSlide', function (
    $parse, 
    $timeout
) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            
            scope.$watch(attr.ngSlide, function () {
                $timeout(new slideImage(element[0]), 0);
            });
        }
    };
});