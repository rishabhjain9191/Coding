/**
 * loginCtrl - configureLDAPController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('configureLDAPCtrl',['viewManager','$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader','CSInterface','$q',
function(viewManager, $scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader,CSInterface,$q){
	console.log("On LDAP Config");
	preloader.hideLoading();
	$scope.modalShown = false;
	$scope.companyEmail="";
	$scope.cancel=function(){
		$scope.companyEmail="";
		viewManager.gotoPreviousView();
	};
	
	$scope.clear=function(){
		$scope.companyEmail="";
	};
	
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
	
	var resultWrittentoConfig=function(){
		console.log("Result written in config");
		preloader.hideLoading();
		viewManager.LDAPConfigDone();
	};
	
}]);