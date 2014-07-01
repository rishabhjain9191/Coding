 /* services.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

var services=angular.module('TTServices',[]);

services.factory('Constants',['CSInterface',function(CSInterface){

	var constants={};


		constants.EXTENSION_NAME = "TimeTracker-CreativeWorx";
		constants.EXTENSION_VERSION_NUMBER = "2.0.3.2";
		constants.MINIMUM_REQUIRED_SERVER_VERSION = Number("1.1");

		constants.CW_NAMESPACE_NAME = "creativeworx";
		constants.CW_NAMESPACE = "http://www.creativeworx.com/1.0/";

		constants.STATUS_NEW = "NEW";
		constants.STATUS_ATTEMPTED = "ATTEMPTED";
		constants.STATUS_TRANSFERRED = "TRANSFERRED";
		constants.IMAGE_STATUS_NEW = "NEW";
		constants.IMAGE_STATUS_TRANSFERRED = "TRANSFERRED";
		constants.IMAGE_STATUS_NOIMAGE = "NONE"
		constants.IMAGE_STATUS_ERROR = "ERROR";
		constants.COLOR_MODE = "user_selectable";
		constants.PROJECT_COLORS= [
			"#888888", //0
			"#FFF772", //1
			"#F8AE3B", //2
			"#EA7527", //3
			"#CC4824", //4
			"#C02006", //5
			"#A5080B", //6
			"#A32445", //7
			"#E47284", //8
			"#854E9D", //9
			"#7166A3", //10
			"#A588B5", //11
			"#83B8E5", //12
			"#337EBD", //13
			"#004382", //14
			"#00606E", //15
			"#1D6348", //16
			"#239E6E", //17
			"#88E2AC", //18
			"#62A162", //19
			"#1F6F1F", //20
			"#937862", //21
			"#6A482C", //22
			"#5D5D5D", //23
			"#999999"  //24
		];

		constants.TIMEINTERVAL = 1000*60*4; 	// Default send data time interval of 4 minutes
		constants.TIMEINTERVAL_MIN = 1000; 		// Minimum time inteval 1 second in milliseconds
		constants.TIMEINTERVAL_MAX = 1000*60*60;// Maximum time interval1 hour in milliseconds
		constants.BATCH_SIZE = 5; 				// Default number of events to send to server
		constants.BATCH_SIZE_MIN = 1; 			// Minimum number of events to send, send at least 1
		constants.BATCH_SIZE_MAX = 1000; 		// Maxiumn number of events to send, 1000
		constants.CHECK_ONLINE_TIMEINTERVAL = 20000;
		constants.IMAGE_TIMEINTERVAL = 50000;
		constants.THRESHOLD_COUNT = 100;
		constants.APP_EVENT_POLL = 5000; 		// How frequently to check for events in the app
		constants.REFRESH_PROJECT_INTERVAL = 5*60*1000;

		constants.URL_SERVICE = "https://timetracker.creativeworx.com";

		constants.BATCHDATA_SEND_ADDRESS = "/service/log";
		constants.CHECK_STATUS_ADDRESS = "/service/checkstatus";
		constants.FILE_UPLOAD_ADDRESS = "/service/fileupload";
		constants.LOGIN_ADDRESS = "/service/getuserdetails";
		constants.PROJECT_RETRIEVE_ADDRESS = "/service/getprojectlist";
		constants.CHECK_USER_DETAILS_ADDRESS = "/service/userdetails";
		constants.PROJECT_UPDATE_ADDRESS = "/service/addeditproject";

		constants.VALIDATE_LDAP_EMAIL = "/service/validate-ldap-email";
			

		constants.CONFIGURATION_FILE = "CreativeWorxConfig.xml";
		constants.IMAGES_FOLDER_NAME = "/images";
		constants.DATABASE_FILE_NAME = "CreativeWorx.db";

		constants.LOG_ENABLE = true;
		constants.USERNAME = "creativeworx";
		constants.PASSWORD = "creativeworx";

		constants.EVENT_DOCUMENT_OPEN = "documentOpen";
		constants.EVENT_DOCUMENT_CLOSE = "documentClose";
		constants.EVENT_PROJECT_SELECTED = "projectedSelected";

		// URL for Links
		constants.URL_SITE = "http://www.creativeworx.com";
		constants.URL_TERMS_OF_SERVICE = "/terms.php";
		constants.URL_PRIVACY_POLICY = "/privacy.php";
		constants.URL_SIGNUP = "/signup?plan=ext";
		constants.URL_BETA_FEEDBACK = "/betaFeedback.php";
		constants.URL_FORGOT_LOGIN = "/user/forgotpassword";

		constants.FILENAME_EXTENSION =   "TimeTracker.zxp";

		constants.URL_UPDATE = "http://www.creativeworx.com";
		constants.URL_DOWNLOAD = "/downloads/timetracker/TimeTracker";
		constants.URL_ZXP_DOWNLOAD = "/downloads/timetracker/" + constants.FILENAME_EXTENSION;
		constants.URL_ZIP_DOWNLOAD = "/downloads/timetracker/TimeTracker.zip";
		constants.URL_VERSION = "/downloads/timetracker/TimeTrackerUpdate.xml";

		constants.APP_NAME=CSInterface.hostEnvironment.appName;
		constants.EXTENSION_ID=CSInterface.getExtensionID();





	constants.update=function(configData){
		if(configData.serviceAddress) this.URL_SERVICE=configData.serviceAddress;
		if(configData.siteAddress) this.URL_SITE=configData.siteAddress;
		if(configData.updateAddress) this.URL_UPDATE=configData.updateAddress;
		if(configData.timeInterval) this.TIMEINTERVAL=configData.timeInterval;
		if(configData.checkOnlineTimeInterval) this.CHECK_ONLINE_TIMEINTERVAL=configData.checkOnlineTimeInterval;
		if(configData.imageTimeInterval) this.IMAGE_TIMEINTERVAL=configData.imageTimeInterval;
		if(configData.batchSize) this.BATCH_SIZE=configData.batchSize;
		if(configData.thresholdCount) this.THRESHOLD_COUNT=configData.thresholdCount;
		if(configData.batchDataSendAddress) this.BATCHDATA_SEND_ADDRESS=configData.batchDataSendAddress;
		if(configData.checkStatusAddress) this.CHECK_STATUS_ADDRESS=configData.checkStatusAddress;
		if(configData.fileUploadAddress) this.FILE_UPLOAD_ADDRESS=configData.fileUploadAddress;
		if(configData.logEnabled) this.LOG_ENABLE=configData.logEnabled;
		//(configData.configversion)?this.URL_SERVICE=configData.configversion;
	};

	var OSVersion=CSInterface.getOSInformation();
	if (OSVersion.indexOf("Windows") >= 0)
    {
      constants.OS="Windows";
    }
    else if (OSVersion.indexOf("Mac") >= 0)
    {
      constants.OS="Macintosh";
    }


	return constants;
}]);

services.factory('Messages',[function(){
	var messages={};
	messages.networkError="Cannot Connect to Internet. Please Check your internet connection."
	return messages;
}]);

services.factory('CSInterface',[function(){
	var cs=new CSInterface();
	return cs;
}]);


services.factory('viewManager', ['$location','$route', 'CSInterface', 'AppWatcher','Config', function($location,$route, CSInterface, AppWatcher, Config){
	var utils={};

	utils.loggedOut=false;

	utils.previousView="";
	utils.loginView="";
	

	utils.initializationDone=function(){

		console.log("initializationDone  "+(new Date()).getTime());
		console.log($location.path());
		$location.path('checkForFlashVersion');
		$route.reload();
		//this.updateDone();
	};

	utils.checkForFlashVersionDone=function(){

		console.log("Checked for falsh version  "+(new Date()).getTime());
		$location.path('update');
	};
	utils.updateDone=function(updateType){
		console.log("Checked for update  "+(new Date()).getTime());
		if(updateType==100){
			console.log("Checking for the update again");
			$route.reload();
		}
		else{
			console.log('update done');
			$location.path('loadConfig');
			$route.reload();
		}
	};
	utils.configloaded=function(){
		console.log("Config Loaded  "+(new Date()).getTime());
		$route.reload();
		if(Config.companyEmail&&Config.companyEmail.length>0){
			$location.path('LDAPLogin');
		}
		else{
			$location.path('login');		
		}
		
	};
	utils.userLoggedIn=function(){
		console.log("user logged in  "+(new Date()).getTime());
		//Add Event Listeners
		AppWatcher.addEventListeners();
		//Trigger OnCreationComplete Event
		var event=new CSEvent("onCreationComplete", "APPLICATION");
		event.type="onCreationComplete";
		event.data="<onCreationComplete />";
		CSInterface.dispatchEvent(event);
		this.loggedOut=false;
		console.log('user Logged in');
		this.loginView=$location.path().substr(1);
		$location.path('projects');
	};

	utils.userLoggedOut=function(){
		this.loggedOut=true;
		$location.path(this.loginView);
	};
	
	utils.configureLDAP=function(){
		this.previousView=$location.path().substr(1);
		$location.path('configureLDAP');
	};
	
	utils.gotoPreviousView=function(){
		$location.path(this.previousView);
	};
	
	utils.LDAPConfigDone=function(){
		$route.reload();
		console.log(Config.companyEmail);
		if(Config.companyEmail!==""){
			$location.path('LDAPLogin');
		}
		else{
			$location.path('login');
		}
		//$route.reload();
	};

	return utils;

}]);





services.factory('updateUtils', ['Constants','$http','$q',function(Constants,$http,$q){
	var utils={};
	utils.minVersion="";
	utils.version="";
	utils.downloadPath="";
	var updateParamsUpdate=function(){
		var deferred=$q.defer();
		var url=Constants.URL_UPDATE + Constants.URL_VERSION;// + "?" + Constants.EXTENSION_VERSION_NUMBER;
		//var url="ini.xml";
		console.log(url);
		$http.get(url)
		.success(function(data,status){
			var x2js = new X2JS();
			var jsonObj = x2js.xml_str2json(data);
			console.log(jsonObj);
			if(jsonObj.ExtensionUpdateInformation.color_mode){
			Constants.COLOR_MODE=jsonObj.ExtensionUpdateInformation.color_mode;
			}
			if(jsonObj.ExtensionUpdateInformation.minversion)
			utils.minVersion=jsonObj.ExtensionUpdateInformation.minversion;
			if(jsonObj.ExtensionUpdateInformation.version)
			utils.version=jsonObj.ExtensionUpdateInformation.version;
			if(jsonObj.ExtensionUpdateInformation.download)
			utils.downloadPath=jsonObj.ExtensionUpdateInformation.download;
			deferred.resolve(1);

		})
		.error(function(data){console.log(data);deferred.reject(0);})

		return deferred.promise;
	};

	var isNewerVersion=function(candidateVersion){
		var rtnBool = false;

		// Split the candidate version into number components
		var candidateValues = candidateVersion.split(".");
		var currentValues = Constants.EXTENSION_VERSION_NUMBER.split(".");

		// Validate candidate value, current value assumed to be correct
		if (candidateValues.length >= 3) {

			if (  parseInt(candidateValues[0]) >  parseInt(currentValues[0]) ) {
				rtnBool = true;
			} else if (
				( parseInt(candidateValues[0]) == parseInt(currentValues[0]) ) &&
				( parseInt(candidateValues[1]) >  parseInt(currentValues[1]) ) ) {
				rtnBool = true;
			} else if (
				( parseInt(candidateValues[0]) == parseInt(currentValues[0]) ) &&
				( parseInt(candidateValues[1]) == parseInt(currentValues[1]) ) &&
				( parseInt(candidateValues[2]) >  parseInt(currentValues[2]) ) ) {
				rtnBool = true;
			} else if (
				( parseInt(candidateValues[0]) == parseInt(currentValues[0]) ) &&
				( parseInt(candidateValues[1]) == parseInt(currentValues[1]) ) &&
				( parseInt(candidateValues[2]) == parseInt(currentValues[2]) ) ) {
				//TODO: check for various values like beta, final, test... What are the standards

			}
		}

	return rtnBool;
	}


	utils.checkForUpdate=function(){
		var deferred=$q.defer();
		updateParamsUpdate().then(function(result){
			/*Compare with Min. Version
				Return Codes :
				100 : Update Must
				200 : Update Optional
				300 : User has the latest version or can't be updated right now
			*/
			console.log(utils.minVersion);
			if(!utils.minVersion||!utils.version||!utils.downloadPath)deferred.resolve(-1);
			else if(isNewerVersion(utils.minVersion))deferred.resolve(100);
			else if(isNewerVersion(utils.version))deferred.resolve(200);
			else deferred.resolve(300);
		},function(result){
			//If we failed to update the update parameters-Do Nothing (OR Recheck ??)
			deferred.reject(-1);
		});

		return deferred.promise;

	};
	return utils;
}]);


