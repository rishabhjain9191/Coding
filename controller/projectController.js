/**
 * projectCtrl - projectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

 app.controller('projectCtrl', ['Constants','$scope','$rootScope', '$location', 'Config', 'projectUtils','$q',  'preloader','debuggerUtils','CSInterface','$interval','UserUtils',
function(Constants, $scope, $rootScope, $location, Config, projectUtils,$q,  preloader,debuggerUtils,CSInterface,$interval, UserUtils){
	console.log("Projects view loaded");
	preloader.showLoading();
	$scope.modalShown = false;
	$scope.firstname = UserUtils.firstname;
	$scope.showNoProjectsMessage = false;
	$scope.noProjectsMessage="You have no projects.";
	$scope.projectToolTipInfo=new Array();
	projectToolTipInfo=new Array();
	var prev_index=-1;
	$rootScope.userLoggedState=1;
	$rootScope.refreshProjects=function(){
		debuggerUtils.updateLogs("Project request attempt for [" +UserUtils.username+ "]");
		projectUtils.getProjects(UserUtils.username, UserUtils.password, UserUtils.userid)
		.then(function(data){
			//Fill-in the tooltip information
			var tt;
			for(var i=0;i<data.length;i++){
				
				
				/*$scope.projectToolTipInfo[i]={};
				$scope.projectToolTipInfo[i]["nickName"]="Nick Name : "+(data[i].alias.user)?data[i].alias.user:""+"<br>";
				$scope.projectToolTipInfo[i]["name"]="Name : "+data[i].name+"\n\n";
				$scope.projectToolTipInfo[i]["jobid"]="JobId : "+data[i].jobid+"<br>";*/

				projectToolTipInfo[i]="";
				//projectToolTipInfo[i]=new Array();
				if(data[i].alias.user)
					projectToolTipInfo[i]+="Nick Name : "+data[i].alias.user+"|";
				projectToolTipInfo[i]+="Name : "+data[i].name+"|";
				projectToolTipInfo[i]+="JobId : "+data[i].jobid;
				//projectToolTipInfo[i]+="</div>";


			}
			$scope.projectToolTipInfo=projectToolTipInfo;
			$scope.projects=data;	// all the project details are saved in $scope.projects
            debuggerUtils.updateLogs("[Project List]: "+ppProjectList($scope.projects).slice(0,-2));
			projectUtils.selectProject();
			preloader.hideLoading();
			debuggerUtils.updateLogs("[ProjectResult]: Successfully fetched the projects for the user.");
			if(!data.length){
				$scope.showNoProjectsMessage = true;
			}
			else{
				$scope.showNoProjectsMessage = false;	
			}
		}, function(data){
			//On network Failure, show previous copy of projects
			$scope.projects=data;
			//debuggerUtils.updateLogs("[Cached Project List]: "+ppProjectList($scope.projects).slice(0,-2));
            debuggerUtils.updateLogs("[ProjectResult]: Network failure, showing cached projects list.");
            // console.log($scope.projects);
			preloader.hideLoading();

		});
	};
	//Setup Interval to read the unsend record file and try to send them. # Incorrect Documentation #
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
		console.log(Constants.APP_NAME);
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
			else{projectUtils.setCurrentProjectId(data);}
			matchProjectIds();
		});
	};
	$rootScope.refreshProjects();

	$scope.processProjectClick=function(projectId, index){
				//CSInterface.evalScript('$._ext_'+Constants.APP_NAME+'_XMP.insertXMP(\''+projectUtils.getSelectedProjectId()+'\')', function(data){

		CSInterface.evalScript('$._extcommon.checkDocLength(\''+Constants.APP_NAME+'\')',function(data){
			if(parseInt(data)){
				processProject(projectId,index);
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


		CSInterface.evalScript('$._ext.getCurrentDoc(\''+Constants.APP_NAME+'\')', function(data){
			if(data=='1'){
				checkDocXMP();
			}
		});
	};

    var ppProjectList=function(projList){
        return projList.reduce(
            function(prev, curr, index){
                return prev+"["+(index+1)+"] "+curr.name+", ";
            },
            ""
        );
    };


	$rootScope.openHomePage=function(projectId){
		CSInterface.openURLInDefaultBrowser(Constants.HOME_PAGE);
	};

	$scope.checkSelected=function(projectId){
		if(projectId==projectUtils.getCurrentProjectId()){
			return {'font-weight':'bold'};
		}else{
			return {'font-weight':'normal'};
		}
	};
	$scope.getToolTipInfo=function(index){
		return "abc";
	}
}]);
