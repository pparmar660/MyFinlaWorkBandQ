BandQModule.service("globalService", function (dynamicQuestion,$rootScope) {


    // for edit and optimization -------------------------
    var noOfPageMove;
    var doYouHaveFiles;
    
  

    var outcomeObj;
    var typeObj;
    var selectedloctionData = {};
    var reportedBy;
    var self=this;
    var sectorId=0;
    var stockLoad=0;
    var productDefaultValue='';
    
    
      this.getStockLoad = function () {
        return stockLoad;
    }
    this.setStockLoad = function (data) {
        stockLoad = data;
    }
    
    
      this.getProductDefaultValue = function () {
        return productDefaultValue;
    }
    this.setProductDefaultValue = function (data) {
        productDefaultValue = data;
    }
    
    
    
    
    
    this.getOutcomeObj = function () {
        return outcomeObj;
    }
    this.setOutcomeObj = function (data) {
        outcomeObj = data;
    }
    
    
    this.getSectorId = function () {
        return sectorId;
    }
    this.setSectorId = function (data) {
        sectorId = data;
    }

    this.getTypeObj = function () {
        return typeObj;
    }
    this.setTypeObj = function (data) {
        typeObj = data;
    }

    this.setNoOfPageMove = function (page) {
        noOfPageMove = page;
    }
    this.getNoOfPageMove = function () {
        return noOfPageMove;
    }

    this.setDoYouHaveFiles = function (data) {
        doYouHaveFiles = data;
    }
    this.getDoYouHaveFiles = function () {
        return doYouHaveFiles;
    }

    this.setLocationVenueData = function (data) {
        selectedloctionData = data;
    }

    this.getLocationVenueData = function () {
        return selectedloctionData;
    }
    this.setUserName = function (data) {
        reportedBy = data;
    }
    this.getUserName = function () {
        return reportedBy;
    }



    //-----------------for create incident-------------------------------------------------------------------------------
    var SelectedOffender;
    var productArray = [];
    var venueId = {"id": "-1"};

    var isOffenderSelected;
    var swasAreaId = 0;
    var swasArea;
    var userId = 0;
    var linkedStaffIdArray;
    var categoryId = -1;
    var outcomeId = -1;
    var typeId = -1;
    var date;
 
    var selectedVehicles = [];
    var policeForceId = 0;
    var globleJson;
    var allProduct = [];
    var SelectedVictim;
    var SelectedWitness;
    var isvehicleInvolved;
    var latLong;
    var securityIncident = {};
    var civilRecovery = {};
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
        angular.forEach(selectedVehicles, function (obj, i) {
            if (obj.id_vtk == data.id_vtk) {
                selectedVehicles.splice(i, 1);
            }
        });
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
    this.setInvolvedVehicleDetails = function (data) {
        isvehicleInvolved = angular.copy(data);
    }

    this.getInvolvedVehicleDetails = function () {
        return isvehicleInvolved;
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
        // console.log(JSON.stringify(SelectedVictim));
    };

    // Witness-------------------------
    this.getWitness = function () {
        return SelectedWitness;
    };


    this.setWitness = function (data) {
        SelectedWitness = angular.copy(data);
        //console.log("SELECTEDWITNESS"+JSON.stringify(SelectedWitness));
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


    this.setLinkedStaffIds = function (data, callBack) {
        linkedStaffIdArray = angular.copy(data);
        return callBack();
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

    this.setUserProfileTypeAndId = function (data) {
        userProfileTypeAndId = angular.copy(data);

    };
    this.getUserProfileTypeAndId = function () {
        return userProfileTypeAndId;

    };
    this.getCompGlobalData = function () {
        // set dynamic question 
        self.setDynamicQuestionData(dynamicQuestion.getAndUpdaeAnswer());
              
        //,
        globleJson = {"vehicle": this.getVehicle(),"locationType": this.getlocationType(), "venueID": venueId.id, "swasAreaID": this.getSwasAreaId(), "currentLatLong": this.getCurrentLatLong(), "product": {"allProduct": this.getAllProduct(),
                "totalProductValue": this.getProductDetail()}, "offender": this.getOffender(), "userID": this.getUserId(), "linkedStaff": this.getLinkedStaffIds(),
            "categoryID": this.getCategoryId(), "outcomeID": this.getOutcomeId(), "typeId": this.getTypeId(), "date": this.getDate(), "victim": this.getVictim(), "Witness": this.getWitness(),
            "securityIncident": this.getSecurityIncidentReport(), "fileid": this.getFileUploadsTempIds(), "civilRecovery": this.getCivilRecovery(), "dynamicQues": this.getDynamicQuestionData(), "comment": this.getAdditionalComment()};
//console.log("globalJson"+JSON.stringify(globleJson));

        return globleJson;
    }

    this.resetall = function () {
        $rootScope.showSavePopup = false;
        $rootScope.hideSavedPopup = true;
        constanObject.CREATE_INCIDENT_ID = -1;
        SelectedOffender = undefined;
        outcomeObj = undefined;
        typeObj = undefined;
        reportedBy = undefined;
        productArray = [];
        venueId = {"id": "-1"};
        isOffenderSelected = undefined;
        swasAreaId = 0;
        swasArea = undefined;
        userId = 0;
        linkedStaffIdArray = undefined;
        categoryId = -1;
        outcomeId = -1;
        typeId = -1;
        sectorId=-1;
        date = undefined;
        selectedVehicles = [];
        policeForceId = 0;
        globleJson = undefined;
        allProduct = [];
        SelectedVictim = undefined;
        SelectedWitness = undefined;
        isvehicleInvolved = undefined;
        latLong = undefined;
        securityIncident = null;
        civilRecovery = {};
        dynamicQus = [];
        vehicles = [];
        comment = null;
        incidentResponseData = null;
        isProdcuctOrOffenderReset = true;
        fileUploadsTempIds = new Array(0);
        locationType = undefined;
        userProfileTypeAndId = {};
        doYouHaveFiles = [];
        noOfPageMove = undefined;
        selectedloctionData = {};
        var empty = [];
        
        stockLoad=0;
        productDefaultValue='';
        dynamicQuestion._setAndUpdaeAnswer(empty);
        $rootScope.hideNextBack=false;

        // console.log("global service:" + JSON.stringify(globleJson));
        return globleJson;
    }

});

