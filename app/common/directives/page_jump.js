angular.module('phoneApp')

.directive('pageJump', function (
    $window,
    $state,
    $rootScope,
    $stateParams,
    $ionicHistory,
    $ionicViewSwitcher
) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('click', function (event) {
                
                var router = attrs.router,
                    options = attrs.options ? JSON.parse(attrs.options) : {};

                $ionicViewSwitcher.nextDirection('forward');
                $state.go(router, options);

            });
        }
    };
});