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
	$scope.deleteDBWarningMessage="This operation will delete all the local TT data of all the users on this machine";

	$scope.clearConfig=function(){
			ngDialog.openConfirm({
				template:'messageDialogId',
				controller: 'InsideCtrl',
				showClose:false,
				data:{
					heading:"Restore factory defauts",
					message:"This operation will delete all the local TT data of all the users on this machine",
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
					message:"This action will reset your extension event database, thereby wiping out any unsent activity for your account or the accounts of other users who have used this computer. Afterward you will need to restart the host app and any other host apps currently running TimeTracker.",
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
		console.log($scope);
		if($scope.ngDialogData.command=="Reset"){
			message="restoring factory";
		}
		else{
			message="flushing cache";
		}

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

	

}]);
