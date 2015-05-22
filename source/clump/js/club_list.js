angular.module('phoneApp')

.controller('tClubList', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    var pageView = {
        init: function () {
            var self = this;

            self._setDeploy();

            self._setHeader();

            self._updateData();
        },

        _setDeploy: function () {
            var self = this;
        },

        _setHeader: function () {
            var self = this;
            
            //--设置返回按钮
            $scope.backParam = {
                'url': [
                    'clump/#/club/hot.htm',
                    'clump/index.html#/club/hot.htm'
                ]
            };
        },

        _updateData: function () {
            var self = this;

            /*
            * 1、每个圈子当天发帖量多的排前面，每24小时会自动更新一次（取前20个）
            * 2、圈子ID降序
            * 3、圈子发帖时间降序
            * 4、圈子发帖时间升序
            * 5、字母排序（所有的圈子全部吐出）
            */
            widget.ajaxRequest({
                noMask: true,
                url: '$local/Tools/getListClub',
                data: {
                    SortType: 5
                },
                success: function (data) {
                    alert(data);
                }
            });
        }
    };

    pageView.init();

});