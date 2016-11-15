BandQModule.service('getListIncidentReportFieldLabels', function () {

    this.data;
    var self = this;
    var isRequestSent=false;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_ListIncidentReportFieldLabels, function (result) {
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


        if (webRequestObject && constanObject){
            webRequestObject.postRequest(self, "GET", constanObject.ListIncidentReportFieldLabels, null, constanObject.WebRequestType.FilterData, false);
         if (isRequestSent)
                    return;
                isRequestSent = true;   
        }   else
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
        isRequestSent=false;

        if (status == constanObject.ERROR) {

        } else {
            switch (requestType) {
                case constanObject.WebRequestType.FilterData:
                    dataBaseObj.deleteTableData(TABLE_ListIncidentReportFieldLabels);
                    dataBaseObj.insertData(TABLE_ListIncidentReportFieldLabels, JSON_FIELD_ARRAY, response, true);

            }
        }

    }

    //this.download();




});
