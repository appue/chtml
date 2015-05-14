angular.module('phoneApp')

.directive('pageBack', function ($window, $state, $stateParams) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function () {

                if (attrs.pageBack) {

                    var params = scope.$eval(attrs.pageBack);

                    console.log(params);

                } else if (false) { //特殊情况处理

                    console.log(1);

                } else { // 默认执行浏览器后退

                    // $window.history.back();

                }
            });
        }
    };
});