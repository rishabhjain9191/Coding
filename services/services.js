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
		constants.BATCH_SIZE = 50; // Default number of events to send to server 
		constants.BATCH_SIZE_MIN = 1; // Minimum number of events to send, send at least 1
		constants.BATCH_SIZE_MAX = 1000; // Maxiumn number of events to send, 1000
		
		constants.CHECK_ONLINE_TIMEINTERVAL = 20000;
		constants.IMAGE_TIMEINTERVAL = 50000;
		constants.THRESHOLD_COUNT = 100;


		constants.APP_EVENT_POLL = 5000; // How frequently to check for events in the app
		//*** APP_EVENT_POLL needs additional analysis, currently need only in Fl/Flash Pro
		
		
		constants.URL_SERVICE = "https://timetracker.creativeworx.com";
		
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
	

	
services.factory('loginUtils',['Constants', 'Config','$http','$q',
function(Constants, Config, $http, $q){
	var utils={};
	utils.loginResult='aa';
	utils.login=function(username, password){
		
		var deferred=$q.defer();
		if(username=='undefined'){username=Config.username;}
		if(password=='undefined'){password=Config.password;}
		$http({
			method:'get',
			url:Constants.URL_SERVICE+Constants.LOGIN_ADDRESS+'?username='+username+'&password='+password+'&clientversion=1.1.7'})
			.success(function(data,status){
			
				deferred.resolve(data);
				/* alert("data : "+data);
				if(data.Msg=="Error: Authentication failed"){this.loginResult=true;}
				else{utils.loginResult=true;} */
				
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
	var utils={};
	utils.selectedProjectId=0;
	utils.selectedProjectIndex=-1;
	utils.currentProjectId=-1;
	utils.selectStyle={'color':'red'};
	utils.deselectStyle={'color':'gray'};
	
	utils.selectedStyle=function(){
		return this.selectStyle;
	};
	utils.deselectedStyle=function(){
		return this.deselectStyle;
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
		var url=Constants.URL_SERVICE+Constants.PROJECT_RETRIEVE_ADDRESS+'?username='+username+'&password='+password+'&userid='+userid;
		console.log(url);
		$http({method:'get',
		url:url
		})
		.success(function(data){
			utils.projectIndexes={};
			for(var i=0;i<data.length;i++){
				var pid=data[i].pid;
				utils.projectIndexes[pid]=i;
			}
			console.log(utils.projectIndexes);
			deferred.resolve(data);
		})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};
	
	utils.addProject=function(projectName, jobId, budgetHrs, color){
		var deferred=$q.defer();
		var url=Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS+'?userid='+Config.data.userid+'&name='+projectName+'&jobid='+jobId+'&budget='+budgetHrs+'&color='+color;
		console.log(url);
		$http({method:'get',
		url:url
		})
		.success(function(data){deferred.resolve(data);})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};
	
	utils.editProject=function(projectId, projectName, jobId, budgetHrs, color){
		var deferred=$q.defer();
		var url=Constants.URL_SERVICE+Constants.PROJECT_UPDATE_ADDRESS+'?projectid='+projectId+'&userid='+Config.data.userid+'&name='+projectName+'&jobid='+jobId+'&budget='+budgetHrs+'&color='+color;
		console.log(url);
		$http({method:'get',
		url:url
		})
		.success(function(data){deferred.resolve(data);})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
	};
	utils.selectProject=function(){
		//Check the current document's XMP
		
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			//alert(data);
			if(data==""){
				//The opened document has no associated project, Clear selected Project
				if(utils.getSelectedProjectIndex()!=-1){
					$rootScope.$apply(function(){
						$rootScope.projectNo[utils.getSelectedProjectIndex()].style=utils.deselectedStyle();
						$rootScope.projectNo[utils.getSelectedProjectIndex()].message="";
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
					if(data!=""/* ||data!="EvalScript error." */){
					$rootScope.projectNo[utils.projectIndexes[parseInt(data)]].style=utils.selectedStyle();
					$rootScope.projectNo[utils.projectIndexes[parseInt(data)]].message="In Progress";
					}
					if(utils.getSelectedProjectIndex()!=-1){
						$rootScope.projectNo[utils.getSelectedProjectIndex()].style=utils.deselectedStyle();
						$rootScope.projectNo[utils.getSelectedProjectIndex()].message="";
					}
					utils.setSelectedProjectIndex(utils.projectIndexes[parseInt(data)]);
					utils.setCurrentProjectId(parseInt(data));
				});
				
			}
			console.log($rootScope.projectNo);
		});
		
	};
	
	
	
	return utils;

}]);

////////----------App Watcher Begins------------------///////////
/***************************************************************
****************************************************************
***************************************************************/
services.factory('AppWatcher',['Constants','Logger', 'projectUtils', function(Constants, Logger, projectUtils ){
	console.log('App Watcher Started');
	
	  //Define Event Listeners
	new CSInterface().addEventListener('documentAfterActivate', onDocumentAfterActivate);
	new CSInterface().addEventListener('documentAfterDeactivate', onDocumentAfterDeactivate);
	new CSInterface().addEventListener('documentAfterSave', onDocumentAfterSave);
	//new CSInterface().addEventListener('applicationActivate', onApplicationActivate);
	new CSInterface().addEventListener('applicationBeforeQuit', onApplicationBeforeQuit);
	new CSInterface().addEventListener('projectSelected', onProjectSelected);
	new CSInterface().addEventListener('onCreationComplete', onCreationComplete);
	 
	function onDocumentAfterDeactivate(event){
		alert(event.type);
		new CSInterface().evalScript('app.documents.length', function(data){
			if(data==0){
				projectUtils.selectProject();
			}
		});
		//projectUtils.selectProject();
		//alert(event.type);
		//Logger.log(event);
	};
	
	function onProjectSelected(event){
		Logger.log(event);
	};
	function onCreationComplete(event){
		Logger.log(event);
	};
	function onDocumentAfterActivate(event){
		console.log(event);
		projectUtils.selectProject();
		//alert(event.type);
		Logger.log(event);
		
	};
	function onDocumentAfterSave(event){
		//Check whether any project id is associated with this document or not
		alert(event.type);
		console.log("Current project id while saving "+projectUtils.getCurrentProjectId());
		if(projectUtils.getCurrentProjectId()==-1){//No project Selected, Search for .creativeworx file recursively, and get project Id, else get 0.
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
					var abc={};
					abc.type="documentAfterSave";
					Logger.log(abc);
				});
			}
		});
			
		}
		if(projectUtils.getCurrentProjectId()!=0){
			Logger.log(event);
		}
	};
	function onApplicationActivate(event){
		console.log(event);
		projectUtils.selectProject();
		//alert(event.type);
		Logger.log(event);
	};
	function onApplicationBeforeQuit(event){
		/*.........................*/
		Logger.log(event);
	};  
	

}]);

