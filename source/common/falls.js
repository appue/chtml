angular.module('phoneApp')

.factory('SetFalls', function() {

    var setFalls = {
        /*
        * @params:{
        *     elem: 
        * }
        */
        init: function(params){
            var el = document.querySelectorAll(params.elem +' li');

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

            var w = document.querySelector(params.elem +' li').offsetWidth,
                p = w/200;

            angular.forEach(el, function(v, k) {
                v.getElementsByTagName('img')[0].style.cssText = 'height:'+ v.dataset.y * p +'px';
                
                var h = v.offsetHeight;

                if (obj.x <= obj.y) {
                    obj.layout.push({
                        'z': k,
                        'h': h,
                        'type': 'left',
                        'top': k == 0 ? obj.x : obj.x + 10
                    });
                    obj.x = obj.layout[k].top + h;
                } else {
                    obj.layout.push({
                        'z': k,
                        'h': h,
                        'type': 'right',
                        'top': k == 1 ? obj.y : obj.y + 10
                    });
                    obj.y = obj.layout[k].top + h;
                }
            });


            return obj;

        }
    }

    return setFalls;
});