/*
* 热门圈子
* /clump/#/club/hot.htm
*/
angular.module('phoneApp')

.controller('tClubHot', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    //--查看全部圈子
    $scope.redirectUrl = {
        Club: {
            'url': ['clump/#/club/list.htm']
        }
    };

    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/find.htm']
    };


    widget.ajaxRequest({
        noMask: true,
        url: 'getHotListClub',
        data: {
            ShowNum: 20
        },
        success: function (data) {
            var res = {};

            res.ClubList = data.ClubList || [];

            angular.forEach(res.ClubList, function (v, k) {
                v.SiteUrl = {
                    'url': ['/clump/#/club/detail-'+ v.ClubId +'.htm?from='+ currentUrl]
                };
            });

            $scope.DataList = res;
        },
        error: function (data) {

        }
    });



    $scope.DataList = {
        ClubList: [
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            },
            {
                ClubId: 1,
                ClubName: '孩子们的手工王国',
                ImageUrl: '../themes/temp/7.jpg',
                TotalUser: 200,
                CategoryList: [
                    {CateName: '玩教具'},
                    {CateName: '手工'}
                ],
                SiteUrl: {
                    'url': ['/clump/#/club/detail-1.htm?from='+ currentUrl]
                }
            }
        ]
    };

});