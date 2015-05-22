/*
* 消息-通知
* /home/#/msg/notice
*/
angular.module('phoneApp')

.controller('HomeMsgNoticeCtrl', function(
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
                'hash': 'msgNotice'
            };
        }
    };

    pageView.init();
});