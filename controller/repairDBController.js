/**
 * aboutCtrl - repairDBControllerController.js
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
app.controller('repairDBCtrl',['$scope', '$location', 'Constants', '$window','CSInterface','Config', 'viewManager', 
function($scope, $location, Constants, $window, CSInterface, Config, viewManager){
	
	/*
	$scope.return1=function(){
		$location.path('projects');
	};
	//Rename the old database file, create a new one and return its contents
	CSInterface.evalScript('$._extFile.renameCreateNewAndReturnContents()', function(data){
		var DBContents=data.toString();
		if(!DBContents||DBContents.indexOf("error")>0){
			$scope.message="An Error Occured. Please try again restarting the extension";
			
		}
		else{
			$scope.message="DB contents fetched successfully";
			CSInterface.evalScript('$._extcommon.getdebugFileContents()', function(data){
				alert("Return value"+data);
				var debugContents=data;
				console.log(DBContents);
				console.log(debugContents);
				$scope.message="Log file contensts fetched successfully";
			})
		}
		
	})
	*/
	
	var form = document.getElementById('file-form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');

form.onsubmit = function(event) {
  event.preventDefault();

  // Update button text.
  uploadButton.innerHTML = 'Uploading...';

  // Get the selected files from the input.
var files = fileSelect.files;

// Create a new FormData object.
var formData = new FormData();


// Loop through each of the selected files.
for (var i = 0; i < files.length; i++) {
  var file = files[i];

  // Check the file type.
  if (!file.type.match('image.*')) {
    continue;
  }

  // Add the file to the request.
  formData.append('images[]', file, file.name);
}


// Set up the request.
var xhr = new XMLHttpRequest();

// Open the connection.
xhr.open('POST', 'http://192.168.2.14/creativeworx/fileUpload.php', true);

// Set up a handler for when the request finishes.
xhr.onload = function () {
console.log(xhr);
  if (xhr.status === 200) {
    // File(s) uploaded.
    uploadButton.innerHTML = 'Upload';
  } else {
    alert('An error occurred!');
  }
};

// Send the Data.
xhr.send(formData);
}


	
	
}]);