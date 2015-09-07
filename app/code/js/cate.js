angular.module('Tjoys')

.controller('tCate', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.showHeader = true;
    $rootScope.Menu = "article";


    $scope.showCate = function (params) {
        $scope.getData(params);
    };

    $scope.getData = function (params) {
        if (!params) params = {};

        if (params.e && angular.element(params.e.target).attr("data-show")) {
            if (params.pid) {
                angular.element(params.e.target).attr("data-show", "");
                $scope.CateList[params.pkey].Sub[params.key].ShowSub = false;
                $scope.CateList[params.pkey].Sub[params.key].Sub = [];
            } else {
                angular.element(params.e.target).attr("data-show", "");
                $scope.CateList[params.key].ShowSub = false;
                $scope.CateList[params.key].Sub = [];
            }
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'getListCategory',
            data: {
                CateId: params.id || ""
            },
            success: function (data) {
                if (!params.id) {
                    $scope.CateList = data.CategoryList;
                } else {
                    if (!params.pid) {
                        angular.element(params.e.target).attr("data-show", true);
                        $scope.CateList[params.key].ShowSub = true;
                        $scope.CateList[params.key].Sub = data.CategoryList;
                    } else {
                        angular.element(params.e.target).attr("data-show", true);
                        $scope.CateList[params.pkey].Sub[params.key].ShowSub = true;
                        $scope.CateList[params.pkey].Sub[params.key].Sub = data.CategoryList;
                    }
                }
            }
        });
    };

    $scope.getData();
    
    // checkbox
    $scope.cInput = [];
    $scope.toggle = function (id) {
        var flag = false,
            i;

        angular.forEach($scope.cInput, function (v, k) {
            if (!flag) {
                if (v == id) {
                    i = k;
                    flag = true;
                }
            }
        });
        
        if (flag) {
            $scope.cInput.splice(i, i);
        } else {
            $scope.cInput.push(id);
        }

        console.log($scope.cInput);
    };


    // 修改栏目
    $scope.modify = function (id) {
        alert(id);
    };

    // 删除栏目
    $scope.delete = function (id) {
        alert(id);
    };

    // 添加栏目
    $scope.add = function (id) {
        alert(id);
    };
});
