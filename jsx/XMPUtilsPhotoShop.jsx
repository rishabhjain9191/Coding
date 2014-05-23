/**
 * $_ext_PHXS_XMP - XMPUtilsPhotoShop.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
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
		try{
			document = app.activeDocument.name;
		}
		catch(e){
			document = "";
		}
		return '{"projectID":"'+this.getProjectID()+'",'+
				'"instanceID":"'+this.getInstanceID()+'",'+
				'"originalID":"'+this.getOriginalID()+'",'+
				'"docName":"'+document+'",'+
				'"docPath":"'+this.getFilePath()+'",'+
				'"docID":"'+this.getDocumentID()+'"}';
	},
	
	
	getFilePath:function(){
		try{
			var myDocument=app.activeDocument;
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
		var value='';
		try{
			var document=app.activeDocument;
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
		var value="";
		try{
			var document=app.activeDocument;
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
		try{
			var myDocument=app.activeDocument;
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