services.factory('Config', ['Constants','$q','debuggerUtils',function(Constants, $q, debuggerUtils){
	var config={};
	config.data='';


	config.serviceAddress = Constants.URL_SERVICE;
	config.siteAddress = Constants.URL_SITE;
	config.updateAddress = Constants.URL_UPDATE;
	config.timeInterval = Constants.TIMEINTERVAL;
	config.checkOnlineTimeInterval = Constants.CHECK_ONLINE_TIMEINTERVAL;
	config.imageTimeInterval = Constants.IMAGE_TIMEINTERVAL;
	config.batchSize = Constants.BATCH_SIZE;
	config.thresholdCount = Constants.THRESHOLD_COUNT;
	config.batchDataSendAddress = Constants.BATCHDATA_SEND_ADDRESS;
	config.checkStatusAddress = Constants.CHECK_STATUS_ADDRESS;
	config.fileUploadAddress = Constants.FILE_UPLOAD_ADDRESS;
	config.imagesFolderAddress = Constants.IMAGES_FOLDER_NAME;
	config.logEnabled = Constants.LOG_ENABLE;
	config.configversion = 1;

	config.username="";
	config.password="";
	config.userid="";
	config.firstname="";

	config.companyEmail="";
	

	/*
		Read from the config file and update config values
	*/
	config.clearUserDetails=function(){
		this.username="";
		this.password="";
		this.userid="";
		this.firstname="";
	};
	return config;
}]);



