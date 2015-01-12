/**
 * $_ext_AICY_EVENTS - EventsInCopy.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */


 $._ext_AICY_EVENTS={

 	
	addEventListeners:function(){
		app.addEventListener('documentAfterActivate', triggerDocumentAfterActivate);
		app.addEventListener('documentAfterDeactivate', triggerDocumentAfterDeactivate);
		app.addEventListener(Document.AFTER_CLOSE, triggerDocumentAfterDeactivate);

		
		app.addEventListener('documentAfterSave', triggerDocumentAfterSave);
		app.addEventListener('applicationActivate', triggerApplicationActivate);

	}
	
}

function loadPlugPlugLibrary(filePath){
    //filePath is escaped, so unescape it before using it.
    filePath = unescape(filePath);
	    try {
	        var externalLibrary = null;
	        var plugPlugLibraryFile = File(filePath);
	        if (plugPlugLibraryFile.exists) {
	            var externalLibrary = new ExternalObject("lib:"+ plugPlugLibraryFile.fullName);
	            var data = "PlugPlug library successfully loaded!";
	            var csxsEvent = createCSXSEvent("plugPlugSuccess", data);
	            csxsEvent.dispatch();
	        }
	        else {
	            throw new Error("Can't find PlugPlugExternalObject: " + plugPlugLibraryFile.fullName + " File: " + $.fileName + " Line: " + $.line);
	        }
	    }
	    catch(error){
	        alert(error); 
	    }    
	}

 	function triggerDocumentAfterActivate(){
 		var data = "documentAfterActivate";
		var csxsEvent = createCSXSEvent("documentAfterActivate", data);
		csxsEvent.dispatch();	
 	}
 	function triggerDocumentAfterDeactivate(){
 		var data = "documentAfterDeactivate";
		var csxsEvent = createCSXSEvent("documentAfterDeactivate", data);
		csxsEvent.dispatch();	
 	}
 	function triggerDocumentAfterSave(){
 		var data = "documentAfterSave";
		var csxsEvent = createCSXSEvent("documentAfterSave", data);
		csxsEvent.dispatch();	
 	}
 	function triggerApplicationActivate(){
 		var data = "ApplicationActivate";
		var csxsEvent = createCSXSEvent("ApplicationActivate", data);
		csxsEvent.dispatch();	
 	}



 