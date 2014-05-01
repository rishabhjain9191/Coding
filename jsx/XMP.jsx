$._extXMP={
	/*
		Gets Current Document's XMP data for project id.
	*/
	getProjectDetails : function(){
		var myDocument=app.activeDocument;
		if (myDocument) {
		try {
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]");
			
		} catch(e) {
			console.log("in catch of getXMPDataId error: ", e);
		}
	}
	return value+'';
	},
	
	removeXMP:function(){
		//alert("Removing XMP");
		var myDocument=app.activeDocument;
		myDocument.metadataPreferences.setProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]", "");
	},
	
	insertXMP:function(value){
		var myDocument=app.activeDocument;
		var value1=myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]");
        //alert("value="+value1);
        if(value1==""){
                    var myNewContainer = myDocument.metadataPreferences.createContainerItem("http://ns.adobe.com/xap/1.0/", "projectID");
            }
		myDocument.metadataPreferences.setProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]",value);
	},
	
	getDetails:function(){
		return 	'{"projectID":"'+this.getProjectID()+'",'+
				'"instanceID":"'+this.getInstanceID()+'",'+
				'"originalID":"'+this.getOriginalID()+'",'+
				'"docName":"'+app.activeDocument.name+'",'+
				'"docPath":"'+this.getFilePath()+'",'+
				'"docID":"'+this.getDocumentID()+'"}';
	},
	
	
	getFilePath:function(){
		var myDocument=app.activeDocument;
		try{
			value = myDocument.filePath;
		}
		catch(e){
			value='';
		}
		return value;
	},
	getProjectID:function(){
		var myDocument=app.activeDocument;
		try{
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]");
		}
		catch(e){
			value='';
		}
		return value;
	},
	getInstanceID:function(){
		var myDocument=app.activeDocument;
		try{
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/mm/", "InstanceID");
			value=value.substr(8);//Removing "xmp.iid:"
		}
		catch(e){
			value='';
		}
		return value;
	},
	getOriginalID:function(){
		var myDocument=app.activeDocument;
		try{
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/mm/", "OriginalDocumentID");
			value=value.substr(8); //Removing "xmp.did:"
		}
		catch(e){
			value='';
		}
		return value;
	},
	getDocumentID:function(){
		var myDocument=app.activeDocument;
		try{
			value = myDocument.index;
			
		}
		catch(e){
			value='';
		}
		return value;
	}
};