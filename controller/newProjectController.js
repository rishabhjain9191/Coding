/**
 * createNewProject - newProjectController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */

 app.controller('createNewProject',['$scope','$rootScope','$location','projectUtils','preloader','debuggerUtils','Constants','Messages', 'APIUtils',function($scope, $rootScope, $location,projectUtils,preloader,debuggerUtils,constants,Messages, APIUtils){
	preloader.hideLoading();


	(constants.COLOR_MODE=="user_selectable")?$scope.showAllColors=true:$scope.showAllColors=false;

	$scope.project={};
	$scope.project.name="";
	$scope.project.jobId="";
	$scope.project.budgetHrs="";

	$scope.colorBtnStyle={};
	$scope.colorPreviewStyle={};
	/*Default Color Settings*/
	$scope.colorindex=13;
	$scope.targetColor="#337EBD";
	$scope.colorBtnStyle.background="#337EBD";
	$scope.colorPreviewStyle.background="#337EBD";
	/*End default color setting*/

	$scope.showColorPanel=false;

	// creating the colors array for the colorbox
	$scope.colors=[];
	 var projectColors = constants.PROJECT_COLORS;
	 for(var i=0+1; i<projectColors.length; i++){
		var obj = {};
		obj.colorindex=i;
		obj.colorcode=projectColors[i];
		$scope.colors.push(obj);
	 }


	$scope.create=function(){
		if($scope.project){
			console.log("1 Project Found  " + $scope.project.name);
		}
		//exploreScope($scope);

		var newProjectName=$('#newProject_projectName').val();
		var newProjectJobId=$('#newProject_jobId').val();
		var newProjectBudget=$('#newProject_budget').val();
		var newProjectUserNickName=$('#newProject_userNickName').val();

		console.log("color Panel value"+$('#preselectedColorPanel').val());

		if(newProjectName && newProjectName.length>=3){
			debuggerUtils.updateLogs("Creating new project: " + newProjectName);
			preloader.showLoading();
			var jobId,budgetHrs,color,userNickName;

				var name=newProjectName;
				(newProjectJobId)?(jobId=newProjectJobId):(jobId="");
				(newProjectBudget)?(budgetHrs=newProjectBudget):(budgetHrs="");
				(newProjectUserNickName)?(userNickName=newProjectUserNickName):(userNickName="");

				/* Angular Code*/
				//color=$scope.targetColor;

				/* JQuery Code for picking the color from full RGB Box*/
				var color="";
				if($(".sp-preview-inner")){

				var colorRGB = $(".sp-preview-inner").css('backgroundColor');
				color=hexc(colorRGB);
				}
				/* end JQuery Code*/
				($scope.colorindex!==null)?(colorIndex=$scope.colorindex):(colorIndex=24);


				APIUtils.addProject(name, userNickName, jobId, budgetHrs, color, colorIndex)
				.then(function(data){
					preloader.hideLoading();
					console.log(data);
					if(data.status="200"){
						debuggerUtils.updateLogs("[CreateProjectResult]: Successfully created new project.");
						$location.path('projects');
					}
					else{
						debuggerUtils.updateLogs("[NewProjectResult]: data.result returned");
					}
				}, function(data){
					console.log(data);
					preloader.hideLoading();
					if(data.status==400){
						console.log(Messages.addProjectMessages["JobIdEmpty"]);
						if(data.data.msg.jobid && data.data.msg.name){
							$scope.message=Messages.addProjectMessages["nameEmpty"]+", "+ Messages.addProjectMessages["JobIdEmpty"];
						}
						else if(data.data.msg.jobid){
							console.log("In if");
							$scope.message="ABCd";

							$scope.message=Messages.addProjectMessages["jobIdEmpty"];
						}
						else if(data.data.msg.name){
							$scope.message=Messages.addProjectMessages["nameEmpty"];
						}
						else{
							$scope.message=Messages.addProjectMessages["unknown"];
						}
					}
					else{
						$scope.message=Messages.addProjectMessages[data.status];
					}
				});

		}
		else{
			$scope.message="Project name requires 3 characters."
		}


		//Angular Code
		/*
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

		*/
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

	var exploreScope=function($scope){
		console.log("1");
		if(!$scope){
			return;
		}
		if($scope.project){
			console.log("parent Project Found  " + $scope.project.name);
		}
		console.log("2");
		if($scope.$$prevSibling){
			var prevSibling=$scope.$$prevSibling
			while(prevSibling){
				if(prevSibling.project){
					console.log("prev Project Found  " + prevSibling.project.name);
				}
				prevSibling=prevSibling.$$prevSibling;
			}
		}
		console.log("3");
		if($scope.$$nextSibling){
			var nextSibling=$scope.$$nextSibling;
			while(nextSibling!=null){
				if(nextSibling.project){
					console.log("next Project Found  " + nextSibling.project.name);
				}
				nextSibling=nextSibling.$$nextSibling;
			}
		}
		if($scope.$parent)
			exploreScope($scope.$parent);
	};

}]);


