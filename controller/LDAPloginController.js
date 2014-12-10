/**
 * loginCtrl - LDAPloginController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

 app.controller('LDAPloginCtrl',['viewManager','$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader','CSInterface','APIUtils','Messages',
function(viewManager, $scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader,CSInterface, APIUtils, Messages){


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
    			case 100:$scope.showLogin=true;preloader.hideLoading();return;
    			case 200:preloader.hideLoading();viewManager.userLoggedIn();return;
    		}
		});
	}
	else{
		console.log("In else");
		$scope.showLogin=true;

		preloader.hideLoading();
	}



	
	/* JQ Implementation*/
	$scope.login=function(){

		var company_password=$('#company_password').val();
		var company_email=$('#company_email').val();
		var keepMeLoggedIn=$('#keepMeLoggedIn').prop('checked');
		if(company_email!="" && company_password!=""){

			preloader.showLoading();
			//No hashing in case of LDAP Login
			var password=company_password;
			Config.username = company_email;
			Config.password = password;

				
			APIUtils.login(company_email, password,company_password, Config.companyEmail)
						.then(function(result){
				if(result.status=="200"){
					console.log("auth success")
					APIUtils.getUsers().then(function(result){
						console.log("User Details Fetched");
						preloader.hideLoading();					
						var data=result.data.result;
						console.log(data);
						if(data.oid){
							Config.oid=data.oid;
							$rootScope.canEdit=canEdit(data.oid, data.org_settings);
						}
						else
							$rootScope.canEdit=true;
						Config.data=data;
						
						console.log(keepMeLoggedIn);
						Config.keepMeLoggedIn=keepMeLoggedIn;
						Config.keepMeLoggedIn=$scope.checked;
						Config.userid=Config.data._id;
						Config.firstname=Config.data.firstname;
						console.log(Config);
						CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
						});
						Constants.update(Config);
						$rootScope.LoggedInItems=true;
						viewManager.userLoggedIn();
					
				}, function(result){
					console.log("Can't Fetch user details");
					console.log(result.data);
					preloader.hideLoading();
					$scope.message=Messages.authMsg[result.status];
				})
			}
			else{

				preloader.hideLoading();
				$scope.message=Messages.authMsg[result.status];
			}
			},function(result){
				console.log("Auth failed");
				console.log(result.status);
				preloader.hideLoading();
				$scope.message=Messages.authMsg[result.status];
			});
		}
		else{
			$scope.modalShown = true;
		}
	};






	/* Angular Implementation
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
	*/



}]);
