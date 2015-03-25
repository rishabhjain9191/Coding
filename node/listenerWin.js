console.log(process.cwd());
var addOnPath=process.cwd()+"\\windows\\build\\Release\\addon.node"
addOnPath=addOnPath.replace(/\\/g,"\\\\");
var addon = require(addOnPath);
var lastTime = 0;
var currentTime = 0;
var timeCounter;

/**
 * Run when got the message from main thread.
 * By running the loop in C addon to detect click event.
 **/
 
 console.log("In windows listener");
 
	
	addon.runCallback(function(msg){  //msg is the message sent from C addon
		currentTime = (new Date()).getTime();
		timeCounter = currentTime - lastTime;
		if (timeCounter > 1000) {  // Response click every 1 seconds
			lastTime = currentTime;
			console.log(timeCounter);
			process.send(timeCounter);  // Send results back to parent process
		}
	}, function(str) {
		console.error(str);
	});   
	
console.log("After addon.runCallback");
	
	
	


