angular.module('Tjoys')

.controller('tUser', function (
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu = 'user';
    $rootScope.SubMenu = 'user';

    $scope.Page = {
        pageIndex: parseInt($stateParams.index, 0) || 1,
        pageSize: 20,

        SelectId: [], // 选择的ID,
        isAll: false
    };

    $scope.DataList = {};

    $scope.loadMore = function () {
        $scope.Page.isAll = false;

        widget.ajaxRequest({
            scope: $scope,
            url: 'getUserList',
            data: {
                PageIndex: $scope.Page.pageIndex,
                PageSize: $scope.Page.pageSize
            },
            success: function (res) {
                angular.forEach(res.UserList, function (v, k) {
                    switch (v.Sex) {
                        case 1:
                            v.SexName = '男';
                        break;

                        case 2:
                            v.SexName = '女';
                        break;
                    }

                    if ($rootScope.CityList) {
                        v.AreaName = widget.getCityName(v.Area);
                    } else {
                        widget.getCityName(v.Area).then(function (AreaName) {
                            v.AreaName = AreaName;
                        });
                    }
                });
                $scope.DataList = res;
            }
        });
    };

    $scope.loadMore();



    // 选择ID
    // $scope.setSelect = function (e, type) {
    //     if (type && type == 'all') {
    //         if ($scope.Page.isAll) {
    //             angular.forEach($scope.DataList.UserList, function (v, k) {
    //                 v.Check = false;
    //             });
    //             $scope.Page.isAll = false;
    //         } else {
    //             angular.forEach($scope.DataList.UserList, function (v, k) {
    //                 v.Check = true;
    //             });
    //             $scope.Page.isAll = true;
    //         }
    //     } else {
    //         var $that = angular.element(e.target),
    //             state = true,
    //             key   = $that.attr('data-key'),
    //             id    = $that.attr('data-id');

    //         if ($scope.DataList.UserList[key].Check) {
    //             $scope.Page.isAll = false;
    //         }

    //         $scope.DataList.UserList[key].Check = !$scope.DataList.UserList[key].Check;

    //         angular.forEach($scope.DataList.UserList, function (v, k) {
    //             if (!v.Check) {
    //                 state = false;
    //             }
    //         });

    //         if (state) {
    //             $scope.Page.isAll = true;
    //         } else {
    //             $scope.Page.isAll = false;
    //         }
    //     }
    // };
    // $scope.getSelect = function () {
    //     $scope.Page.SelectId = [];

    //     angular.forEach($scope.DataList.UserList, function (v, k) {
    //         if (v.Check) {
    //             $scope.Page.SelectId.push(v.UserId);
    //         }
    //     });
    // };

    // 删除
    $scope.Delete = function (id) {
        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('选择删除的用户');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'delUser',
            data: {
                UserId: $scope.Page.SelectId
            },
            success: function (res) {
                widget.msgToast('删除成功');
                $scope.loadMore();
            },
            error: function (err) {
                widget.msgToast('删除失败');
            }
        });
    };
});
