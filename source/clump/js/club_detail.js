/*
* 发现首页
* /clump/#/club/detail-{id}.html
*/
angular.module('phoneApp')

.controller('tClubDetail', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){
    var currentUrl = widget.getCurrentUrl();

    $scope.pageIndex = 1;
    
    //--设置返回按钮
    $scope.backParam = {
        'url': ['clump/#/club/list.htm']
    };

    $scope.redirectUrl = {
        Ranking: {
            'url': ['clump/#/club/ranking-'+ $stateParams.id +'.htm']
        }
    };

    //--设置横向滚动
    $scope.myScrollOptions = {
        'wrapper': {}
    };

    $scope.loadMore = function() {
        $scope.pageIndex++;

        $scope.DataList.ArticleList.push(
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/6.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/7.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 200 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/8.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 300 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } }
        );
    };
    $scope.DataList = {

        ClubId: 1,//------------圈子ID
        ClubName: '孩子们的手工王国',//----------圈子名称
        Description: '在这里，可以让孩子找到属于他们的手工创作天地。',//-------圈子简介
        ImageUrl: '../themes/temp/7.jpg',//----------圈子图片
        
        TotalMember: '2435',//-------圈子里的成员数
        TotalSign: '8',//---------用户签到次数
        TotalAlwaysSign: '4',//---用户连续签到次数
        StateJoin: true,//---------用户是否加入圈子（True/False）
        StateSign: true,//---------当前用户是否已签到（True/False）

        CategoryList: [
            {
                CateId: 1,//----栏目ID
                CateName: '环境创设',//--栏目名称
                ImageUrl: '../themes/temp/7.jpg'//--栏目图片
            },
            {
                CateId: 1,//----栏目ID
                CateName: '环境创设',//--栏目名称
                ImageUrl: '../themes/temp/5.jpg'//--栏目图片
            },
            {
                CateId: 1,//----栏目ID
                CateName: '环境创设',//--栏目名称
                ImageUrl: '../themes/temp/4.jpg'//--栏目图片
            },
            {
                CateId: 1,//----栏目ID
                CateName: '环境创设',//--栏目名称
                ImageUrl: '../themes/temp/8.jpg'//--栏目图片
            }
        ],

        SiteUrl: {

        },

        ArticleList: [
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/1.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 162 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/2.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 124 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/4.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 321 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/5.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm?from='+currentUrl] } }
        ]
    };

});