//Connnect to Backup and Replication Server
var PostResponse = BRHost.createRequest("POST", "/api/sessionMngr/", null).execute();
//System.log("Connection Successful:  " + PostResponse.contentAsString)
var sessionHeader = PostResponse.getHeaderValues("X-RestSvcSessionId")
//System.log("X-RestSvcSessionId:" + sessionHeader);
//GET list of Backups
var backupListXML = BRHost.createRequest("GET", "api/jobs?type=job", null);
//System.log("Backup Jobs " + backupListXML.contentAsString);
backupListXML.setHeader("x-restsvcsessionid",sessionHeader[0]); 

var backupListXML = backupListXML.execute();
statusCode = backupListXML.statusCode;

if ( statusCode != 200 ) {
    throw "HTTPError: status code: " + statusCode;
} 
//System.log(backupListXML);
backupListXML = backupListXML.contentAsString
//System.log(backupListXML);

var document = XMLManager.fromString(backupListXML);
if (!document) {
	errorCode = "Invalid XML Document";
	throw "Invalid XML Document";
	}

//Get References
var referenceElementList = document.getElementsByTagName("Ref");
var numOfReferences = referenceElementList.length

//System.log("number of References : " + numOfReferences);
if (numOfReferences == 0) {
	errorCode = "Invalid XML Document - name element missing";
	throw "Invalid XML Document";
	}
	
    var listbkpjobs=[];
//Get Attributes of References	
for (var i = 0; i < numOfReferences; i++) {
	var ref = referenceElementList.item(i);
	//Get attributes of each of the references
	//Create Array
	var refAttributes = ref.attributes;
	
	//Add attributes to the Array and Log each Job
	var Name = ref.getAttribute("Name");
    listbkpjobs.push(Name);
	//System.log(Name);
	//var UID = ref.getAttribute("UID");
	//System.log("UID is : " + UID);
	//System.log(listbkpjobs);
	//if (Name == jobName) {
	//	//Format UID to be usable
	//	UID = UID.replace("urn:veeam:Job:", "");
	//	desiredJobUID = UID;
	//	}
	}
System.log(Name);
//System.log("DesiredJobUID is : " + desiredJobUID);
return (Name);
