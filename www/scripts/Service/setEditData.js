BandQModule.service('setEditData', function ($http, globalService, dynamicQuestion) {

    var self = this;
    this.downloadData = function (id) {
        var url = constanObject.GET_EDIT_DETAIL + id;
        webRequestObject.postRequest(self, "GET", url, null, 201, false);
    }


    this.webRequestResponse = function (requestType, status, response) {
        if (status == constanObject.ERROR) {
        } else {
            self.setData(response);
        }
    }

    this.setData = function (data) {
        //   $http.get('Json_Data/incidentEdit.json').success(function (data) {
        console.log("data" + JSON.stringify(data));
        data = data.data;
        globalService.resetall();
        globalService.setLinkedStaffIds(data.linkedStaff, function () {
        });
        globalService.setDate(data.date);
        globalService.setCategoryId(data.categoryID);
        globalService.setOutcomeObj(data.outcomeID);
        globalService.setTypeObj(data.typeId);
        globalService.setAllProduct(data.product.allProduct);
        globalService.setProductDetail(data.product.totalProductValue);
        globalService.setOffender(data.offender);
        globalService.setInvolvedVehicleDetails(data.vehicle);
        for (var i = 0; i < data.vehicle.vehicleList.length; i++) {
            globalService.addVehicle(data.vehicle.vehicleList[i]);
        }
        dynamicQuestion._setAndUpdaeAnswer(data.dynamicQues);
        globalService.setAdditionalComment(data.comment);
        globalService.setSecurityIncidentReport(data.securityIncident);
        globalService.setCivilRecovery(data.civilRecovery);
        globalService.setUserName(data.reported_by);
        globalService.setUserId(data.userID);
        if (data.attachment.length > 0)
            globalService.setDoYouHaveFiles(data.attachment);
        // set location data

        var LocationData = {};
        if (data.locations.locationType == 1)
            LocationData.locationType = 0;
        else
            LocationData.locationType = data.locations.locationType;

        LocationData.swasArea = data.locations.swasArea.toString();
        LocationData.venueData=data.locations.venueId.toString();
         globalService.setLocationVenueData(LocationData);
        globalService.setWitness(data.witness);
        globalService.setVictim(data.victim);
        window.location.href = "dashboard.html#createIncident";
        setTimeout(function () {
            document.getElementById("pageReadyLoder").style.visibility = "hidden";
        }, 1000);

        var dateTime = data.date;
        var dateTimeNew = dateTime.replace(':', ' ');
        dateTimeNew = dateTimeNew.replace(':', ' ');
        globalService.setDate(dateTimeNew);
        constanObject.CREATE_INCIDENT_ID = data.incidentId;

    }
});