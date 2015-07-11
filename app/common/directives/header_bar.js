angular.module('phoneApp')

.directive('headerBar', function (
    $state,
    cachePool,
    ENV
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/header_bar.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {
            // $ionicGoBack()
        }
    };
})



.directive('headerOpacity', function (
    $state,
    $ionicViewSwitcher,
    $window,
    cachePool,
    ENV
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/header_opacity.html',
        controller: function ($scope, $element, $rootScope, $compile, $timeout, widget) {

            angular.element($window).on("scroll", function () {
                headerBy();
            });
            // angular.element($window).on("touchstart", function () {
            //     headerBy();
            // });
            angular.element($window).on("touchmove", function () {
                headerBy();
            });
            angular.element($window).on("touchend", function () {
                headerBy();
            });

            function headerBy() {
                var top = angular.element(document.querySelector('.scroll-content'))[0].scrollTop,
                    op = 0;

                if (top > 30) {
                    op = ((top - 30) / 100).toFixed(1);
                } else {
                    op = 0;
                }

                $scope.HeaderBg = {
                    opacity: op
                }
            }
        }
    };
})