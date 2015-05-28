angular.module('phoneApp')

/*
* header search 搜索顶部
*/
.directive('searchHeader', function (
) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../common/directives/search_header.html',
        // controller: function ($scope, $element, $attrs) {
        // },
        // compile: function (element, attrs, transclude) {
        //  return {
        //      pre: function preLink(scope, element, attrs, controller) {},
        //      post: function postLink(scope, element, attrs, controller) {}
        //  }
        // },
        link: function (scope, element, attrs) {
        }
    };
});