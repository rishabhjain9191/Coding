var app=angular.module('TimeTracker',['TTServices','ngRoute'],function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});

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
		.when('/log',{
			controller:'logCtrl',
			templateUrl:'./views/log.html'
		})
		.otherwise({redirectTo:'/',template:'<div class="loading-spinner" ng-show="true"></div>'});
}]);


app.controller('viewCtrl',['$rootScope', '$scope', '$location','$http', 'Config', 'Constants', 'loginUtils', 'preloader','debuggerUtils', 'AppWatcher','projectUtils',
function($rootScope, $scope, $location,$http,Config, Constants, loginUtils, preloader, debuggerUtils, AppWatcher, projectUtils){
	
	$rootScope.modalShown=false;
	$rootScope.showFlyout=false;
	// Initialize $rootScope;
	$rootScope.logs="";
	$rootScope.loading=false;
	$rootScope.opaqueStyle={};
	$rootScope.projectProperties=new Array();
	$scope.processing=false;
	
	
	for(i=0;i<100;i++){
		$rootScope.projectProperties.push(new projectNo(i));
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
			
			debuggerUtils.updateLogs("==============");
			debuggerUtils.updateLogs("[LocalStorage]: readConfig()");
			debuggerUtils.updateLogs("Time : " + Config.data.timeInterval);
			debuggerUtils.updateLogs("Service Address: " + Config.data.serviceAddress);
			debuggerUtils.updateLogs("Check Online Interval: " + Config.data.checkOnlineTimeInterval);
			debuggerUtils.updateLogs("Image Time Interval: " + Config.data.imageTimeInterval);
			debuggerUtils.updateLogs("Batch Size: " + Config.data.batchSize);
			debuggerUtils.updateLogs("Threshold Count: " + Config.data.thresholdCount);
			debuggerUtils.updateLogs("Username: " + Config.data.username);
			debuggerUtils.updateLogs("Password: " + Config.data.password);
			debuggerUtils.updateLogs("Logging Enabled: " /*todo*/);
			debuggerUtils.updateLogs("==============");
			
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
	
	
	$rootScope.toggleFlyout=function(){
		$rootScope.showFlyout = !$rootScope.showFlyout;
	};
	
	$rootScope.create=function(){
		$rootScope.showFlyout = false;
		$location.path('createNew');
	};
	
	$rootScope.edit=function(){
		$rootScope.showFlyout = false;
		$location.path('editProject');
	};
	
	
	$rootScope.asgnPrjFldr=function(){
		$rootScope.showFlyout = false;
		//1. Check the Current Document is saved or not
		//If no project is selected, alert-No Project Selected
		if(projectUtils.currentProjectId==0||projectUtils.currentProjectId==-1){
			$rootScope.alert_message = "No Project Selected !";
			$rootScope.modalShown=true;
		}
		//If the document is saved and a project is selected, Create .creativeworxproject XML file and save userid and project id into it.
		else{
			new CSInterface().evalScript('$._extCWFile.updateOrCreateFile(\''+projectUtils.currentProjectId+'\', \''+Config.userid+'\')', function(data){
				//alert(data);
				console.log(data);
			});
		}
		
	};
	
	$rootScope.logout=function(){
		$rootScope.showFlyout = false;
		AppWatcher.removeEventListeners();
		$location.path("login");
	};
	
	$rootScope.feedback=function(){
		$rootScope.showFlyout = false;
		new CSInterface().openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_BETA_FEEDBACK);
	};
	$rootScope.about=function(){
		$rootScope.showFlyout = false;
		$location.path('about');
	};
	//}, function(){});
}]);


app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});


function projectNo(i){
	this.index=i;
	this.style={};
	this.message="";
};
