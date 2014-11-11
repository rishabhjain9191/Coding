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
		.when('/update',{
			controller:'updateCtrl',
			templateUrl:'./views/update.html'
		})
		.when('/loadConfig',{
			controller:'configLoader',
			templateUrl:'./views/loadConfig.html'
		})
		.when('/checkForFlashVersion',{
			controller:'flashVersionChecker',
			templateUrl:'./views/flashVersionCheck.html'
		})
		.when('/configureLDAP',{
			controller:'configureLDAPCtrl',
			templateUrl:'./views/configureLDAP.html'
		})
		.when('/LDAPLogin',{
			controller:'LDAPloginCtrl',
			templateUrl:'./views/LDAPLogin.html'
		})
		.when('/support',{
			controller:'supportCtrl',
			templateUrl:'./views/support.html'
		})
		.when('/repairDB',{
			controller:'repairDBCtrl',
			templateUrl:'./views/repairDB.html'
		})
		.otherwise({redirectTo:'/',template:'<div class="loading-spinner" ng-show="true"></div>'});
}]);


app.controller('viewCtrl',['$rootScope', '$scope', '$location','$http','Constants','preloader','debuggerUtils', '$window', 'viewManager','AppWatcher','projectUtils', '$route','Config','CSInterface','$templateCache','updateUtils',
function($rootScope, $scope, $location,$http, Constants,  preloader, debuggerUtils,  $window, viewManager,AppWatcher,projectUtils, $route,Config,CSInterface, $templateCache, updateUtils){	
	// Initialize $rootScope variables
	$rootScope.showFlyout=false;
	$rootScope.logs="";
	$rootScope.loading=false;
	$rootScope.opaqueStyle={};
	$rootScope.LoggedInItems=false;
	$rootScope.projectProperties=new Array();
	$rootScope.userLoggedState=1;
	$rootScope.checkUpdateFromMenuClick=0;
	
	for(i=0;i<Constants.MAX_PROJECTS;i++){
		$rootScope.projectProperties.push(new projectNo(i));
	}	
	
	$rootScope.toggleFlyout=function(){
		$rootScope.showFlyout = !$rootScope.showFlyout;
	};
	
	$window.onclick = function (event) {
		$rootScope.$apply(function(){
			if(event.srcElement.className!="nav")
				$rootScope.showFlyout = false;
		});
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
		//$rootScope.apply(function(){
			$scope.alert_message = "Assign Project requires an open document that has already been saved.";
			$scope.modalShown=true;
			//});
		}
		//If the document is saved and a project is selected, Create .creativeworxproject XML file and save userid and project id into it.
		else{
			CSInterface.evalScript('$._extCWFile.updateOrCreateFile(\''+projectUtils.currentProjectId+'\', \''+Config.userid+'\')', function(data){
				console.log($rootScope);
				console.log($scope);
				if(data == "false"){
					$scope.$apply(function(){
						$scope.alert_message="Assign Project requires an open document that has already been saved.";
						$scope.modalShown=true;
					});
				}else{
				$scope.$apply(function(){
					$scope.alert_message="The current project has been assigned to the current folder.";
					$scope.modalShown=true;
				});
				}
			});
		} 
	};
	
	/* $rootScope.$on("$routeChangeStart", function(event, next, current) {
		if(!$rootScope.userLoggedState){
			$location.path('login');
			//$route.reload();
		}	
			
	}); */
	
	$rootScope.logout=function(){
		 $rootScope.showFlyout = false;
		AppWatcher.removeEventListeners();
		projectUtils.reset();
		$rootScope.projectProperties=new Array();
		for(i=0;i<Constants.MAX_PROJECTS;i++){
			$rootScope.projectProperties.push(new projectNo(i));
		}
		$rootScope.LoggedInItems=false;		
		$rootScope.userLoggedState=0;
		Config.clearUserDetails();
		viewManager.userLoggedOut();
	};
	
	$rootScope.configureLDAP=function(){
		$rootScope.showFlyout = false;
		viewManager.configureLDAP();
	};
	
	$rootScope.feedback=function(){
		$rootScope.showFlyout = false;
		CSInterface.openURLInDefaultBrowser(Constants.URL_SITE + Constants.URL_BETA_FEEDBACK);
	};
	$rootScope.about=function(){
		$rootScope.showFlyout = false;
		$location.path('about');
	};
	$rootScope.refreshProjects1=function(){
		$rootScope.showFlyout = false;
		//preloader.showLoading();
		$rootScope.refreshProjects();
		//preloader.hideLoading();
		console.log($rootScope);
	};
	$rootScope.checkUpdate=function(){
		//updateUtils.checkForUpdate(function(data){console.log(data);}, function(){});
		if($location.path()=='/update'){
			$route.reload()
		}
		else{
			$location.path('update');
			$rootScope.checkUpdateFromMenuClick=1;
		}
		
	}
	$rootScope.support=function(){
		$rootScope.showFlyout = false;
		$location.path('support');
	}
	CSInterface.evalScript('$._extcommon.createDebugFile()',function(){
		viewManager.initializationDone();
	});
	
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
		template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-dialog-content' ng-transclude></div><button class='lightBtn' style='width: 71px;' ng-click='hideModal()'>I got it</button></div></div>"
	};
});

app.directive('uiColorpicker', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: false,
        replace: true,
        template: "<span><input class='input-small' /></span>",
        link: function(scope, element, attrs, ngModel) {
            var input = element.find('input');
            var options = angular.extend({
                color: ngModel.$viewValue,
				showInput: true,
                change: function(color) {
                    scope.$apply(function() {
                      ngModel.$setViewValue(color.toHexString());
                    });
                }
            }, scope.$eval(attrs.options));
            
            ngModel.$render = function() {
              input.spectrum('set', ngModel.$viewValue || '');
            };
            
            input.spectrum(options);
        }
    };
});

function projectNo(i){
	this.index=i;
	this.style={};
	this.message="";
};

function canEdit(oid, orgSetting){
	console.log(oid+" "+orgSetting);
	if(!oid){
		console.log("Oid not present");
		return true;
	}
	else if(oid && orgSetting && orgSetting.user_add_projects){
		console.log("oid and user can add project");
		return true;
	}
	else{
		return false;
	}
}

function getAppForegroundColor(setColor){
	
	if(new CSInterface().hostEnvironment.appName == "IDSN")
		script = "$._extcommon.getAppForegroundColor_ID()";
	else if(new CSInterface().hostEnvironment.appName == "PHXS")
		script = "$._extcommon.getAppForegroundColor_PS()";
	
	else if(new CSInterface().hostEnvironment.appName == "ILST")
		script = "$._extcommon.getAppForegroundColor_IL()";
	
	new CSInterface().evalScript(script, function(data){
		
		if(data != ""){
			
			$(".userForegroundContainerIcon")[$(".sp-input").length-1].style.backgroundColor =data;
			if(setColor){
				$(".sp-input")[$(".sp-input").length-1].value =data;
				$(".input-small").spectrum('setFromTextInput');
			}
		}
	});
}