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
    var currentUrl = widget.getCurrentUrl();
            

    $scope.footerTab = 2;

    //--顶部菜单
    $scope.urlMenu = [
        {'title': '猜你喜欢', 'list': { 'url': ['clump/#/find/like.htm'] } },
        {'title': '圈子', 'list': { 'url': ['clump/#/club/hot.htm'] } },
        {'title': '活动', 'list': { 'url': ['clump/#/activity/list.htm'] } }
    ];

    //--更多专题
    $scope.urlSubjectList = {
        'url': ['clump/#/subject/list.htm']
    };


    widget.ajaxRequest({
        noMask: true,
        url: 'getFindHome',
        data: {},
        success: function (data) {
            var i = 0,
                res = data;

            angular.forEach(res.SubjectList, function(v, k) {
                v.SiteUrl = {
                    'url': ['clump/#/subject/detail-'+ v.SubjectId +'.htm?from='+ currentUrl]
                };
            });

            angular.forEach(res.CategoryList, function(v, k) {
                v.SiteUrl = {
                    'url': ['forum/#/cate/list-'+ v.CateId +'.htm']
                };

                if (res.CateList[i]) {
                    res.CateList[i].push(v);
                } else {
                    res.CateList[i] = [];
                    res.CateList[i].push(v);
                }

                if ((k + 1) % 6 == 0) {
                    i++;
                }
            });

            $scope.DataList = res;

            //--设置滚动
            $scope.$parent.myScrollOptions = { 'wrapper': {} };
            $scope.eventScroll = "wrapper";
        },
        error: function (data) {
        }
    });




    // $scope.DataList = {
    //     SubjectList: [
    //         {SubjectId: 1, ShortName: '送给孩子们的礼物', ImageUrl: '../themes/temp/8.jpg', SiteUrl: {'url': ['clump/#/subject/detail-1.htm?isFrom=find', 'clump/index.html#/subject/detail-1.htm?isFrom=find'] } },
    //         {SubjectId: 2, ShortName: '送给孩子们的礼物', ImageUrl: '../themes/temp/7.jpg', SiteUrl: {'url': ['clump/#/subject/detail-1.htm?isFrom=find'] } },
    //         {SubjectId: 3, ShortName: '送给孩子们的礼物', ImageUrl: '../themes/temp/3.jpg', SiteUrl: {'url': ['clump/#/subject/detail-1.htm?isFrom=find'] } }
    //     ],

    //     CategoryList: [

    //         {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm'] } },
    //         {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm'] } },
    //         {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm'] } },
    //         {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm'] } },
    //         {CateId: 3, CateName: '玩教具', SiteUrl: {'url': ['forum/#/cate/list-1.htm'] } }
    //     ]
    // };
});