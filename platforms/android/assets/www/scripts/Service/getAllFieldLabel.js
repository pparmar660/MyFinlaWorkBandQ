BandQModule.service('getAllFieldLabel', function () {

    this.data;
    var self = this;
    var isRequestSend = false;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_GetAllFieldLabels, function (result) {
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

        if (isRequestSend)
            return;
        if (webRequestObject && constanObject) {
            webRequestObject.postRequest(self, "GET", constanObject.GetAllFieldLabels, {}, constanObject.WebRequestType.LinkedStaffMember, false);
            isRequestSend = true;


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

        isRequestSend = false;
        if (status == constanObject.ERROR) {

        } else {
            switch (requestType) {
                case constanObject.WebRequestType.LinkedStaffMember:
                    dataBaseObj.deleteTableData(TABLE_GetAllFieldLabels);
                    dataBaseObj.insertData(TABLE_GetAllFieldLabels, JSON_FIELD_ARRAY, response, true);
                    isRequestSend = false;

            }
        }

    }

    //this.download();




});
