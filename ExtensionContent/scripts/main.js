/*
Initial Setup of the Extension
Will Include : 
* Reading Configuration file
* Settiing Globals from config file
*/

//1. If need to login is true (checked after reading the configuration file)---load login view

function loginUserController($scope) {
	$scope.message = '';
	$scope.login = function () {
	// TODO for the reader: actually save user to database...
	$scope.message = 'Thanks, ' + $scope.user.email + ', we added you!';
	};
	}
	
/* var TTModule=angular.module('TTModule',[]);
var TimeTracker=new TimeTrackerInstance();
function viewRouteConfig($routeProvider) {
$routeProvider.
when('/views/#abc', {
controller: ListController,
templateUrl: 'list.html'
}).
otherwise({
redirectTo:"/views/login.html"
});
}
TTModule.config(viewRouteConfig);








function TimeTrackerInstance(){
	this.loginReq=1;
}
 */


