/**
 * editProjectController - editProjectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 app.controller('editProjectController',['$scope', '$rootScope', 'projectUtils','Config','$location','preloader', 'debuggerUtils', 'Constants', function($scope, $rootScope, projectUtils, Config, $location,preloader,debuggerUtils, constants){
	 preloader.hideLoading();
	 
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
	 
	 projectUtils.getProjects(Config.data.username, Config.data.confirmpassword, Config.data.userid)
	.then(function(data){
		//color:index; colorcode:hex code
		$scope.projects=data;
		$scope.project=$scope.projects[0];
		$scope.name=$scope.project.name;
		$scope.colorBtnStyle={};
		$scope.colorPreviewStyle={};
		$scope.colorBtnStyle.background=$scope.project.colorcode;
		$scope.colorPreviewStyle.background=$scope.project.colorcode;
	}, function(data){});
	
	var newName, newJobId, newColorCode, newBudget;
	$scope.save=function(){
		if($scope.name && $scope.name.length>3){
			debuggerUtils.updateLogs("Saving updated project information for: " + $scope.name + " " + $scope.project.projectid);
			preloader.showLoading();
			var projectId=$scope.project.projectid;
			newName=$scope.name;
			($scope.project.jobid)?(newJobId=$scope.project.jobid):(newJobId="");
			($scope.project.colorcode)?(newColorCode=$scope.project.colorcode):(newColorCode="");
			($scope.project.color)?(newColorIndex=$scope.project.color):(newColorIndex="");
			($scope.project.budget)?(newBudget=$scope.project.budget):(newBudget="");
			projectUtils.editProject($scope.project.projectid, newName, newJobId,  newBudget,newColorCode, newColorIndex)
			.then(function(data){
				preloader.hideLoading();
				if(data.IsSuccess){
					debuggerUtils.updateLogs("[EditProjectResult]: Successfully edited the project.");
					$location.path('projects');
				}
				else{
					debuggerUtils.updateLogs("[EditProjectResult]: data.result returned 'Error:'"+data.Msg);
					$scope.message=data.Msg;
				}
			}, function(data){
				preloader.hideLoading();
				$scope.message=data.Msg;
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
		$scope.colorBtnStyle.background=p.colorcode;
		$scope.colorPreviewStyle.background=p.colorcode;
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
		$scope.showColorPanel=!$scope.showColorPanel;
	},
	
	$scope.showPreview=function(index){
		$scope.colorPreviewStyle.background=$scope.colors[index].colorcode;
	},
	
	$scope.selectColor=function(index){
		$scope.showColorPanel=false;
		$scope.project.colorcode=$scope.colors[index].colorcode;
		$scope.project.color=$scope.colors[index].colorindex;
		$scope.colorBtnStyle.background=$scope.colors[index].colorcode;
	}
}]);