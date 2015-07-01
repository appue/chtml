angular.module('phoneApp')

// 瀑布流布局
.directive('falls', function (
    $parse,
    $rootScope
) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<ul class="mod_list_falls ng-transclude"></ul>',
        controller: function ($scope, $element, $attrs) {
            $rootScope.setFalls = function(elem) {
                // $scope.isLoading = false;
                // $scope.$parent.isLoading = false;
                // angular.element(document.querySelector('.mod_list_loading')).css('display', 'none');

                if (elem) {
                    var $el = angular.element(document.querySelector(elem));
                } else {
                    var $el = $element;
                }

                var el = $el.find('li');

                if (el.length == 0) return;

                var obj = {
                        'x': 10, //--左边总高度
                        'y': 10 //--右边总高度
                    },
                    w = $el.find('li')[0].offsetWidth,
                    p = w/200;
                    
                angular.forEach(el, function(v, k) {

                    angular.element(v).find('img').eq(0).css({
                        'height': v.dataset.y * p +'px'
                    });

                    var h = v.offsetHeight;

                    if (obj.x <= obj.y) {

                        v.style.cssText = 'left:0;top:'+ obj.x +'px';
                        obj.x = obj.x + 10 + h;

                    } else {

                        v.style.cssText = 'right:0;top:'+ obj.y +'px';
                        obj.y = obj.y + 10 + h;

                    }
                    
                });

                if (obj.x <= obj.y) {
                    $el.css('height', obj.y +'px');
                } else {
                    $el.css('height', obj.x +'px');
                }   

            };

        }
    };
});