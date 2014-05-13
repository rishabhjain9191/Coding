app.controller('projectCtrl', ['Constants','$scope','$rootScope', '$location', 'Config', 'projectUtils','$q', 'AppWatcher', 'preloader',
function(Constants, $scope, $rootScope, $location, Config, projectUtils,$q, AppWatcher, preloader){
	
	preloader.showLoading();
	$scope.modalShown = false;
	$scope.firstname = Config.firstname;
	AppWatcher.addEventListeners();
	var prev_index;
	
	//console.log($scope.projectNo);
	var refreshProjects=function(){
		console.log("Refreshing Projects");
		projectUtils.getProjects(Config.username, Config.password, Config.userid)
		.then(function(data){
			var event=new CSEvent("onCreationComplete", "APPLICATION");
			event.type="onCreationComplete";
			event.data="<onCreationComplete />";
			new CSInterface().dispatchEvent(event);
			$scope.projects=data;
			projectUtils.selectProject();
			preloader.hideLoading();
		}, function(data){});
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
	
	
	$scope.checkSelected=function(projectId){
		console.log("Style changed");
		if(projectId==projectUtils.getCurrentProjectId()){
			return {'font-weight':'bold'};
		}
		else{
			return {'font-weight':'normal'};
		} 
	};
	
	$scope.create=function(){
		$location.path('createNew');
	};
	
	$scope.edit=function(){
		$location.path('editProject');
	};
	
	
	$scope.asgnPrjFldr=function(){
		//1. Check the Current Document is saved or not
		//If no project is selected, alert-No Project Selected
		if(projectUtils.currentProjectId==0||projectUtils.currentProjectId==-1){
			$scope.alert_message = "No Project Selected !";
			$scope.modalShown=true;
		}
		//If the document is saved and a project is selected, Create .creativeworxproject XML file and save userid and project id into it.
		else{
			new CSInterface().evalScript('$._extCWFile.updateOrCreateFile(\''+projectUtils.currentProjectId+'\', \''+Config.userid+'\')', function(data){
				//alert(data);
				console.log(data);
			});
		}
		
	};
	
	$rootScope.logout=function(){
		AppWatcher.removeEventListeners();
		$location.path("login");
	};
	
	$scope.webpage=function(){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SERVICE);
	};
	$scope.feedback=function(){
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_BETA_FEEDBACK);
	};
	$scope.about=function(){
		$location.path('about');
	};
	
}]);