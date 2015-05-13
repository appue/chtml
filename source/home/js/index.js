angular.module('phoneApp')

.controller('HomeIndexCtrl', function($scope, $state, SetFalls, routerRedirect){
    $scope.goIndex = function(){
        // // $state.go('homes');
        // window.loa.href = '#/index/homes'
    }

    $scope.currentTab = 1;

    $scope.tabChange = function(opt){
        // alert(angular.element(e.currentTarget).index());
        // console.log(a.index('li'));
        if (opt == 1) {
            $scope.currentTab = 1;
        } else {
            // $scope.currentTab = 0;
            routerRedirect.toJump({
                'opts': {
                    'href': '/entry/index.html#/login'
                }
            });
        }
    }

    var obj = SetFalls.init({
        'elem': '.js_falls'
    }); 
    
    console.log(obj);

    if (obj.x <= obj.y) {
        document.querySelector('.js_falls').style.cssText = 'height:'+ obj.y +'px';
    } else {
        document.querySelector('.js_falls').style.cssText = 'height:'+ obj.x +'px';
    }

    var html = document.querySelectorAll('.js_falls li');

    for(var i=0,len=html.length; i<len; i++) {
        html[i].style.cssText = obj.layout[i].type +':0;top:'+ obj.layout[i].top +'px';
    }
});