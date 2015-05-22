/*
* 消息-赞
* /home/#/msg/praise
*/
angular.module('phoneApp')

.controller('HomeMsgPraiseCtrl', function(
    $scope, 
    $state
){
    
    var pageView = {
        init: function() {
            var self = this;

            self._setDeploy();
        },

        _setDeploy: function() {
            var self = this;
            
            //--设置返回
            $scope.backParam = {
                'module': 'home',
                'hash': 'msg'
            };
        }
    };

    pageView.init();
});