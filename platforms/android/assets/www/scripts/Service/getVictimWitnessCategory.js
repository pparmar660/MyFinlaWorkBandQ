BandQModule.service('getVictimWitnessCategory', function () {

    this.data;
    var self = this;
    var isRequestSend = false;
    this.loadDataFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + VICTIME_WITNESS_CATAGORY, function (result) {
                if (result.length > 0)
                    self.data = JSON.parse(result[0].json_data);
                else
                    self.download();
            });

        } else
            setTimeout(function () {
                self.loadDataFromLocal();
            }, 1000);


    }


    this.download = function () {

        if (isRequestSend)
            return;
        if (webRequestObject && constanObject) {
            webRequestObject.postRequest(this, "GET", constanObject.VICTIME_CATEGORY, null, 101, true);
            isRequestSend = true;
         } else
            setTimeout(function () {
                self.download();
            }, 1000);
    }
    
    
    
    




    this.getData = function () {
        if (!self.data)
            self.loadDataFromLocal();

        return self.data;
    }

//
    this.webRequestResponse = function (requestType, status, response) {
         isRequestSend = false;
        if (status == constanObject.ERROR) {
            return callback(false, JSON.parse(response.responseText).error);
        } else {
            switch (requestType) {
                case 101:
                    dataBaseObj.deleteTableData(VICTIME_WITNESS_CATAGORY);
                    dataBaseObj.insertData(VICTIME_WITNESS_CATAGORY, JSON_FIELD_ARRAY, response.data, true);
                    isRequestSend = false;

            }
        }

    }




});
