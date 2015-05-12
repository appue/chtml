angular.module('phoneApp')

.directive('pageBack', function ($window, $state, $stateParams) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function () {

                if (attrs.pageBack) {

                    console.log(attrs.pageBack);

                } else if (false) {

                    console.log(1);

                } else { // 默认执行浏览器后退

                    $window.history.back();

                }
            });
        }
    };
});