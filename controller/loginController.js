/**
 * loginCtrl - loginController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('loginCtrl',['$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader',
function($scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader){
	preloader.hideLoading();
	$scope.alert_message="Username and Password cannot be left blank!";
	$scope.modalShown = false;
	$scope.keepLoggedIn='false';	
	$scope.message="";
	$scope.login=function(){
		if($scope.user && $scope.user.email!="" && $scope.user.password!=""){	
			preloader.showLoading();
			var hashedPassword=MD5($scope.user.password);
			Config.username = $scope.user.email;
			Config.password = hashedPassword;
			
			loginUtils.login($scope.user.email, hashedPassword)
			.then(function(data){
				preloader.hideLoading();
				if(data.Msg=="Error: Authentication failed"){$scope.message="Authentication Failure";}
				else{
					//User Authenticated
					$rootScope.canEdit=canEdit(data[0].oid, data[0].usertype);
					Config.data=data[0];
					Config.keepMeLoggedIn=$scope.checked;
					Config.userid=Config.data.userid;
					Config.firstname=Config.data.firstname;
					new CSInterface().evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					});
					//Config.updateConfig();
					$rootScope.LoggedInItems=true;
					$location.path('projects');
				}
			},function(error){
				preloader.hideLoading();
				$scope.message="Unable to communicate with server";
			});
		}
		else{
			$scope.modalShown = true;
		}
	};
	
	$scope.signup=function(){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_SIGNUP);
	};
	
	$scope.forgetLogin=function(){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_FORGOT_LOGIN);
	};
}]);