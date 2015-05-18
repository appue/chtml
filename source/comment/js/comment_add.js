angular.module('phoneApp')

.controller('CommentAddCtrl', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect
){

    var view = {
        init: function() {
            var self = this;

            self._setDeploy();


            self.addComment();
        },

        _setDeploy: function() {
            var self = this;
        },

        addComment: function() {
            var self = this;

            $scope.addComment = function() {
                alert(1);
            }
        }
    }

    view.init();
});