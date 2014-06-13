// constants


if(Folder.fs=="Windows"){
 docOpenSelect = Folder("~/Desktop").parent.fsName + "\\AppData\\Roaming\\CreativeWorx\\docOpenSelect.jsx";
  
}else if(Folder.fs=="Macintosh"){
 pathToConfigFile = "~/Library/Application Support/CreativeWorx/CreativeWorxConfig.xml";
 pathToDebugFile = "~/Library/Application Support/CreativeWorx/CreativeWorx.log";
}


if(app.name=="Adobe Photoshop"){
	var myScript = new File(docOpenSelect); 
	
	app.notifiersEnabled = true;
	//app.notifiers.add ("Cls ", myScript);

	app.notifiers.add ("slct", myScript);
	app.notifiers.add ("Mk  ", myScript, "Dcmn");
	
	
	
	
	
}