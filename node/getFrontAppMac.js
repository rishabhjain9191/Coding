var applescript = require("applescript");
var scriptFrontMostApp = 'tell application "System Events" \n' + 'return bundle identifier of the first application process whose frontmost is true\n' + 'end tell';

var http=require('http');
var server=http.createServer(function(req, res){
	applescript.execString(scriptFrontMostApp, function(err, result) {
		if (!err) {
				res.writeHead(200,{'Content-Type':'text/plain'});
				var msg=result+'';
				res.end(msg);
			} else {
				//console.error(err);
			}
	});
});

try{
	//A static port is given, need to be converted into dynamic one.
server.listen(50786,'127.0.0.1'); 
}
catch(e){
//console.log('server already running');
}

//console.log('server created');
