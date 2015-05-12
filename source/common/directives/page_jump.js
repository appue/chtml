angular.module('phoneApp')

.directive('pageJump', function ($window, $state, $stateParams) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('click', function () {

                
            });
        }
    };
});