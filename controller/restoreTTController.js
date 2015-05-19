/**
 * aboutCtrl - aboutController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

app.controller('restoreTTController',['$scope','$rootScope', '$location', 'Constants', '$window','CSInterface','Config', 'viewManager', 'ngDialog',
function($scope, $rootScope, $location, Constants, $window, CSInterface, Config, viewManager, ngDialog){

	$scope.deleteDBWarning=false;
	$scope.deleteDBWarningMessage="This action will reset your extension config file, thereby wiping out any saved passwords, and settings. After reseting, please restart any Adobe apps that are currently running TimeTracker.";

	$scope.clearConfig=function(){
			ngDialog.openConfirm({
				template:'messageDialogId',
				controller: 'InsideCtrl',
				showClose:false,
				data:{
					heading:"Restore factory defauts",
					message:"This action will reset your extension config file, thereby wiping out any saved passwords, and settings. After reseting, please restart any Adobe apps that are currently running TimeTracker.",
					command:"Reset"

				}

			});

	};

	$scope.showDeleteDBWarning=function(){

			ngDialog.openConfirm({
				template:'messageDialogId',
				controller: 'InsideCtrl',
				showClose:false,
				data:{
					heading:"Flush Cache",
					message:"This action will wipe out any unsynced activity for your account or the accounts of others on this computer. After reseting, please restart any Adobe apps that are currently running TimeTracker.",
					command:"Flush"
				}

			});

		};

	$scope.abortDeleteDB=function(){
		$scope.deleteDBWarning=false;

	};
	$scope.cancel=function(){
		viewManager.isFreezed=false;
		viewManager.gotoPreviousView();
	};

	$scope.clearDB=function(){

			Config.clearUserDetails();
			CSInterface.evalScript('$._extFile.deleteDBFile()', function(result){
			console.log("result of delete DB"+result);
			if(result=='true'){
				//logout user
				viewManager.moveToFreezeScreen("Cache Flushed");
				$rootScope.FreezedItems=true;
				$rootScope.logout();
			}
			else{
				//Show Message, unable to clear config file;
				$scope.$apply(function(){
					$scope.alert_message="Unable to clear the Database file";
					$scope.modalShown=true;
				});
			}
		});

	};
}]);



app.controller('InsideCtrl',['$scope','$rootScope', '$location', 'Constants', '$window','CSInterface','Config', 'viewManager', 'ngDialog',
function($scope, $rootScope, $location, Constants, $window, CSInterface, Config, viewManager, ngDialog){
	$scope.cancel=function(){
		ngDialog.close();
	};

	function clearConfig(){
		ngDialog.close();
		Config.clearUserDetails();
		CSInterface.evalScript('$._extXML.deleteConfigFile()', function(result){
			if(result=='true'){
				//logout user
				viewManager.moveToFreezeScreen("Factory restored");
				$rootScope.FreezedItems=true;
				$rootScope.logout();
			}
			else{
				//Show Message, unable to clear config file;
				console.log("An error occured deletring config");
				displayError();
				/*
				$scope.$apply(function(){
					displayError();
					//$scope.alert_message="Unable to clear the config file";
					//$scope.modalShown=true;
				});
				*/
			}
		});
	}

	function clearDB(){
				ngDialog.close();

		Config.clearUserDetails();
			CSInterface.evalScript('$._extFile.deleteDBFile()', function(result){
			console.log("result of delete DB"+result);
			if(result=='true'){
				//logout user
				viewManager.moveToFreezeScreen("Cache flushed");
				$rootScope.FreezedItems=true;
				$rootScope.logout();
			}
			else{
				//Show Message, unable to clear config file;
				displayError();
				/*
				$scope.$apply(function(){
					displayError();
					//$scope.alert_message="Unable to clear the Database file";
					//$scope.modalShown=true;
				});
				*/
			}
		});
	}

	function displayError(command){
		var message="";
		console.log("In display error");
		if($scope.ngDialogData.command=="Reset"){
			message="restoring factory";
		}
		else{
			message="flushing cache";
		}
		message+=". To manually remove the files, follow the instructions in this";
		//message+="<a href='http://www.creativeworx.com/faq/manually-reseting-extension-data-event-database-settings-remember-login-defaults/'>";
		//message+="FAQ";
		//message+="</a>";
		ngDialog.openConfirm({
				template:'errorDialogId',
				controller: 'InsideCtrl',
				showClose:false,
				data:{
					heading:"Error",
					message:"An error occured while "+message,
				}

			});
	}

	$scope.confirm=function(){
		console.log($scope.ngDialogData.command);
		if($scope.ngDialogData.command=="Reset"){
			clearConfig();
		}
		else{
			clearDB();
		}

	};

	$scope.openFAQ=function(){
		CSInterface.openURLInDefaultBrowser("http://www.creativeworx.com/faq/manually-reseting-extension-data-event-database-settings-remember-login-defaults/");

	};

}]);
