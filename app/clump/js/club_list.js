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

    $scope.DataList = {};

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
                v.SiteUrl = {
                    'url': ['clump/#/club/detail-'+ v.ClubId +'.htm']
                };

                if (res.ClubList.length == 0) {

                    res.ClubList.push({
                        'Letter': v.Letter,
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

            angular.extend($scope.DataList, res);
        },
        error: function (data) {

        }
    });

});