/**
 * updateCtrl - loadConfig.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

app.controller('configLoader',['viewManager','$scope', '$rootScope', 'Constants','preloader', 'Config','debuggerUtils','CSInterface','UserUtils',
function(viewManager, $scope, $rootScope, Constants, preloader, Config, debuggerUtils,CSInterface, UserUtils){
	console.log("In Load Config");
	CSInterface.evalScript('$._extXML.readConfig()', function(data){
		console.log(data);
			if(data != "false"){
				//If Config file is old version
				Config.data=JSON.parse(data);
				if(Config.data.serviceAddress==""&&Config.data.serviceAddress==""){
					Config.data.serviceAddress=Constants.URL_SERVICE_NEW;
				}
				if(!Config.data.configversion||(Config.data.configversion<3)){
					console.log("old version of config found v2");
					var obj={};
					var prop;
					for(i in UserUtils.userParams){
						prop=UserUtils.userParams[i];
						Config[prop]="";
						if(Config.data[prop]){
							UserUtils[prop]=Config.data[prop];
						}
					}
					console.log(Config);
					CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
						console.log("config version updated");
					});
					UserUtils.writeUserInformation();
				}

				if(!Config.data.configversion||(Config.data.configversion<2)){
					console.log("old version of config found");
					CSInterface.evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
						console.log("config version updated");
					});
				}

				Constants.update(Config.data);

				Config.serviceAddress=Config.data.serviceAddress;
			
		
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
				debuggerUtils.updateLogs("Logging Enabled: " /*todo*/);
				debuggerUtils.updateLogs("==============");
				viewManager.configloaded();
			}else{
				viewManager.configloaded();
			}
		});

}]);
