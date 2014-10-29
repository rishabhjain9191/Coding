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
		constants.EXTENSION_VERSION_NUMBER = "2.1.0-0";
		constants.MINIMUM_REQUIRED_SERVER_VERSION = Number("1.1");

		constants.CW_NAMESPACE_NAME = "creativeworx";
		constants.CW_NAMESPACE = "http://www.creativeworx.com/1.0/";
		constants.URL_EXCHANGE="https://www.adobeexchange.com/resources/19";
		constants.ISEXCHANGE=false;
		constants.STATUS_NEW = "NEW";
		constants.STATUS_ATTEMPTED = "ATTEMPTED";
		constants.STATUS_TRANSFERRED = "TRANSFERRED";
		constants.IMAGE_STATUS_NEW = "NEW";
		constants.IMAGE_STATUS_TRANSFERRED = "TRANSFERRED";
		constants.IMAGE_STATUS_NOIMAGE = "NONE";
		constants.IMAGE_STATUS_ERROR = "ERROR";
		constants.COLOR_MODE = "preselected";
		constants.API_TYPE="OAuth1";		//OAuth1 or legacy
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
		constants.BATCH_SIZE = 1; 				// Default number of events to send to server
		constants.BATCH_SIZE_MIN = 1; 			// Minimum number of events to send, send at least 1
		constants.BATCH_SIZE_MAX = 1000; 		// Maxiumn number of events to send, 1000
		constants.CHECK_ONLINE_TIMEINTERVAL = 20000;

		constants.IMAGE_TIMEINTERVAL = 50000;
		constants.THRESHOLD_COUNT = 100;
		constants.APP_EVENT_POLL = 5000; 		// How frequently to check for events in the app
		constants.REFRESH_PROJECT_INTERVAL = 5*60*1000;
		constants.SEND_UNSENT_EVENTS_TIMER=5*60*1000;

		constants.URL_SERVICE = "https://timetracker.creativeworx.com";

		constants.HOME_PAGE = "https://timetracker.creativeworx.com";

		constants.URL_SERVICE_NEW = "https://api.creativeworx.com/v1";

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

		constants.URL_UPDATE = "http://downloads.creativeworx.com/TimeTrackerDownloads.json";
		constants.URL_DOWNLOAD_CENTER = "/user/settings#/download";
		constants.UPDATE_URL_JSON = "http://downloads.creativeworx.com/TimeTrackerDownloads.json";
		constants.APP_NAME=CSInterface.hostEnvironment.appName;
		constants.EXTENSION_ID=CSInterface.getExtensionID();
		constants.MAX_PROJECTS=100;





	constants.update=function(configData){
		if(configData.serviceAddress){
			this.URL_SERVICE=configData.serviceAddress;
			this.URL_SERVICE_NEW=configData.serviceAddress;
		}
		if(configData.siteAddress) this.URL_SITE=configData.siteAddress;
		if(configData.homePage) this.HOME_PAGE=configData.homePage;
		if(configData.updateAddress) this.URL_UPDATE=configData.updateAddress;
		if(configData.timeInterval_html5) this.TIMEINTERVAL=configData.timeInterval_html5;
		if(configData.checkOnlineTimeInterval_html5) this.CHECK_ONLINE_TIMEINTERVAL=configData.checkOnlineTimeInterval_html5;
		if(configData.imageTimeInterval_html5) this.IMAGE_TIMEINTERVAL=configData.imageTimeInterval_html5;
		if(configData.batchSize_html5) this.BATCH_SIZE=configData.batchSize_html5;
		if(configData.thresholdCount_html5) this.THRESHOLD_COUNT=configData.thresholdCount_html5;
		if(configData.batchDataSendAddress) this.BATCHDATA_SEND_ADDRESS=configData.batchDataSendAddress;
		if(configData.checkStatusAddress) this.CHECK_STATUS_ADDRESS=configData.checkStatusAddress;
		if(configData.fileUploadAddress) this.FILE_UPLOAD_ADDRESS=configData.fileUploadAddress;
		if(configData.logEnabled_html5) this.LOG_ENABLE=configData.logEnabled_html5;
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
	messages.authMsg={
		"0":"Cannot Connect to Internet. Please Check your internet connection",
		"401":"Authentication Failed",
		"404":"User Not Found",
		"400":"Username/Password Missing"
	}
	messages.getUserListMsg={
		"0":"Cannot Connect to Internet. Please Check your internet connection",
		"401":"Authentication Failed"
	}
	messages.addProjectMessages={
		"0":"Cannot Connect to Internet. Please Check your internet connection",
		"401":"Authentication Failed",
		"nameEmpty":"Name of the Project cannot be empty",
		"jobIdEmpty":"Job id of the project cannot be empty",
		"unknown":"Error in creating new project"
	}
	return messages;
}]);

