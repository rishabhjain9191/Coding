/**
 * loginCtrl - configureLDAPController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('configureLDAPCtrl',['viewManager','$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader','CSInterface','$q', '$routeParams',
function(viewManager, $scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader,CSInterface,$q, $routeParams){
	console.log("On LDAP Config");
	preloader.hideLoading();
	$scope.modalShown = false;
	$scope.companyEmail="";
	
	var image_error="./assets/images/question_mark.gif";
	
	$scope.ldap_message_image=image_error;
	$scope.ldap_message="LDAP Credentials not found";
	
	$scope.showErrorMessage=false;
					
	if($routeParams.error!="false"){
		$scope.showErrorMessage=true;
		$scope.companyEmail=$routeParams.error;
	}
	
	if(Config.companyEmail&&Config.companyEmail.length>0){
		
		$scope.companyEmail=Config.companyEmail;
	}
	
	
	$scope.cancel=function(){
		
		$scope.showErrorMessage=false;
		$scope.companyEmail="";
		Config.keepMeLoggedIn=false;
		if($scope.showErrorMessage)
			viewManager.LDAPConfigDone();
		else
		viewManager.gotoPreviousView();
	};
	
	$scope.clear=function(){
		$scope.showErrorMessage=false;
		$scope.companyEmail="";
	};
	
	
	/* JQ Save function*/
	$scope.saveCompanyEmail=function(){
		$scope.showErrorMessage=false;
		preloader.showLoading();
		var companyEmail=$('#LDAPcompanyEmail').val();
		if(companyEmail==""){
			Config.companyEmail="";
			CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
				resultWrittentoConfig();
				});
		}
		else{
		
			
			
			var url=Config.serviceAddress+Constants.VALIDATE_LDAP_EMAIL;
			//var url="LDAPlogin.json";
			var params=[];
			params['email']=companyEmail;
			$http.post(url,params)
			.success(function(data){
				console.log(data);
				if(data.success){
					Config.companyEmail=companyEmail;
					Config.companyName=data.success;
					CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					resultWrittentoConfig();
					});
				}
				else{
					preloader.hideLoading();
					Config.companyEmail="";
					Config.companyEmailValue=companyEmail;
					$scope.showErrorMessage=true;
					CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					});
				}
				
				
				
				
			})
			.error(function(data){
				preloader.hideLoading();
				console.log(data);
				$scope.alert_message="Server Offline."
				$scope.modalShown=true;
			})
			
		}
	}
	
	/* Angular Save function
	$scope.saveCompanyEmail=function(){
		preloader.showLoading();
		
		if($scope.companyEmail==""){
			Config.companyEmail="";
			CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
				resultWrittentoConfig();
				});
		}
		else{
		
			var deferred=$q.defer();
			var url=Config.serviceAddress+Constants.VALIDATE_LDAP_EMAIL;
			
			var params=[];
			params['email']=$scope.companyEmail;
			$http.post(url,params)
			.success(function(data){
				if(data.success){
					Config.companyEmail=$scope.companyEmail;
					Config.companyName=data.success;
					
				}
				else{
					Config.companyEmail=0;
					
				}
				
				CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					resultWrittentoConfig();
					
				});
				
				
			})
			.error(function(data){
				preloader.hideLoading();
				console.log(data);
				$scope.alert_message="Server Offline."
				$scope.modalShown=true;
			})
			return deferred.promise;
		}
	};
	*/
	
	var resultWrittentoConfig=function(){
		console.log("Result written in config");
		preloader.hideLoading();
		viewManager.LDAPConfigDone();
	};
	
}]);