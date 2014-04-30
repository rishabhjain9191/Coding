var services=angular.module('TTServices',[]);
services.factory('AppWatcher',['Logger', function(Logger){
	console.log('App Watcher Started');
	
	 /* //Define Event Listeners
	new CSInterface.addEventListerner('documentAfterActivate', onDocumentAfterActivate);
	new CSInterface.addEventListerner('documentAfterDeactivate', onDocumentAfterDeactivate);
	new CSInterface.addEventListerner('documentAfterSave', onDocumentAfterSave);
	new CSInterface.addEventListerner('applicationActivate', onApplicationActivate);
	new CSInterface.addEventListerner('applicationBeforeQuit', onApplicationBeforeQuit);
	
	onDocumentAfterActivate=function(event){
		/*.........................*\/
		Logger.log(eventDetail);
	};
	onDocumentAfterDeactivate=function(event){
		/*.........................*\/
		Logger.log(eventDetail);
	};
	onDocumentAfterSave=function(event){
		/*.........................*\/
		Logger.log(eventDetail);
	};
	onApplicationActivate=function(event){
		/*.........................*\/
		Logger.log(eventDetail);
	};
	onApplicationBeforeQuit=function(event){
		/*.........................*\/
		Logger.log(eventDetail);
	};  */
	
}]);

services.factory('Logger', ['DBHelper', 'AppModel',function(DBHelper, AppModel){
	/* Get the Data from App Model*/
	/* Collate items to log like form JSON*/
	/* Call DB function to log*/
	console.log("In Logger...");
	
	console.log("Updating App Model...");
	AppModel.updateModel();
	console.log(AppModel);
	
}]);

services.factory('AppModel',  [function(){
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
		 utils.previewFile:File = null;

	
	/* Call JSX functions to get the required parameters for the document*/
	utils.updateModel=function(){
		this.hostName=getHostName();
		this.hostVers=new CSInterface().hostEnvironment.appVersion;
		this.projectID=getProjectID();
		this.instanceID=getInstanceID();
		this.originalID=getOriginalID();
		this.documentName=getDocumentName();
		this.documentPath=getDocumentPath();
		
	};
	/* Return required parameters (getters)*/
	getModel=function(){
		this.setModel();
		return {}
	};
	getHostName=function(){
		var appName=new CSInterface().hostEnvironment.appName;
		switch(appName){
			case "IDSN":return 'indesign';
			case "PHXS":return 'photoshop';
			case "ILST":return 'illustrator';
			default:return '':
		}
	};
	getProjectID=function(){
		new CSInterface.evalScript('$._extXMP.getProjectID()', function(data){return data});
	};
	getInstanceID=function(){
		new CSInterface.evalScript('$._extXMP.getInstanceID()', function(data){return data});
	};
	getOriginalID=function(){
		new CSInterface.evalScript('$._extXMP.getOriginalID()', function(data){return data});
	};
	getDocumentName=function(){
		new CSInterface.evalScript('app.activeDocument.name', function(data){return data});
	};
	getDocumentPath=function(){
		new CSInterface.evalScript('app.activeDocument.filePath', function(data){return data});
	};
	/*Setters*/
	return utils;
	
}]);
services.factory('DBHelper',[function(){
	/*
	C
	R
	U
	D
	*/
}]);
