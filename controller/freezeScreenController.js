app.controller('freezeScreenController',['$scope','$rootScope', '$location', 'Constants', '$window','CSInterface','Config', 'viewManager', 
function($scope, $rootScope, $location, Constants, $window, CSInterface, Config, viewManager){
	
	$scope.message=viewManager.freezeScreenMessage+" successfully. Changes will be reflected on restart of app";
}]);

