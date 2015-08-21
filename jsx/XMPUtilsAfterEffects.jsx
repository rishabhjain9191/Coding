/**
 * $_ext_AEFT_XMP - XMPUtilsPhotoShop.jsx
 *
 * @category   CreativeWorx
 * @package    Extension
 * @copyright  Copyright (c) 2014 CreativeWorx Corp. (http://www.creativeworx.com)
 * @license    All rights reserved.
 */
 if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
 
 $._ext_AEFT_XMP={
	/*
		Gets Current project's XMP data for project id.
	*/
	getProjectDetails : function(){
		
			var project = app.project;
			// load the XMP library as an ExtendScript ExternalObject
			if (ExternalObject.AdobeXMPScript == undefined) {
			ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
			}
			var mdata = new XMPMeta(app.project.xmpPacket); // get the project’s XMP metadata
			// update the Label project metadata’s value
			var schemaNS = XMPMeta.getNamespaceURI("xmp");
			var propName = "xmp:Label";
			try {
			mdata.setProperty(schemaNS, propName, "project");
			}
			catch(e) {
			alert(e);
			}
			app.project.xmpPacket = mdata.serialize();
	},
	
	removeXMP:function(){
		var proj = app.project;
		var mdata = new XMPMeta(app.project.xmpPacket); // get the project’s XMP metadata
		
		
		var schemaNS = XMPMeta.getNamespaceURI("xmp");
			var propName = "xmp:Label";
			try {
			mdata.setProperty(schemaNS, propName, "0");
			}
			catch(e) {
			alert(e);
			}
			app.project.xmpPacket = mdata.serialize();
	},
	
	insertXMP:function(value){
		var proj = app.project;
		var mdata = new XMPMeta(app.project.xmpPacket); // get the project’s XMP metadata
		
		
		var schemaNS = XMPMeta.getNamespaceURI("xmp");
			var propName = "xmp:Label";
			try {
			mdata.setProperty(schemaNS, propName, "value");
			}
			catch(e) {
			alert(e);
			}
			app.project.xmpPacket = mdata.serialize();
	},
	
	getDetails:function(){
		try{
			var project = app.activeProject;
		}
		catch(e){
			project = "";
		}
		return '{"projectID":"'+this.getProjectID()+'",'+
				'"instanceID":"'+this.getInstanceID()+'",'+
				'"originalID":"'+this.getOriginalID()+'",'+
				'"proName":"'+project+'",'+
				'"proPath":"'+this.getFilePath()+'",'+
				'"proID":"'+this.getprojectID()+'"}';
	},
	
	
	getFilePath:function(){
		try{
			var Project=app.activeProject;
			value = Project.fullName.path;
		}
		catch(e){
			value='';
		}
		return value;
	},
	getProjectID:function(){
		
		var proj = app.project;
		var mdata = new XMPMeta(app.project.xmpPacket); // get the project’s XMP metadata
		
		
		var schemaNS = XMPMeta.getNamespaceURI("xmp");
			var propName = "xmp:Label";
			try {
			mdata.setProperty(schemaNS, propName, "projectID");
			}
			catch(e) {
			alert(e);
		}
			app.project.xmpPacket = mdata.serialize();
		
	},
	getInstanceID:function(){
		var value='';
		try{
			var project=app.activeProject;
			value=project.name + project.fullName.created.getMonth().toString() + project.fullName.created.getDay().toString() + project.fullName.created.getYear().toString();
			
			var schemaNS = XMPMeta.getNamespaceURI("xmp");
			var propName = "xmp:Label";
			try {
			value=mdata.setProperty(schemaNS, propName, "projectID");
			}
			catch(e) {
			alert(e);
			}
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
			var project=app.activeProject;
			value=project.name + project.fullName.created.getMonth().toString() + project.fullName.created.getDay().toString() + project.fullName.created.getYear().toString();
		
			
			var xmp = new XMPMeta( project.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP_MM, "OriginalprojectID"); 
			if(val !== undefined)
				value=val.value.substr(8);
        }
		catch(e){
		
		}
		return value;
	},
	getprojectID:function(){
		var value='';
		try{
			var project=app.activeProject;
			
			var xmp = new XMPMeta( project.xmpMetadata.rawData);  
			var val = xmp.getProperty(XMPConst.NS_XMP_MM, "projectID"); 
			if(val!==undefined)
				value=val.value.substr(8);
		}
		catch(e){
			
		}
		return value;
	},
	setTrackerFilePath:function(path){
		trackingFile=[path+fileName];
	}

	
	
};

 $._ext_AEFT_Utils={
	
	getHistoryStates:function(){
		try{
			var hs=app.activeProject.historyStates;
			var str='{"'+hs[0].name+'":[';
			for(var i=1;i<hs.length-1;i++){
				str=str+'"'+hs[i].name+'"'+',';
			}
			str=str+'"'+hs[i].name+'"'+']}';
			return str;
		}
		catch(e){
			return "";
		}
	}
		
 };