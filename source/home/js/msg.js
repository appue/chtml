angular.module('phoneApp')

.controller('HomeMsgCtrl', function($scope, $state, SetFalls, routerRedirect){
    
    var view = {
        init: function() {
            var self = this;

            self._setDeploy();
        },

        _setDeploy: function() {
            var self = this;

            $scope.footerTab = 4;
        }
    };

    view.init();
});