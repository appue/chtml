/*
* 全部圈子
* /clump/#/club/list.htm
*/
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

            var datas = {
                ClubList: [
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/1.jpg', TotalUser: '258', Letter: 'A', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/2.jpg', TotalUser: '258', Letter: 'A', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/3.jpg', TotalUser: '258', Letter: 'B', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/4.jpg', TotalUser: '258', Letter: 'B', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/5.jpg', TotalUser: '258', Letter: 'C', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/6.jpg', TotalUser: '258', Letter: 'C', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/7.jpg', TotalUser: '258', Letter: 'D', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/8.jpg', TotalUser: '258', Letter: 'D', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/9.jpg', TotalUser: '258', Letter: 'F', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/1.jpg', TotalUser: '258', Letter: 'F', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/3.jpg', TotalUser: '258', Letter: 'G', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/2.jpg', TotalUser: '258', Letter: 'G', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/4.jpg', TotalUser: '258', Letter: 'G', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/5.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/6.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/7.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/8.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
                    {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/9.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } }
                ]
            };

            $scope.DataList = [];

            angular.forEach(datas.ClubList, function (v, k) {
                if ($scope.DataList.length == 0) {

                    $scope.DataList = [{
                        'Letter': 'A',
                        'List': [v]
                    }];

                } else {

                    var len = $scope.DataList.length;

                    if ($scope.DataList[len-1].Letter == v.Letter) {
                        $scope.DataList[len-1].List.push(v);
                    } else {
                        $scope.DataList.push({
                            'Letter': v.Letter,
                            'List': [v]
                        });
                    }
                }
            });

            /*
            * 1、每个圈子当天发帖量多的排前面，每24小时会自动更新一次（取前20个）
            * 2、圈子ID降序
            * 3、圈子发帖时间降序
            * 4、圈子发帖时间升序
            * 5、字母排序（所有的圈子全部吐出）
            */
            // widget.ajaxRequest({
            //     noMask: true,
            //     url: '$local/Tools/getListClub',
            //     data: {
            //         SortType: 5
            //     },
            //     success: function (data) {
            //         alert(data);
            //     }
            // });
        }
    };

    pageView.init();

});