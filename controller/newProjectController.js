app.controller('createNewProject',['$scope','$rootScope','$location','projectUtils',function($scope, $rootScope, $location,projectUtils){

	$scope.colorBox={};
		
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
	},
	$scope.cancel=function(){
		$location.path('projects');
	},
	
	$scope.selectColor=function(){
		var script = 'var color = $.colorPicker (); if(color == -1){"-1";} var color16 = color.toString(16); color16;';

		new CSInterface().evalScript(script, function(data){
			$rootScope.$apply(function(){
				if(data!=-1){
					var colorSelected = "#"+data;
					$scope.colorBox.background=colorSelected;
					$scope.colorChosen=colorSelected;
					console.log("Color selected: "+colorSelected);
				}
			});
		});
	}
}]);