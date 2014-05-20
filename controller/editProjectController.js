app.controller('editProjectController',['$scope', '$rootScope', 'projectUtils','Config','$location','preloader', 'debuggerUtils', function($scope, $rootScope, projectUtils, Config, $location,preloader,debuggerUtils){
	 preloader.hideLoading();
	 $scope.colorBox={};
	 projectUtils.getProjects(Config.data.username, Config.data.confirmpassword, Config.data.userid)
	.then(function(data){$scope.projects=data;
		$scope.project=$scope.projects[0];
		$scope.name=$scope.project.name;
		$scope.colorBox.background=$scope.project.colorcode;
	}, function(data){});
	
	var newName, newJobId, newColorCode, newBudget;
	$scope.save=function(){
		if($scope.name && $scope.name!=""){
			debuggerUtils.updateLogs("Saving updated project information for: " + $scope.name + " " + $scope.project.projectid);
			preloader.showLoading();
			var projectId=$scope.project.projectid;
			newName=$scope.name;
			($scope.project.jobid)?(newJobId=$scope.project.jobid):(newjobId="");
			($scope.project.colorcode)?(newColorCode=$scope.project.colorcode):(newColorCode="");
			($scope.project.budget)?(newBudget=$scope.project.budget):(newBudget="");
			projectUtils.editProject($scope.project.projectid, newName, newJobId,  newBudget,newColorCode)
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
		$scope.colorBox.background=p.colorcode;
	},
	
	$scope.selectColor=function(){
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
					$scope.colorBox.background=colorSelected;
				}
			});
		});
	}	
}]);