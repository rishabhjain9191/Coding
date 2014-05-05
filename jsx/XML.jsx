$._extXML={
	isExists : function() {
        var configFile = new File(pathToConfigFile);
        if(configFile.exists)
            return true;
        else
            return false;
    },
	
	readConfig:function(){
		if(!this.isExists()){
			alert("hello");
			return "false";
		}
		var tags=["username","password","keepMeLoggedIn","userid"];
		var obj = new Object();
		var str="{";
		for(var i=0;i<tags.length;i++){
			obj[tags[i]] = this.getTagValue(tags[i]);
			str=str+"\""+tags[i]+"\""+":"+"\"" +(obj[tags[i]])+"\""+",";
		}
		str=str.substring(0,str.length-1)+"}";
		//alert(str);
		//alert(JSON.stringify(obj));
		return str;
	},
	
	writeConfig:function(config){
		if(!this.isExists()){
			var myRootXmlObj = new XML ("<config></config>");
			configFile = new File(pathToConfigFile);
			for (c in config) {
				if(c != "data"){
					/*
					myRootXmlObj.appendChild(new XML ("<serviceAddress>"+config.serviceAddress+"</serviceAddress>"));
					myRootXmlObj.appendChild(new XML ("<siteAddress>"+config.siteAddress+"</siteAddress>"));
					myRootXmlObj.appendChild(new XML ("<updateAddress>"+config.updateAddress+"</updateAddress>"));
					myRootXmlObj.appendChild(new XML ("<timeInterval>"+config.timeInterval+"</timeInterval>"));
					myRootXmlObj.appendChild(new XML ("<checkOnlineTimeInterval>"+config.checkOnlineTimeInterval+"</checkOnlineTimeInterval>"));
					myRootXmlObj.appendChild(new XML ("<imageTimeInterval>"+config.imageTimeInterval+"</imageTimeInterval>"));
					myRootXmlObj.appendChild(new XML ("<batchSize>"+config.batchSize+"</batchSize>"));
					myRootXmlObj.appendChild(new XML ("<thresholdCount>"+config.thresholdCount+"</thresholdCount>"));
					myRootXmlObj.appendChild(new XML ("<batchDataSendAddress>"+config.batchDataSendAddress+"</batchDataSendAddress>"));
					myRootXmlObj.appendChild(new XML ("<checkStatusAddress>"+config.checkStatusAddress+"</checkStatusAddress>"));
					myRootXmlObj.appendChild(new XML ("<fileUploadAddress>"+config.fileUploadAddress+"</fileUploadAddress>"));
					myRootXmlObj.appendChild(new XML ("<imagesFolderAddress>"+config.imagesFolderAddress+"</imagesFolderAddress>"));
					myRootXmlObj.appendChild(new XML ("<logEnabled>"+config.logEnabled+"</logEnabled>"));
					myRootXmlObj.appendChild(new XML ("<username>"+config.username+"</username>"));
					myRootXmlObj.appendChild(new XML ("<password>"+config.password+"</password>"));
					myRootXmlObj.appendChild(new XML ("<keepMeLoggedIn>"+config.keepMeLoggedIn+"</keepMeLoggedIn>"));
					myRootXmlObj.appendChild(new XML ("<configversion>"+config.configversion+"</configversion>"));
					*/
					myRootXmlObj.appendChild(new XML ("<"+c+">"+config[c]+"</"+c+">"));
				}
				this.writeXMLFile(configFile, myRootXmlObj);
			}
			return "file written successfully";
		}
		else{
			//alert(config.username);
			/*this.setTagValue('password', config.password);
				this.setTagValue('keepMeLoggedIn', config.keepMeLoggedIn);
				*/
			for (c in config) {
				if(c == "username")
					this.setTagValue('username', config[c]);
				if(c == "password")
					this.setTagValue('password', config[c]);
				if(c == "keepMeLoggedIn")
					this.setTagValue('keepMeLoggedIn', config[c]);
			}		
			return "file updated successfully";
			
		}
	},
	
	getTagValue : function(tag) {
        
		var configFile = new File(pathToConfigFile);
		configFile.open("r");
		var xmlStr = configFile.read();
		var myRootXmlObj = new XML (xmlStr);
		return myRootXmlObj.child(tag);
         		
    },
	
	setTagValue : function(tag, value) {
        if(!this.isExists){
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
         //$.writeln(file);
          // return xml;
		if (!(xml instanceof XML)) {
			throw "Bad XML parameter";
		}
		file.encoding = "UTF8";
		file.open("w", "TEXT", "????");
		// unicode signature, this is UTF16 but will convert to UTF8 "EF BB BF"
		file.write("\uFEFF");
		file.lineFeed = "unix";
         file.writeln (XMLHeader);
		file.write(xml.toXMLString());
		file.close();
	}
};