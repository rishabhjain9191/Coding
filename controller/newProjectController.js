app.controller('createNewProject',['$scope','$rootScope','$location','projectUtils',function($scope, $rootScope, $location,projectUtils){

	$scope.project={};
	$scope.colorBox={};
		
	$scope.create=function(){
		with($scope.project){
			var name=name;
			var jobId=jobId;
			var budgetHrs=budgetHrs;
			var color=colorcode;
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
					//console.log("Color selected: "+colorSelected);
				}
			});
		});
	}
}]);