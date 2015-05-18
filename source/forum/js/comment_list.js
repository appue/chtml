angular.module('phoneApp')

.controller('tCommentList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect
) {
    $scope.goIndex = function(){
        // // $state.go('homes');
        // window.loa.href = '#/index/homes'
    }

    var view = {
        init: function() {
            var self = this;

            self._setDeploy();
        },

        _setDeploy: function() {
            var self = this;
        }
    }

    view.init();
});