services.factory('Logger', ['Constants','Config','DBHelper', 'AppModel',function(Constants,Config ,DBHelper, AppModel){
	/* Get the Data from App Model*/
	/* Collate items to log like form JSON*/
	/* Call DB function to log*/
	var utils={};
	console.log("In Logger...");
	utils.log=function(event){
	var eventType=event.type;
	console.log("Updating App Model...");
	new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getDetails()', function(data){
		console.log(data);
		AppModel.updateModel(JSON.parse(data));
		createLoggingData(eventType);
	});
	};
	
	var createLoggingData=function(eventType){
		console.log("Creating Logging Data");
		var addObj={};
		addObj.ID="";
		addObj.eventID=AppModel.documentID+':'+AppModel.eventStartTime.getTime().toString();
		addObj.userID=AppModel.userID;
		addObj.computerID="";
		addObj.projectID=AppModel.projectID;
		addObj.startTime=AppModel.eventStartTime;
		addObj.endTime=AppModel.eventEndTime;
		addObj.imageName="";
		addObj.eventRecordedTime=new Date().toISOString().slice(0, 19).replace('T', ' ');
		addObj.status=Constants.STATUS_NEW;
		addObj.imageStatus=Constants.IMAGE_STATUS_NEW;
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
		addObj.jsonEventPackage=JSON.stringify(obj);
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
services.factory('DBHelper',['Constants',
function(Constants){
	var dbhelper={};
	console.log("DBHelper Called");
	var SQL_CREATE_TABLE = "CREATE TABLE IF NOT EXISTS EventLog ( ID INTEGER PRIMARY KEY AUTOINCREMENT, eventID TEXT, userID TEXT, computerID TEXT, projectID TEXT, startTime DATETIME, endTime DATETIME, imageName TEXT, eventRecordedTime DATETIME, jsonEventPackage TEXT , status TEXT, imageStatus TEXT)";
	var SQL_ADD_EVENT = "INSERT INTO EventLog (eventID, userID, computerID, projectID, startTime, endTime, imageName, eventRecordedTime , jsonEventPackage , status, imageStatus) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var SQL_DELETE_EVENT = "DELETE FROM EventLog WHERE status=?";
	var SQL_SELECT_EVENT = "SELECT * FROM EventLog WHERE status=? LIMIT ?";
	var SQL_UPDATE_EVENT_TO_TRANSFERRED = "UPDATE EventLog SET status=? WHERE eventID IN (?)";
	var SQL_SELECT_NEW_EVENT_COUNT = "SELECT Count(*) as cnt FROM EventLog WHERE status=?";

	/**
	 * inti() - for creating EventLog DB Table.
	 */		
	var initDB = function(){
		console.log("initDB called");
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_CREATE_TABLE
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};
	initDB();
	/**
	 * addItemToEventLogTable - insert record in DB Table. 
	 * @param eventLog stores the values that will be inserted into DB table.
	 */		
	dbhelper.addItemToEventLogTable = function(eventLog){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(
			SQL_ADD_EVENT,
			[
				eventLog.eventID,
				eventLog.userID,
				eventLog.computerID,
				eventLog.projectID,
				eventLog.startTime,
				eventLog.endTime,
				eventLog.imageName,
				eventLog.eventRecordedTime,
				eventLog.jsonEventPackage,
				Constants.STATUS_NEW,
				Constants.IMAGE_STATUS_NEW
			]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};

	/**
	 * getEventLogData - fetch eventlog record from DB Table.
	 * @param noOfRows used to set how many records will be fetch from DB table. 
	 */		
	dbhelper.getEventLogData = function(noOfRows){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_SELECT_EVENT,[Constants.STATUS_NEW, noOfRows]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			console.log(result);	// array
		});
	};

	/**
	 * setEventLogStatus -  Update eventlog record in DB Table once files saved
	 * @param eventLogIds used to get event log id's whose status is NOT NEW.
	 */		
	dbhelper.setEventLogStatus = function(eventLogIds){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_UPDATE_EVENT_TO_TRANSFERRED,[Constants.STATUS_TRANSFERRED, eventLogIds]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};

	/**
	 * deleteEventLogData - delete eventlog record in DB Table.
	 */		
	dbhelper.deleteEventLogData = function(){

		/*
		SQL.text="DELETE FROM EventLog WHERE status='" + Constants.STATUS_TRANSFERRED + "' AND date(eventRecordedTime) < date('"+ toSqlDate(eventDeletedDate) + "')";
		*/

		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_DELETE_EVENT,[Constants.STATUS_TRANSFERRED]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};


	/**
	 * getNewStatusCount - return no. of records whose status is new in EventLog table.
	 * @param eventLogIds used to get event log id's whose status is NOT NEW.
	 */		
	dbhelper.getNewStatusCount = function(){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_SELECT_NEW_EVENT_COUNT,[Constants.STATUS_NEW]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result[0].cnt);
		});
	};

	return dbhelper;
	
}]);

////////----------App Watcher Ends------------------///////////
function loadJSX() {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
	}
	
function evalScript(script, callback) {
    new CSInterface().evalScript(script, callback);
	}
	
	
	