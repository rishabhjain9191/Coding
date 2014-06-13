/**
 * editProjectController - checkForFlashVersion.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('flashVersionChecker',['viewManager','$scope', '$location', 'preloader', 'debuggerUtils', 'Constants','CSInterface',function(viewManager, $scope, $location,preloader,debuggerUtils, Constants, CSInterface){
	console.log('checking for flashversion');
	$scope.flashVersionExists=false;
	$scope.message="An older version exists, please uninstall it";
	var id=[];
	var res=CSInterface.getExtensions();
	for(var i =0;i<res.length;i++){
		id=res[i].id.split('.');
		if(id[1]=='creativeworx'){
			if(id[2]=='timetracker')
				$scope.flashVersionExists=true;
		}
	}
	
	if(!$scope.flashVersionExists){
		viewManager.checkForFlashVersionDone();
	}
	$scope.userAlerted=function(){
		console.log('check for flashversion done');
		viewManager.checkForFlashVersionDone();
	};
}]);