services.factory('preloader',['$rootScope',
function($rootScope){
	var utils={};
	utils.showLoading=function(username, password){
		$rootScope.loading=true;
		$rootScope.opaqueStyle.opacity="0.2";
	};
	utils.hideLoading=function(username, password){
		$rootScope.loading=false;
		$rootScope.opaqueStyle.opacity="1.0";
	};
	return utils;
}]);

services.factory('loginUtils',['debuggerUtils','Constants', '$location','$rootScope','Config','$http','$q',
function(debuggerUtils,Constants, $location,$rootScope,Config, $http, $q){
	var utils={};
	utils.loginResult='aa';
	utils.tryLoginFromConfig=function(){
		var deferred=$q.defer();
		if(Config.keepMeLoggedIn=="false"){
			/*
				Fresh Login Required, 100-Fresh Login
			*/
			deferred.resolve(100);
		}
		else if(Config.keepMeLoggedIn=="true"){
			utils.login(Config.username, Config.password, Config.companyEmail)
			.then(function(data){
				console.log(data);
				if(data.Msg=="Error: Authentication failed"){
					deferred.resolve(100);
				}
				else{
					//User Authenticated
					console.log("User Authenticated");

					$rootScope.canEdit=canEdit(data[0].oid, data[0].org_settings);
					$rootScope.LoggedInItems=true;
					deferred.resolve(200);
				}
			},function(error){
				deferred.resolve(100);
			});
		}
		else{
			deferred.resolve(100);
		}

		return deferred.promise;

	};

	
	utils.login=function(username, password, companyEmail){

		var deferred=$q.defer();
		if(username=='undefined'){username=Config.username;}
		if(password=='undefined'){password=Config.password;}
		if(companyEmail=='undefined'){companyEmail="";}
		var params=[];
		params['username']=username;
		params['password']=password;
		params['companyEmail']=companyEmail;
		params['clientversion']=Constants.EXTENSION_VERSION_NUMBER;

		var url=Constants.URL_SERVICE+Constants.LOGIN_ADDRESS;
		//var url="userDetails.json";

		var t1 = (new Date()).getTime();
		$http.post(url, params)
			.success(function(data,status){
				var t2 = (new Date()).getTime();
				console.log("Login request is taking time: "+(t2-t1)/1000);
				console.log(data);
				deferred.resolve(data);
			})
			.error(function(data,status){
				console.log(data);
				deferred.reject(data);
			})
			return deferred.promise;
	};
	return utils;
}]);

