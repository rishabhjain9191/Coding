app.controller('createNewProject',['$scope','$rootScope','$location','projectUtils','preloader',function($scope, $rootScope, $location,projectUtils,preloader){
	//$scope.alert_message="Project name cannot be left blank!";
	//$scope.modalShown = false;
	preloader.hideLoading();
	$scope.project={};
	$scope.colorBox={};
	
	$scope.create=function(){
		if($scope.project.name && $scope.project.name.length>=3){
			preloader.showLoading();
			var jobId,budgetHrs,color;
			with($scope.project){
				var name=name;
				($scope.project.jobId)?(jobId=jobId):(jobId="");
				($scope.project.budgetHrs)?(budgetHrs=budgetHrs):(budgetHrs="");
				($scope.project.colorcode)?(color=colorcode):(color="");
				projectUtils.addProject(name, jobId, budgetHrs, color)
				.then(function(data){
					preloader.hideLoading();
					$scope.message=data.Msg;
					console.log(data.Msg);
					if(data.IsSuccess)
						$location.path('projects');
					else
						$scope.message=data.Msg;
				}, function(data){preloader.hideLoading();$scope.message=data.Msg});
				
			}
		}
		else{
			//$scope.modalShown = true;
			$scope.message="Project name requires 3 characters."
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