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
		.otherwise({redirectTo:'/',template:'<div class="loading-spinner" ng-show="true"></div>'});
}]);


app.controller('viewCtrl',['$rootScope', '$scope', '$location','$http', 'Config', 'Constants', 'loginUtils', 'preloader','debuggerUtils', 'AppWatcher','projectUtils','$window','updateUtils',
function($rootScope, $scope, $location,$http,Config, Constants, loginUtils, preloader, debuggerUtils, AppWatcher, projectUtils,$window, updateUtils){	
	// Initialize $rootScope variables
	$rootScope.modalShown=false;
	$rootScope.showFlyout=false;
	$rootScope.logs="";
	$rootScope.loading=false;
	$rootScope.opaqueStyle={};
	$rootScope.LoggedInItems=false;
	$rootScope.projectProperties=new Array();
	
	
	
	
	//Check for Updates
		updateUtils.checkForUpdate()
		.then(function(updateReq){
			if(updateReq){
			switch(updateReq){
				case 100:$location.path('update');return;
				case 200:$location.path('update');return;
				case 300||-1:loginUtils.tryLoginFromConfig();return;
				
				
			}
		}
		})
		
		//console.log(updateReq);
	
	
	for(i=0;i<100;i++){
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
		$rootScope.LoggedInItems=false;		
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
	$rootScope.refreshProjects1=function(){
		$rootScope.showFlyout = false;
		preloader.showLoading();
		$rootScope.refreshProjects();
		//preloader.hideLoading();
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

function canEdit(oid, usertype){
	if(oid&&usertype=='normal'){
		return false;
	}
	else{
		return true;
	}
}


