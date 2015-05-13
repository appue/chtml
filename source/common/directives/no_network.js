'use strict';

angular.module('phoneApp')
	.directive('noNetwork', function ($state, $stateParams) {
		return {
			restrict: 'E',
			templateUrl: 'scripts/phoneApp/components/no-network/no-network.html',
			controller: function ($scope) {
				
				$scope.refreshPage = function () {

					var current = $state.current;
					var params = angular.copy($stateParams);
					$state.transitionTo(current, params, {
						reload: true,
						inherit: true,
						notify: true
					});

				};

			}
		};
	});