/**
 * $_extXML - XMLUtils.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 $._extXML={

	isExists : function() {
		var configFile = new File(pathToConfigFile);
		var configFolder=configFile.parent;
		if(!configFolder.exists){
			configFolder.create();
		}
        if(configFile.exists)
            return true;
        else
            return false;
    },
	
	readConfig:function(){
		if(!this.isExists()){
			return "false";
		}
		var tags=["username","password","keepMeLoggedIn","userid","firstname","timeInterval","serviceAddress","checkOnlineTimeInterval","imageTimeInterval","batchSize","thresholdCount","siteAddress", "updateAddress", "checkStatusAddress", "batchDataSendAddress", "fileUploadAddress", "imagesFolderAddress", "logEnabled", "configversion", "companyEmail", "companyName"];
		var obj = new Object();
		var str="{";
		for(var i=0;i<tags.length;i++){
			obj[tags[i]] = this.getTagValue(tags[i]);
			str=str+"\""+tags[i]+"\""+":"+"\"" +(obj[tags[i]])+"\""+",";
		}
		str=str.substring(0,str.length-1)+"}";
		return str;
	},
	
	writeConfig:function(config){
		if(!this.isExists()){
			var myRootXmlObj = new XML ("<config></config>");
			configFile = new File(pathToConfigFile);
			for (c in config) {
				if(c != "data"){
					myRootXmlObj.appendChild(new XML ("<"+c+">"+config[c]+"</"+c+">"));
				}
				this.writeXMLFile(configFile, myRootXmlObj);
			}
			return "file written successfully";
		}
		else{
			for (c in config) {
				if(c == "username")
					this.setTagValue('username', config[c]);
				if(c == "password")
					this.setTagValue('password', config[c]);
				if(c == "keepMeLoggedIn")
					this.setTagValue('keepMeLoggedIn', config[c]);
				if(c == "firstname")
					this.setTagValue('firstname', config[c]);
				if(c == "userid")
					this.setTagValue('userid', config[c]);
				if(c == "companyEmail")
					this.setTagValue('companyEmail', config[c]);
				if(c == "companyName")
					this.setTagValue('companyName', config[c]);
			}		
			return "file updated successfully";
		}
	},
	
	getTagValue : function(tag) {
        var configFile = new File(pathToConfigFile);
		configFile.open("r");
		var xmlStr = configFile.read();
		var myRootXmlObj = new XML (xmlStr);
		try{
			return myRootXmlObj.child(tag);
		}
		catch(e){
			return "";
		}
    },

	setTagValue : function(tag, value) {
        if(!this.isExists()){
           return false;
		}
		else{
			var configFile = new File(pathToConfigFile);
			configFile.open("r");
			var xmlStr = configFile.read();
			var myRootXmlObj = new XML (xmlStr);
            var newtag = new XML ("<"+tag+">"+value+"</"+tag+">");
            myRootXmlObj.replace(tag, newtag);
            this.writeXMLFile(configFile, myRootXmlObj);
        }		
    },
	
	writeXMLFile : function(file, xml) {
        if (!(xml instanceof XML)) {
			throw "Bad XML parameter";
		}
		file.encoding = "UTF8";
		file.open("w", "TEXT", "????");
		file.write("\uFEFF");
		file.lineFeed = "unix";
        file.writeln (XMLHeader);
		file.write(xml.toXMLString());
		file.close();
	}
};