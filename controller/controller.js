var app=angular.module('TimeTracker',['TTServices']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login',{
			controller:'loginCtrl',
			templateUrl:'./views/login.html'
		})
		.when('/projects',{
			controller:'projectCtrl',
			templateUrl:'./views/projects.html'
		})
		.when('/createNew',{
			controller:'createNewProject',
			templateUrl:'./views/newProject.html'
		})
		.when('/editProject',{
			controller:'editProjectController',
			templateUrl:'./views/editProject.html'
		})
		.when('/about',{
			controller:'aboutCtrl',
			templateUrl:'./views/about.html'
		})
		.otherwise({redirectTo:'/',template:'<html>Loading...</html>'});
}]);


app.controller('viewCtrl',['$rootScope', '$scope', '$location','$http', 'Config', 'Constants', 'loginUtils',
function($rootScope, $scope, $location,$http,Config, Constants, loginUtils){
	
	// Initialize $rootScope;
	$rootScope.projectNo=new Array();
	$scope.processing=false;
	
	$rootScope.projectColor=new Array();
	for(i=0;i<40;i++){
		$rootScope.projectNo.push(new projectNo(i));
	}
	//Config.init()
	//.then(function(data){
	var data = new Object();
	data = JSON.stringify(data);
	new CSInterface().evalScript('$._extXML.readConfig()', function(data){
		if(data != "false"){
			console.log(JSON.parse(data));
			Config.data=JSON.parse(data);
			Config.username=Config.data.username;
			Config.password=Config.data.password;
			Config.keepMeLoggedIn=Config.data.keepMeLoggedIn;
			Config.firstname=Config.data.firstname;
			Config.userid=Config.data.userid;
			
			if(Config.keepMeLoggedIn=="false"){	
				console.log("keep me log in false");
				//console.log($location);
				$scope.$apply(function() {
					$location.path('login');
				});
				//location.href="views/login.html";
			}
			else if(Config.keepMeLoggedIn=="true"){
				console.log("keep me log in true");
				loginUtils.login(Config.username, Config.password)
				.then(function(data){
					console.log(data);
					if(data.Msg=="Error: Authentication failed"){
						$location.path('login');
					}
					else{
						//User Authenticated
						//Config.data=data[0];
						//Config.keepMeLoggedIn=$scope.keepLoggedIn;
						$location.path('projects');
					}
				},function(error){
					$location.path('login');
				});
			}
		}
		else{
			console.log("Going to login screen");
			$scope.$apply(function() {
			  $location.path('login');
			});
		}
	});
	//}, function(){});
}]);

function projectNo(i){
	this.index=i;
	this.style={'color':'gray'};
	this.message="";
};




















	
	

