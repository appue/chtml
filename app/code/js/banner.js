angular.module('Tjoys')

.controller('tBanner', function (
    $scope,
    $rootScope,
    $stateParams,
    widget
){
    $rootScope.Menu = 'web';
    $rootScope.SubMenu = 'banner';

    $scope.DataList = {};

    $scope.loadMore = function () {
        widget.ajaxRequest({
            scope: $scope,
            url: 'getBannerList',
            data: {},
            success: function (res) {
                angular.forEach(res.BannerList, function (v, k) {
                    switch (v.Page) {
                        case 'home':
                            v.PageName = '首页';
                        break;

                        case 'guess':
                            v.PageName = '猜你喜欢';
                        break;
                    }
                });
                $scope.DataList = res;
            }
        });
    };

    $scope.loadMore();

    // 删除
    $scope.Delete = function (id) {
        widget.ajaxRequest({
            scope: $scope,
            url: 'delBanner',
            data: {
                BannerId: id
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
