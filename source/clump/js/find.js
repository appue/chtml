/*
* 发现首页
* /clump/#/find.html
*/
angular.module('phoneApp')

.controller('tFindIndex', function (
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

            // self._updateData();
        },

        _setDeploy: function () {
            var self = this;


            $scope.footerTab = 2;

            $scope.urlMenu = [
                {
                    'title': '猜你喜欢',
                    'list': {
                        'url': [
                            'clump/#/find/like.htm',
                            'clump/index.html#/find/like.htm',
                        ]
                    }
                },
                {
                    'title': '圈子',
                    'list': {
                        'url': [
                            'clump/#/club/hot.htm',
                            'clump/index.html#/club/hot.htm',
                        ]
                    }
                },
                {
                    'title': '活动',
                    'list': {
                        'url': [
                            'clump/#/like.htm',
                            'clump/index.html#/like.htm',
                        ]
                    }
                }
            ]
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