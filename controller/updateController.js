/**
 * updateCtrl - updateController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('updateCtrl',['viewManager','$scope', '$rootScope','$http','Constants','preloader', 'updateUtils','$interval','$timeout','CSInterface','$rootScope',
function(viewManager, $scope, $rootScope, $http, Constants, preloader, updateUtils,$interval, $timeout, CSInterface,$rootScope){
		
		var updateType;
		console.log("In Update View");
		$scope.updateMessage="Update";
		$scope.downloading=false;
		$scope.showUpdateView=true;
		$scope.ttDownloadLocation=Constants.URL_UPDATE+Constants.URL_ZXP_DOWNLOAD;
		$scope.progressBarValue=0;
		$scope.updateBtn=true;
		$scope.returnMessage='Not Now';
		$scope.showLearnHow=false;
		var downloadFilePaths;
		
		var promise_downloadComplete;
		var result=0;
		var downloaded=false;
		$scope.disableUpdateBtn=false;
		var promise_checkDownloaded;
		
		
		updateUtils.checkForUpdate()
		.then(function(updateReq){
			console.log(updateReq);
			if(updateReq){
			updateType=updateReq;
			switch(updateReq){
				case 100:updateNecessary();break;
				case 200:updateOptional();break;
				case 300:noUpdateRequired();break;
				default:viewManager.updateDone();break;
				
				
			}}
		}, function(){viewManager.updateDone();});
	

	var updateNecessary=function(){
		console.log("in no update necessary");
		if(Constants.ISEXCHANGE){
			$scope.message="A new version is available.\nEnable File Syncing for Creative Cloud for automatic updates.  ";
				$scope.updateBtn=false;
			$scope.showLearnHow=true;
		}
		else{
			$scope.message="A newer extension is available. \n\nUpdate required.";
		}
		$scope.showUpdateView=false;
		$scope.canReturn=false;
	};
	
	var updateOptional=function(){
		if(Constants.ISEXCHANGE){
			$scope.message="A new version is available.\nEnable File Syncing for Creative Cloud for automatic updates.  ";
				$scope.updateBtn=false;
			$scope.showLearnHow=true;
		}
		else{
			$scope.message="A newer extension is available.\n\nWould you like to update now?";
		}
		console.log("in no update optional");
		$scope.showUpdateView=false;
		
		$scope.canReturn=true;
	};
	
	var noUpdateRequired=function(){
			console.log("in no update required");
		if($rootScope.checkUpdateFromMenuClick==1){
			$scope.showUpdateView=false;
			$scope.message="This Extension is up-to-date";
			$scope.canReturn=true;
			$scope.updateBtn=false;
			$scope.returnMessage="Return";
		}
		else{
			viewManager.updateDone(updateType);
		}
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
			if(Constants.OS=="Windows"){
			result =window.cep.process.createProcess(downloadFilePaths.tmpFilePath);
			}
			else if(Constants.OS=="Macintosh"){
				result =window.cep.process.createProcess("/bin/sh",downloadFilePaths.tmpFilePath);
			}
			downloaded=false;
			
			promise_downloadComplete= $interval(checkProcessRunning,2*1000,45); //Will check whether the download is completed for 2 minutes.
			promise_checkDownloaded=$timeout(checkDownloaded,2*45*1000+1000);
		
		});
		
	};
		
		
	var checkProcessRunning=function(){
		var isRunning=window.cep.process.isRunning(result.data);
		console.log("checkProcessRunning");
		console.log(isRunning);
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
	};
	$scope.gotoExchange=function(){
		CSInterface.openURLInDefaultBrowser(Constants.URL_EXCHANGE);	
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
		//deleteTempFile();
			
	};
	
	var deleteTempFile=function (){
		CSInterface.evalScript('$._extcommon.deleteTemp()');	
	}
		
}]);