var services=angular.module('TTServices',[]);

services.factory('Constants',function(){
	var constants={};
		
		constants.EXTENSION_NAME = "TimeTracker-CreativeWorx";
		
		constants.EXTENSION_VERSION_NUMBER = "1.1.7";
		
		constants.MINIMUM_REQUIRED_SERVER_VERSION = Number("1.1");
		
		constants.CW_NAMESPACE_NAME = "creativeworx";
		constants.CW_NAMESPACE = "http://www.creativeworx.com/1.0/";
		
		constants.STATUS_NEW = "NEW";
		constants.STATUS_ATTEMPTED = "ATTEMPTED";
		constants.STATUS_TRANSFERRED = "TRANSFERRED";
		constants.IMAGE_STATUS_NEW = "NEW";
		constants.IMAGE_STATUS_TRANSFERRED = "TRANSFERRED";
		constants.IMAGE_STATUS_NOIMAGE = "NONE"
		constants.IMAGE_STATUS_ERROR = "ERROR"; // Currently only error is file not found
		//??? consider adding other errors involving conditions that may be recoverable, errors not recoverable
		
		constants.PROJECT_COLORS= [
			"0x888888", //0
			"0xFFF772", //1
			"0xF8AE3B", //2
			"0xEA7527", //3
			"0xCC4824", //4
			"0xC02006", //5
			"0xA5080B", //6
			"0xA32445", //7
			"0xE47284", //8
			"0x854E9D", //9
			"0x7166A3", //10
			"0xA588B5", //11
			"0x83B8E5", //12
			"0x337EBD", //13
			"0x004382", //14
			"0x00606E", //15
			"0x1D6348", //16
			"0x239E6E", //17
			"0x88E2AC", //18
			"0x62A162", //19
			"0x1F6F1F", //20
			"0x937862", //21
			"0x6A482C", //22
			"0x5D5D5D", //23
			"0x999999"  //24
		];
		
		// Note: constant values are retrieved from server or from config file values. The following are
		//  used to provide safe boundries as well as default values in case of errors
		// See ConfigVO class and login results for details.
		constants.TIMEINTERVAL     = 1000*60*4; // Default send data time interval of 4 minutes
		constants.TIMEINTERVAL_MIN = 1000; // Minimum time inteval 1 second in milliseconds
		constants.TIMEINTERVAL_MAX = 1000*60*60; // Maximum time interval1 hour in milliseconds
		constants.BATCH_SIZE = 5; // Default number of events to send to server 
		constants.BATCH_SIZE_MIN = 1; // Minimum number of events to send, send at least 1
		constants.BATCH_SIZE_MAX = 1000; // Maxiumn number of events to send, 1000
		
		constants.CHECK_ONLINE_TIMEINTERVAL = 20000;
		constants.IMAGE_TIMEINTERVAL = 50000;
		constants.THRESHOLD_COUNT = 100;


		constants.APP_EVENT_POLL = 5000; // How frequently to check for events in the app
		//*** APP_EVENT_POLL needs additional analysis, currently need only in Fl/Flash Pro
		
		
		//constants.URL_SERVICE = "https://timetracker.creativeworx.com";
		constants.URL_SERVICE = "http://ttdev.creativeworx.com";
		
		// Service calls : see cooresponding calls in the ServiceController.php - created by simply defining the function
		constants.BATCHDATA_SEND_ADDRESS = "/service/log";                           // *
		constants.CHECK_STATUS_ADDRESS = "/service/checkstatus";
		constants.FILE_UPLOAD_ADDRESS = "/service/fileupload";
		constants.LOGIN_ADDRESS = "/service/getuserdetails";                         // *
		constants.PROJECT_RETRIEVE_ADDRESS = "/service/getprojectlist";              // *
		constants.CHECK_USER_DETAILS_ADDRESS = "/service/userdetails"; //***
																									  // *
		constants.PROJECT_UPDATE_ADDRESS = "/service/addeditproject"; // using existing single project update /service/updateprojectlist";
		

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
		
		constants.URL_SITE =             "http://www.creativeworx.com";
		
		constants.URL_TERMS_OF_SERVICE = "/terms.php";
		constants.URL_PRIVACY_POLICY =   "/privacy.php";
		constants.URL_SIGNUP = 		  "/signup?plan=ext";
		constants.URL_BETA_FEEDBACK = 	  "/betaFeedback.php";
		constants.URL_FORGOT_LOGIN =     "/user/forgotpassword";
		
		constants.FILENAME_EXTENSION =   "TimeTracker.zxp";
		
		constants.URL_UPDATE =           "http://www.creativeworx.com";
		
		constants.URL_DOWNLOAD = 		  "/downloads/timetracker/TimeTracker";
		constants.URL_ZXP_DOWNLOAD = 	  "/downloads/timetracker/" + constants.FILENAME_EXTENSION;
		constants.URL_ZIP_DOWNLOAD = 	  "/downloads/timetracker/TimeTracker.zip";
		constants.URL_VERSION = 		  "/downloads/timetracker/TimeTrackerUpdate.xml";
		
		constants.APP_NAME=new CSInterface().hostEnvironment.appName;
		constants.EXTENSION_ID=new CSInterface().getExtensionID();
		
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
		
	return constants;
});



