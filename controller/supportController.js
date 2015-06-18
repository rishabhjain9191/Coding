/**
 * aboutCtrl - supportController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('supportCtrl',['$scope', '$location', 'Constants', '$window','CSInterface','Config', 'viewManager', 
function($scope, $location, Constants, $window, CSInterface, Config, viewManager){
	
	
	$scope.return1=function(){
		$window.history.back();
	};
	$scope.repairDB=function(){
		//Rename the old database file, create a new one and return its contents
		$location.path('repairDB');
	}
	$scope.openURL=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SITE);
	};
}]);