$._ext_PHXS_XMP={
	/*
		Gets Current Document's XMP data for project id.
	*/
	getProjectDetails : function(){
		try{
			var activeDocument=app.activeDocument;
			if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
			var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP, "projectID");
			if(val != null)
				return val;
			else
				return "";
		}
		catch(e){
			return "";
		}
	},
	
	removeXMP:function(){
		var activeDocument=app.activeDocument;
		if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
		var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
		xmp.setProperty(XMPConst.NS_XMP, "projectID", "0"); 
		app.activeDocument.xmpMetadata.rawData = xmp.serialize();  
	},
	
	insertXMP:function(value){
		var activeDocument=app.activeDocument;
		if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
		var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
		xmp.setProperty(XMPConst.NS_XMP, "projectID", value); 
		activeDocument.xmpMetadata.rawData = xmp.serialize();  
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
			value = myDocument.fullName.path;
		}
		catch(e){
			value='';
		}
		return value;
	},
	getProjectID:function(){
		try{
			var activeDocument=app.activeDocument;
			if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
			var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP, "projectID");
			if(val != null)
				return val;
			else
				return "";
		}
		catch(e){
			return "";
		}
	},
	getInstanceID:function(){
		var document=app.activeDocument;
		var value='';
		try{
			value=document.name + document.fullName.created.getMonth().toString() + document.fullName.created.getDay().toString() + document.fullName.created.getYear().toString();
			if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
			var xmp = new XMPMeta( document.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP_MM, "InstanceID"); 
			if(val !== undefined)
				value=val.value.substr(8);
        }
		catch(e){
		
		}
		return value;
	},
	getOriginalID:function(){
		var document=app.activeDocument;
		var value="";
		try{
			value=document.name + document.fullName.created.getMonth().toString() + document.fullName.created.getDay().toString() + document.fullName.created.getYear().toString();
		
			if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
			var xmp = new XMPMeta( document.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP_MM, "OriginalDocumentID"); 
			if(val !== undefined)
				value=val.value.substr(8);
        }
		catch(e){
		
		}
		return value;
	},
	getDocumentID:function(){
		var value='';
		var myDocument=app.activeDocument;
		try{
			if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
			var xmp = new XMPMeta( myDocument.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP_MM, "DocumentID"); 
			if(val!==undefined)
				value=val.value.substr(8);
		}
		catch(e){
			
		}
		return value;
	}
};