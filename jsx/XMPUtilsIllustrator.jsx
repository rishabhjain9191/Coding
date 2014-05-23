/**
 * $_ext_ILST_XMP - XMPUtilsIllustrator.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 
 $._ext_ILST_XMP={
	
	/*
		Gets Current Document's XMP data for project id.
	*/
	getProjectDetails : function(){
		var value;
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		try {
			var myDocument=app.activeDocument;
			if (myDocument) {
				var xmp=new XMPMeta(myDocument.XMPString);
				value=xmp.getProperty(XMPConst.NS_XMP, "ProjectID");
			} 
		}
		catch(e) {
			
		}
		if(value===undefined||value.value==" "){
			value="";
		}
		return value+'';
	},
	
	getProjectID : function(){
		var value;
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		try{
			var myDocument=app.activeDocument;
			if (myDocument) {
				var xmp=new XMPMeta(myDocument.XMPString);
				value=xmp.getProperty(XMPConst.NS_XMP, "ProjectID");
			}
		}
		catch(e){
			
		}
		if(value== undefined||value.value==" "){
			value="";
		}
		return value+'';
	},
	
	removeXMP:function(){
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		var myDocument=app.activeDocument;
		var xmp=new XMPMeta(myDocument.XMPString);
        xmp.setProperty(XMPConst.NS_XMP, "ProjectID", " ");
        xmpStr = xmp.serialize(); 
        myDocument.XMPString=xmpStr;
	},
	
	insertXMP:function(value){
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		var myDocument=app.activeDocument;
		var xmp=new XMPMeta(myDocument.XMPString);
        xmp.setProperty(XMPConst.NS_XMP, "ProjectID", value);
        xmpStr = xmp.serialize(); 
        myDocument.XMPString=xmpStr;
	},
	
	getDetails:function(){
		try{
			document = app.activeDocument.fullName.name;
		}
		catch(e){
			document = "";
		}
		
		return 	'{"projectID":"'+this.getProjectDetails()+'",'+
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
	
	getInstanceID:function(){
		var value;		
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		try{
			var myDocument=app.activeDocument;
			if (myDocument) {
				var xmp=new XMPMeta(myDocument.XMPString);
				value=xmp.getProperty(XMPConst.NS_XMP_MM, "InstanceID");
				value=value.value.substr(5);
			}	
		}
		catch(e){
		}
		if(value===undefined||value.value==" "){
			value="";
		}
		return value+'';
	},
	
	getOriginalID:function(){
		var value;
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		try {
			var myDocument=app.activeDocument;
			if (myDocument) {
				var xmp=new XMPMeta(myDocument.XMPString);
				value=xmp.getProperty(XMPConst.NS_XMP_MM, "OriginalDocumentID");
				value=value.value.substr(5);
			}
		}
		catch(e){
		
		}
		if(value===undefined||value.value==" "){
			value="";
		}
		return value+'';
	},
	
	getDocumentID:function(){
		var value;
		if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
		}
		try{
			var myDocument=app.activeDocument;
			if (myDocument) {
				var xmp=new XMPMeta(myDocument.XMPString);
				value=xmp.getProperty(XMPConst.NS_XMP_MM, "DocumentID");
				value=value.value.substr(5);
			}	
		}
		catch(e){
		
		}
		if(value===undefined||value.value==" "){
			value="";
		}
		return value+'';
	}
};