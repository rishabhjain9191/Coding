app.controller('loginCtrl',['$scope', '$location','$http', 'Config','Constants', 'loginUtils',
function($scope, $location, $http,Config, Constants, loginUtils){
	$scope.keepLoggedIn='false';	
	$scope.message="";
	console.log("Logging in User");
	$scope.login=function(){
		var hashedPassword=MD5($scope.user.password);
		
		Config.username = $scope.user.email;
		Config.password = hashedPassword;
		
		loginUtils.login($scope.user.email, hashedPassword)
		.then(function(data){
			if(data.Msg=="Error: Authentication failed"){$scope.message="Authentication Faliure";}
			else{//User Authenticated
				Config.data=data[0];
				Config.keepMeLoggedIn=$scope.keepLoggedIn;
				Config.userid=Config.data.userid;
				Config.firstname=Config.data.firstname;
				new CSInterface().evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
					//console.log(data);
				});
				$location.path('projects');
			}
		},function(error){
			$scope.message="Unable to communicate with server";
		});
		
	};
	
	$scope.signup=function(){
		console.log("Opening SignUp in Browser");
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_SIGNUP);
	};
	
	$scope.forgetLogin=function(){
		console.log("Opening Forget Login in Browser");
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_FORGOT_LOGIN);
	};
	
	
	
}]);