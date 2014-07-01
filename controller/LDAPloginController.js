/**
 * loginCtrl - LDAPloginController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('LDAPloginCtrl',['viewManager','$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader','CSInterface',
function(viewManager, $scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader,CSInterface){
	
	
	console.log("On Login Page");
	
	console.log($location.path());
	preloader.hideLoading();
	$scope.alert_message="Username and Password cannot be left blank!";
	$scope.showLogin=false;
	$scope.modalShown = false;
	$scope.keepLoggedIn='false';	
	$scope.message="";
	
	var image_error="./assets/images/question_mark.gif";
	var image_success="./assets/images/check.png";
	
	if(Config.companyEmail=="0"){
			$scope.ldap_message_image=image_error;
			$scope.ldap_message="LDAP Credentials not found";
		}
		else if(Config.companyEmail.length>1){
			$scope.ldap_message_image=image_success;
			$scope.ldap_message=Config.companyName;
		}
	
	if(!viewManager.loggedOut){
		console.log("In if");
		preloader.showLoading();
		loginUtils.tryLoginFromConfig()
		.then(function(res){
		console.log("tryLoginFromConfig"+res);
		switch(res){
			case 100:$scope.showLogin=true;preloader.hideLoading();return
			case 200:preloader.hideLoading();viewManager.userLoggedIn();return;
		}
		})
	}
	else{
		console.log("In else");
		$scope.showLogin=true;
		
		preloader.hideLoading();
	}
	
	$scope.login=function(){
		if($scope.user && $scope.user.email!="" && $scope.user.password!=""){	
			preloader.showLoading();
			var hashedPassword=MD5($scope.user.password);
			Config.username = $scope.user.email;
			Config.password = hashedPassword;
				
			loginUtils.login($scope.user.email, hashedPassword, Config.companyEmail)
			.then(function(data){
				preloader.hideLoading();
				if(data.Msg=="Error: Authentication failed"){$scope.message="Authentication Failure";}
				else{
					//User Authenticated
					
					$rootScope.canEdit=canEdit(data[0].oid, data[0].org_settings);
					Config.data=data[0];
					Config.keepMeLoggedIn=$scope.checked;
					Config.userid=Config.data.userid;
					Config.firstname=Config.data.firstname;
					CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					});
					//Config.updateConfig();
					$rootScope.LoggedInItems=true;
					viewManager.userLoggedIn();
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
	
	
}]);