/**
 * projectCtrl - projectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('projectCtrl', ['Constants','$scope','$rootScope', '$location', 'Config', 'projectUtils','$q',  'preloader','debuggerUtils','CSInterface','$interval',
function(Constants, $scope, $rootScope, $location, Config, projectUtils,$q,  preloader,debuggerUtils,CSInterface,$interval){
	console.log("Projects view loaded");
	preloader.showLoading();
	$scope.modalShown = false;
	$scope.firstname = Config.firstname;
	$scope.showNoProjectsMessage = false;
	$scope.noProjectsMessage="You have no projects.";
	var prev_index=-1;
	$rootScope.userLoggedState=1;
	$rootScope.refreshProjects=function(){
		debuggerUtils.updateLogs("Project request attempt for [" +Config.username+ "]");
		projectUtils.getProjects(Config.username, Config.password, Config.userid)
		.then(function(data){
			
			$scope.projects=data;	// all the project details are saved in $scope.projects
			console.log("Projects Lenght  : "+data.length);
			projectUtils.selectProject();
			preloader.hideLoading();
			debuggerUtils.updateLogs("[ProjectResult]: Successfully fetched the projects for the user.");
			if(!data.length){
				$scope.showNoProjectsMessage = true;
			}
		}, function(data){
			//On network Failure, show previous copy of projects
			$scope.projects=projectUtils.projectsCopy;
			console.log($scope.projects);
			preloader.hideLoading();
			
		});
	};
	//Setup Interval to read the unsend record file and try to send them.
	var promise_refreshProjects= $interval($rootScope.refreshProjects,Constants.REFRESH_PROJECT_INTERVAL);
	
	var deselectProject=function(){
		//Remove XMP data of Project;
		console.log("Deselecting Project");
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.removeXMP()',function(){
			projectUtils.setCurrentProjectId(0);
			var event=new CSEvent("projectSelected", "APPLICATION");
			event.type="projectSelected";
			event.data="<projectSelected />";
			CSInterface.dispatchEvent(event);
			//Change Style on Project Deselect
		});
		
	};
	var selectProject=function(){
		//Modify XMP data of the project.
		console.log("Selecting Project");
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.insertXMP(\''+projectUtils.getSelectedProjectId()+'\')', function(data){
			console.log("XMP Inserted");
			projectUtils.setCurrentProjectId(projectUtils.getSelectedProjectId());
			var event=new CSEvent("projectSelected", "APPLICATION");
			event.type="projectSelected";
			event.data="<projectSelected />";
			CSInterface.dispatchEvent(event);
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
		CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			if(data==""){
				projectUtils.setCurrentProjectId(0);
			}
			else{projectUtils.setCurrentProjectId(parseInt(data))};
			matchProjectIds();
		});
	} 
	$rootScope.refreshProjects();
	
	$scope.processProjectClick=function(projectId, index){
		CSInterface.evalScript('$._extcommon.checkDocLength()',function(data){
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
		
		
		CSInterface.evalScript('$._ext.getCurrentDoc()', function(data){
			if(data=='1'){
				checkDocXMP();
			}
		});
	};
	
	
	$rootScope.openHomePage=function(projectId){
		CSInterface.openURLInDefaultBrowser(Constants.URL_SERVICE);
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