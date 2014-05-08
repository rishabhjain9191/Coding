app.controller('editProjectController',['$scope', 'projectUtils','Config','$location', function($scope, projectUtils, Config, $location){
	 
	 projectUtils.getProjects(Config.data.username, Config.data.confirmpassword, Config.data.userid)
	.then(function(data){$scope.projects=data;
		$scope.project=$scope.projects[2];
		$scope.name=$scope.project.name;
	}, function(data){});
	
	var newName, newJobId, newColorCode, newBudget;
	$scope.save=function(){
		var projectId=$scope.project.projectid;
		($scope.project.name!=='undefined')?(newName=$scope.name):(newName="");
		($scope.project.jobid!=='undefined')?(newJobId=$scope.project.jobid):(newjobId="");
		($scope.project.colorcode!=='undefined')?(newColorCode=$scope.project.colorcode):(newColorCode="");
		($scope.project.budget!=='undefined')?(newBudget=$scope.project.budget):(newBudget="");
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
	}
	
}]);