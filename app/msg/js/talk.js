/*
 * 消息-私聊
 * /home/#/msg/whisper.htm
 */
angular.module('phoneApp')

.controller('tMsgTalk', function(
    $scope,
    $state,
    widget
) {
    $scope.Deploy = {
        pageIndex: 0,
        pageSize: 15,
        isLoading: false,
        isMore: true
    };

    widget.initUser($scope);

    $scope.DataList = {
        TalkList: []
    };

    $scope.loadMore = function() {

        if (!$scope.Deploy.isLogin) return;

        widget.ajaxRequest({
            scope: $scope,
            showPage: true,
            url: 'getMsgTalk',
            data: {},
            success: function(data) {
                if (data.TalkList && data.TalkList.length > 0) {

                    $scope.DataList.TalkList = $scope.DataList.TalkList.concat(data.TalkList);

                }
            }
        });
    };

    if ($scope.Deploy.isLogin) {
        $scope.loadMore();
    }

});