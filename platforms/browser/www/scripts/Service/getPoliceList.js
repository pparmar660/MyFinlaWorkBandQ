BandQModule.service('getPoliceList', function ($rootScope) {

    this.data;
    var self = this;
    var isRequestSent = false;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + POLICE_AND_AUTHORITY, function (result) {
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


        if (webRequestObject && constanObject) {
            if (isRequestSent)
                return;
            isRequestSent = true;

            webRequestObject.postRequest(self, "GET", constanObject.POLICE_LIST, null,
                    constanObject.WebRequestType.PoliceList, false);

        } else
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
                case constanObject.WebRequestType.PoliceList:
                    var data = JSON.stringify(response.data);
                    data = data.replace(/[']/g, '');
                    var value = [data, ""];
                    dataBaseObj.deleteTableData(POLICE_AND_AUTHORITY);
                    dataBaseObj.insertData(POLICE_AND_AUTHORITY, JSON_DATA_KEY, value);
                    break;
            }
        }

    }

    //this.download();




});
