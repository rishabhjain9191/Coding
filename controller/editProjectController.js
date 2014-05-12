app.controller('editProjectController',['$scope', '$rootScope', 'projectUtils','Config','$location', function($scope, $rootScope, projectUtils, Config, $location){
	 
	 projectUtils.getProjects(Config.data.username, Config.data.confirmpassword, Config.data.userid)
	.then(function(data){$scope.projects=data;
		$scope.project=$scope.projects[2];
		$scope.name=$scope.project.name;
		$scope.colorBox={};
		$scope.colorBox.background=$scope.project.colorcode;
	}, function(data){});
	
	var newName, newJobId, newColorCode, newBudget;
	$scope.save=function(){
		var projectId=$scope.project.projectid;
		($scope.project.name!=='undefined')?(newName=$scope.name):(newName="");
		($scope.project.jobid!=='undefined')?(newJobId=$scope.project.jobid):(newjobId="");
		($scope.project.colorcode!=='undefined')?(newColorCode=$scope.project.colorcode):(newColorCode="");
		($scope.project.budget!=='undefined')?(newBudget=$scope.project.budget):(newBudget="");
		console.log($scope.project.projectid+ "  :: "+newName+ "  :: "+newJobId+ "  :: "+  newBudget+ "  :: "+newColorCode);
		projectUtils.editProject($scope.project.projectid, newName, newJobId,  newBudget,newColorCode)
		.then(function(data){
			console.log(data.Msg);
			$location.path('projects');
		}, function(data){
			$scope.message=data.Msg;
		});
	},
	
	$scope.cancel=function(){
		$location.path('projects');
	},
	
	$scope.selectColor=function(){
		var projColor= "";
		if(	$scope.project.colorcode!='')
			projColor=($scope.project.colorcode).replace("#","0x");
		var script = 'var color = $.colorPicker ("'+projColor+'"); if(color == -1){"-1";} var color16 = color.toString(16); color16;';
		new CSInterface().evalScript(script, function(data){
			$rootScope.$apply(function(){
				if(data!=-1){
					var colorSelected = "#"+data;
					$scope.project.colorcode=colorSelected;
					$scope.colorBox.background=$scope.project.colorCode;
					console.log("Color selected: "+colorSelected);
				}
			});
		});
	}
	
}]);