services.factory('projectUtils',['$rootScope', 'Constants', 'Config', '$http', '$q','CSInterface',
function($rootScope, Constants, Config, $http, $q, CSInterface){
	$rootScope.projectProperties=new Array();
	for(i=0;i<100;i++){
		$rootScope.projectProperties.push(new projectNo(i));
	}
	var utils={};
	utils.selectedProjectId=0;			//Project Clicked(Selected) Id
	utils.selectedProjectIndex=-1;		//Project Clicked(Selected) Index
	utils.currentProjectId=-1;			//Previously Selected(current) project

	utils.projectsCopy={};				//Stores latest retrieved projects list

	utils.reset=function(){
		this.selectedProjectId=0;
		this.selectedProjectIndex=-1;
		this.currentProjectId=-1;
	};
	utils.changeStyleToSelected=function(index){
		//Check if the project in XMP is not there in the user's project list
		if($rootScope.projectProperties[index]){
			$rootScope.projectProperties[index].style.border="1px solid "+$rootScope.projectProperties[index].style.color;
			var rgba = hexToRgb($rootScope.projectProperties[index].style.color);
			$rootScope.projectProperties[index].style.background="rgba("+rgba.r+", "+rgba.g+", "+rgba.b+", 0.075) url(assets/Images/project_item_handle_background.gif) no-repeat left";
			$rootScope.projectProperties[index].message="In Progress";
		}
	};
	utils.changeStyleToDeselected=function(index){
		$rootScope.projectProperties[index].style.border="1px solid #555";
		$rootScope.projectProperties[index].style.background="";
		$rootScope.projectProperties[index].message="";
	};

	utils.setCurrentProjectId=function(val){
		this.currentProjectId=val;
	};
	utils.setSelectedProjectIndex=function(val){
		this.selectedProjectIndex=val;
	};

	utils.getSelectedProjectIndex=function(){
		return (this.selectedProjectIndex);
	};
	utils.getCurrentProjectId=function(){
		return this.currentProjectId;
	};
	utils.setSelectedProjectId=function(value){
		this.selectedprojectId=value;
	};
	utils.getSelectedProjectId=function(){
		return(this.selectedprojectId);
	};
	utils.getProjects=function(username, password, userid){
		var deferred=$q.defer();
		var params=[];
		params['username']=username;
		params['password']=password;
		params['userid']=userid;
		var url=Constants.URL_SERVICE+Constants.PROJECT_RETRIEVE_ADDRESS;
		//var url='getprojectlist.json';
		$http.post(url,params)
		.success(function(data){
			utils.projectIndexes={};
			utils.projectsCopy=data;				//Save the freshly retrieved project list
			for(var i=0;i<data.length;i++){
				var pid=data[i].pid;
				utils.projectIndexes[pid]=i;
				$rootScope.projectProperties[i].style={};
				$rootScope.projectProperties[i].style.color=data[i].colorcode;
			}
			console.log(utils.projectIndexes);
			deferred.resolve(data);
		})
		.error(function(data){
			//In Case of error, send back the last retrieved copy
			deferred.reject(utils.projectsCopy);
		})
		return deferred.promise;
	};

	utils.addProject=function(projectName, jobId, budgetHrs, color, colorindex){
		var deferred=$q.defer();
		var params=[];
		params['userid']=Config.data.userid;
		params['name']= projectName;
		params['jobid']=jobId;
		params['budget']=budgetHrs;
		params['color']=color;
		params['colorindex']=colorindex;

		$http.post(Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS,params)
		.success(function(data){deferred.resolve(data);})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};

	utils.editProject=function(projectId, projectName, jobId, budgetHrs, color, colorindex){
		var deferred=$q.defer();
		var params=[];
		params['projectid']=projectId;
		params['userid']=Config.data.userid;
		params['name']= projectName;
		params['jobid']=jobId;
		params['budget']=budgetHrs;
		params['color']=color;
		params['colorindex']=colorindex;
		$http.post(Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS,params)
		.success(function(data){deferred.resolve(data);})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};

	utils.selectProject=function(){
		//Check the current document's XMP
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			if(data==""||!utils.projectIndexes.hasOwnProperty(parseInt(data))){
				//The opened document has no associated project, Clear selected Project
				if(utils.getSelectedProjectIndex()!=-1){
					$rootScope.$apply(function(){
						utils.changeStyleToDeselected(utils.getSelectedProjectIndex());
					});
				}
				utils.setSelectedProjectIndex(-1);
				utils.setCurrentProjectId(-1);
			}
			else{
				//When the doc. has an associated project, select the project(change style and message)
				$rootScope.$apply(function() {
					if(utils.getSelectedProjectIndex()!=-1){
						utils.changeStyleToDeselected(utils.getSelectedProjectIndex());

					}
					if(data!=""/* ||data!="EvalScript error." */){
						console.log("Data from project xmp : "+data);
						utils.changeStyleToSelected(utils.projectIndexes[parseInt(data)]);
					}
					utils.setSelectedProjectIndex(utils.projectIndexes[parseInt(data)]);
					utils.setCurrentProjectId(parseInt(data));
				});
			}
		});
	};


	return utils;
}]);



