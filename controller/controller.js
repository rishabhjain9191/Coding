/**
 * viewCtrl - controller.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 var app=angular.module('TimeTracker',['TTServices','ngRoute'],function($httpProvider) {
	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
	/**
	* Converts an object to x-www-form-urlencoded serialization.
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
			else if(value !== undefined && value !== null){
				query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
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


app.controller('viewCtrl',['$rootScope', '$scope', '$location','$http', 'Config', 'Constants', 'loginUtils', 'preloader','debuggerUtils', 'AppWatcher','projectUtils','$window',
function($rootScope, $scope, $location,$http,Config, Constants, loginUtils, preloader, debuggerUtils, AppWatcher, projectUtils,$window){	
	// Initialize $rootScope variables
	$rootScope.modalShown=false;
	$rootScope.showFlyout=false;
	$rootScope.logs="";
	$rootScope.loading=false;
	$rootScope.opaqueStyle={};
	$rootScope.projectProperties=new Array();
	for(i=0;i<100;i++){
		$rootScope.projectProperties.push(new projectNo(i));
	}	
	$scope.processing=false;

	var data = new Object();
	data = JSON.stringify(data);
	new CSInterface().evalScript('$._extXML.readConfig()', function(data){
		if(data != "false"){
			Config.data=JSON.parse(data);
			Constants.update(Config.data);
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
				$scope.$apply(function() {
					$location.path('login');
				});
			}
			else if(Config.keepMeLoggedIn=="true"){
				loginUtils.login(Config.username, Config.password)
				.then(function(data){
					console.log(data);
					if(data.Msg=="Error: Authentication failed"){
						$location.path('login');
					}
					else{
						//User Authenticated
						console.log("User Authenticaed");
						$rootScope.canEdit=canEdit(data[0].oid, data[0].usertype);
						$location.path('projects');
					}
				},function(error){
					$location.path('login');
				});
			}
		}
		else{
			$scope.$apply(function() {
				$location.path('login');
			});
		}
	});
	
	$rootScope.toggleFlyout=function(){
		$rootScope.showFlyout = !$rootScope.showFlyout;
		/*if ($rootScope.showFlyout) {
			$window.onclick = function (event) {
				closeMenuWhenClickingElsewhere(event, $rootScope.toggleFlyout);
			};
		}*/ 
	};
	
	function closeMenuWhenClickingElsewhere(event, callbackOnClose) {
		var clickedElement = event.target;
		if (!clickedElement) return;
		var elementClasses = clickedElement.classList;
		var clickedOnSearchDrawer = elementClasses.contains('nav');
		if (!clickedOnSearchDrawer) {
			callbackOnClose();
			return;
		}
	}
	
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
			$rootScope.alert_message = "Assign Project requires an open document that has already been saved.";
			$rootScope.modalShown=true;
		}
		//If the document is saved and a project is selected, Create .creativeworxproject XML file and save userid and project id into it.
		else{
			new CSInterface().evalScript('$._extCWFile.updateOrCreateFile(\''+projectUtils.currentProjectId+'\', \''+Config.userid+'\')', function(data){
				if(data == "false"){
					$rootScope.alert_message="Assign Project requires an open document that has already been saved.";
					$rootScope.modalShown=true;
				}else{
					$rootScope.alert_message="The current project has been assigned to the current folder.";
					$rootScope.modalShown=true;
				}
			});
		}
	};
	
	$rootScope.logout=function(){
		$rootScope.showFlyout = false;
		AppWatcher.removeEventListeners();
		projectUtils.reset();
		$rootScope.projectProperties=new Array();
		for(i=0;i<100;i++){
			$rootScope.projectProperties.push(new projectNo(i));
		}	
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
	$rootScope.refreshProjects=function(){
		$rootScope.showFlyout = false;
		//projectUtils.refreshProjects();
		//$location.path("projects");
		console.log($rootScope);
	};
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
		template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-content' ng-transclude></div><button class='lightBtn' style='width: 71px;' ng-click='hideModal()'>OK</button></div></div>"
	};
});


function projectNo(i){
	this.index=i;
	this.style={};
	this.message="";
};

function canEdit(oid, usertype){
	if(oid&&usertype=='normal'){
		return false;
	}
	else{
		return true;
	}
}
