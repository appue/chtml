/*
* 发现-二级栏目-列表
* /clump/#/cate/list-sub-{id}.html
*/
angular.module('phoneApp')

.controller('tCateListSub', function (
    $scope, 
    $state, 
    $stateParams, 
    $location, 
    routerRedirect,
    widget
){

    //--设置返回按钮
    $scope.backParam = {
        'url': [
            'forum/#/cate/list-1.htm',
            'forum/index.html#/cate/list-1.htm'
        ]
    };


    //--伪造数据
    $scope.loadMore = function() {
        $scope.pageIndex++;
        
        $scope.DataList.ArticleList.push(
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/6.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/7.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 200 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/8.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 300 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } }
        );
    };
    $scope.DataList = {
        CategoryList: [
            {CateId: 1, CateName: '语言', SiteUrl: {'url': ['forum/#/cate/list-last-1.htm', 'forum/index.html#/cate/list-last-1.htm'] } },
            {CateId: 2, CateName: '美工', SiteUrl: {'url': ['forum/#/cate/list-last-1.htm', 'forum/index.html#/cate/list-last-1.htm'] } },
            {CateId: 3, CateName: '数学', SiteUrl: {'url': ['forum/#/cate/list-last-1.htm', 'forum/index.html#/cate/list-last-1.htm'] } },
            {CateId: 4, CateName: '科学', SiteUrl: {'url': ['forum/#/cate/list-last-1.htm', 'forum/index.html#/cate/list-last-1.htm'] } },
            {CateId: 4, CateName: '音乐', SiteUrl: {'url': ['forum/#/cate/list-last-1.htm', 'forum/index.html#/cate/list-last-1.htm'] } },
            {CateId: 4, CateName: '健康', SiteUrl: {'url': ['forum/#/cate/list-last-1.htm', 'forum/index.html#/cate/list-last-1.htm'] } }
        ],
        ArticleList: [
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/1.jpg', Description: '所需材料：剪刀、彩纸、双面胶等等', Width: 200, Height: 162 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/2.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 124 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/4.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 321 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } },
            {ArticleId: 1, Images: [{ImageUrl: '../themes/temp/5.jpg', Description: '活动意图：《3-6岁儿童学习与发展指南》（以下简称《指南》）告诉我们，幼儿科学学习的方式是直接感知、亲身体验和实际操作，因此，让幼儿', Width: 200, Height: 278 } ], Author: {UserId: 1, ImageUrl: '../themes/temp/3.jpg', UserName: '帖子发布者名称'}, CategoryList: [{CateId: 1, CateName: '泥工'}, {CateId: 1, CateName: '废旧材料'}, {CateId: 1, CateName: '玩教具'} ], SiteUrl: {'url': ['forum/#/thread-1.htm', 'forum/index.html#/thread-1.htm'] } }
        ]
    };

    // widget.ajaxRequest({
    //     noMask: true,
    //     url: '$local/Tools/getContentArticle',
    //     data: {
    //         ArticleId: $stateParams.id
    //     },
    //     success: function (data) {
    //         alert(data);
    //     }
    // });

});