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

        scope.pageIndex = scope.pageIndex || 1; //---------------------页面索引值，当前第几页
        scope.pageSize = scope.pageSize || 5; //-----每页显示多少条
        scope.pageTotal = scope.pageTotal || 100; //--总的条数
        scope.showHeader = scope.showHeader || false; //----------------页面头是否有透明过度

        if (scope.showHeader) {
            elm.on('touchmove', function() {
                var op = (raw.scrollTop / 100).toFixed(1);
                if (op >= 1) {
                    op = 1;
                }

                elm.parent().find('header').eq(0).css('background', 'rgba(255,255,255,'+ op +')');
            });
        }

        elm.on('scroll', function () {
            if (scope.showHeader) {
                var op = (raw.scrollTop / 100).toFixed(1);
                if (op >= 0.9) {
                    op = 0.95;
                }

                elm.parent().find('header').eq(0).css('background', 'rgba(255,255,255,'+ op +')');
            }

            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {

                if (scope.pageIndex * scope.pageSize >= scope.pageTotal) {
                    console.log('没有更多数据了！');
                    return;
                }

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

            /*
            * obj---
            * layout: [{
            *     'z': //--索引值
            *     'h': //--高度
            *     'type': //--left or right
            *     'top': //--距离上面的高度
            * }]
            */
            $scope.$parent.setFalls = function() {

                var el = $element.find('li'),
                    obj = {
                        'layout': [],
                        'x': 0, //--左边总高度
                        'y': 0 //--右边总高度
                    },
                    w = $element.find('li')[0].offsetWidth,
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

            $timeout($scope.$parent.setFalls, 0);
            
        }
    };
});