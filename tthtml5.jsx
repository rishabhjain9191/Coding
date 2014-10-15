// constants

var pathToConfigFile = "";
if(Folder.fs=="Windows"){
 pathToConfigFile = Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\CreativeWorxConfigv1.xml";
 pathToDebugFile = Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\CreativeWorx.log";
}else if(Folder.fs=="Macintosh"){
 pathToConfigFile = "~/Library/Application Support/CreativeWorx/CreativeWorxConfigv1.xml";
 pathToDebugFile = "~/Library/Application Support/CreativeWorx/CreativeWorx.log";
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
	
	getCurrentDoc:function(){
	
		if(app.documents.length==0){
			//No Document Open
			return "0";
		}
		else{
			return "1";
		}
	}
};







