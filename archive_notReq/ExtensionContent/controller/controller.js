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
		.otherwise({redirectTo:'/',template:'<html>Loading...</html>'});
}]);


app.controller('viewCtrl',['$scope', '$location','$http', 'Config', 'Constants', 'loginUtils',
function($scope, $location,$http,Config, Constants, loginUtils){

	//Config.init()
	//.then(function(data){
	var data = new Object();
	data.username="rishabh.jain9191@gmail.com";
	data.password="0a27b76628db3a7e47d627e71d3d4cc2";
	data.keepMeLoggedIn="true"; 
	data = JSON.stringify(data);
	//console.log($location);
	//new CSInterface().evalScript('$._extXML.readConfig()', function(data){
		if(data != "false"){
			Config.data=JSON.parse(data);
			Config.userName=Config.data.username;
			Config.password=Config.data.password;
			Config.keepMeLoggedIn=Config.data.keepMeLoggedIn;
			console.log(Config.keepMeLoggedIn);
			
			if(Config.keepMeLoggedIn=="false"){	
				console.log("keep me log in false");
				//console.log($location);
				$location.path('login');
				//location.href="views/login.html";
			}
			else if(Config.keepMeLoggedIn=="true"){
				console.log("keep me log in true");
				loginUtils.login(Config.userName, Config.password)
				.then(function(data){
					console.log(data);
					if(data.Msg=="Error: Authentication failed"){
						console.log($location.path());
						$location.path('login');
					}
					else{
						//User Authenticated
						Config.data=data[0];
						Config.keepMeLoggedIn=$scope.keepLoggedIn;
						$location.path('projects');
					}
				},function(error){
					$location.path('login');
				});
			}
		}
		else{
			console.log("Going to login screen");
			$location.path('login');
		}
	//});
	//}, function(){});
}]);






















	
	

