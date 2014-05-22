/**
 * aboutCtrl - aboutController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('aboutCtrl',['$scope', '$location', 'Constants', '$window',
function($scope, $location, Constants, $window){
	$scope.app_version_no = Constants.EXTENSION_VERSION_NUMBER;	
	$scope.return1=function(){
		$window.history.back();
	};
	
	$scope.terms=function(){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_TERMS_OF_SERVICE);
	};
	
	$scope.privacy=function(){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_PRIVACY_POLICY);
	};
	
	$scope.showLog=function(){
		$location.path('log');
	};
}]);