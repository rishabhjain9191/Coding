var pathToUnsendEvents = "";
if(Folder.fs=="Windows"){
	pathToUnsendEvents = Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\CreativeWorxDB.json";
}else if(Folder.fs=="Macintosh"){
	pathToUnsendEvents = "~/Library/Application Support/CreativeWorx/CreativeWorxDB.json";
}

var file;
$._extFile={
	openFile:function(){
		file=new File(pathToUnsendEvents);
		file.open("e", "json", "????");
	},
	
	writeObj:function(str){
		try{
			file.seek(0,2);
			file.writeln(str);
		}
		catch(e){
			alert(e);
		}
	},
	
	readAndSend:function(){
		//Read the records
		file.seek(0,0);
		var records=new Array();
		while(str=file.readln()){
			records.push(str);
		}
		//Delete the file and create a new one
		file.close();
		file=new File(pathToUnsendEvents);
		file.open("w", "json", "????");
		file.close();
		file.open("e", "json", "????"); 
		
		//Send the records back to resend to server
		var rec='[';
		for(var i=0;i<records.length;i++){
			rec=rec+records[i]+',';
		}
		if(rec.length>1){rec=rec.substring(0,rec.length-1);}
		rec=rec+']';
		return rec;
	}
}


/* $._extCWFile={

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
			myFile = app.documents[0].fullName;
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
		myFile = app.documents[0].fullName;
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

 */