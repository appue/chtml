angular.module('phoneApp')

/*
* scroll 事件绑定
*/
.directive('whenScrolled', function (
    $parse, 
    $timeout
) {
    return function (scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function () {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);

                $timeout(scope.setFalls, 0);
            }
        });
    };
})

/*
* 瀑布流布局
*/
.directive('falls', function (
    $parse, 
    $timeout
) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<ul class="mod_list_falls ng-transclude"></ul>',
        controller: function ($scope, $element, $attrs) {

            $scope.setFalls = function() {
                var el = $element.find('li');

                // layout: [{
                //     'z': //--索引值
                //     'h': //--高度
                //     'type': //--left or right
                //     'top': //--距离上面的高度
                // }]
                var obj = {
                    'layout': [],
                    'x': 0, //--左边总高度
                    'y': 0 //--右边总高度
                };

                var w = $element.find('li')[0].offsetWidth,
                    p = w/200;

                angular.forEach(el, function(v, k) {

                    angular.element(v).find('img').eq(0).css({
                        'height': v.dataset.y * p +'px'
                    });

                    var h = v.offsetHeight;

                    if (obj.x <= obj.y) {
                        obj.layout.push({
                            'z': k,
                            'h': h,
                            'type': 'left',
                            'top': obj.x + 10
                        });
                        obj.x = obj.layout[k].top + h;
                    } else {
                        obj.layout.push({
                            'z': k,
                            'h': h,
                            'type': 'right',
                            'top': obj.y + 10
                        });
                        obj.y = obj.layout[k].top + h;
                    }

                });

                if (obj.x <= obj.y) {
                    $element.css('height', obj.y +'px');
                } else {
                    $element.css('height', obj.x +'px');
                }

                angular.forEach(el, function(v, k) {
                    v.style.cssText = obj.layout[k].type +':0;top:'+ obj.layout[k].top +'px';
                });
            };

            $timeout($scope.setFalls, 0);
            
        }
    };
});