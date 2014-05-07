$._ext_PHXS_XMP={
	/*
		Gets Current Document's XMP data for project id.
	*/
	getProjectDetails : function(){
		var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
		var myNamespace = "http://ns.adobe.com/xap/1.0/";  
		var val = xmp.getProperty(myNamespace, "projectID");
		if(val != null)
			return val;
		else
			return "";
	},
	
	removeXMP:function(){
		//alert("Removing XMP");
		var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
		var myNamespace = "http://ns.adobe.com/xap/1.0/";  
		var myPrefix = "xmp:";  
		XMPMeta.registerNamespace(myNamespace, myPrefix);  
		xmp.setProperty(myNamespace, "projectID", "0"); 
		app.activeDocument.xmpMetadata.rawData = xmp.serialize();  
	},
	
	insertXMP:function(value){
		var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
		var myNamespace = "http://ns.adobe.com/xap/1.0/";  
		var myPrefix = "xmp:";  
		XMPMeta.registerNamespace(myNamespace, myPrefix);  
		xmp.setProperty(myNamespace, "projectID", value); 
		app.activeDocument.xmpMetadata.rawData = xmp.serialize();  
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
		var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
		var myNamespace = "http://ns.adobe.com/xap/1.0/";  
		var value = xmp.getProperty(myNamespace, "projectID");
		return value;
	},
	getInstanceID:function(){
		var document = app.activeDocument;
		var value = document.name + document.fullName.created.getMonth().toString() + document.fullName.created.getDay().toString() + document.fullName.created.getYear().toString();
		return value;
	},
	getOriginalID:function(){
		var document = app.activeDocument;
		var value = document.name + document.fullName.created.getMonth().toString() + document.fullName.created.getDay().toString() + document.fullName.created.getYear().toString();
		return value;
	},
	getDocumentID:function(){
		var myDocument=app.activeDocument;
		try{
			value = myDocument.id;
			
		}
		catch(e){
			value='';
		}
		return value;
	}
};