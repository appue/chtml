/*
* 消息-私聊
* /home/#/msg/whisper
*/
angular.module('phoneApp')

.controller('HomeMsgWhisperCtrl', function(
    $scope, 
    $state
){
    
    var pageView = {
        init: function() {
            var self = this;

            self._setDeploy();

            self._setHeader();
        },

        _setDeploy: function() {
            var self = this;
        },

        _setHeader: function() {
            var self = this;
            
            //--设置返回
            $scope.backParam = {
                'url': [
                    'home/#/msg',
                    'home/index.html#/msg'
                ]
            };
        }
    };

    pageView.init();
});