services.factory('CSInterface',[function(){
	var cs=new CSInterface();
	return cs;
}]);


services.factory('viewManager', ['$location','$route', 'CSInterface', 'AppWatcher','Config', function($location,$route, CSInterface, AppWatcher, Config){
	var utils={};

	utils.loggedOut=false;
	utils.loggedIn=false;

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
		//console.log(Config.serviceAddress);
		$route.reload();
		if(Config.companyEmail&&Config.companyEmail.length>0&&Config.companyEmail!=0){
			$location.path('LDAPLogin');
		}
		else{
			console.log(Config.serviceAddress);
			$location.path('login');
		}

	};
	utils.userLoggedIn=function(){
		console.log("Config used : ");
		console.log(Config);
		console.log("user logged in  "+(new Date()).getTime());
		//Add Event Listeners
		AppWatcher.addEventListeners();
		//Trigger OnCreationComplete Event
		var event=new CSEvent("onCreationComplete", "APPLICATION");
		event.type="onCreationComplete";
		event.data="<onCreationComplete />";
		CSInterface.dispatchEvent(event);
		this.loggedOut=false;
		utils.loggedIn=true;
		console.log('user Logged in');
		this.loginView=$location.path().substr(1);
		$location.path('projects');
	};

	utils.userLoggedOut=function(){
		utils.loggedIn=false;
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
		if(Config.companyEmail!==""&&Config.companyEmail!==0){
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
		var url=Constants.UPDATE_URL_JSON ;// + "?" + Constants.EXTENSION_VERSION_NUMBER;

		//var url="TimeTrackerDownloads.json";
		//var httpCacheFactory=$cacheFactory.get('templates');
		//console.log(httpCacheFactory.info());
		console.log(url);
		$.ajax({
		    type: 'GET',
		    url: url,
		    cache: false,
		    success: function(data, textStatus, jqXHR) {
	            console.log(data);
	            console.log(textStatus);

	            console.log("In Success method");
	            try{
		            data=JSON.parse(data);
                    if(data.cs.color_mode)
                        Constants.color_mode=data.cs.color_mode;
                    if(data.cs.downloads.cc.version)
                        utils.version=data.cs.downloads.cc.version;
                    if(data.cs.downloads.cc.minversion)
                        utils.minVersion=data.cs.downloads.cc.minversion;
                    if(data.cs.downloads.cc.downloadURL)
                        utils.downloadPath=data.cs.downloads.cc.downloadURL;

		            deferred.resolve(1);
		        }
		        catch(e){
		        	deferred.reject(0);
		        }
		    },

		    error: function(err) {
		        var err={};
		            err.type="Failed to fetch update parameter from config";

		            deferred.reject(0);
		    }
		 });

		/*
		$http({
			method:'GET',
			url:url,
			cache:false
		})
		.success(function(data,status){
			console.log(data);
			console.log(status);

			console.log("In Success method");

			if(data.cs.downloads.cc.version)
				utils.version=data.cs.downloads.cc.version;
			if(data.cs.downloads.cc.minversion)
				utils.minVersion=data.cs.downloads.cc.minversion;
			if(data.cs.downloads.cc.downloadURL)
				utils.downloadPath=data.cs.downloads.cc.downloadURL;

			deferred.resolve(1);

		})
		.error(function(data){
			var err={};
			err.type="Failed to fetch update parameter from config";
			err.message=data;

			console.log(data);
			deferred.reject(0);
	})
		*/

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


	config.serviceAddress = Constants.URL_SERVICE_NEW;
	config.siteAddress = Constants.URL_SITE;
	config.updateAddress = Constants.URL_UPDATE;
	config.timeInterval_html5 = Constants.TIMEINTERVAL;
	config.checkOnlineTimeInterval_html5 = Constants.CHECK_ONLINE_TIMEINTERVAL;
	config.imageTimeInterval_html5 = Constants.IMAGE_TIMEINTERVAL;
	config.batchSize_html5 = Constants.BATCH_SIZE;
	config.thresholdCount_html5 = Constants.THRESHOLD_COUNT;
	config.batchDataSendAddress = Constants.BATCHDATA_SEND_ADDRESS;
	config.checkStatusAddress = Constants.CHECK_STATUS_ADDRESS;
	config.fileUploadAddress = Constants.FILE_UPLOAD_ADDRESS;
	config.imagesFolderAddress = Constants.IMAGES_FOLDER_NAME;
	config.logEnabled_html5 = Constants.LOG_ENABLE;
	config.configversion = 2;
	config.homePage=Constants.HOME_PAGE;


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

services.factory('loginUtils',['debuggerUtils','Constants', '$location','$rootScope','Config','$http','$q', 'APIUtils',
function(debuggerUtils,Constants, $location,$rootScope,Config, $http, $q, APIUtils){
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
			APIUtils.login(Config.username, Config.password, Config.password,Config.companyEmail)
			.then(function(data){
				APIUtils.getUsers()
				.then(function(result){
					if(result.status=="200"){
						var data=result.data.result;
						$rootScope.canEdit=canEdit(data[0].oid, data[0].org_settings);
						Config.firstname=data[0].firstname;
						Config.userid=data[0]._id;
						$rootScope.LoggedInItems=true;
						deferred.resolve(200);
				}
				else
					deferred.resolve(100);

			},
			//Get User Details Failed
			function(result){
				deferred.resolve(100);
			})}
			//Error in Auth
			,function(error){
				deferred.resolve(100);
			})
		}

		else{
			deferred.resolve(100);
		}

		return deferred.promise;

	};

	return utils;
}]);

services.factory('APIUtils',['Constants','$q','Config','$http','OAuthUtils',function(Constants, $q, Config, $http, OAuthUtils){

	var utils={};


	//
	//	Status Codes:
	//
	//	400			Bad Request
	//	401/403		Unauthorized
	//	404			Not found
	//	500			Server error
	//

		utils.SendRequest=function(url,params,method,isOAuth){

		var deferred=$q.defer();
		var headers={};
		if(isOAuth){
			headers["Authorization"]=OAuthUtils.getAuthHeader(url,method,params);
			//headers["Content-type"]='application/x-www-form-urlencoded';
		}
		if(method=="PUT"){
			headers["Content-Type"]="application/x-www-form-urlencoded";
			headers["X-HTTP-Method-Override"]="PUT";
			method="POST";
		}

		$http({
			method: method,
			url: url,
			data: params,
			headers: headers,

		})
		.success(function(data,status){
			var result={};
			result["data"]=data;
			result["status"]=status;
			if(data.error){
				// error
				deferred.resolve(result);
			}
			else{
				// success
				deferred.resolve(result);
			}
		})
		.error(function(data,status){
			// request failed
			console.log(headers["Authorization"]);
			var result={};
			result["message"]="New Error";
			result["type"]="Error 1";
			result["data"]=data;
			result["status"]=status;
			deferred.reject(result);
		})
		return deferred.promise;
	};


	utils.validateLDAP=function(companyEmail){
		var deferred=$q.defer();
		/**
			STILL USING THE OLD END POINT
		*/
		var url=Config.serviceAddress+Constants.VALIDATE_LDAP_EMAIL;
		var params=[];
		params['email']=companyEmail;
		$http.post(url,params)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(data){
			deferred.reject(data);
		})

		return deferred.promise
	};

	utils.login=function(user_email, hashedPassword,user_password, companyEmail){
		console.log("Login Called");
		var deferred=$q.defer();

		var url=Constants.URL_SERVICE_NEW+"/authenticate";
		var method="POST";
		var params={};
		if(companyEmail.length>1){
			params["email"]=companyEmail;
			params["password"]=hashedPassword;
			params["username"]=user_email;
		}

		else{
			params["email"]=user_email;
			params["password"]=hashedPassword;
			params["hashed"]=true;
		}
		utils.SendRequest(url,params,method,false)
		.then(function(result){
		// will check for the response here
		console.log("Auth Success");
			if(result.status="200"){
			//Save user's key and secret
				OAuthUtils.setConsumerCredentials(result.data.keys.pk,result.data.keys.sk);
				deferred.resolve(result);
			}
			else
			//Any unexpected error has occured
			deferred.reject(result);
		},function(result){
			var result1={};
			result1["message"]="Auth Failure123";
			result1["name"]="Error5";
			console.log(result1);
			Airbrake.push({
				error:result1
			});
			console.log("Auth Failure");
			deferred.reject(result);
		})

		return deferred.promise;
	};


	utils.getUsers=function(params){
		var deferred=$q.defer();

		var url=Constants.URL_SERVICE_NEW+"/user";
		var method="GET";
		var params="";

		this.SendRequest(url,params,method,true)
		.then(function(result){
			deferred.resolve(result);
		},function(result){
			deferred.reject(result)})

		return deferred.promise;
	};

	utils.getProjects=function(){
		var deferred=$q.defer();

		var url=Constants.URL_SERVICE_NEW+"/project";
		var method="GET";
		var params={};
		this.SendRequest(url,params,method,true)
		.then(function(result){
			deferred.resolve(result);
		},function(result){
			deferred.reject(result);
		})

		return deferred.promise;
	};

	utils.addProject=function(projectName, jobId, budgetHrs, color, colorindex){
		var deferred=$q.defer();
		var params={};
		if(projectName!==undefined){
			params["name"]=projectName;
		}
		if(jobId!==undefined){
			params["jobid"]=jobId;
		}
		if(budgetHrs!==undefined){
			params["budget"]=budgetHrs;
		}
		/*
		if(color!==undefined){
			params["colorcode"]=color;
		}
		*/
		if(colorindex!==undefined){
			params["color"]=colorindex;
		}

		var url=Constants.URL_SERVICE_NEW+"/project";
		var method="POST";

		this.SendRequest(url,params,method,true)
		.then(function(result){
			deferred.resolve(result);
		}, function(result){
			deferred.reject(result);
		})

		return deferred.promise;
	};

	utils.editProject=function(projectId, projectName, jobId, budgetHrs, color, colorindex){
		var deferred=$q.defer();
		var params={};
		if(projectName!==undefined){
			params["name"]=projectName;
		}
		if(projectName!==undefined){
			params["jobid"]=jobId;
		}
		if(projectName!==undefined){
			params["budget"]=budgetHrs;
		}
		if(projectName!==undefined){
			params["color"]=colorindex;
		}

		var url=Constants.URL_SERVICE_NEW+"/project/"+projectId;
		var method="PUT";

		this.SendRequest(url,params,method,true)
		.then(function(result){
			deferred.resolve(result);
		}, function(result){
			Airbrake.push({
				error:result
			});
			deferred.reject(result);
		})

		return deferred.promise;
	};

	utils.sendEvents=function(params){
		var deferred=$q.defer();
		var url=Constants.URL_SERVICE+Constants.BATCHDATA_SEND_ADDRESS;
		var details={};

		var url=Constants.URL_SERVICE_NEW+"/event";
		var method="POST";
		this.SendRequest(url,params,method,true)
		.then(function(result){
			deferred.resolve(result);
		},function(result){
			deferred.reject(result);
		})

		return deferred.promise;
	};


	return utils;

}]);

services.factory('OAuthUtils',['$q',function($q){

	// todo: remove the dependencies


	var utils={};
	utils.oauth_consumer_key="";
	utils.oauth_consumer_secret="";
	utils.oauth_token_secret="";
	utils.oauth_version="1.0";
	utils.oauth_token="";
	utils.oauth_timestamp="";
	utils.oauth_nonce="";
	utils.oauth_signature_method="HMAC-SHA1";
	utils.oauth_signature="";

	utils.setConsumerCredentials=function(key,secret){
		this.oauth_consumer_key=key;
		this.oauth_consumer_secret=secret;
	};

	utils.getAuthHeader=function(url,method,params){

		this.oauth_timestamp=this.getTimestamp();
		this.oauth_nonce=this.getNonce();
		this.createSignature(url,method,params);

		var authHeader =
			'OAuth realm="",'+
			'oauth_consumer_key="'+this.oauth_consumer_key+'",'+
			'oauth_token="",'+
			'oauth_signature_method="'+this.oauth_signature_method+'",'+
			'oauth_timestamp="'+this.oauth_timestamp+'",'+
			'oauth_nonce="'+this.oauth_nonce+'",'+
			'oauth_version="'+this.oauth_version+'",'+
			'oauth_signature="'+encodeURIComponent(this.oauth_signature)+'"';

		return authHeader;
	};

	utils.getTimestamp=function(){
		return OAuth.timestamp();
	};

	utils.getNonce=function(){
		return OAuth.nonce(11);
	};

	utils.createSignature=function(url,method,params){

		var accessor = {
			consumerSecret: this.oauth_consumer_secret,
			tokenSecret   : this.oauth_token_secret
		};

		var list = [];
		if(params){
			for (var p in params) {
				list.push([p, params[p]]);
			}
		}
		console.log("brouhaha");
		console.log(list);
		var message = {
			method: method,
			action: url,
			parameters: list
		};

		message.parameters.push(["oauth_version", this.oauth_version]);
		message.parameters.push(["oauth_consumer_key", this.oauth_consumer_key]);
		message.parameters.push(["oauth_token", this.oauth_token]);
		message.parameters.push(["oauth_timestamp", this.oauth_timestamp]);
		message.parameters.push(["oauth_nonce", this.oauth_nonce]);
		message.parameters.push(["oauth_signature_method", this.oauth_signature_method]);

		console.log(message);
		console.log(accessor);
		OAuth.SignatureMethod.sign(message, accessor);
		this.oauth_signature=OAuth.getParameter(message.parameters, "oauth_signature");

	};

	return utils;
}]);

services.factory('projectUtils',['$rootScope', 'Constants', 'Config', '$http', '$q','CSInterface', 'APIUtils',
function($rootScope, Constants, Config, $http, $q, CSInterface, APIUtils){
	$rootScope.projectProperties=new Array();
	for(i=0;i<Constants.MAX_PROJECTS;i++){
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
		APIUtils.getProjects()
		.then(function(result){
			console.log(result);
			var data=result.data.result;
			utils.projectIndexes={};
			utils.projectsCopy=data;				//Save the freshly retrieved project list
			while(data.length>Constants.MAX_PROJECTS){
				for(var i=Constants.MAX_PROJECTS;i<2*Constants.MAX_PROJECTS+1;i++){
					$rootScope.projectProperties.push(new projectNo(i));
				}
				//Plus 1 for incoperating a new project when no. of projects=2^n
				Constants.MAX_PROJECTS=2*Constants.MAX_PROJECTS+1;
			}
			for(var i=0;i<data.length;i++){
				var pid=data[i]._id;
				utils.projectIndexes[pid]=i;
				utils.projectIndexes[data[i].pid]=i;
				$rootScope.projectProperties[i].style={};
				$rootScope.projectProperties[i].style.color=data[i].colorcode;
			}
			console.log(utils.projectIndexes);
			deferred.resolve(data);
		},
		function(result){
			console.log(result);
			//Project List Blank or Authorization Error
			switch(result.status){
				case 404:
					console.log("Project List Empty");
					deferred.reject([]);
					break;
				case 401:
					console.log("Authorization failed while fetching project list");
					deferred.reject([]);
					break;
				default:
					deferred.reject(utils.projectsCopy);
					break;
			}


		})
		return deferred.promise;
	};



	utils.selectProject=function(){
		//Check the current document's XMP
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			if(data==""||!utils.projectIndexes.hasOwnProperty(data)){
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
						utils.changeStyleToSelected(utils.projectIndexes[data]);
					}
					utils.setSelectedProjectIndex(utils.projectIndexes[data]);
					utils.setCurrentProjectId(utils.projectsCopy[utils.projectIndexes[data]]._id);
					//if pid is old one, replace it with new one
					if(utils.projectsCopy[utils.projectIndexes[data]].pid==data){
						CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.insertXMP(\''+utils.projectsCopy[utils.projectIndexes[data]]._id+'\')');
					}
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

	var unregisterPrevEvents= function(){
	var event = new CSEvent("com.adobe.PhotoshopUnRegisterEvent", "APPLICATION");
	event.data = "1935767141, 1332768288, 1131180832, 1936483188,  1298866208";
	event.extensionId = Constants.EXTENSION_ID;
	CSInterface.dispatchEvent(event);
	console.log("Unregistering events");
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
						dispatchEvent('documentAfterActivate', Constants.EXTENSION_ID);
					}
				});

			default:break;

		}

    };

	return pswatcher;
}]);






