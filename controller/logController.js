app.controller('logCtrl',['$scope', '$rootScope', '$location', '$window',
function($scope, $rootScope, $location, $window){
	$scope.return1=function(){
		$window.history.back();
	};
}]);