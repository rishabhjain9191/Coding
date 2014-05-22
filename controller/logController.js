/**
 * logCtrl - logController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('logCtrl',['$scope', '$rootScope', '$location', '$window',
function($scope, $rootScope, $location, $window){
	$scope.return1=function(){
		$window.history.back();
	};
}]);