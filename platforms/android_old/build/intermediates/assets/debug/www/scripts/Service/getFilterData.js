BandQModule.service("filterData", function () {

    var self = this;
    var isRequestSent = false;
    this.getFilterData = function () {
        dataBaseObj.countNoOfRow(TABLE_FILTER_PRESELECTION, function (noOfRow) {
            if (noOfRow <= 0 || checkNetworkConnection()) {
                if (isRequestSent)
                    return;
                isRequestSent = true;
                webRequestObject.postRequestSync(self, "GET", constanObject.FILTER_DATA + "?latitude=" + CURRENT_LATITUDE + "&longitude=" + CURRENT_LONGITUDE,
                        "", constanObject.WebRequestType.FilterData, true);
            }
        });

    };
    function insertCountryReginonZoneCityStae(response) {

        if (response != null) {
            dataBaseObj.deleteTableData(TABLE_FILTER_PRESELECTION);
            dataBaseObj.insertData(TABLE_FILTER_PRESELECTION, JSON_FIELD_ARRAY, response, true);
        }
    }


    this.webRequestResponse = function (requestType, status, responseData) {
        isRequestSent = false;
        if (status == constanObject.ERROR) {
            // alert(JSON.stringify(responseData.responseText));
            return;
        }
        switch (requestType) {
            case constanObject.WebRequestType.FilterData:
                //console.log("FILTER DATA : "+JSON.stringify(responseData));
                insertCountryReginonZoneCityStae(responseData);
                break;
        }
    };

});
