var csInterface = new CSInterface();
var appName = csInterface.hostEnvironment.appName;
if (appName == 'PPRO') {
	//Determine Node path
	var osInformation = csInterface.getOSInformation();
	    var nodePath;
	    var PPRO_Package_Name="com.adobe.AdobePremierePro";
	    var EXTENSION_ID=csInterface.getExtensionID();
	    if(osInformation.match(/Mac OS/gi)!= null){
	        nodePath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/node-cwx-bins/osx/node";
	    }
	    else{
	        if(osInformation.match(/64-bit/gi) != null){
	            nodePath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/node-cwx-bins/win/64/node.exe";
	        }
	        else{
	            nodePath = csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/node-cwx-bins/win/32/node.exe";
	        }
	    }
	    //nodePath = escape(nodePath);
	    console.log(nodePath);

	    ///////////

	var child = fork('listener.js', {
		cwd: "/Users/parikshan/Library/Application Support/Adobe/CEP/extensions/com.creativeworx.tthtml/node/",
		silent: true
	}, function() {
		console.log('Hello')
	});
	console.log(child);

	child.stdout.setEncoding('utf8');
	child.stderr.setEncoding('utf8');

	var applescript = require("applescript");

	var scriptFrontMostApp = 'tell application "System Events" \n' + 'return bundle identifier of the first application process whose frontmost is true\n' + 'end tell';


	child.stdout.on('data', function(m) {
		// When get the click event and the timer is off, turn on the timer to post data periodically
		//console.log(m + "from main");
		//console.log("clicking");


		applescript.execString(scriptFrontMostApp, function(err, result) {
			if (!err) {
				if(result==PPRO_Package_Name){
					dispatchUserActiveEvent();
				}
			} else {
				console.error(err);
			}
		});

	});

	child.on('exit', function(exitcode) {
		console.log(exitcode)
	});
	child.on('message', function(message) {
		console.log(message)
	});
}
function dispatchUserActiveEvent(){
	var event=new CSEvent("userActive", "APPLICATION");
	event.type="userActive";
	event.data="<userActive />";
	csInterface.dispatchEvent(event);
}

function fork(modulePath, options) {
	//console.log(options);
	var path = require('path');
	
	// Get options and args arguments. 
	var args, execArgv;
	var util = require('util');
	/*if (Array.isArray(arguments[1])) {
		args = arguments[1];
		options = util._extend({}, arguments[2]);
	} else {*/
	args = [];
	/*options = util._extend({}, arguments[1]);
	}*/
	// Prepare arguments for fork: 
	execArgv = options.execArgv || process.execArgv;
	args = execArgv.concat([modulePath], args);
	console.log(args);
	// Leave stdin open for the IPC channel. stdout and stderr should be the
	// same as the parent's if silent isn't set. 
	options.stdio = options.silent ? ['pipe', 'pipe', 'pipe', 'ipc'] : [0, 1, 2, 'ipc'];
	var cp = require('child_process');
	console.log(cp);
	console.log(options);
	return cp.spawn(nodePath, args, options);
}