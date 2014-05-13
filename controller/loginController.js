app.controller('loginCtrl',['$scope', '$rootScope', '$location','$http', 'Config','Constants', 'loginUtils','preloader',
function($scope, $rootScope, $location, $http,Config, Constants, loginUtils,preloader){
	preloader.hideLoading();
	$scope.alert_message="Username and Password cannot be left blank!";
	$scope.modalShown = false;
	$scope.keepLoggedIn='false';	
	$scope.message="";
	console.log("Logging in User");
	$scope.login=function(){
		if($scope.user && $scope.user.email!="" && $scope.user.password!=""){	
			preloader.showLoading();
			var hashedPassword=MD5($scope.user.password);
			
			Config.username = $scope.user.email;
			Config.password = hashedPassword;
			
			loginUtils.login($scope.user.email, hashedPassword)
			.then(function(data){
				preloader.hideLoading();
				if(data.Msg=="Error: Authentication failed"){$scope.message="Authentication Failure";}
				else{//User Authenticated
					Config.data=data[0];
					Config.keepMeLoggedIn=$scope.checked;
					Config.userid=Config.data.userid;
					Config.firstname=Config.data.firstname;
					new CSInterface().evalScript('$._extXML.writeConfig('+JSON.stringify(Config)+')', function(data){
						//console.log(data);
					});
					$location.path('projects');
				}
			},function(error){
				preloader.hideLoading();
				$scope.message="Unable to communicate with server";
			});
		}
		else{
			$scope.modalShown = true;
		}
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