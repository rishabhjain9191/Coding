/**
 * configureLDAPCtrl - configureLDAPController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

 app.controller('configureLDAPCtrl',['viewManager','$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader','CSInterface','$q','APIUtils','Messages', 'UserUtils',
function(viewManager, $scope, $rootScope, $location, $http, Config, Constants, loginUtils,preloader,CSInterface,$q, APIUtils, Messages, UserUtils){
	console.log("On LDAP Config");
	preloader.hideLoading();
	$scope.modalShown = false;
	$scope.companyEmail="";
	$scope.message="";

	if(UserUtils.companyEmailValue&&UserUtils.companyEmailValue.length>0){
		console.log(UserUtils.companyEmailValue);
		$scope.companyEmail=UserUtils.companyEmailValue;
	}


	$scope.cancel=function(){
		$scope.companyEmail="";
		viewManager.gotoPreviousView();
	};

	$scope.clear=function(){
		$scope.companyEmail="";
	};


	$(function() {
    $("#LDAPcompanyEmail").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#saveBtn').click();
            return false;
        } else {
            return true;
        }
    	});
	});





	/* JQ Save function*/
	$scope.saveCompanyEmail=function(){
		preloader.showLoading();
		var companyEmail=$('#LDAPcompanyEmail').val();
		if(companyEmail==""){
			UserUtils.companyEmail="";
			UserUtils.companyEmailValue="";
			UserUtils.writeUserInformation();
		}else{
			APIUtils.validateLDAP(companyEmail)
			.then(function(data){
				console.log(data);

				UserUtils.companyEmail=companyEmail;
				UserUtils.companyName=data.data.result;
				UserUtils.companyEmailValue=companyEmail;

				UserUtils.writeUserInformation();
			}
			,function(data){
				preloader.hideLoading();
				console.log(data);
				$scope.message=Messages.authMsg[data.status];
				//$scope.modalShown=true;
			})

		}
	};

	/* Angular Save function
	$scope.saveCompanyEmail=function(){
		preloader.showLoading();

		if($scope.companyEmail==""){
			UserUtils.companyEmail="";
			UserUtils.writeUserInformation();
		}else{
			var deferred=$q.defer();
			var url=Config.serviceAddress+Constants.VALIDATE_LDAP_EMAIL;

			var params=[];
			params['email']=$scope.companyEmail;
			$http.post(url,params)
			.success(function(data){
				if(data.success){
					UserUtils.companyEmail=$scope.companyEmail;
					UserUtils.companyName=data.success;
				}else{
					UserUtils.companyEmail=0;
				}
				UserUtils.writeUserInformation();
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
		if(Config.companyEmail!==0){
			viewManager.LDAPConfigDone();
		}
	};

}]);
