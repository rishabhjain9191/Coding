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
		myDocument.metadataPreferences.setProperty("http://ns.adobe.com/xap/1.0/", "projectID/*[1]",value);
	}
};