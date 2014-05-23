/**
 * updateCtrl - updateController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('updateCtrl',['$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader',
function($scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader){
	console.log("Update View");
	$rootScope.loading=false;
	$scope.done=function(){
		loginUtils.tryLoginFromConfig();
	}
}]);