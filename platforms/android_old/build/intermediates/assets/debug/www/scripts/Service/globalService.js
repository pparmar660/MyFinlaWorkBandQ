BandQModule.service("globalService", function () {
    var SelectedOffender = [];
    var productArray = [];
    var venueId = {"id": "-1"};

    var isOffenderSelected;
    var swasAreaId = 0;
    var swasArea;
    var userId = 0;
    var linkedStaffIdArray = [];
    var categoryId = -1;
    var outcomeId = -1;
    var typeId = -1;
    var date;
    var selectedVehicles = [];
    var policeForceId = 0;
    var globleJson;
    var allProduct = [];
    var SelectedVictim = [];
    var SelectedWitness = [];
    var latLong;
    var securityIncident = null;
    var civilRecovery = [];
    var dynamicQus = [];
    var vehicles = [];
    var comment = null;
    var incidentResponseData = null;
    var isProdcuctOrOffenderReset = true;
    var fileUploadsTempIds = new Array(0);
    var locationType;
    var userProfileTypeAndId = {};
    // fileUploadsTempIds data-------------------------
    this.getFileUploadsTempIds = function () {
        return fileUploadsTempIds;
    };

    this.setFileUploadsTempIds = function (data) {
        fileUploadsTempIds.push(data);// = data;
    };



    //  Location type -------------------- 
    this.getlocationType = function () {
        return locationType;
    };

    this.setlocationType = function (data) {
        locationType = data;
    };


//  isProdcuctOrOffenderReset for civil recovery 


    this.setIsProdcuctOrOffenderReset = function (value) {
        isProdcuctOrOffenderReset = value;
    }
    this.getIsProdcuctOrOffenderReset = function () {
        return isProdcuctOrOffenderReset;
    }





    // swas area data-------------------------
    this.getSwasArea = function () {
        return swasArea;
    };

    this.setSwasArea = function (data) {
        swasArea = data;
    };


    // product-------------------------
    this.getProductDetail = function () {
        return productArray;
    };


    this.setProductDetail = function (data) {
        productArray = angular.copy(data);
        isProdcuctOrOffenderReset = true;

    };

    this.getAllProduct = function () {
        return allProduct;
    };


    this.setAllProduct = function (data) {
        allProduct = angular.copy(data);
        isProdcuctOrOffenderReset = true;

    };


    //vehicle -------------------------------


    this.getVehicle = function () {
        return selectedVehicles;
    };


    this.addVehicle = function (data) {

        for (var i in data) {
            (data[i] == "<b>Not Entered</b>") ? data[i] = "" : data[i] = data[i];
        }
        selectedVehicles.push(data);

    };


    this.removeVehicle = function (data) {
        selectedVehicles.pop(data);

    };



    this.removeVehicleIndex = function (index) {
        selectedVehicles.splice(index, 1);

    };



    this.setCompletVehicleList = function (data) {
//        
//         data.forEach(function (obj) {
//                for (var i in obj) {
//                    (obj[i] == "<b>Not Entered</b>") ? obj[i] = "" : obj[i] = obj[i];
//                }
//            });

        selectedVehicles = data;

    };

    this.setVehicleData = function (data) {

        for (var i in data) {
            (data[i] == "<b>Not Entered</b>") ? data[i] = "" : data[i] = data[i];
        }

        vehicles.push(data);

    };

    this.getVehicleData = function (data) {
        return vehicles;
    };

    // venu id 
    this.getVenueId = function () {
        return venueId;
    };


    this.setVenueId = function (data) {

        venueId = angular.copy(data);

    };

    //swasArea -------------------------------


    this.getSwasAreaId = function () {
        return swasAreaId;
    };


    this.setSwasAreaId = function (data) {
        swasAreaId = data;
    };

    //  Current Location's Lat Long --------------


    this.getCurrentLatLong = function () {
        return latLong;
    };


    this.setCurrentLatLong = function (data) {
        latLong = angular.copy(data);
    };

    //police force id -------------------------------


    this.getPoliceForceId = function () {
        return policeForceId;
    };


    this.setPoliceForceId = function (data) {
        policeForceId = data;

    };


    // offender --------------------------------


    this.getOffender = function () {

        return SelectedOffender;
    };


    this.setOffender = function (data) {
        SelectedOffender = angular.copy(data);//push(data);
        isProdcuctOrOffenderReset = true;
        //  //console.log(SelectedOffender);
    };

    // Victim-------------------------
    this.getVictim = function () {
        return SelectedVictim;
    };


    this.setVictim = function (data) {
        SelectedVictim = angular.copy(data);

    };

    // Witness-------------------------
    this.getWitness = function () {
        return SelectedWitness;
    };


    this.setWitness = function (data) {
        SelectedWitness = angular.copy(data);
        //console.log(SelectedWitness);
    };
    //user --------------------------------------

    this.getUserId = function () {
        return userId;
    };


    this.setUserId = function (data) {
        userId = data;
    };



    // Linked staff -------------------------
    this.getLinkedStaffIds = function () {
        return linkedStaffIdArray;
    };


    this.setLinkedStaffIds = function (data) {
        linkedStaffIdArray = angular.copy(data);
    };


    // category Id ---------------------------

    this.getCategoryId = function () {
        return categoryId;
    };


    this.setCategoryId = function (data) {
        categoryId = data;
    };



    // outcome  Id ---------------------------

    this.getOutcomeId = function () {
        return outcomeId;
    };


    this.setOutcomeId = function (data) {
        outcomeId = data;
    };


    // type  Id ---------------------------

    this.getTypeId = function () {
        return typeId;
    };


    this.setTypeId = function (data) {
        typeId = data;
    };

    //  date --------------


    this.getDate = function () {
        return date;
    };


    this.setDate = function (data) {
        date = data;
    };

    // Security Incident Report ---------------------------

    this.getSecurityIncidentReport = function () {
        return securityIncident;
    };


    this.setSecurityIncidentReport = function (data) {
        securityIncident = data;
    };

    // Civil Recovery---------------------------

    this.getCivilRecovery = function () {
        return civilRecovery;
    };


    this.setCivilRecovery = function (data) {
        civilRecovery = data;
    };

// Additional comment
    this.setAdditionalComment = function (data) {
      //  //console.log(data);
        comment = angular.copy(data);
    };
    this.getAdditionalComment = function () {
        // alert(JSON.stringify(comment));
        return comment;
    };

// Dynamic Question

    this.setDynamicQuestionData = function (data) {
        dynamicQus = angular.copy(data);
    };
    this.getDynamicQuestionData = function () {
        return dynamicQus;
    };

    this.setIncidentResData = function (data) {
        incidentResponseData = data;
      //  //console.log(incidentResponseData);
    };
    this.getIncidentResData = function () {
        return incidentResponseData;
    };
    
    this.setUserProfileTypeAndId = function (data){
        userProfileTypeAndId = angular.copy(data);
       
    };
    this.getUserProfileTypeAndId = function (){
       return userProfileTypeAndId;
        
    };
    this.getCompGlobalData = function () {
        globleJson = {"vehicle": this.getVehicle(),"locationType":this.getlocationType(), "venueID": venueId.id, "swasAreaID": this.getSwasAreaId(), "currentLatLong": this.getCurrentLatLong(), "product": {"allProduct": this.getAllProduct(),
                "totalProductValue": this.getProductDetail()}, "offender": this.getOffender(), "userID": this.getUserId(), "linkedStaff": this.getLinkedStaffIds(),
            "categoryID": this.getCategoryId(), "outcomeID": this.getOutcomeId(), "typeId": this.getTypeId(), "date": this.getDate(), "victim": this.getVictim(), "Witness": this.getWitness(),
            "securityIncident": this.getSecurityIncidentReport(),"fileid":this.getFileUploadsTempIds(), "civilRecovery": this.getCivilRecovery(), "dynamicQues": this.getDynamicQuestionData(), "comment": this.getAdditionalComment()};
     // console.log("global service:" + JSON.stringify(globleJson));
        return globleJson;
    }
    

    this.resetall=function(){
    constanObject.CREATE_INCIDENT_ID = -1;
     SelectedOffender = [];
     productArray = [];
     venueId = {"id": "-1"};
     isOffenderSelected=undefined;
     swasAreaId = 0;
     swasArea=undefined;
     userId = 0;
     linkedStaffIdArray = [];
     categoryId = -1;
     outcomeId = -1;
     typeId = -1;
     date=undefined;
     selectedVehicles = [];
     policeForceId = 0;
     globleJson;
     allProduct = [];
     SelectedVictim = [];
     SelectedWitness = [];
     latLong=undefined;
     securityIncident = null;
     civilRecovery = [];
     dynamicQus = [];
     vehicles = [];
     comment = null;
     incidentResponseData = null;
     isProdcuctOrOffenderReset = true;
     fileUploadsTempIds = new Array(0);
     locationType=undefined;
     userProfileTypeAndId = {};
    }

});

