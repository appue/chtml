angular.module('phoneApp')

.factory('SetFalls', function() {

    var setFalls = {
        /*
        * @params:{
        *     elem: 
        * }
        */
        init: function(params){
            var $elem = document.querySelectorAll(params.elem +' li');

            
            var arrHeight
            for (var i=0,len=$elem.length; i<len; i++) {

            }
        }
    }

    return setFalls;
});