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

            // for (var i=0,len=el.length; i<len; i++) {

            angular.forEach(el, function(v, k) {
                var h = v.offsetHeight;

                alert(h);
                // if (obj.x <= obj.y) {
                //     obj.layout.push({
                //         'z': i,
                //         'h': h,
                //         'type': 'left',
                //         'top': obj.x + 10
                //     });
                //     obj.x = obj.layout[i].top + h;
                // } else {
                //     obj.layout.push({
                //         'z': i,
                //         'h': h,
                //         'type': 'right',
                //         'top': obj.y + 10
                //     });
                //     obj.y = obj.layout[i].top + h;
                // }
            }


            return obj;

        }
    }

    return setFalls;
});