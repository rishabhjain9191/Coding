app.controller('projectCtrl', ['Constants','$scope','$rootScope', '$location', 'Config', 'projectUtils','$q', 'AppWatcher', 'preloader','debuggerUtils',
function(Constants, $scope, $rootScope, $location, Config, projectUtils,$q, AppWatcher, preloader,debuggerUtils){
	
	preloader.showLoading();
	$scope.modalShown = false;
	$scope.firstname = Config.firstname;
	$scope.showNoProjectsMessage = false;
	$scope.noProjectsMessage="You have no projects.";
	AppWatcher.addEventListeners();
	var prev_index=-1;
	
	//console.log($scope.projectNo);
	var refreshProjects=function(){
		console.log("Refreshing Projects");
		debuggerUtils.updateLogs("Project request attempt for [" +Config.username+ "]");
		projectUtils.getProjects(Config.username, Config.password, Config.userid)
		.then(function(data){
			console.log("Refresh Projects  : "+data);
			var event=new CSEvent("onCreationComplete", "APPLICATION");
			event.type="onCreationComplete";
			event.data="<onCreationComplete />";
			new CSInterface().dispatchEvent(event);
			$scope.projects=data;	// all the project details are saved in $scope.projects
			projectUtils.selectProject();
			preloader.hideLoading();
			debuggerUtils.updateLogs("[ProjectResult]: Successfully updated users objects.");
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
		console.log("Changing Style");
		if(prev_index>=0){
			projectUtils.changeStyleToDeselected(prev_index);
		}
		
		return ;
		
	};
	  
	
	var matchProjectIds=function(){
		console.log(projectUtils.getCurrentProjectId());
		console.log(projectUtils.getSelectedProjectId());
		
		if(projectUtils.getCurrentProjectId()==projectUtils.getSelectedProjectId()){
			console.log("deslect project");
			deselectProject();
		}
		else{
			selectProject();
		}
	};
	var checkDocXMP=function(){
		//Get the Project Id from XMP of the Document, if doesn't exists return 0.
		new CSInterface().evalScript('$._ext_'+Constants.APP_NAME+'_XMP.getProjectDetails()', function(data){
			console.log("data="+data);
			if(data==""){
				projectUtils.setCurrentProjectId(0);
			}
			else{projectUtils.setCurrentProjectId(parseInt(data))};
			matchProjectIds();
		});
	} 
	refreshProjects();
	

	$scope.processProjectClick=function(projectId, index){
			new CSInterface().evalScript('$._extXMP.checkDocLength()',function(data){
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
		console.log("previous index : "+prev_index);
		console.log("current index : "+index);
		projectUtils.setSelectedProjectId(projectId);
		
		var csInterface=new CSInterface();
		csInterface.evalScript('$._ext.getCurrentDoc()', function(data){
			if(data=='1'){
				//alert("welcome to TT!");
				checkDocXMP();
				//alert(res);
			}
		});
	};
	
	
	$scope.openHomePage=function(projectId){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE);
	};
	
	$scope.checkSelected=function(projectId){
		console.log("Style changed");
		if(projectId==projectUtils.getCurrentProjectId()){
			return {'font-weight':'bold'};
		}
		else{
			return {'font-weight':'normal'};
		} 
	};
	
	
	$scope.hover = function(project) {
		return project.showMeta = !project.showMeta;
    };
}]);