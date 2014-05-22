/**
 * $_extCWFile - CWProjectfileUtils.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 $._extCWFile={

	writeXMLFile : function(file, xml) {
		file.encoding = "UTF8";
		file.open("w", "TEXT", "????");
		file.write("\uFEFF");
		file.lineFeed = "unix";
		file.write(xml.toXMLString());
		$.writeln(file);
		file.close();
	},
	
	checkIfFileExistsRecursively : function(folder) {
		var cwFile = new File(folder+"/.creativeworxproject");
		if(cwFile.exists){
			return cwFile;
		}
		else{
			if(folder.parent != null){
				return this.checkIfFileExistsRecursively(folder.parent);
			}
			else{
				return false;
			}
		}
	},
	
	getTagValue : function(file, tag) {
		var cwFile = new File(file);
		cwFile.open("r");
		var xmlStr = cwFile.read();
		var myRootXmlObj = new XML (xmlStr);
		return myRootXmlObj.child("autotag").child(tag);
	},
	
	checkIfFileExists : function(folder) {
		var cwFile = new File(folder+"/.creativeworxproject");
		if(cwFile.exists){
			return cwFile;
		}
		else{
			return false;
		}
	},
	
	writeFile : function(file, pid, uid) {
		var myRootXmlObj = new XML ("<config></config>");
		var myRootXmlObj1 = new XML ("<autotag></autotag>");
		cwFile = new File(file);
		myRootXmlObj1.appendChild(new XML ("<userid>"+uid+"</userid>"));
		myRootXmlObj1.appendChild(new XML ("<projectuid>"+pid+"</projectuid>"));
		myRootXmlObj.appendChild(myRootXmlObj1);
		this.writeXMLFile(cwFile, myRootXmlObj);
		return "file written successfully";
	},
		
		
	updateOrCreateFile : function(pid, uid) {
		try{
			myFile = app.activeDocument.fullName;
			parentFolder = myFile.parent;
			var file = this.checkIfFileExists(parentFolder);
			var file = new File(parentFolder+"/.creativeworxproject");
			this.writeFile(file, pid, uid);
			return "true";
		}
		catch(e){
			return "false";
		}
	},
	
	getProjectID : function() {
		myFile = app.activeDocument.fullName;
		parentFolder = myFile.parent;
		var file = this.checkIfFileExistsRecursively(parentFolder);
		if(file){
			var tagValue = this.getTagValue(file, "projectuid");
			if(tagValue!=""){
				return tagValue+'';
			}else{
				return "";
			}
		}else{
			return "";
		}
	},
};