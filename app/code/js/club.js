angular.module('Tjoys')

.controller('tClub', function (
    $scope,
    $rootScope,
    widget
){
    $rootScope.Menu = 'club';
    $rootScope.SubMenu = 'club';

    $scope.Page = {
        isAll: false,
        SelectId: []
    };
    $scope.DataList = {};

    $scope.loadMore = function () {
        $scope.Page.isAll = false;

        widget.ajaxRequest({
            scope: $scope,
            url: 'getClubList',
            data: {},
            success: function (res) {
                $scope.DataList = res;
            },
            error: function (err) {
                widget.msgToast('失败');
            }
        });
    };

    $scope.loadMore();

    // 选择ID
    $scope.setSelect = function (e, type) {
        if (type && type == 'all') {
            if ($scope.Page.isAll) {
                angular.forEach($scope.DataList.ClubList, function (v, k) {
                    v.Check = false;
                });
                $scope.Page.isAll = false;
            } else {
                angular.forEach($scope.DataList.ClubList, function (v, k) {
                    v.Check = true;
                });
                $scope.Page.isAll = true;
            }
        } else {
            var $that = angular.element(e.target),
                state = true,
                key   = $that.attr('data-key'),
                id    = $that.attr('data-id');

            if ($scope.DataList.ClubList[key].Check) {
                $scope.Page.isAll = false;
            }

            $scope.DataList.ClubList[key].Check = !$scope.DataList.ClubList[key].Check;

            angular.forEach($scope.DataList.ClubList, function (v, k) {
                if (!v.Check) {
                    state = false;
                }
            });

            if (state) {
                $scope.Page.isAll = true;
            } else {
                $scope.Page.isAll = false;
            }
        }
    };
    $scope.getSelect = function () {
        $scope.Page.SelectId = [];

        angular.forEach($scope.DataList.ClubList, function (v, k) {
            if (v.Check) {
                $scope.Page.SelectId.push(v.ClubId);
            }
        });
    };

    // 删除圈子
    $scope.delClub = function (id) {
        if (id) {
            $scope.Page.SelectId = [id];
        } else {
            $scope.getSelect();    
        }

        if ($scope.Page.SelectId.length == 0) {
            widget.msgToast('请选择要删除的圈子');
            return;
        }

        widget.ajaxRequest({
            scope: $scope,
            url: 'delClub',
            data: {
                ClubId: $scope.Page.SelectId
            },
            success: function (res) {
                $scope.loadMore();
                widget.msgToast('删除圈子成功');
            },
            error: function (err) {
                widget.msgToast('删除圈子失败');
            }
        });
    };
});
