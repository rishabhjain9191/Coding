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
		var tags=["username","password","keepMeLoggedIn","userid","firstname","timeInterval_html5","serviceAddress","checkOnlineTimeInterval_html5","imageTimeInterval_html5","batchSize_html5","thresholdCount_html5","siteAddress", "updateAddress", "checkStatusAddress", "batchDataSendAddress", "fileUploadAddress", "imagesFolderAddress", "logEnabled_html5", "configversion", "companyEmail", "companyEmailValue" , "companyName", "homePage", "oid"];
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
		//alert(config);
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
				else if(c == "password")
					this.setTagValue('password', config[c]);
				else if(c == "keepMeLoggedIn")
					this.setTagValue('keepMeLoggedIn', config[c]);
				else if(c == "firstname")
					this.setTagValue('firstname', config[c]);
				else if(c == "userid")
					this.setTagValue('userid', config[c]);
				else if(c == "companyEmail")
					this.setTagValue('companyEmail', config[c]);
				
				else if(c == "oid")
					this.setTagValue('oid', config[c]);
				
					
				else if(c == "companyName")
					this.setTagValue('companyName', config[c]);
				
				else if(c == "companyEmailValue")
					this.setTagValue('companyEmailValue', config[c]);
				
				else if(c == "timeInterval_html5")
					this.setTagValue('timeInterval_html5', config[c]);
				else if(c == "checkOnlineTimeInterval_html5")
					this.setTagValue('checkOnlineTimeInterval_html5', config[c]);
				else if(c == "imageTimeInterval_html5")
					this.setTagValue('imageTimeInterval_html5', config[c]);
				else if(c == "batchSize_html5")
					this.setTagValue('batchSize_html5', config[c]);
				else if(c == "thresholdCount_html5")
					this.setTagValue('thresholdCount_html5', config[c]);
				else if(c == "logEnabled_html5")
					this.setTagValue('logEnabled_html5', config[c]);
				else if(c == "configversion")
					this.setTagValue('configversion', config[c]);
				else if(c == "homePage")
					this.setTagValue('homePage', config[c]);
				

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
	},

	deleteConfigFile:function(){
		if(this.isExists()){
			var configFile = new File(pathToConfigFile);
			var result=configFile.remove();
			return result.toString();
		}
		else{
			return "true";
		}

	},
	deleteUserFile:function(){
		if(this.isExistsUserFile()){
			var userInformationFile = new File(pathToUserInformationFile);
			var result=userInformationFile.remove();
			return result.toString();
		}
		else{
			return "true";
		}
	},
	isExistsUserFile : function() {
		var userInformationFile = new File(pathToUserInformationFile);
		var userInformationFolder=userInformationFile.parent;
		if(!userInformationFolder.exists){
			userInformationFolder.create();
		}
        if(userInformationFile.exists)
            return true;
        else
            return false;
    },
	readUserInformation:function(){
		if(!this.isExistsUserFile())
			return false;
		else{
			var userInformationFile=new File(pathToUserInformationFile);
			userInformationFile.open('r');
			var content=userInformationFile.read();
			userInformationFile.close();
			return content;
		}
	},
	writeUserInformation:function(data){
		this.isExistsUserFile();
		var file=new File(pathToUserInformationFile);
		file.encoding = "UTF8";
		file.open("w", "TEXT", "????");
		file.write("\uFEFF");
		file.lineFeed = "unix";
        file.writeln (data);
		//file.write(xml.toXMLString());
		file.close();
	},
};