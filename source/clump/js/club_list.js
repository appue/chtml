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
    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/club/hot.htm']
    };

    widget.ajaxRequest({
        noMask: true,
        url: 'getListClub',
        data: {
            SortType: 1
        },
        success: function (data) {
            var res = {ClubList: []};

            angular.forEach(data.ClubList, function (v, k) {

                //--ToDo
                if (k == 0 || k == 1 || k==2) {
                    v.Letter = "A";
                } else {
                    v.Letter = "D";
                }


                v.SiteUrl = {
                    'url': ['clump/#/club/detail-'+ v.ClubId +'.htm']
                };

                if (res.ClubList.length == 0) {

                    res.ClubList.push({
                        'Letter': 'A',
                        'List': [v]
                    });

                } else {

                    var len = res.ClubList.length;

                    if (res.ClubList[len-1].Letter == v.Letter) {
                        res.ClubList[len-1].List.push(v);
                    } else {
                        res.ClubList.push({
                            'Letter': v.Letter,
                            'List': [v]
                        });
                    }
                }

            });

            $scope.DataList = res;
        },
        error: function (data) {

        }
    });




    // var datas = {
    //     ClubList: [
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/1.jpg', TotalUser: '258', Letter: 'A', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/2.jpg', TotalUser: '258', Letter: 'A', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/3.jpg', TotalUser: '258', Letter: 'B', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/4.jpg', TotalUser: '258', Letter: 'B', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/5.jpg', TotalUser: '258', Letter: 'C', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/6.jpg', TotalUser: '258', Letter: 'C', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/7.jpg', TotalUser: '258', Letter: 'D', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/8.jpg', TotalUser: '258', Letter: 'D', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/9.jpg', TotalUser: '258', Letter: 'F', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/1.jpg', TotalUser: '258', Letter: 'F', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/3.jpg', TotalUser: '258', Letter: 'G', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/2.jpg', TotalUser: '258', Letter: 'G', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/4.jpg', TotalUser: '258', Letter: 'G', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/5.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/6.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/7.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/8.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } },
    //         {ClubId: 1, ClubName: '孩子们的营养餐', ImageUrl: '../themes/temp/9.jpg', TotalUser: '258', Letter: 'H', CategoryList: [{CateId: 1, CateName: '玩教具'}, {CateId: 1, CateName: '手工'} ], SiteUrl: {'url': ['clump/#/club/detail-1.htm', 'clump/index.html#/club/detail-1.htm'] } }
    //     ]
    // };

    // $scope.DataList = [];

    // angular.forEach(datas.ClubList, function (v, k) {
    //     if ($scope.DataList.length == 0) {

    //         $scope.DataList = [{
    //             'Letter': 'A',
    //             'List': [v]
    //         }];

    //     } else {

    //         var len = $scope.DataList.length;

    //         if ($scope.DataList[len-1].Letter == v.Letter) {
    //             $scope.DataList[len-1].List.push(v);
    //         } else {
    //             $scope.DataList.push({
    //                 'Letter': v.Letter,
    //                 'List': [v]
    //             });
    //         }
    //     }
    // });

});