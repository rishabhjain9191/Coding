/**
 * editProjectController - editProjectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('editProjectController',['$scope', '$rootScope', 'projectUtils','Config','$location','preloader', 'debuggerUtils', 'Constants', 'Messages', 'APIUtils', function($scope, $rootScope, projectUtils, Config, $location,preloader,debuggerUtils, constants, Messages, APIUtils){

	 preloader.hideLoading();
	 
	 
	(constants.COLOR_MODE=="user_selectable")?$scope.showAllColors=true:$scope.showAllColors=false;
	
	 
	 
	 // creating the colors array for the colorbox
	 $scope.colors=[];
	 console.log($rootScope.canEdit);
	 $scope.disabled=!($rootScope.canEdit);
	 var projectColors = constants.PROJECT_COLORS;
	 for(var i=0+1; i<projectColors.length; i++){
		var obj = {};
		obj.colorindex=i;
		obj.colorcode=projectColors[i];
		$scope.colors.push(obj);
	 }
	
	 projectUtils.getProjects(Config.data.username, Config.data.confirmpassword, Config.data.userid)
	.then(function(data){
		//color:index; colorcode:hex code
		setSelectedProject(data);
	}, function(data){setSelectedProject(data)});
	
	var setSelectedProject=function(data){
		$scope.projects=data;
		var selectedProjectIndex=projectUtils.getSelectedProjectIndex();
		if(selectedProjectIndex !=- 1) $scope.project=$scope.projects[selectedProjectIndex];
		else $scope.project=$scope.projects[0];
		$scope.name=$scope.project.name;
		$scope.colorBtnStyle={};
		$scope.colorPreviewStyle={};
		if($scope.project.colorcode=="#888888"){
			$scope.selectColor(23);
		}
		else{
			$scope.targetColor=$scope.project.colorcode;
			$scope.colorBtnStyle.background=$scope.project.colorcode;
			$scope.colorPreviewStyle.background=$scope.project.colorcode;
		}
	};
	var newName="", newJobId="", newColorCode="", newBudget="", newColorIndex="", newUserNickName="";
	
	
//Angular Save Function	
/* 	$scope.save=function(){
		
		
		if($scope.name && $scope.name.length>=3){
			debuggerUtils.updateLogs("Saving updated project information for: " + $scope.name + " " + $scope.project.projectid);
			preloader.showLoading();
			var projectId=$scope.project.projectid;
			newName=$scope.name;
			($scope.project.jobid)?(newJobId=$scope.project.jobid):(newJobId="");
			newColorCode=$scope.targetColor;
			($scope.project.color)?(newColorIndex=$scope.project.color):(newColorIndex="");
			($scope.project.budget)?(newBudget=$scope.project.budget):(newBudget="");
			projectUtils.editProject($scope.project.projectid, newName, newJobId,  newBudget,newColorCode, newColorIndex)
			.then(function(data){
				preloader.hideLoading();
				console.log(data);
				if(data.IsSuccess){
					debuggerUtils.updateLogs("[EditProjectResult]: Successfully edited the project.");
					$location.path('projects');
				}
				else{
					debuggerUtils.updateLogs("[EditProjectResult]: data.result returned 'Error:'"+data.Msg);
					$scope.message=data.Msg;
				}
			}, function(data){
				debuggerUtils.updateLogs("[EditProject]: Edit Failed: "+data/*todo);
				preloader.hideLoading();
				$scope.message=Messages.networkError;
			});
		}
		else{
			$scope.message="Project name requires 3 characters."
		}
	}, */
	
	
	
	$scope.save=function(){
			
		newName=$('#editProject_projectName').val();
		newJobId=$('#editProject_jobId').val();
		newBudget=$('#editProject_budget').val();
		newUserNickName=$('#editProject_userNickName').val();

		console.log($scope.project.color);
		($scope.project.color)?(newColorIndex=$scope.project.color):(newColorIndex="");
		
		/* JQuery Code for picking the color from full RGB Box*/
				
				if($(".sp-preview-inner")){
				
				var colorRGB = $(".sp-preview-inner").css('backgroundColor');
				newColorCode=hexc(colorRGB);
				}
				/* end JQuery Code*/
		
		console.log("Editing Project started : "+newName+newJobId+newBudget + newColorCode);
		
		if(newName && newName.length>=3){
			debuggerUtils.updateLogs("Saving updated project information for: " + newName + " " + $scope.project.projectid);
			preloader.showLoading();
			var projectId=$scope.project.projectid;
			
			console.log("Editing Project : "+newName+newJobId+newBudget);
			
			APIUtils.editProject($scope.project._id, newName, newUserNickName, newJobId,  newBudget,newColorCode, newColorIndex)
			.then(function(data){
				preloader.hideLoading();
				console.log(data);
				if(data.status==200){
					debuggerUtils.updateLogs("[EditProjectResult]: Successfully edited the project.");
					$location.path('projects');
				}
				
			}, function(data){
				debuggerUtils.updateLogs("[EditProject]: Edit Failed: "+data/*todo*/);
				preloader.hideLoading();
				if(data.data.msg===undefined)
					$scope.message=Messages.networkError;
				else
					$scope.message=data.data.msg;
			});
		}
		else{
			$scope.message="Project name requires 3 characters."
		}
	},
	
	
	
	$scope.cancel=function(){
		$location.path('projects');
	},
	
	
	
	$scope.changeProject=function(p){
		$scope.name = p.name;
		
		if(p.colorcode=="#888888"){
			$scope.selectColor(23);
			$scope.colorPreviewStyle.background="#999999";

			console.log($scope.project.color);
		}
		else{
			$scope.targetColor=p.colorcode;
			$scope.colorBtnStyle.background=p.colorcode;
			$scope.colorPreviewStyle.background=p.colorcode;
		}
	},
	
	$scope.showColorBox=function(){
		/*if($scope.disabled)
			return;*/
		if(event.srcElement.parentElement){
			if(!event.srcElement.className.match("colorBtn")&& event.srcElement.parentElement.className!="colorsPanel")
				$scope.showColorPanel = false;
			else if(event.srcElement.className.match("colorBtn"))
				$scope.showColorPanel=!$scope.showColorPanel;
			else
				$scope.showColorPanel=true;
		}		
	},
	
	$scope.showPreview=function(index){
		$scope.colorPreviewStyle.background=$scope.colors[index].colorcode;
	},
	
	$scope.selectColor=function(index){
		$scope.showColorPanel=false;
		$scope.project.colorcode=$scope.colors[index].colorcode;
		$scope.targetColor=$scope.colors[index].colorcode;
		$scope.project.color=$scope.colors[index].colorindex;
		$scope.colorBtnStyle.background=$scope.colors[index].colorcode;
	}
}]);

