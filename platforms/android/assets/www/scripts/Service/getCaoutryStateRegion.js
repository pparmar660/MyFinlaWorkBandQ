BandQModule.service('getCountryStateRegion', function () {

    this.data;
    var self = this;
    var isRequestSent = false;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
                if (result.length > 0)
                    self.data = JSON.parse(result[0].json_data);
                else
                    self.download();
            });

        } else
            setTimeout(function () {
                self.loadFromLocal();
            }, 1000);


    }


    this.download = function () {

        if (isRequestSent)
            return;
        isRequestSent = true;
        if (webRequestObject && constanObject)
            webRequestObject.postRequest(self, "GET", constanObject.FILTER_DATA, null, constanObject.WebRequestType.FilterData, false);
        else
            setTimeout(function () {
                self.download();
            }, 1000);
    }



    this.getData = function () {
        if (!self.data)
            self.loadFromLocal();

        return self.data;
    }

//
    this.webRequestResponse = function (requestType, status, response) {
        isRequestSent = false;
        if (status == constanObject.ERROR) {

        } else {
            switch (requestType) {
                case constanObject.WebRequestType.FilterData:
                    dataBaseObj.deleteTableData(TABLE_COUNTRY_STATE_REGION_CITY);
                    dataBaseObj.insertData(TABLE_COUNTRY_STATE_REGION_CITY, JSON_FIELD_ARRAY, response, true);

            }
        }

    }

    //this.download();




});
