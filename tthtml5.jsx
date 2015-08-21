// constants

var pathToConfigFile = "";
if(Folder.fs=="Windows"){
 pathToConfigFile = Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\CreativeWorxConfigv1.xml";
 pathToUserInformationFile=Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\user.json";
 pathToDebugFile = Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\CreativeWorx.log";
 os="Windows";
}else if(Folder.fs=="Macintosh"){
 pathToConfigFile = "~/Library/Application Support/CreativeWorx/CreativeWorxConfigv1.xml";
 pathToUserInformationFile="~/Library/Application Support/CreativeWorx/user.json";
 pathToDebugFile = "~/Library/Application Support/CreativeWorx/CreativeWorx.log";
 os="Mac";
}
var XMLHeader = '<\?xml version=\"1.0\" encoding=\"UTF-8\"?>';


if(typeof($)=='undefined')
	$={};

$._ext = {
    //Evaluate a file and catch the exception.
    evalFile : function(path) {
        try {
            $.evalFile(path);
        } catch (e) {alert("Exception:" + e);}
    },
    // Evaluate all the files in the given folder 
    evalFiles: function(jsxFolderPath) {
        var folder = new Folder(jsxFolderPath);
        if (folder.exists) {
            var jsxFiles = folder.getFiles("*.jsx");
            for (var i = 0; i < jsxFiles.length; i++) {
                var jsxFile = jsxFiles[i];
                $._ext.evalFile(jsxFile);
            }
        }
    },
	
	getCurrentDoc:function(appName){
		if(appName=="AEFT"){
		if(app.project.activeItem){
		return "1";
		}
		return "0";
		}
	   if(appName=="PPRO"){
        if(app.isDocumentOpen()){
            return "1";
        }
        return "0";
       }

		if(app.documents.length==0){
			//No Document Open
			return "0";
		}
		else{
			return "1";
		}
	}
};