/********************************/
/********** App Watcher *********/
/********************************/

services.factory('AppWatcher',['$location','$rootScope','Constants','Logger', 'projectUtils', 'debuggerUtils', 'CSInterface', 'Config', 'WatcherPhotoshop',function($location, $rootScope, Constants, Logger, projectUtils, debuggerUtils, CSInterface, Config, watcherPS){
	var utils={};
	utils.removeEventListeners=function(){
		CSInterface.removeEventListener('documentAfterActivate',onDocumentAfterActivate);
		CSInterface.removeEventListener('documentAfterDeactivate', onDocumentAfterDeactivate);
		CSInterface.removeEventListener('documentAfterSave', onDocumentAfterSave);
		CSInterface.removeEventListener('applicationActivate',onApplicationActivate);
		CSInterface.removeEventListener('applicationBeforeQuit',onApplicationBeforeQuit);
		watcherPS.remove();
	};

	utils.addEventListeners=function(){
		//Define Event Listeners
		CSInterface.addEventListener('documentAfterActivate', onDocumentAfterActivate);
		CSInterface.addEventListener('documentAfterDeactivate', onDocumentAfterDeactivate);
		CSInterface.addEventListener('documentAfterSave', onDocumentAfterSave);
		CSInterface.addEventListener('applicationActivate', onApplicationActivate);
		CSInterface.addEventListener('applicationBeforeQuit', onApplicationBeforeQuit);
		CSInterface.addEventListener('projectSelected', onProjectSelected);
		CSInterface.addEventListener('onCreationComplete', onCreationComplete);
		watcherPS.init();
	};

	function onDocumentAfterDeactivate(event){
		console.log(event.type);
		CSInterface.evalScript('$._extcommon.checkDocLength()',function(data){
			if(parseInt(data)==0){
				projectUtils.selectProject();
			}
		});
	};

	function onProjectSelected(event){
		Logger.log(event.type);
	};
	function onCreationComplete(event){
		Logger.log(event.type);
	};
	function onDocumentAfterActivate(event){
		console.log(event);
		debuggerUtils.updateLogs(event.type);
		projectUtils.selectProject();
		Logger.log(event.type);
	};
	function onDocumentAfterSave(event){
		console.log(event);
		console.log("Current project id while saving "+projectUtils.getCurrentProjectId());
		if(projectUtils.getCurrentProjectId()==-1){//No project Selected, Search for .creativeworxproject file recursively, and get project Id, else get 0.
		CSInterface.evalScript('$._extCWFile.getProjectID(\"'+Config.userid+'\")', function(pid){
			console.log("project id from .creativeworx file"+pid);
			if(pid!=""){
				//Assign that project id to the current document
				CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.insertXMP(\''+pid+'\')',function(data){
					console.log("XMP Inserted");
					projectUtils.setCurrentProjectId(pid);
					projectUtils.selectProject();
					var event=new CSEvent("projectSelected", "APPLICATION");
					event.type="projectSelected";
					event.data="<projectSelected />";
					CSInterface.dispatchEvent(event);
					Logger.log("documentAfterSave");
				});
			}
		});

		}
		if(projectUtils.getCurrentProjectId()!=0){
			Logger.log(event.type);
		}
	};
	function onApplicationActivate(event){
		console.log(event);
		Logger.log(event.type);
	};
	function onApplicationBeforeQuit(event){
		Logger.log(event.type);
	};

	return utils;

}]);


