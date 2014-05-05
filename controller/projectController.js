app.controller('projectCtrl', ['$scope','$rootScope', '$location', 'Config', 'projectUtils','$q', 'AppWatcher',
function($scope, $rootScope, $location, Config, projectUtils,$q, AppWatcher){
	//AppWatcher.run();
	var prev_index;
	
	//console.log($scope.projectNo);
	var refreshProjects=function(){
	alert("Refreshing Projects");
	console.log($rootScope.projectNo);
	projectUtils.getProjects(Config.username, Config.password, Config.userid)
	.then(function(data){$scope.projects=data;}, function(data){});};
	var deselectProject=function(){
		//Remove XMP data of Project;
		console.log("Deselecting Project");
		new CSInterface().evalScript('$._extXMP.removeXMP()',function(){
			projectUtils.setCurrentProjectId(0);
			//Change Style on Project Deselect
			//$scope.projectNo[projectUtils.getSelectedProjectIndex()].style=projectUtils.deselectedStyle();
			//$scope.projectNo[projectUtils.getSelectedProjectIndex()].message="";
		});
		
	};
	var selectProject=function(){
		//Modify XMP data of the project.
		console.log("Selecting Project");
		new CSInterface().evalScript('$._extXMP.insertXMP(\''+projectUtils.getSelectedProjectId()+'\')', function(data){
			console.log("XMP Inserted");
			projectUtils.setCurrentProjectId(projectUtils.getSelectedProjectId());
		});
		//Change Style on Project Select
		console.log("Changing Style");
		if(prev_index>=0){
			$rootScope.projectNo[prev_index].style=projectUtils.deselectedStyle();
			$rootScope.projectNo[prev_index].message="";
		}
		/* var abc=projectUtils.getSelectedProjectIndex();
		console.log(abc);
		$scope.projectNo[abc].style=projectUtils.selectedStyle();
		$scope.projectNo[abc].message="In Progress";
		$scope.processing=false;
		console.log("Style Changed");
		//console.log($scope.$index+" message "+$scope.projectNo[projectUtils.getSelectedProjectIndex()].message);
		console.log($scope); */
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
		new CSInterface().evalScript('$._extXMP.getProjectDetails()', function(data){
			console.log("data="+data);
			if(data==""){
				projectUtils.setCurrentProjectId(0);
			}
			else{projectUtils.setCurrentProjectId(parseInt(data))};
			matchProjectIds();
		});
	} 
	refreshProjects();
	
	
	
	$scope.processProject=function(projectId, index){
		$scope.processing=true;
		prev_index=projectUtils.getSelectedProjectIndex();
		console.log(prev_index);
		if(prev_index==-1){
			$rootScope.projectNo[index].message="In progress";
			$rootScope.projectNo[index].style=projectUtils.selectedStyle();
			projectUtils.setSelectedProjectIndex(index);
		}
		else if(prev_index!=index){
			$rootScope.projectNo[index].message="In progress";
			$rootScope.projectNo[index].style=projectUtils.selectedStyle();
			$rootScope.projectNo[prev_index].message="";
			$rootScope.projectNo[prev_index].style=projectUtils.deselectedStyle();
			projectUtils.setSelectedProjectIndex(index);
		}
		else{
			$rootScope.projectNo[index].message="";
			$rootScope.projectNo[index].style=projectUtils.deselectedStyle();
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
			else{
				console.log("No document open");
				//alert("Please Open a document to continus further");
			}
		});
		//alert("done")
	};
	
	$scope.checkSelected=function(projectId){
		console.log("Style changed");
		if(projectId==projectUtils.getCurrentProjectId()){
			return {'font-weight':'bold'};
		}
		else{
			return {'font-weight':'normal'};
		} 
	}
	
	$scope.create=function(){
		$location.path('createNew');
	}
	$scope.edit=function(){
		$location.path('editProject');
	}
	
	
}]);


function projectNo(){
	this.style={'color':'black'};
	this.message="";
};