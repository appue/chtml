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
    $ionicLoading,
    widget
){

    //显示loadding
    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.footerTab = 2;

    //--顶部菜单
    $scope.DataList = {
    };

    
    $scope.redirectUrl = {
        SubjectList: { //--更多专题
            'url': '#/forum/subject/list.htm'
        }
    };


    widget.ajaxRequest({
        noMask: true,
        url: 'getFindHome',
        data: {},
        success: function (data) {
            var i = 0,
                res = data;

            res.CateList = [];

            // angular.forEach(res.SubjectList, function(v, k) {
            //     v.SiteUrl = {
            //         'url': ['clump/#/subject/detail-'+ v.SubjectId +'.htm']
            //     };
            // });

            angular.forEach(res.CategoryList, function(v, k) {
                // v.SiteUrl = '#/forum/cate/list-'+ v.CateId +'.htm?title='+ encodeURIComponent(v.CateName);

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

            $ionicLoading.hide();
        },
        error: function (data) {
            $ionicLoading.hide();
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