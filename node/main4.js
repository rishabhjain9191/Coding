Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};
Function.method('inherits', function (Parent) {
	this.prototype = new Parent();
	return this;
});

var csInterface=new CSInterface();
//Get App information
var obj={};
obj["a"]="b";
var appName = csInterface.hostEnvironment.appName;
if(appName=='PPRO'){
	var watcher=getWatcher();
	console.log(watcher);
	//Start the listener
	var listener = fork(watcher.listenerName, {
		cwd: watcher.cwd,
		silent: true
	}, function() {
		console.log('Error')
	});
	//Start the getFrontApp server
	var getFrontAppServer = fork(watcher.getFrontAppServerName,{
		cwd: watcher.cwd,
		silent: true
	}, function() {
		console.log('Error')
	});
	//listen to the listener
	listener.stdout.setEncoding('utf8');
	var http=require('http');
	var options={
			host:'localhost',
			////A static port is given, need to be converted into dynamic one.
			port:50786,
			method:'GET',
			headers:{
				accept:'text/plain'
			}
		};
		listener.stdout.on('data', function(m) {
		console.log(m);
		var x=http.request(options, function(res){
						console.log(res);
						res.on('data', function(data){
						var result=data.toString('utf8');
						console.log(result);
						if(watcher.isSupportedApp(result)){
							dispatchUserActiveEvent();
						}
					});
				});
				x.end();
	});

	listener.on('exit', function(exitcode) {
		console.log(exitcode)
	});
	listener.on('message', function(message) {
		console.log(message);
		var x=http.request(options, function(res){
						//console.log(res);
						res.on('data', function(data){
						var result=data.toString('utf8');
						console.log(result);
						if(watcher.isSupportedApp(result)){
							dispatchUserActiveEvent();
						}
					});
				});
				x.end();
	});
}

function dispatchUserActiveEvent(){
	console.log("dispatching");
	var event=new CSEvent("userActive", "APPLICATION");
	event.type="userActive";
	event.data="<userActive />";
	csInterface.dispatchEvent(event);
}

var Watcher = function (config) {
	config = config || {};
	this.nodePath = config.nodePath;
	this.listenerName = config.listenerName;
	this.cwd = config.cwd;
	this.getFrontAppServerName = config.getFrontAppServerName;
	this.supportedAppsPackageNames = config.supportedAppsPackageNames;
}
	.method('isSupportedApp', function (appPackageName) {
		for(var i in this.supportedAppsPackageNames) {
			if (appPackageName.indexOf(this.supportedAppsPackageNames[i])!=-1) return true;
		}
		return false;
	});

var WatcherMac = function () {
	this.nodePath=csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/node-cwx-bins/osx/node";
	this.listenerName="listenerMac.js";
	this.cwd=csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/";
	this.getFrontAppServerName="getFrontAppMac.js";
	this.supportedAppsPackageNames=[
		"com.adobe.AdobePremierePro",
		"com.adobe.AfterEffects"
	];
}.inherits(Watcher);

var WatcherWindows = function () {
	var nodePath=csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/node-cwx-bins/win/64/node.exe";
	this.nodePath=nodePath.replace(/\//g,"\\\\");
	this.listenerName="listenerWin.js";
	var cwd=csInterface.getSystemPath(SystemPath.EXTENSION) + "/node/";
	this.cwd=cwd.replace(/\//g,"\\\\");
	this.getFrontAppServerName="getFrontAppWin.js";
	this.supportedAppsPackageNames=[
		"Premiere"
	];
}.inherits(Watcher);

function getWatcher(){
	//get os information
	var osInformation=csInterface.getOSInformation();
	//MAC
	if(osInformation.match(/Mac OS/gi)!= null){
		return new WatcherMac();
	}
	//WINDOWS-64, PPRO DOES NOT RUN ON x386
	if(osInformation.match(/64-bit/gi) != null){
		return new WatcherWindows();
	}
}

function fork(modulePath, options) {
	var path = require('path');
	var args, execArgv;
	var util = require('util');
	args = [];
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
	console.log(watcher.nodePath);
	return cp.spawn(watcher.nodePath, args, options);
}
