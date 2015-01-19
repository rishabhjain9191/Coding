/**
 * aboutCtrl - aboutController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('restoreTTController',['$scope','$rootScope', '$location', 'Constants', '$window','CSInterface','Config', 'viewManager', 
function($scope, $rootScope, $location, Constants, $window, CSInterface, Config, viewManager){
	
	$scope.deleteDBWarning=false;
	$scope.deleteDBWarningMessage="This operation will delete all the local TT data of all the users on this machine";

	$scope.clearConfig=function(){
		Config.clearUserDetails();
		CSInterface.evalScript('$._extXML.deleteConfigFile()', function(result){
			if(result=='true'){	
				//logout user
				viewManager.moveToFreezeScreen();
				$rootScope.logout();
			}
			else{
				//Show Message, unable to clear config file;
				$scope.$apply(function(){
					$scope.alert_message="Unable to clear the config file";
					$scope.modalShown=true;
				});
			}
		});
	};

	$scope.showDeleteDBWarning=function(){
		$scope.deleteDBWarning=true;
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
				viewManager.moveToFreezeScreen();
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






/*
app.controller('restoreTTController', ['$scope', 'Config', 'CSInterface', 'viewManager',function('$scope', 'Config', 'CSInterface', 'viewManager'){
	/*
	$scope.clearConfig=function(){
		Config.clearUserDetails();
		CSInterface.evalScript('$._extXML.deleteConfigFile()', function(result){
			if(result=='true'){	
				//logout user
				viewManager.moveToFreezeScreen();
				$rootScope.logout();
			}
			else{
				//Show Message, unable to clear config file;
				$scope.$apply(function(){
					$scope.alert_message="Unable to clear the config file";
					$scope.modalShown=true;
				});
			}
		});
	}

	$scope.clearDB=function(){}
	*/	

// }]);
