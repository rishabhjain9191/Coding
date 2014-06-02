/**
 * $_extcommon - Common.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
var debugFile=new File(pathToDebugFile);
if(debugFile){
	debugFile.open("e","TEXT","????");
}
$._extcommon={
	
	file:"abc",
	
	checkDocLength:function(){
		var len=app.documents.length;
		return len+'';
	},
	
	createDowloadFileProcess:function(url){
		var configFile = new File(pathToConfigFile);
		
		var extensionName="TimeTracker.zxp";
		var downloadURL = "http://www.creativeworx.com/downloads/timetracker/TimeTracker.zxp";
		
		var result;
		var downloadFilePath;
		
		if(Folder.fs == "Windows"){
			file=new File(configFile.parent+"/tmp.bat");
			file.open("w", "TEXT");
			
			downloadFilePath=configFile.parent.fsName+"\\downloads\\timetracker\\"+extensionName;
			this.createDownloadFolder(downloadFilePath);
			file.write("C:/Windows/System32/bitsadmin /transfer ZXPDownlaodJob  /download /priority high "+downloadURL+" \""+downloadFilePath+"\"");
			file.close();
			
			
		}
		
		else if(Folder.fs == "Macintosh"){
			file=new File(configFile.parent+"/tmp.sh");
			file.open("w", "TEXT");
			downloadFilePath=configFile.parent.fsName+"/downloads/timetracker/"+extensionName;
			this.createDownloadFolder(downloadFilePath);		
			file.write("curl "+downloadURL+" -o \""+downloadFilePath+"\"");
			file.close();
			
				
		}
		result='{"tmpFilePath":"'+file.fsName+'","zxpFilePath":"'+downloadFilePath+'"}';
			return result;
	},
	
	createDownloadFolder:function(path){
		var downloadFile=new File(path);
			
		if(!downloadFile.parent.exists){
			downloadFile.parent.parent.create();
			downloadFile.parent.create();
		}
	},
	
	deleteTemp:function(){
		file.remove();
		
	},
	
	//Debug File Functions
	logToDebugFile:function(statusText){
		debugFile.writeln(statusText);
	},
	
	closeDebugFile:function(){
		debugFile.close();
	},
	
	checkDebugFileSize:function(){
		if(debugFile){
			var size=debugFile.length; // size in bytes
			if(size/(1000*1000)>20){
				debugFile.close();
				debugFile.open("w","TEXT","????");
				debugFile.close();
				debugFile.open("e","TEXT","????");
			}
		}
	},
	
	getAppForegroundColor_ID:function(){
		var color1="";
		try{
			app.strokeFillProxySettings.fillColor.space = ColorSpace.RGB;
			var color=app.strokeFillProxySettings.fillColor.colorValue;
			app.strokeFillProxySettings.fillColor.space = ColorSpace.CMYK;
			var arr = color.toString().split(",");
			var color1 = this.rgbToHex(arr[0],arr[1],arr[2]);
		}
		catch(e){
		}
		return color1+'';
	},
	
	getAppForegroundColor_PS:function(){
		var color = app.foregroundColor.rgb.hexValue;
		return '#'+color;
	},
	
	rgbToHex:function(R,G,B){
		return "#"+this.toHex(R)+this.toHex(G)+this.toHex(B)
	},
	
	toHex:function(n){
		n = parseInt(n,10);
		if (isNaN(n)) return "00";
		n = Math.max(0,Math.min(n,255));
		return "0123456789ABCDEF".charAt((n-n%16)/16)
			+ "0123456789ABCDEF".charAt(n%16);
	}	
	
	
	
};