function dispatchEvent(type, extensionID){
	console.log("Dispatching event"+type);
	var event=new CSEvent(type, "APPLICATION", "PHXS", extensionID);
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
		addObj.event_type=eventType;
		addObj.event_start=AppModel.eventStartTime.toJSON();
		addObj.event_end=AppModel.eventEndTime.toJSON();
		var date=new Date();
		addObj.event_rec=date.toJSON();
		addObj.ext_name=Constants.EXTENSION_NAME;
		addObj.ext_ver=Constants.EXTENSION_VERSION_NUMBER;
		addObj.host_name=AppModel.hostName;
		addObj.host_ver=AppModel.hostVers;
		addObj.computerID="";
		addObj.document_id=AppModel.documentID;
		addObj.document_name=AppModel.documentName;
		addObj.document_path=AppModel.documentPath;
		addObj.user_id=AppModel.userID;
		addObj.project_id=AppModel.projectID;
		console.log(addObj);
		DBHelper.addItemToEventLogTable(addObj);
	};
	return utils;
}]);

services.factory('AppModel', ['Config','Constants', 'CSInterface', 'projectUtils', function(Config, Constants, CSInterface, projectUtils){
	var utils={};
		 utils.defaultDocumentID = ""; //Used No where
		 utils.userID = "";
		 utils.systemID = "";
		 utils.projectID=0;
		 utils.instanceID = "";
		 utils.originalID = "";
		 utils.documentName = "";
		 utils.documentPath = "";
		 utils.eventStartTime ="";
		 utils.eventEndTime = "";
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
		this.projectID=(function(){
				if(projectUtils.getCurrentProjectId()==-1||projectUtils.getCurrentProjectId()==0){
					return "";
				}
				else return projectUtils.getCurrentProjectId()})();
		this.instanceID=data.instanceID;
		this.originalID=data.originalID;
		this.documentName=data.docName;
		this.documentPath=data.docPath;
		this.documentID=data.docID;
		this.userID=Config.userid;
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


services.factory('DBHelper',['$http','$interval','Constants','Config','debuggerUtils', 'CSInterface', 'APIUtils',
function($http,$interval,Constants,Config, debuggerUtils, CSInterface, APIUtils){

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
	var promise_sendLoggedRecords= $interval(sendLoggedRecords,Constants.SEND_UNSENT_EVENTS_TIMER);


	//Get the records, batch them if if size>batch size and then send them to server
	var processAndSend=function(records){
		//Check Record Size(if recordSize>batch size, break them into batches before sending)
		console.log(records);
		var Records=JSON.parse(records);
		var rec=[];
		if(Records.length>1){
			while(Records.length>=Constants.BATCH_SIZE){
				console.log("Batching and sending offline records");
				for(var i=0;i<Constants.BATCH_SIZE;i++){
					rec.push((Records.splice(0,1))[0]);
					//Decode documentName and documentPath and hostName
					rec[i].document_name=atob(rec[i].document_name);
					rec[i].document_path=atob(rec[i].document_path);
					rec[i].host_name=atob(rec[i].host_name);
					//Done Decoding


				}
				send(rec);
				console.log("send records\n");
				console.log(rec);
				rec=[];
			}
			for(var i =0;i<Records.length;i++){
				//Decode documentName and documentPath and hostName
				Records[i].document_name=atob(Records[i].document_name);
				Records[i].document_path=atob(Records[i].document_path);
				Records[i].host_name=atob(Records[i].host_name);
				//Done Decoding
			}
			if(Records.length>0){
				send(Records);
				console.log("send records\n");
				console.log(Records);
			}
		}
	};

	//Send the batched records to server, If records can't be sent, log them.
	var send=function(batchedRecords){
		//Send Batched Records to Server

			console.log(batchedRecords);
			APIUtils.sendEvents(batchedRecords[0])/*Temporarily till server is accecpting individual records*/
			.then(function(data){
				console.log("[Success]Records Send to server");
				console.log("Records successfully send to server");
				console.log(data);
				debuggerUtils.updateLogs("[httpResult]: Records successfully sent to Remote server. " + data);

			}
			,function(data){
				console.log("Error in sending records");
				console.log(data);
				debuggerUtils.updateLogs("[httpResult]: Cannot contact to server. " + data);
				logit(batchedRecords);
			})

	};

	//Log unsent events to the file
	var logit=function(buffer){
		console.log("Writing unsend records to database size : "+buffer.length);
		debuggerUtils.updateLogs("Logging unsent events to local file");
		var records=buffer;
		var record;
		for(var i=0;i<records.length;i++){

			//Encode documentName and documentPath and hostName
			records[i].document_name=btoa(records[i].document_name);
			records[i].document_path=btoa(records[i].document_path);
			records[i].host_name=btoa(records[i].host_name);
			//Done Encoding
			record=JSON.stringify(records[i]);
			console.log("Logged Records \n "+record);
			CSInterface.evalScript('$._extFile.writeObj(\''+record+'\')');
		}
	};


	dbhelper={};
	var buffer=[];
	//Buffer them till the buffer size and then sends them.
	dbhelper.addItemToEventLogTable=function(obj){
		console.log("Adding item to event log table");
		console.log("Batch Size= "+Constants.BATCH_SIZE);
		if(buffer.length<Constants.BATCH_SIZE-1&&obj.event_type!="documentAfterSave"){
			console.log("Data Buffered");
			console.log(buffer.length);
			console.log(buffer);
			buffer.push(obj);
		}
		else{
			//Send to server
			buffer.push(obj);
			console.log("Sending buffer");
			console.log(buffer);
			send(buffer);
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
