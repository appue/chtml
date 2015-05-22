/*
* 设置-意见反馈
* /home/#/set/feedback
*/
angular.module('phoneApp')

.controller('HomeSetFeedbackCtrl', function(
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
                'hash': 'setFeedback'
            };
        }
    };

    pageView.init();
});