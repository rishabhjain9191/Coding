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
		if(username=='undefined'){username=Config.userName;}
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

services.factory('projectUtils',['Constants', 'Config', '$http', '$q',
function(Constants, Config, $http, $q){
	var utils={};
	utils.selectedProjectId=0;
	utils.selectedProjectIndex=0;
	utils.currentProjectId=0;
	utils.setCurrentProjectId=function(val){
		this.currentProjectId=val;
	};
	utils.setSelectedProjectIndex=function(val){
		this.SelectedProjectIndex=val;
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
		.success(function(data){deferred.resolve(data);})
		.error(function(data){deferred.reject(data);})
		return deferred.promise;
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
	
	
	