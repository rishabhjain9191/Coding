/**
 * $_extcommon - Common.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
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
			downloadFilePath=configFile.parent.fsName+"/"+extensionName;
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
		
	}
	
	
	
};