services.factory('WatcherPhotoshop',['Constants','Logger','debuggerUtils','$interval','CSInterface',function(Constants, Logger, debuggerUtils, $interval, CSInterface){
	var prevHistoryState={};
	var promise_logUserActiveStatus="";
	var previousDocName="";
	var activityTimerHandler = function(){
		//app.activeDocument.hostObjectDelegate
		CSInterface.evalScript("$._ext_PHXS_Utils.getHistoryStates()", function(historyStatesArray){
			if(historyStatesArray.length<=0){
				return ;
			}
			currentHistoryState=JSON.parse(historyStatesArray);
			currentDocument=Object.keys(currentHistoryState)[0];
			//Check if the document already exists in the previous State
			if(prevHistoryState.hasOwnProperty(currentDocument)){
				//Compare the arrays
				var docPrevHistoryState=prevHistoryState[currentDocument];
				if(!match(docPrevHistoryState, currentHistoryState[currentDocument])){
					console.log("Event trigerred: userActive");
					//Save Current State in Previous State.
					prevHistoryState[currentDocument]=currentHistoryState[currentDocument];
					//Log UserActive Event.
					//Logger.log("userActive");
				}
				else{
					console.log("User Not Active");
				}
			}
			//else, Log it as new entry and send user active event.
			else{
				prevHistoryState[currentDocument]=currentHistoryState[currentDocument];
				console.log("Event trigerred: userActive");
				//Logger.log("userActive");
			}

			console.log(prevHistoryState);

		});
	};

	//OnHold. For logging PS events: Make,Delete, Open, Close
	var documentChanged = function(event){
		console.log(event);
		//Logger.log(event.type);
	};

	var pswatcher={};
	pswatcher.init=function(){
		promise_logUserActiveStatus= $interval(activityTimerHandler, 5*60*1000);

		unregisterPrevEvents();

		CSInterface.evalScript('app.activeDocument.historyStates[0].name',function(currentDoc){
			previousDoc=currentDoc;
		});
		var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
		// Set Event properties: extension id
		event.extensionId = Constants.EXTENSION_ID;
		//1935767141-save
		//1332768288-open
		//1131180832-close
		//1936483188-select
		//1298866208-make
		event.data = "1935767141, 1332768288, 1131180832, 1936483188,  1298866208";
		// Dispatch the Event
		CSInterface.dispatchEvent(event);
		// Attach a callback
		CSInterface.addEventListener("PhotoshopCallback", PSCallback);
	};
	pswatcher.remove=function(){
		unregisterPrevEvents();
		$interval.cancel(promise_logUserActiveStatus);
	};

	var PSCallback=function(csEvent) {
        var dataArray = csEvent.data.split(",");
		console.log(csEvent);
        var eventID=dataArray[0];
		console.log(eventID);
		switch(eventID){
			case "1935767141":dispatchEvent('documentAfterSave');
				CSInterface.evalScript('app.activeDocument.fullName',function(name){
					previousDocName=name;
				});
			break;
			case "1131180832":
				console.log("document closed");
				CSInterface.evalScript('app.documents.length',function(length){
					console.log("In CsInterface");
					if(length==0){
						dispatchEvent('documentAfterDeactivate');
					}
					else{
						dispatchEvent('documentAfterActivate');
				}});
				break;

			case "1332768288":
				console.log("Document Opened");
				CSInterface.evalScript('$._ext_PHXS_XMP.getCurrentDocumentName()',function(name){
					previousDocName=name;
					dispatchEvent('documentAfterActivate');
				});
				/* CSInterface.evalScript('$._ext_PHXS_XMP.stampCurrentDoc()',function(){
					dispatchEvent('documentAfterActivate');
					previousDocTS=(new Date()).getTime().toString();
				}); */


				break;
			case "1298866208":
				console.log("new document");
				CSInterface.evalScript('$._ext_PHXS_XMP.getCurrentDocumentName()',function(name){
					previousDocName=name;
					dispatchEvent('documentAfterActivate');
				});
				/* CSInterface.evalScript('$._ext_PHXS_XMP.stampCurrentDoc()',function(){
					dispatchEvent('documentAfterActivate');
					previousDocTS=(new Date()).getTime().toString();
				}); */
				break;
			case "1936483188":
				console.log('Document Switched');
				/* CSInterface.evalScript('app.activeDocument.historyStates[0].name',function(currentDoc){
				console.log(currentDoc);
				if(currentDoc!=previousDoc){
					previousDoc=currentDoc;
					dispatchEvent('documentAfterActivate');
				}
				}); */

				/* CSInterface.evalScript('$._ext_PHXS_XMP.getCurrentDocumentTimeStamp()',function(currentDocTS){
				if(currentDocTS!=previousDocTS){
					previousDocTS=currentDocTS;
					dispatchEvent('documentAfterActivate');
				}
				});  */

				CSInterface.evalScript('$._ext_PHXS_XMP.getCurrentDocumentName()',function(currentDocName){
					if(currentDocName!=previousDocName){
						previousDocName=currentDocName;
						dispatchEvent('documentAfterActivate');
					}
				});

			default:break;

		}

    };

	return pswatcher;
}]);






function dispatchEvent(type){
	console.log("Dispatching event"+type);
	var event=new CSEvent(type, "APPLICATION", "PHXS", Constants.EXTENSION_ID);
	event.data="<"+type+" />";
	new CSInterface().dispatchEvent(event);
}

function documentSelected(){
	console.log("In Document Selected");
	new CSInterface().evalScript('app.activeDocument.historyStates[0].name',function(currentDoc){
		console.log(currentDoc);
		if(currentDoc!=previousDoc){
		previousDoc=currentDoc;
		return 1;

	}
	else return 0;
	});

}

function unregisterPrevEvents(){
	var event = new CSEvent("com.adobe.PhotoshopUnRegisterEvent", "APPLICATION");
	event.data = "1935767141, 1332768288, 1131180832, 1936483188,  1298866208";
	event.extensionId = Constants.EXTENSION_ID;
	new CSInterface().dispatchEvent(event);
	console.log("Unregistering events");
}



