/**
 * loginCtrl - loginController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

 app.controller('loginCtrl',['viewManager','$scope','$rootScope','$location','$http','Config','Constants','loginUtils','preloader','CSInterface','debuggerUtils',
function(viewManager, $scope, $rootScope, $location, $http, Config, Constants, loginUtils, preloader, CSInterface, debuggerUtils){
	console.log("On Login Page");
	preloader.hideLoading();
	$scope.alert_message="Unknown error. Please contact us at support@creativeworx.com.";
	$scope.showLogin=false;
	$scope.modalShown=false;
	$scope.keepLoggedIn='false';
	$scope.message="";
	$scope.user={};
	$scope.user.email="";
	$scope.user.password="";

    if(!viewManager.loggedOut){
        preloader.showLoading();
        loginUtils.tryLoginFromConfig()
        .then(function(res){
            console.log("tryLoginFromConfig"+res);
            switch(res){
                case 100:$scope.showLogin=true;preloader.hideLoading();break;
                case 200:preloader.hideLoading();viewManager.userLoggedIn();break;
            }
        })
	}
	else{
		$scope.showLogin=true;
		preloader.hideLoading();
	}

	$scope.login=function(){
		console.log($scope);
		console.log($scope.user.email);
		debuggerUtils.updateLogs("Login Attempt With User: " + $scope.user.email);
		console.log($scope.user.password);
		debuggerUtils.updateLogs("Login Attempt With Password: " + $scope.user.password);
		/*if($scope.user.email!="" && $scope.user.password!=""){
		debuggerUtils.updateLogs("Login Attempt With User: " + JSON.stringify($scope.user));
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
		}*/
		var user_password=$('#user_password').val();
		var user_email=$('#user_email').val();
		
		if(user_email!="" && user_password!=""){
            debuggerUtils.updateLogs("Login Attempt With User: " + JSON.stringify($scope.user));
			preloader.showLoading();
			var hashedPassword=MD5(user_password);
			Config.username = user_email;
			Config.password = hashedPassword;

			loginUtils.login(user_email, hashedPassword)
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
            $scope.alert_message="Username and Password cannot be left blank!";
			$scope.modalShown = true;
		}
	};

	$scope.signup=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_SIGNUP);
	};

	$scope.forgetLogin=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SERVICE + Constants.URL_FORGOT_LOGIN);
	};
	
	
	
		var exploreScope=function($scope){
		console.log($scope);
		console.log("1");
		if(!$scope){
			return;
		}
		if($scope.user){
			console.log("parent User Found  " + $scope.user.email);
			debuggerUtils.updateLogs("parent User Found  " + $scope.user.email);
			
		}
		console.log("2");
		if($scope.$$prevSibling){
			var prevSibling=$scope.$$prevSibling
			while(prevSibling){
				console.log("prev");
				if(prevSibling.user){
					console.log("prev user Found  " + prevSibling.user.email);
					debuggerUtils.updateLogs("prev user Found  " + prevSibling.user.email);
				}
				prevSibling=prevSibling.$$prevSibling;
			}
		}
		console.log("3");
		if($scope.$$nextSibling){
			var nextSibling=$scope.$$nextSibling;
			while(nextSibling!=null){
			console.log("next");
				if(nextSibling.user){
					console.log("next user Found  " + nextSibling.user.email);
					debuggerUtils.updateLogs("next user Found  " + nextSibling.user.email);
				}
				nextSibling=nextSibling.$$nextSibling;
			}
		}
		if($scope.$parent)
			exploreScope($scope.$parent);
	};
	
	exploreScope($scope);
	
	
}]);
