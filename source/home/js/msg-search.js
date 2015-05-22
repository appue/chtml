/*
* 消息-搜索好友||消息-好友
* /home/#/msg/search
*/
angular.module('phoneApp')

.controller('HomeMsgSearchCtrl', function(
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