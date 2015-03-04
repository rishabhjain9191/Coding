console.log("In listener in node file");
console.log(process.cwd());
console.log(__dirname);
var addon = require('./addon/build/Release/addon');
var lastTime = 0;
var currentTime = 0;
var timeCounter;

/**
 * Run when got the message from main thread.
 * By running the loop in C addon to detect click event.
 **/
//process.on('message', function(m) {
	
	//console.log("child-process");
	//process.send("Hello");
	
	addon.runCallback(function(msg){  //msg is the message sent from C addon
		currentTime = (new Date()).getTime();
		timeCounter = currentTime - lastTime;
		if (timeCounter > 1000) {  // Response click every 1 seconds
			lastTime = currentTime;
			console.log(timeCounter);
			process.send(timeCounter);  // Send results back to parent process
		}
	}, function(str) {
		//console.log(str);
		console.error(str);
	});
	
	console.log("After addon.runCallback");
//});

