angular.module('phoneApp')

.controller('HomeIndexCtrl', function($scope, $state, SetFalls){
    $scope.goIndex = function(){
        // // $state.go('homes');
        // window.loa.href = '#/index/homes'
    }

    $scope.currentTab = 1;

    $scope.tabChange = function(e){

       var a = angular.element(e.currentTarget).find('li');
       console.log(a.index('li'));
    }



    SetFalls.init({
        'elem': '.js_falls'
    }); 
});