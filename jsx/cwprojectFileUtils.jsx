

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
	
	writeFile : function(file, newPair) {
		var xml;
		var pair={};
		
		readPair(newPair);
		if(!file.exists||!validXML(file)){
			if(createNewFile())
					return "file written successfully";

		}
		else{
			var matchedChild=pairExists();
               // $.writeln(matchedChild);
            if(matchedChild==200){
				//no uid/oid exists--insert a new tag
				xml.appendChild(createTag(pair));
				writeXMLToFile(xml);
				return "file written successfully";

			}
			else{
				xml.child('autotag')[matchedChild].replace("projectuid", new XML("<projectuid>"+pair.projectuid+"</projectuid>"));
				writeXMLToFile(xml);
				return "file written successfully";				
			}
		}

		function writeXMLToFile(xml){
			cwFile = new File(file);
			 $._extCWFile.writeXMLFile(cwFile, xml);
			return true;
		};

		function validXML(file){
			try{
				file.open('r');
				var contents=file.read();
				xml=new XML(contents);
				return true;
			}
			catch(e){
				return false;
			}
		};

		function readPair(newPair){
			var id=newPair["id"];
			pair["key"]=newPair["id"];
			pair["projectuid"]=newPair["projectid"];
			pair["id"]=newPair[id];
			/*
			for(i in newPair){
				if(i=="id"){
					id=newPair["id"];
					pair["key"]=id;
				}
				else if(i=='projectid')
				pair["projectuid"]=newPair["projectid"];
			}
			for(i in newPair){
				if(i==id){
					pair["id"]=newPair[id];
				}
			}
			*/
		};
		function pairExists(){
			//100:file does not exists or invalid xml
			//200:uid/oid does not exists in the file
			           // $.writeln(xml);

			var noOfTags=xml.child('autotag').length();
			var id=0, pid=0;
           // $.writeln(noOfTags);
			for(var i=0;i<noOfTags;i++){
				id=xml.child('autotag')[i].child('userid');
				if(id=="")
                    id=xml.child('autotag')[i].child('oid');	
                // $.writeln("\n"+id+", "+pair["id"]);
                if(id==pair["id"]){
					return i;
				}						
			}
			return 200;
		};

		function createTag(pair){
			var newPairXML = new XML ("<autotag></autotag>");
			newPairXML.appendChild(new XML ("<"+pair.key+">"+pair.id+"</"+pair.key+">"));
			newPairXML.appendChild(new XML ("<projectuid>"+pair.projectuid+"</projectuid>"));
			return newPairXML;
		};


		function createNewFile(){
			var myRootXmlObj = new XML ("<config></config>");
			cwFile = new File(file);
			myRootXmlObj.appendChild(createTag(pair));
			 $._extCWFile.writeXMLFile(cwFile, myRootXmlObj);
			return true;
		
		};
		
		
	},
		
		
	updateOrCreateFile : function(newPair) {
		
		try{
			
			//Special checking for Illustrator as it treats every document as saved one.
			
			if(app.name=="Adobe Illustrator"){
				var file=new File(app.activeDocument.fullName);
				if(!file.exists){
					return false;
				}
	
			}
			myFile = app.activeDocument.fullName;
			parentFolder = myFile.parent;
			var file = this.checkIfFileExists(parentFolder);
			var file = new File(parentFolder+"/.creativeworxproject");
			if(file.readonly){
				return "PRMDND"
			}
			this.writeFile(file, newPair);
			return "true";
		}
		catch(e){
			return "false";
		}
	},
	getMatchingProjectID:function(file, userid){
		try{
			var cwFile = new File(file);
			cwFile.open("r");
			var xmlStr = cwFile.read();
			var xml = new XML (xmlStr);
			cwFile.close();
			var noOfTags=xml.child('autotag').length();
			var id=0, pid=0;
           // $.writeln(noOfTags);
			for(var i=0;i<noOfTags;i++){
				id=xml.child('autotag')[i].child('userid');
				if(id=="")
                    id=xml.child('autotag')[i].child('oid');	
                // $.writeln("\n"+id+", "+pair["id"]);
                if(id==userid){
					return xml.child('autotag')[i].child('projectuid');
				}						
			}

			return '0';
		}
		catch(e){
			return '0';
		}

	},
	getProjectID : function(userid) {
		try{
		myFile = app.activeDocument.fullName;
		parentFolder = myFile.parent;

		var file = this.checkIfFileExistsRecursively(parentFolder);
		if(file){
			var matchingProjectID = this.getMatchingProjectID(file, userid)+'';
				//alert(matchingProjectID);
				//If the user id in .creativeworx file and user requesting the project id from .creatoveworx file are not same, do not assign any project id.
				if(matchingProjectID=='0'){
					return "";
				}
			return matchingProjectID;
		}
		else{
			return "";
		}
	}

catch(e){
	alert(e);
	return e.message;
}
}
};



