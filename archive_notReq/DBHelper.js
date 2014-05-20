services.factory('DBHelper',['Constants',
function(Constants){
	var dbhelper={};
	console.log("DBHelper Called");
	var SQL_CREATE_TABLE = "CREATE TABLE IF NOT EXISTS EventLog ( ID INTEGER PRIMARY KEY AUTOINCREMENT, eventID TEXT, userID TEXT, computerID TEXT, projectID TEXT, startTime DATETIME, endTime DATETIME, imageName TEXT, eventRecordedTime DATETIME, jsonEventPackage TEXT , status TEXT, imageStatus TEXT)";
	var SQL_ADD_EVENT = "INSERT INTO EventLog (eventID, userID, computerID, projectID, startTime, endTime, imageName, eventRecordedTime , jsonEventPackage , status, imageStatus) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var SQL_DELETE_EVENT = "DELETE FROM EventLog WHERE status=?";
	var SQL_SELECT_EVENT = "SELECT * FROM EventLog WHERE status=? LIMIT ?";
	var SQL_UPDATE_EVENT_TO_TRANSFERRED = "UPDATE EventLog SET status=? WHERE eventID IN (?)";
	var SQL_SELECT_NEW_EVENT_COUNT = "SELECT Count(*) as cnt FROM EventLog WHERE status=?";

	/**
	 * inti() - for creating EventLog DB Table.
	 */		
	var initDB = function(){
		console.log("initDB called");
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_CREATE_TABLE
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};
	initDB();
	/**
	 * addItemToEventLogTable - insert record in DB Table. 
	 * @param eventLog stores the values that will be inserted into DB table.
	 */		
	dbhelper.addItemToEventLogTable = function(eventLog){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(
			SQL_ADD_EVENT,
			[
				eventLog.eventID,
				eventLog.userID,
				eventLog.computerID,
				eventLog.projectID,
				eventLog.startTime,
				eventLog.endTime,
				eventLog.imageName,
				eventLog.eventRecordedTime,
				eventLog.jsonEventPackage,
				Constants.STATUS_NEW,
				Constants.IMAGE_STATUS_NEW
			]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};

	/**
	 * getEventLogData - fetch eventlog record from DB Table.
	 * @param noOfRows used to set how many records will be fetch from DB table. 
	 */		
	dbhelper.getEventLogData = function(noOfRows){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_SELECT_EVENT,[Constants.STATUS_NEW, noOfRows]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			console.log(result);	// array
		});
	};

	/**
	 * setEventLogStatus -  Update eventlog record in DB Table once files saved
	 * @param eventLogIds used to get event log id's whose status is NOT NEW.
	 */		
	dbhelper.setEventLogStatus = function(eventLogIds){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_UPDATE_EVENT_TO_TRANSFERRED,[Constants.STATUS_TRANSFERRED, eventLogIds]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};

	/**
	 * deleteEventLogData - delete eventlog record in DB Table.
	 */		
	dbhelper.deleteEventLogData = function(){

		/*
		SQL.text="DELETE FROM EventLog WHERE status='" + Constants.STATUS_TRANSFERRED + "' AND date(eventRecordedTime) < date('"+ toSqlDate(eventDeletedDate) + "')";
		*/

		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_DELETE_EVENT,[Constants.STATUS_TRANSFERRED]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result);
		});
	};


	/**
	 * getNewStatusCount - return no. of records whose status is new in EventLog table.
	 * @param eventLogIds used to get event log id's whose status is NOT NEW.
	 */		
	dbhelper.getNewStatusCount = function(){
		var db = WebSQL(Constants.DATABASE_FILE_NAME);
		db.query(SQL_SELECT_NEW_EVENT_COUNT,[Constants.STATUS_NEW]
		).fail(function (tx, err) {
			console.log(err.message);
		}).done(function (result) {
			//console.log(result[0].cnt);
		});
	};

	return dbhelper;
	
}]);