services.factory('Config', ['Constants','$q',function(Constants, $q){
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
	
  
	/* config.userName="rishabh.jain9191@gmail.com";
	config.password="0a27b76628db3a7e47d627e71d3d4cc2";
	config.keepMeLoggedIn="true"; */
	
	// var init=function(){
	//var deferred=$q.defer();
	 // new CSInterface().evalScript('$._ext.isExists()',function(data){
		// if(data == "1"){
			// new CSInterface().evalScript('$._ext.readConfig()', function(data1){
				// console.log(data1);
				// console.log(JSON.parse(data1));
				// config=JSON.parse(data1);
				// console.log(config);
				// deferred.resolve("0");
				
			// });
		// }
		
	// });
	//return deferred.promise;
	
	
	//config.write=function(){
		
	//};
	// init();
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

services.factory('loginUtils',['Constants', 'Config','$http','$q',
function(Constants, Config, $http, $q){
	var utils={};
	utils.loginResult='aa';
	utils.login=function(username, password){
		
		var deferred=$q.defer();
		if(username=='undefined'){username=Config.username;}
		if(password=='undefined'){password=Config.password;}
		var params=[];
		params['username']=username;
		params['password']=password;
		params['clientversion']=Constants.EXTENSION_VERSION_NUMBER;
		
		var url=Constants.URL_SERVICE+Constants.LOGIN_ADDRESS;
		$http.post(url,params)
			.success(function(data,status){
			
				deferred.resolve(data);
			})
			.error(function(data,status){
					deferred.reject(data);
			/* this.loginResult=true; */
			})
			return deferred.promise;
		
	};
	return utils;
}]);

services.factory('projectUtils',['$rootScope', 'Constants', 'Config', '$http', '$q',
function($rootScope, Constants, Config, $http, $q){
	
	$rootScope.projectProperties=new Array();
		for(i=0;i<100;i++){
		$rootScope.projectProperties.push(new projectNo(i));
		}
	var utils={};
	utils.selectedProjectId=0;			//Project Clicked(Selected) Id
	utils.selectedProjectIndex=-1;		//Project Clicked(Selected) Index
	utils.currentProjectId=-1;			//Previously Selected(current) project
	
	utils.reset=function(){
		this.selectedProjectId=0;
		this.selectedProjectIndex=-1;
		this.currentProjectId=-1;	
		console.log("Done Resetting ");
	},
	utils.changeStyleToSelected=function(index){

		//The project in XMP is not there in the user's project list
		if($rootScope.projectProperties[index]){
			console.log($rootScope.projectProperties);
			$rootScope.projectProperties[index].style.border="1px solid "+$rootScope.projectProperties[index].style.color;
			var rgba = hexToRgb($rootScope.projectProperties[index].style.color);
			$rootScope.projectProperties[index].style.background="rgba("+rgba.r+", "+rgba.g+", "+rgba.b+", 0.075)";
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
		console.log("Selected project index stored");
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
		/*var url=Constants.URL_SERVICE+Constants.PROJECT_RETRIEVE_ADDRESS+'?username='+username+'&password='+password+'&userid='+userid;
		console.log(url);
		$http({method:'get',
			url:url
		})*/
		
		
		console.log(Constants.URL_SERVICE+Constants.PROJECT_RETRIEVE_ADDRESS);
		
		var params=[];
		params['username']=username;
		params['password']=password;
		params['userid']=userid;
		url=Constants.URL_SERVICE+Constants.PROJECT_RETRIEVE_ADDRESS;
		$http.post(url,params)
		.success(function(data){
			console.log(data);
			utils.projectIndexes={};
			for(var i=0;i<data.length;i++){
				var pid=data[i].pid;
				utils.projectIndexes[pid]=i;
				$rootScope.projectProperties[i].style={};
				$rootScope.projectProperties[i].style.color=data[i].colorcode;
				data.showMeta=false;
			}
			console.log(utils.projectIndexes);
			deferred.resolve(data);
		})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};
	
	utils.addProject=function(projectName, jobId, budgetHrs, color){
		var deferred=$q.defer();
		/*var url=Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS+'?userid='+Config.data.userid+'&name='+projectName+'&jobid='+jobId+'&budget='+budgetHrs+'&color='+color;
		console.log(url);
		$http({method:'get',
		url:url
		})*/
		
		var params= $.param({userid: Config.data.userid, name: projectName, jobid: jobId, budget: budgetHrs, color: color });
		var params=[];
		params['userid']=Config.data.userid;
		params['name']= projectName;
		params['jobid']=jobId;
		params['budget']=budgetHrs;
		params['color']=color;
		
		$http.post(Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS,params)
		.success(function(data){deferred.resolve(data);})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};
	
	utils.editProject=function(projectId, projectName, jobId, budgetHrs, color){
		var deferred=$q.defer();

		/*var url=Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS+'?projectid='+projectId+'&userid='+Config.data.userid+'&name='+projectName+'&jobid='+jobId+'&budget='+budgetHrs+'&color='+color;

		console.log(url);
			$http({method:'POST',
			url:url
		})*/
		
		
		var params=[];
		params['projectid']=projectId;
		params['userid']=Config.data.userid;
		params['name']= projectName;
		params['jobid']=jobId;
		params['budget']=budgetHrs;
		params['color']=color;
		
		$http.post(Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS,params)
		.success(function(data){deferred.resolve(data);})
		.error(function(data){debuggerUtils.updateLogs("[LoginResult]: Try/Catch Failed"/*todo*/);alert(data);deferred.reject(data);})
		return deferred.promise;
	};
	
	utils.selectProject=function(){
		//Check the current document's XMP
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			//alert(data);
			if(data==""||!utils.projectIndexes[parseInt(data)]){
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
				console.log(utils.getSelectedProjectIndex());
				//When the doc. has an associated project, select the project(change style and message)
				$rootScope.$apply(function() {
					console.log("Data from XMP<"+data+">");
					if(utils.getSelectedProjectIndex()!=-1){
						utils.changeStyleToDeselected(utils.getSelectedProjectIndex());
						
					}
					if(data!=""/* ||data!="EvalScript error." */){
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

////////----------App Watcher Begins------------------///////////
/***************************************************************
****************************************************************
***************************************************************/
services.factory('AppWatcher',['$location','$rootScope','Constants','Logger', 'projectUtils', 'debuggerUtils', 'WatcherPhotoshop', function($location, $rootScope, Constants, Logger, projectUtils, debuggerUtils, watcherPS ){
	console.log('App Watcher Started');
	
	var utils={};
	utils.removeEventListeners=function(){
		new CSInterface().removeEventListener('documentAfterActivate',onDocumentAfterActivate);
		new CSInterface().removeEventListener('documentAfterDeactivate', onDocumentAfterDeactivate);
		new CSInterface().removeEventListener('documentAfterSave', onDocumentAfterSave);
		new CSInterface().removeEventListener('applicationActivate',onApplicationActivate);
		new CSInterface().removeEventListener('applicationBeforeQuit',onApplicationBeforeQuit);
		watcherPS.remove();
	};
	
	
	utils.addEventListeners=function(){
		//Define Event Listeners
		new CSInterface().addEventListener('documentAfterActivate', onDocumentAfterActivate);
		new CSInterface().addEventListener('documentAfterDeactivate', onDocumentAfterDeactivate);
		new CSInterface().addEventListener('documentAfterSave', onDocumentAfterSave);
		new CSInterface().addEventListener('applicationActivate', onApplicationActivate);
		new CSInterface().addEventListener('applicationBeforeQuit', onApplicationBeforeQuit);
		new CSInterface().addEventListener('projectSelected', onProjectSelected);
		new CSInterface().addEventListener('onCreationComplete', onCreationComplete);
		watcherPS.init();
	};
	 
	function onDocumentAfterDeactivate(event){
		console.log(event.type);
		new CSInterface().evalScript('$._extXMP.checkDocLength()', function(data){
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
		//Check whether any project id is associated with this document or not
		console.log("Current project id while saving "+projectUtils.getCurrentProjectId());
		if(projectUtils.getCurrentProjectId()==-1){//No project Selected, Search for .creativeworxproject file recursively, and get project Id, else get 0.
		new CSInterface().evalScript('$._extCWFile.getProjectID()', function(pid){
			console.log("project id from .creativeworx file"+pid);
			if(pid!=""){//Assign that project id to the current document
				new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.insertXMP(\''+pid+'\')',function(data){
					console.log("XMP Inserted");
					projectUtils.setCurrentProjectId(pid);
					projectUtils.selectProject();
					var event=new CSEvent("projectSelected", "APPLICATION");
					event.type="projectSelected";
					event.data="<projectSelected />";
					new CSInterface().dispatchEvent(event);
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
		//projectUtils.selectProject();
		Logger.log(event.type);
	};
	function onApplicationBeforeQuit(event){
		/*.........................*/
		Logger.log(event.type);
	};  
	
	return utils;

}]);


services.factory('WatcherPhotoshop',['Constants','Logger','debuggerUtils','$interval',function(Constants, Logger, debuggerUtils, $interval){
	
	var prevHistoryState="";
	var promise_logUserActiveStatus="";
	var event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");  
	event.extensionId = Constants.EXTENSION_ID;  
	console.log(event);
	event.data = PSEvent.CUT+","+PSEvent.COPY+","+PSEvent.PASTE;
	new CSInterface().dispatchEvent(event);
	
	var activityTimerHandler = function(){
		//app.activeDocument.hostObjectDelegate
		new CSInterface().evalScript("app.activeDocument.activeHistoryState.name", function(data){
			if(prevHistoryState==data){
				console.log("NOT ACTIVE");
			}else{
				console.log("ACTIVE");
				Logger.log("userActive");
				prevHistoryState=data;
			}
		}); 
	};
	
	var documentChanged = function(event){
		console.log(event);
		Logger.log(event.type);
	};
	
	var pswatcher={};
	pswatcher.init=function(){
		//Define Event Listeners
		new CSInterface().addEventListener("PhotoshopCallback", documentChanged);
		promise_logUserActiveStatus= $interval(activityTimerHandler, /*5*60**/3000);
	};
	pswatcher.remove=function(){
		new CSInterface().removeEventListener('PhotoshopCallback', documentChanged);
		$interval.cancel(promise_logUserActiveStatus);
	};
	
	return pswatcher;
}]);


services.factory('Logger', ['Constants','Config','DBHelper', 'AppModel',function(Constants,Config ,DBHelper, AppModel){
	/* Get the Data from App Model*/
	/* Collate items to log like form JSON*/
	/* Call DB function to log*/
	var utils={};
	console.log("In Logger...");
	utils.log=function(event){

		console.log("Updating App Model...");
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getDetails()', function(data){
			//console.log(data);
			AppModel.updateModel(JSON.parse(data));
			createLoggingData(event);
		});

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
		addObj.eventRecordedTime=new Date().toISOString().slice(0, 19).replace('T', ' ');
		//addObj.status=Constants.STATUS_NEW;
		//addObj.imageStatus=Constants.IMAGE_STATUS_NEW;
		var obj={"event": {
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
		addObj.jsonEventPackage=obj/* .replace(/"/g, '\\"') */;
		console.log(addObj);
		DBHelper.addItemToEventLogTable(addObj);
		
	};
	
	return utils;
}]);

services.factory('AppModel',  ['Config','Constants' ,function(Config, Constants){
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
		 utils.eventEndTime = new Date(); //*** End time 5 minutes after start (in milliseconds)
		 //utils.jsonEventInfo = "";
		 utils.hostName="";
		 utils.hostVers="";
		 utils.previewFileName = "";
		 utils.previewFile = null;
		 utils.documentID="";

	
	/* Call JSX functions to get the required parameters for the document*/
	utils.updateModel=function(data){
		this.hostName=getHostName();
		this.hostVers=new CSInterface().hostEnvironment.appVersion;
		this.projectID=data.projectID;
		this.instanceID=data.instanceID;
		this.originalID=data.originalID;
		this.documentName=data.docName;
		this.documentPath=data.docPath;
		this.documentID=data.docID;
		this.userID=Config.data.userid;
		
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
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectID()', function(data){console.log(data);return data;});
	};
	getInstanceID=function(){
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getInstanceID()', function(data){console.log(data);return data});
	};
	getOriginalID=function(){
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getOriginalID()', function(data){console.log(data);return data});
	};
	getDocumentName=function(){
		new CSInterface().evalScript('app.activeDocument.name', function(data){console.log(data);return data});
	};
	getDocumentPath=function(){
		new CSInterface().evalScript('app.activeDocument.filePath', function(data){console.log(data);return data});
	};
	/*Setters*/
	return utils;
	
}]);
services.factory('DBHelper',['$http','$interval','Constants','Config','debuggerUtils',
function($http,$interval,Constants,Config, debuggerUtils){
	
	//Open/Create the Log file(for unsent records)
	new CSInterface().evalScript('$._extFile.openFile()');
	
	
	var sendLoggedRecords=function(){
		
		debuggerUtils.updateLogs("[syncRecordsTimerHandler]: Record are being fetched from local file and sending to server");
		new CSInterface().evalScript('$._extFile.readAndSend()',function(data){
			processAndSend(data);
		});
	};
	//Setup Interval to read the unsend record file and try to send them.
	var promise_sendLoggedRecords= $interval(sendLoggedRecords,0.5*60*1000);
	
	
	//Get the records, batch them if if size>batch size and then send them to server
	var processAndSend=function(records){
		//Check Record Size(if recordSize>batch size, break them into batches before sending)
		console.log(records);
		var Records=JSON.parse(records);
		var rec=[];
		console.log(Records);
		if(Records.length>1){
		if(Records.length>Constants.BATCH_SIZE){
			for(var i=0;i<Constants.BATCH_SIZE;i++){
				rec.push(Records.splice(0,1));
			}
			send(JSON.stringify(rec));
			rec=[];
		}
		send(JSON.stringify(Records));
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
			console.log(data);
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
	
	//Log unsend events to file.
	var logit=function(buffer){
			debuggerUtils.updateLogs("Logging unsent events to local file");
			var records=JSON.parse(buffer);
			var record;
			for(var i=0;i<records.length;i++){
				//records[i].jsonEventPackage=JSON.stringify(records[i].jsonEventPackage)/* .replace(/"/g, '\\"') */;
				
				record=JSON.stringify(records[i]);
				
				console.log("Sending to file"+record);
				new CSInterface().evalScript('$._extFile.writeObj(\''+record+'\')');
			}
		};
	
	
	dbhelper={};
	var buffer=[];
	//Buffer them till the buffer size and then sends them.
	dbhelper.addItemToEventLogTable=function(obj){
		if(buffer.length<Constants.BATCH_SIZE){
			console.log("Data Buffered");
			console.log(buffer);
			buffer.push(obj);
		}
		else{
				//Send to server
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


////////----------App Watcher Ends------------------///////////
services.factory('debuggerUtils',['Constants','$rootScope',
function(Constants,$rootScope){
	var utils={};
	$rootScope.logs="";
	utils.updateLogs = function(statusText){
		//$rootScope.$apply(function(){
			$rootScope.logs=statusText+'<br />'+$rootScope.logs;
		//});
	};
	return utils;
}]);

function loadJSX() {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
}
	
function evalScript(script, callback) {
	new CSInterface().evalScript(script, callback);
}