angular.module('phoneApp')

.directive('pageBack', function ($window, $state, $stateParams) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('click', function () {

                if (false) {

                    console.log(1);

                } else if (false) {

                    console.log(2);

                } else { // 默认执行浏览器后退

                    $window.history.back();

                }
            });
        }
    };
});