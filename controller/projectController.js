/**
 * projectCtrl - projectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('projectCtrl', ['Constants','$scope','$rootScope', '$location', 'Config', 'projectUtils','$q', 'AppWatcher', 'preloader','debuggerUtils',
function(Constants, $scope, $rootScope, $location, Config, projectUtils,$q, AppWatcher, preloader,debuggerUtils){
	console.log("Projects view loaded");
	preloader.showLoading();
	$scope.modalShown = false;
	$scope.firstname = Config.firstname;
	$scope.showNoProjectsMessage = false;
	$scope.noProjectsMessage="You have no projects.";
	AppWatcher.addEventListeners();
	var prev_index=-1;
	
	var refreshProjects=function(){
		debuggerUtils.updateLogs("Project request attempt for [" +Config.username+ "]");
		projectUtils.getProjects(Config.username, Config.password, Config.userid)
		.then(function(data){
			var event=new CSEvent("onCreationComplete", "APPLICATION");
			event.type="onCreationComplete";
			event.data="<onCreationComplete />";
			new CSInterface().dispatchEvent(event);
			$scope.projects=data;	// all the project details are saved in $scope.projects
			projectUtils.selectProject();
			preloader.hideLoading();
			debuggerUtils.updateLogs("[ProjectResult]: Successfully fetched the projects for the user.");
			if(!data.length){
				$scope.showNoProjectsMessage = true;
			}
		}, function(data){console.log("Refresh Projects Failed : "+data);});
	};
	var deselectProject=function(){
		//Remove XMP data of Project;
		console.log("Deselecting Project");
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.removeXMP()',function(){
			projectUtils.setCurrentProjectId(0);
			var event=new CSEvent("projectSelected", "APPLICATION");
			event.type="projectSelected";
			event.data="<projectSelected />";
			new CSInterface().dispatchEvent(event);
			//Change Style on Project Deselect
		});
		
	};
	var selectProject=function(){
		//Modify XMP data of the project.
		console.log("Selecting Project");
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.insertXMP(\''+projectUtils.getSelectedProjectId()+'\')', function(data){
			console.log("XMP Inserted");
			projectUtils.setCurrentProjectId(projectUtils.getSelectedProjectId());
			var event=new CSEvent("projectSelected", "APPLICATION");
			event.type="projectSelected";
			event.data="<projectSelected />";
			new CSInterface().dispatchEvent(event);
		});
		//Change Style on Project Select
		if(prev_index>=0){
			projectUtils.changeStyleToDeselected(prev_index);
		}
		return ;
	};
	
	var matchProjectIds=function(){
		if(projectUtils.getCurrentProjectId()==projectUtils.getSelectedProjectId()){
			deselectProject();
		}
		else{
			selectProject();
		}
	};
	var checkDocXMP=function(){
		//Get the Project Id from XMP of the Document, if doesn't exists return 0.
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			if(data==""){
				projectUtils.setCurrentProjectId(0);
			}
			else{projectUtils.setCurrentProjectId(parseInt(data))};
			matchProjectIds();
		});
	} 
	refreshProjects();
	
	$scope.processProjectClick=function(projectId, index){
		new CSInterface().evalScript('$._extcommon.checkDocLength()',function(data){
			if(parseInt(data)){
				processProject(projectId,index)
			}else{
				$rootScope.$apply(function(){
					$scope.alert_message="You need an open document before assigning the Project.";
					$scope.modalShown=true;
				});
			}
		});
	};
	
	var processProject=function(projectId, index){
		$scope.processing=true;
		prev_index=projectUtils.getSelectedProjectIndex();
		console.log(prev_index);
		if(prev_index==-1){
			$rootScope.$apply(function(){
				projectUtils.changeStyleToSelected(index);
			});
			projectUtils.setSelectedProjectIndex(index);
		}
		else if(prev_index!=index){
			$rootScope.$apply(function(){
				projectUtils.changeStyleToSelected(index);
				projectUtils.changeStyleToDeselected(prev_index);
			});
			projectUtils.setSelectedProjectIndex(index);
			
		}
		else{
			$rootScope.$apply(function(){
				projectUtils.changeStyleToDeselected(index);
			});
			projectUtils.setSelectedProjectIndex(-1);
		}
		projectUtils.setSelectedProjectId(projectId);
		
		var csInterface=new CSInterface();
		csInterface.evalScript('$._ext.getCurrentDoc()', function(data){
			if(data=='1'){
				checkDocXMP();
			}
		});
	};
	
	
	$scope.openHomePage=function(projectId){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE);
	};
	
	$scope.checkSelected=function(projectId){
		if(projectId==projectUtils.getCurrentProjectId()){
			return {'font-weight':'bold'};
		}
		else{
			return {'font-weight':'normal'};
		} 
	};
}]);