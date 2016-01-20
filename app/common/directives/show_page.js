angular.module('Tjoys')

// 显示分页
.directive('showPage', function (
    $window,
    $location,
    $rootScope
) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'common/directives/show_page.html',
        controller: function ($scope, $element, $attrs) {
			var init = [1,2,0,-1,-2];

            $scope.changePage = function (id) {
                //var $that = angular.element(e.delegationTarget);
                //   id    = parseInt($that.text(), 0);

                // $scope.Page.SelectId = [];
				reload(id);
            };
			
			// 上一页
			$scope.pagePrev = function () {
				if ($scope.Page.pageIndex == 1) return;
				var id = $scope.Page.pageIndex - 1;
				reload(id);
			};

			// 下一页	
			$scope.pageNext = function () {
				if ($scope.Page.pageIndex == $scope.PageNum) return;
				var id = $scope.Page.pageIndex + 1;
				reload(id);
			};

            $scope.$watch('DataList.Total', function () {
                if (!$scope.DataList.Total) return;
                $scope.PageNum = Math.ceil($scope.DataList.Total / $scope.Page.pageSize);
            });
			
			function reload(id) {
				$scope.Page.pageIndex = id;
				$scope.PageTag = [];

				var start = $scope.Page.pageIndex-2;
				for (var i=0; i<5; i++) {
					$scope.PageTag.push(start+i);
				}
		
                $scope.Page.isAll = false;
                toBackPage(id);
                $scope.loadMore();
			}

			function showPage() {
				$scope.page
        		var step = step || 1;

        		for (var i = 1; i <= max; i += step) input.push(i);
			}

            function toBackPage(id) {
                var url = '',
                    search = $location.$$search;

                search['page'] = id;

                angular.forEach(search, function (v, k) {
                    if (url) {
                        url += '&'+k+'='+v;
                    } else {
                        url = '?'+k+'='+v;
                    }
                })

                $window.history.replaceState(null, '', '/#'+$location.$$path+url);
            }
        }
    };
});
