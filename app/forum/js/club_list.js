// 全部圈子
angular.module('phoneApp')

.controller('tClubList', function (
    $scope,
    widget
){

    $scope.Deploy = {
        isMore: true
    };

    $scope.DataList = {};

    widget.ajaxRequest({
        scope: $scope,
        url: 'getListClub',
        data: {
            SortType: 1
        },
        success: function (data) {
            if (data.ClubList && data.ClubList.length > 0) {
                var res = {ClubList: []};

                angular.forEach(data.ClubList, function (v, k) {
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
            } else {
                $scope.Deploy.isMore = false;
            }




             console.log($scope.DataList.ClubList);
        }
    });

});