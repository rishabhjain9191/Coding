services.factory('AppWatcher',['Logger',function(Logger){
	//Define Event Listeners
	new CSInterface.addEventListerner('documentAfterActivate', onDocumentAfterActivate);
	new CSInterface.addEventListerner('documentAfterDeactivate', onDocumentAfterDeactivate);
	new CSInterface.addEventListerner('documentAfterSave', onDocumentAfterSave);
	new CSInterface.addEventListerner('applicationActivate', onApplicationActivate);
	new CSInterface.addEventListerner('applicationBeforeQuit', onApplicationBeforeQuit);
	
	onDocumentAfterActivate=function(event){
		/*.........................*/
		Logger.log(eventDetail);
	};
	onDocumentAfterDeactivate=function(event){
		/*.........................*/
		Logger.log(eventDetail);
	};
	onDocumentAfterSave=function(event){
		/*.........................*/
		Logger.log(eventDetail);
	};
	onApplicationActivate=function(event){
		/*.........................*/
		Logger.log(eventDetail);
	};
	onApplicationBeforeQuit=function(event){
		/*.........................*/
		Logger.log(eventDetail);
	};
	
}]);

services.factory('Logger', ['DBHelper', 'AppModel',function(DBHelper, AppModel){
	/* Get the Data from App Model*/
	/* Collate items to log like form JSON*/
	/* Call DB function to log*/
	
}]);

services.factory('AppModel',  [function(){
	var docId, projectId;//...etc.
	/* Call JSX functions to get the required parameters for the document*/
	setModel=function(){
		
	};
	/* Return required parameters*/
	getModel=function(){
		
	};
}]);
services.factory('DBHelper',[function(){
	/*
	C
	R
	U
	D
	*/
}]);
