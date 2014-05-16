app.controller('logCtrl',['$scope', '$rootScope', '$location',
function($scope, $rootScope, $location){

	$scope.return1=function(){
		$location.path('projects');
		//$window.history.back();
	};
}]);