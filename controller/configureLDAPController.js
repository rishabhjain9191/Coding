/**
 * configureLDAPCtrl - configureLDAPController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('configureLDAPCtrl',['viewManager','$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader','CSInterface','$q','APIUtils',
function(viewManager, $scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader,CSInterface,$q, APIUtils){
	console.log("On LDAP Config");
	preloader.hideLoading();
	$scope.modalShown = false;
	$scope.companyEmail="";
	
	console.log(Config);
	
	if(Config.companyEmailValue&&Config.companyEmailValue.length>0){
		
		console.log(Config.companyEmailValue);
		$scope.companyEmail=Config.companyEmailValue;
	}
	
	
	$scope.cancel=function(){
		$scope.companyEmail="";
		viewManager.gotoPreviousView();
	};
	
	$scope.clear=function(){
		$scope.companyEmail="";
	};
	
	
	/* JQ Save function*/
	$scope.saveCompanyEmail=function(){
		preloader.showLoading();
		var companyEmail=$('#LDAPcompanyEmail').val();
		if(companyEmail==""){
			Config.companyEmail="";
			Config.companyEmailValue="";
			CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
				resultWrittentoConfig();
				});
		}
		else{
		
			
			APIUtils.validateLDAP(companyEmail)
			.then(function(data){
				if(data.success){
					Config.companyEmail=companyEmail;
					Config.companyName=data.success;
					Config.companyEmailValue=companyEmail
				}
				else{
					Config.companyEmail=0;
					Config.companyEmailValue=companyEmail;
					
				}
				
				CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					resultWrittentoConfig();
					
				});
				
				
			}
			,function(data){
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