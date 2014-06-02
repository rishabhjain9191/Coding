/**
 * updateCtrl - updateController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('updateCtrl',['viewManager','$scope', '$rootScope','$http','Constants','preloader', 'updateUtils','$interval','$timeout','CSInterface',
function(viewManager, $scope, $rootScope, $http, Constants, preloader, updateUtils,$interval, $timeout, CSInterface){
		
		var updateType;
		updateUtils.checkForUpdate()
		.then(function(updateReq){
			if(updateReq){
			updateType=updateReq;
			switch(updateReq){
				case 100:updateNecessary();return;
				case 200:updateOptional();return;
				case 300||-1:viewManager.updateDone();return;
				
				
			}
		}
		})
	
	console.log("In Update View");
	$scope.updateMessage="Update";
	$scope.downloading=false;
	$scope.showUpdateView=true;
	$scope.ttDownloadLocation=Constants.URL_UPDATE+Constants.URL_ZXP_DOWNLOAD;
	$scope.progressBarValue=0;
	var downloadFilePaths;
	
	var promise_downloadComplete;
	var result=0;
	var downloaded=false;
	$scope.disableUpdateBtn=false;
	var promise_checkDownloaded;
	
	var updateNecessary=function(){
		$scope.showUpdateView=false;
		$scope.message="New Version available! \n\nUpdate required.";
		$scope.canReturn=false;
	};
	
	var updateOptional=function(){
		$scope.showUpdateView=false;
		$scope.message="New Version Available.";
		$scope.canReturn=true;
	};
	
	$scope.done=function(){
		//After ZXP downloaded or user don't want to update
		viewManager.updateDone(updateType);
	}
	
	$scope.download=function(){
		$scope.canReturn=true;
		$scope.disableUpdateBtn=true;
		$scope.downloading=true;
		$scope.progressBarValue=10;
		//$scope.message ="Downloading Extension...";
		//$scope.message="Extention Download Complete\n";
		$scope.message="Extension Manager will launch after download. After installing, quit and restart this application.";
		
		CSInterface.evalScript('$._extcommon.createDowloadFileProcess()',function(paths){
			downloadFilePaths=JSON.parse(paths.split('\\').join('\\\\'));
			console.log(downloadFilePaths);
			result =window.cep.process.createProcess(downloadFilePaths.tmpFilePath);
			downloaded=false;
			
			promise_downloadComplete= $interval(checkProcessRunning,2*1000,30); //Will check whether the download is completed for 2 minutes.
			promise_checkDownloaded=$timeout(checkDownloaded,2*30*1000+1000);
		
		});
		
	};
		
		
	var checkProcessRunning=function(){
		var isRunning=window.cep.process.isRunning(result.data);
		console.log("checkProcessRunning");
		if(!isRunning.data){
			$scope.progressBarValue=100;
			$scope.message="";
			$scope.message+="Extension Manager will launch after download. After installing, quit and restart this application.";
			$scope.updateMessage="Try Again";
			$scope.disableUpdateBtn=false;
			$interval.cancel(promise_downloadComplete);
			$timeout.cancel(promise_checkDownloaded);
			downloaded=true;
			launchEM();
		}
	};
	
	$scope.openUpdateSite=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_UPDATE+Constants.URL_DOWNLOAD);
	}
	
	var checkDownloaded=function(downloaded){
		if(!downloaded){
			//alert("Download Failed");
			$scope.message="Download Failed";
			$scope.disableUpdateBtn=false;
			$scope.updateMessage="Try Again";
		}
		else
			//Launch Extention Manager
			launchEM();
	};
		
	var launchEM=function(){
		var specifier = "exman";
		new Vulcan().launchApp(specifier, false, ' /install "'+downloadFilePaths.zxpFilePath+'"');
		deleteTempFile();
			
	};
	
	var deleteTempFile=function (){
		CSInterface.evalScript('$._extcommon.deleteTemp()');	
	}
		
}]);