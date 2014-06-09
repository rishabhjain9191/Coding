/**
 * aboutCtrl - aboutController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('aboutCtrl',['$scope', '$location', 'Constants', '$window','CSInterface','Config',
function($scope, $location, Constants, $window, CSInterface, Config){
	
	//Removing build from version number
	var res=Constants.EXTENSION_VERSION_NUMBER.split('.');
	var str="";
	for(var i=0;i<3;i++){
		str =str + res[i]+'.';
	}
	$scope.app_version_no=str.substring(0,str.length-1);
	
	if(Config.username && Config.username!=""){
		$scope.message="Logged in as: "+Config.username;
	}
	else{
		$scope.message="Currently not logged in";
	}
	$scope.return1=function(){
		$window.history.back();
	};
	
	$scope.terms=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_TERMS_OF_SERVICE);
	};
	
	$scope.privacy=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_PRIVACY_POLICY);
	};
	
	$scope.showLog=function(){
		$location.path('log');
	};
	
	$scope.openURL=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SITE);
	};
}]);