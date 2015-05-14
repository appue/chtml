angular.module('phoneApp')

.controller('HomeSetFeedbackCtrl', function($scope, $state){
    
    var view = {
        init: function() {
            var self = this;

            self._setDeploy();
        },

        _setDeploy: function() {
            var self = this;
            
            $scope.backParam = {
                'module': 'home',
                'hash': 'msg'
            };
        }
    };

    view.init();
});