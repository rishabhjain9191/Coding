/**
 * createNewProject - newProjectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('createNewProject',['$scope','$rootScope','$location','projectUtils','preloader','debuggerUtils','Constants','Messages',function($scope, $rootScope, $location,projectUtils,preloader,debuggerUtils,constants,Messages){
	preloader.hideLoading();
	
	
	(constants.COLOR_MODE=="user_selectable")?$scope.showAllColors=true:$scope.showAllColors=false;
		
	$scope.project={};
	$scope.project.name="New Project";
	$scope.project.jobId="JOB1";
	$scope.project.budgetHrs="12";
	
	
	$scope.colorBtnStyle={};
	$scope.colorPreviewStyle={};
	$scope.colorindex=0;
	$scope.targetColor="#888888";
	$scope.colorBtnStyle.background="#888888";
	$scope.colorPreviewStyle.background="#888888";
	$scope.showColorPanel=false;
	
	// creating the colors array for the colorbox
	$scope.colors=[];
	 var projectColors = constants.PROJECT_COLORS;
	 for(var i=0; i<projectColors.length; i++){
		var obj = {};
		obj.colorindex=i;
		obj.colorcode=projectColors[i];
		$scope.colors.push(obj);
	 }
	
		
	$scope.create=function(){
		if($scope.project.name && $scope.project.name.length>=3){	
			debuggerUtils.updateLogs("Creating new project: " + $scope.project.name);
			preloader.showLoading();
			var jobId,budgetHrs,color;
			with($scope.project){
				var name=name;
				($scope.project.jobId)?(jobId=jobId):(jobId="");
				($scope.project.budgetHrs)?(budgetHrs=budgetHrs):(budgetHrs="");
				color=$scope.targetColor;
				($scope.colorindex!==null)?(colorIndex=$scope.colorindex):(colorIndex=0);
				projectUtils.addProject(name, jobId, budgetHrs, color, colorIndex)
				.then(function(data){
					preloader.hideLoading();
					$scope.message=data.Msg;
					if(data.IsSuccess){
						debuggerUtils.updateLogs("[CreateProjectResult]: Successfully created new project.");
						$location.path('projects');
					}
					else{
						debuggerUtils.updateLogs("[NewProjectResult]: data.result returned 'Error:'"+data.Msg);
						$scope.message=data.Msg;
					}
				}, function(data){
					preloader.hideLoading();
					(data)?$scope.message=data.Msg:$scope.message=Messages.networkError;
				});
			}
		}
		else{
			$scope.message="Project name requires 3 characters."
		}
	},
	$scope.cancel=function(){
		$location.path('projects');
	},
	
	$scope.showColorBox=function(){
		/*
			256*256 colors
		*/
		/*
		var projColor= "0x888888";
		if($scope.project.colorcode!="" && $scope.project.colorcode)
			projColor=($scope.project.colorcode).replace("#","0x");
		var script='var color = $.colorPicker ("'+projColor+'"); if(color == -1){"-1";} var color16 = color.toString(16); color16;';
		new CSInterface().evalScript(script, function(data){
			$rootScope.$apply(function(){
				if(data!=-1){
					var colorSelected = "";
					colorSelected=("000000" + data).substr(-6,6);
					colorSelected="#"+colorSelected;
					$scope.project.colorcode=colorSelected;
					$scope.colorBtnStyle.background=colorSelected;
				}
			});
		});
		*/
		
		/*
			25 colors
		*/
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
		$scope.colorindex=$scope.colors[index].colorindex;
		$scope.colorBtnStyle.background=$scope.colors[index].colorcode;
	}
}]);