services.factory('Logger', ['Constants','Config','DBHelper', 'AppModel','CSInterface',function(Constants,Config ,DBHelper, AppModel, CSInterface){
	/* Get the Data from App Model*/
	/* Collate items to log like form JSON*/
	/* Call DB function to log*/
	var utils={};
	console.log("In Logger...");
	utils.log=function(event){
		console.log("Updating App Model...");
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getDetails()', function(data){
			AppModel.updateModel(JSON.parse(data));
			event=eventIdToName(event);
			createLoggingData(event);
		});

	};

	var eventIdToName=function(event){
		rtnString = event;
		/*switch(eventType){
			case "1332768288":
			{
				rtnString = Constants.EVENT_DOCUMENT_OPEN;
				break;
			}
			case "1131180832":
			{
				rtnString = Constants.EVENT_DOCUMENT_CLOSE; // "documentClose";
				break;
			}
			default:
			{
				break;
			}
		}
		*/
		return rtnString;
	};

	var createLoggingData=function(eventType){
		console.log("Creating Logging Data");
		var addObj={};
		//addObj.ID="";
		addObj.eventID=AppModel.documentID+':'+AppModel.eventStartTime.getTime().toString();
		addObj.userID=AppModel.userID;
		addObj.computerID="";
		addObj.projectID=AppModel.projectID;
		addObj.startTime=AppModel.eventStartTime;
		addObj.endTime=AppModel.eventEndTime;
		addObj.imageName="";
		addObj.eventRecordedTime=new Date();
		//addObj.status=Constants.STATUS_NEW;
		//addObj.imageStatus=Constants.IMAGE_STATUS_NEW;
		var obj={
			"event": {
				"type": eventType,
				"documentID": AppModel.documentID,
				"instanceID": AppModel.instanceID,
				"originalID": AppModel.originalID,
				"documentName": AppModel.documentName,
				"documentPath": AppModel.documentPath,
				"hostName": AppModel.hostName,
				"hostVers": AppModel.hostVers,
				"extName": Constants.EXTENSION_NAME,
				"extVers": Constants.EXTENSION_VERSION_NUMBER
			}
		};
		addObj.jsonEventPackage=obj;
		console.log(addObj);
		DBHelper.addItemToEventLogTable(addObj);
	};
	return utils;
}]);

services.factory('AppModel', ['Config','Constants', 'CSInterface', function(Config, Constants, CSInterface){
	var utils={};
		 utils.defaultDocumentID = ""; //Used No where
		 utils.userID = "";
		 utils.systemID = "";
		 utils.projectID=0;
		 utils.instanceID = "";
		 utils.originalID = "";
		 utils.documentName = "";
		 utils.documentPath = "";
		 utils.eventStartTime = new Date();
		 utils.eventEndTime = new Date();
		 //utils.jsonEventInfo = "";
		 utils.hostName="";
		 utils.hostVers="";
		 utils.previewFileName = "";
		 utils.previewFile = null;
		 utils.documentID="";


	/* Call JSX functions to get the required parameters for the document*/
	utils.updateModel=function(data){
		this.hostName=getHostName();
		this.hostVers=CSInterface.hostEnvironment.appVersion;
		this.projectID=data.projectID;
		this.instanceID=data.instanceID;
		this.originalID=data.originalID;
		this.documentName=data.docName;
		this.documentPath=data.docPath;
		this.documentID=data.docID;
		this.userID=Config.data.userid;
		this.eventStartTime = new Date();
		this.eventEndTime = new Date();

	};
	/* Return required parameters (getters)*/
	getModel=function(){
		this.setModel();
		return {}
	};
	getHostName=function(){
		switch(Constants.APP_NAME){
			case "IDSN":return 'indesign';
			case "PHXS":return 'photoshop';
			case "ILST":return 'illustrator';
			default:return '';
		}
	};
	getProjectID=function(){
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectID()', function(data){console.log(data);return data;});
	};
	getInstanceID=function(){
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getInstanceID()', function(data){console.log(data);return data});
	};
	getOriginalID=function(){
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getOriginalID()', function(data){console.log(data);return data});
	};
	getDocumentName=function(){
		CSInterface.evalScript('app.activeDocument.name', function(data){console.log(data);return data});
	};
	getDocumentPath=function(){
		CSInterface.evalScript('app.activeDocument.filePath', function(data){console.log(data);return data});
	};

	return utils;

}]);


