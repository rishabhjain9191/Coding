/**
 * updateCtrl - loadConfig.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

app.controller('configLoader',['viewManager','$scope', '$rootScope', 'Constants','preloader', 'Config','debuggerUtils','CSInterface',
function(viewManager, $scope, $rootScope, Constants, preloader, Config, debuggerUtils,CSInterface){
	console.log("In Load Config");
	CSInterface.evalScript('$._extXML.readConfig()', function(data){
			
			if(data != "false"){
				//If Config file is old version
				Config.data=JSON.parse(data);
				console.log(Config.data);
				if(!Config.data.configversion||(Config.data.configversion<2)){
					console.log("old version of config found");
					CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
						console.log("config version updated");
					});
				}
				
				Constants.update(Config.data);
				
				Config.username=Config.data.username;
				Config.password=Config.data.password;
				Config.keepMeLoggedIn=Config.data.keepMeLoggedIn;
				Config.firstname=Config.data.firstname;
				Config.userid=Config.data.userid;
				Config.companyEmail=Config.data.companyEmail;
				Config.companyName=Config.data.companyName;
				Config.companyEmailValue=Config.data.companyEmailValue
				
				debuggerUtils.updateLogs("Build : "+Constants.EXTENSION_VERSION_NUMBER);
				console.log("Build : "+Constants.EXTENSION_VERSION_NUMBER);
				debuggerUtils.updateLogs("==============");
				debuggerUtils.updateLogs("[LocalStorage]: readConfig()");
				debuggerUtils.updateLogs("Time : " + Config.data.timeInterval);
				debuggerUtils.updateLogs("Service Address: " + Config.data.serviceAddress);
				debuggerUtils.updateLogs("Check Online Interval: " + Config.data.checkOnlineTimeInterval);
				debuggerUtils.updateLogs("Image Time Interval: " + Config.data.imageTimeInterval);
				debuggerUtils.updateLogs("Batch Size: " + Config.data.batchSize);
				debuggerUtils.updateLogs("Threshold Count: " + Config.data.thresholdCount);
				debuggerUtils.updateLogs("Username: " + Config.data.username);
				debuggerUtils.updateLogs("Password: " + Config.data.password);
				debuggerUtils.updateLogs("Logging Enabled: " /*todo*/);
				debuggerUtils.updateLogs("==============");
				viewManager.configloaded();
			}
			else{
				viewManager.configloaded();
			}
		});
		
}]);
