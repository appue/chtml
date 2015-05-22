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

    var pageView = {
        init: function() {
            var self = this;

            self._setDeploy();
        },

        _setDeploy: function() {
            var self = this;
            
            //--设置返回按钮
            $scope.backParam = {
                'module': 'home',
                'hash': 'msg'
            };
        }
    }

    pageView.init();
});