angular.module('phoneApp')
.controller('personalAttentionCtrl', function ($scope, $stateParams) {

	$scope.backParam = { //--设置返回按钮
		'url': [
			'member/#/personal-' + $stateParams.id + '.htm'
		]
	};

});