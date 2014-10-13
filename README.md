TimeTrackerCSExtension-HTML5
============================
Some folder and files present here are not required to run the extension, so they have been moved to archive_notReq folder.
To run the extension :

# Running the extension while developing
* Create a folder named com.creativeworx.tthtml in one of the following folders

### For CC, CC 2014, and beyond
These folders are where CC and CC 2014+ load extensions from.
#### Mac
##### Per user (is the default when a user manually installs an extension,Suggested)
    /Users/`username`/Library/Application\ Support/Adobe/CEPServiceManager4/extensions
##### For all users
    /Library/Application\ Support/Adobe/CEPServiceManager4/extensions
#### Windows
    C:\\Users\\`username`\\AppData\\Roaming\\Adobe\\CEPServiceManager4\\extensions

### For CC
These folders are where CS5, CS6 and CC load extensions from. This extension will only show up in CC though because only CC supports HTML extensions
#### Mac
##### Per user (is the default when a user manually installs an extension,Suggested)
    /Users/`username`/Library/Application\ Support/Adobe/CEP/extensions
##### For all users
    /Library/Application\ Support/Adobe/CEP/extensions
#### Windows
    C:\\Users\\`username`\\AppData\\Roaming\\Adobe\\CEP\\extensions

* Pull from the repo into this new folder.
* Run it in Adobe CC Application under Windows Menu->Extensions->Time_Tracker_HTML5
