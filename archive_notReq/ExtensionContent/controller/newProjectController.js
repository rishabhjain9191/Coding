app.controller('createNewProject',['$scope','$location','projectUtils',function($scope, $location,projectUtils){
	$scope.create=function(){
		with($scope.project){
			var name=name;
			var jobId=jobId;
			var budgetHrs=budgetHrs;
			var color=12;
			projectUtils.addProject(name, jobId, budgetHrs, color)
			.then(function(data){
				$scope.message=data.Msg;
				console.log(data.Msg);
				$location.path('projects');
			}, function(data){$scope.message=data.Msg});
			
		}
	}
}]);