services.factory('DBHelper',['$http','$interval','Constants','Config','debuggerUtils', 'CSInterface',
function($http,$interval,Constants,Config, debuggerUtils, CSInterface){

	//Open/Create the Log file(for unsent records)
	CSInterface.evalScript('$._extFile.openFile()');

	var sendLoggedRecords=function(){
		console.log("[syncRecordsTimerHandler]: Record are being fetched from local file and sending to server");
		debuggerUtils.updateLogs("[syncRecordsTimerHandler]: Record are being fetched from local file and sending to server");
		CSInterface.evalScript('$._extFile.readAndSend()',function(data){
			processAndSend(data);
		});
	};

	//Setup Interval to read the unsend record file and try to send them.
	var promise_sendLoggedRecords= $interval(sendLoggedRecords,5*60*1000);


	//Get the records, batch them if if size>batch size and then send them to server
	var processAndSend=function(records){
		//Check Record Size(if recordSize>batch size, break them into batches before sending)
		var Records=JSON.parse(records);
		var rec=[];
		if(Records.length>1){
			if(Records.length>=Constants.BATCH_SIZE){
				for(var i=0;i<Constants.BATCH_SIZE;i++){
					rec.push((Records.splice(0,1))[0]);
					//Decode documentName and documentPath and hostName
					rec[i].jsonEventPackage.event.documentName=atob(rec[i].jsonEventPackage.event.documentName);
					rec[i].jsonEventPackage.event.documentPath=atob(rec[i].jsonEventPackage.event.documentPath);
					rec[i].jsonEventPackage.event.hostName=atob(rec[i].jsonEventPackage.event.hostName);
					//Done Decoding
					rec[i].jsonEventPackage=JSON.stringify(rec[i].jsonEventPackage);

				}
				send(JSON.stringify(rec));
				console.log("send records\n");
				console.log(JSON.stringify(rec));
				rec=[];
			}
			for(var i =0;i<Records.length;i++){
				//Decode documentName and documentPath and hostName
				Records[i].jsonEventPackage.event.documentName=atob(Records[i].jsonEventPackage.event.documentName);
				Records[i].jsonEventPackage.event.documentPath=atob(Records[i].jsonEventPackage.event.documentPath);
				Records[i].jsonEventPackage.event.hostName=atob(Records[i].jsonEventPackage.event.hostName);
				//Done Decoding
				Records[i].jsonEventPackage=JSON.stringify(Records[i].jsonEventPackage);
			}
			if(Records.length>0){
				send(JSON.stringify(Records));
				console.log("send records\n");
				console.log(JSON.stringify(Records));
			}
		}
	};

	//Send the batched records to server, If records can't be sent, log them.
	var send=function(batchedRecords){
		//Send Batched Records to Server
		var url=Constants.URL_SERVICE+Constants.BATCHDATA_SEND_ADDRESS;
		var details={};

		details['data']=batchedRecords;
		details['username']=Config.username;
		details['password']=Config.password;

		$http.post(url,details)
		.success(function(data){
			//console.log(data);
			if(data=="Invalid event details."){
				debuggerUtils.updateLogs("[httpResult]: Invalid data error occurred on server " + data);
				logit(batchedRecords);
			}
			else{
				debuggerUtils.updateLogs("[httpResult]: Records successfully sent to Remote server. " + data);
			}
		}
		).error(function(data){
			debuggerUtils.updateLogs("[httpResult]: Cannot contact to server. " + data);
			logit(batchedRecords);
		})
	};

	//Log unsent events to the file
	var logit=function(buffer){
		debuggerUtils.updateLogs("Logging unsent events to local file");
		var records=JSON.parse(buffer);
		var record;
		for(var i=0;i<records.length;i++){
			records[i].jsonEventPackage=JSON.parse(records[i].jsonEventPackage);
			//Encode documentName and documentPath and hostName
			records[i].jsonEventPackage.event.documentName=btoa(records[i].jsonEventPackage.event.documentName);
			records[i].jsonEventPackage.event.documentPath=btoa(records[i].jsonEventPackage.event.documentPath);
			records[i].jsonEventPackage.event.hostName=btoa(records[i].jsonEventPackage.event.hostName);
			//Done Encoding
			records[i].jsonEventPackage=JSON.stringify(records[i].jsonEventPackage);
			record=JSON.stringify(records[i]);
			record=record.replace('jsonEventPackage":"','jsonEventPackage":');
			record=record.replace('}}"}','}}}');
			console.log("Logged Records \n "+record);
			CSInterface.evalScript('$._extFile.writeObj(\''+record+'\')');
		}
	};


	dbhelper={};
	var buffer=[];
	//Buffer them till the buffer size and then sends them.
	dbhelper.addItemToEventLogTable=function(obj){
		if(buffer.length<Constants.BATCH_SIZE-1&&obj.jsonEventPackage.event.type!="documentAfterSave"){
			console.log("Data Buffered");
			console.log(buffer);
			obj.jsonEventPackage=JSON.stringify(obj.jsonEventPackage);
			buffer.push(obj);
		}
		else{
			//Send to server
			obj.jsonEventPackage=JSON.stringify(obj.jsonEventPackage);
			buffer.push(obj);
			console.log("Sending buffer");
			console.log(buffer);
			console.log(JSON.stringify(buffer));
			send(JSON.stringify(buffer));
			//empty the buffer
			buffer=[];
		}
	};
	return dbhelper;
}]);


services.factory('debuggerUtils',['Constants','$rootScope','CSInterface',
function(Constants,$rootScope,CSInterface){
	var utils={};
	$rootScope.logs="";
	utils.updateLogs = function(statusText){
		//$rootScope.$apply(function(){
			$rootScope.logs=statusText+'\n'+$rootScope.logs;
			var now=new Date();
			var str=now.toLocaleString()+" ";
			CSInterface.evalScript('$._extcommon.logToDebugFile(\''+str+statusText+'\')',function(){});
		//});
	};


	return utils;
}]);

function match(ary1, ary2){
	if(ary1.length!=ary2.length){
		return false;
	}
	else{
		for(var i=0;i<ary1.length;i++){
			if(ary1[i]!=ary2[i]){
				return false
			}
		}
		return true;
	}
}

function loadJSX() {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
}

function evalScript(script, callback) {
	new CSInterface().evalScript(script, callback);
}
