app.controller('editProjectController',['$scope', '$rootScope', 'projectUtils','Config','$location','preloader', function($scope, $rootScope, projectUtils, Config, $location,preloader){
	 preloader.hideLoading();
	
	 $scope.colorBox={};
	 projectUtils.getProjects(Config.data.username, Config.data.confirmpassword, Config.data.userid)
	.then(function(data){$scope.projects=data;
		$scope.project=$scope.projects[0];
		$scope.name=$scope.project.name;
		console.log($scope.name);
		$scope.colorBox.background=$scope.project.colorcode;
		console.log($scope.colorBox.background);
	}, function(data){});
	
	var newName, newJobId, newColorCode, newBudget;
	$scope.save=function(){
		preloader.showLoading();
		var projectId=$scope.project.projectid;
		($scope.project.name!=='undefined')?(newName=$scope.name):(newName="");
		($scope.project.jobid!=='undefined')?(newJobId=$scope.project.jobid):(newjobId="");
		($scope.project.colorcode!=='undefined')?(newColorCode=$scope.project.colorcode):(newColorCode="");
		($scope.project.budget!=='undefined')?(newBudget=$scope.project.budget):(newBudget="");
		projectUtils.editProject($scope.project.projectid, newName, newJobId,  newBudget,newColorCode)
		.then(function(data){
			preloader.hideLoading();
			console.log(data.Msg);
			$location.path('projects');
		}, function(data){
			preloader.hideLoading();
			$scope.message=data.Msg;
		});
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
					//console.log("Color selected: "+colorSelected);
				}
			});
		});
	}	
}]);