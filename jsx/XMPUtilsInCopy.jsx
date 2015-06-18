/**
 * $_ext_IDSN_XMP - XMPUtilsInDesign.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 $._ext_AICY_XMP={
	/*
		Gets Current Document's XMP data for project id.
	*/
	getProjectDetails : function(){
		try {
			var myDocument=app.activeDocument;
			if (myDocument) {
				value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]");
				if(value==null)return "";
			} 
		}catch(e) {
			value="";
		}
		return value+'';
	},
	
	removeXMP:function(){
		var myDocument=app.activeDocument;
		myDocument.metadataPreferences.setProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]", "0");
	},
	
	insertXMP:function(value){
		var myDocument=app.activeDocument;
		var value1=myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]");
        if(value1==""){
			var myNewContainer = myDocument.metadataPreferences.createContainerItem("http://ns.adobe.com/xap/1.0/", "projectID");
		}
		myDocument.metadataPreferences.setProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]",value);
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
				'"docID":"'+this.getDocumentID()+'"}';;
	},
	
	
	getFilePath:function(){
		try{
			var myDocument=app.activeDocument;
			value = myDocument.filePath;
		}
		catch(e){
			value='';
		}
		return value;
	},
	
	getProjectID:function(){
		try {
			var myDocument=app.activeDocument;
			if (myDocument) {
				value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]");
				if(value==null)return "";
			} 
		}
		catch(e) {
			value="";
		}
		return value+'';
	},
	
	getInstanceID:function(){
		try{
			var myDocument=app.activeDocument;
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/mm/", "InstanceID");
			value=value.substr(8);//Removing "xmp.iid:"
		}
		catch(e){
			value='';
		}
		return value;
	},
	
	getOriginalID:function(){
		try{
			var myDocument=app.activeDocument;
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/mm/", "OriginalDocumentID");
			value=value.substr(8); //Removing "xmp.did:"
		}
		catch(e){
			value='';
		}
		return value;
	},
	
	getDocumentID:function(){
		try{
			var myDocument=app.activeDocument;
			value = myDocument.metadataPreferences.getProperty("http://ns.adobe.com/xap/1.0/mm/", "DocumentID");
			value=value.substr(8); //Removing "xmp.did:"
		}
		catch(e){
			value='';
		}
		return value;
	}
};