BandQModule.service('getSwasAreaList', function ($rootScope) {

    this.data;
    var self = this;
    var isRequestSent=false;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_VENUE, function (result) {
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
                  if (isRequestSent)
            return;
        isRequestSent = true;
            webRequestObject.postRequest(self, "GET", constanObject.ListSwasArea,
                    "", constanObject.WebRequestType.ListSwasArea, false);
                }
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
        isRequestSent=false;

        if (status == constanObject.ERROR) {

        } else {
            switch (requestType) {
                case constanObject.WebRequestType.ListSwasArea:
                     dataBaseObj.deleteTableData(TABLE_SWAS_AREA);
                    dataBaseObj.insertData(TABLE_SWAS_AREA, JSON_FIELD_ARRAY, response.SWAS.data, true);
                   
            }
        }

    }

    //this.download();




});
