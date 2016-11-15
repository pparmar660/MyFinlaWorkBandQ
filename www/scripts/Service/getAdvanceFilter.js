BandQModule.service('getAdvanceFilter', function ($rootScope, advanceFilter) {

    this.data;
    var self = this;
    var isRequestSend = false;
    this.loadFromLocal = function () {

        if (dataBaseObj) {

            dataBaseObj.getDatafromDataBase("SELECT * FROM " + ADVANCE_FILTER_DATA, function (result) {
                if (result.length > 0) {
                    self.data = JSON.parse(result[0].json_data);
                } else
                    self.download();
            });

        } else
            setTimeout(function () {
                self.loadFromLocal();
            }, 1000);


    }


    this.download = function () {


        if (webRequestObject && constanObject) {

            if (isRequestSend)
                return;
            isRequestSend = true;
            advanceFilter.getAdvanceSearchConfig(function (status, data) {

                if (status) {
                    isRequestSend = false;
                    var milliseconds = new Date().getTime();
                    dataBaseObj.deleteTableData(ADVANCE_FILTER_DATA);
                    dataBaseObj.insertData(ADVANCE_FILTER_DATA, JSON_DATA_KEY, [JSON.stringify(data), milliseconds], null);

                }

            });
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
//    this.webRequestResponse = function (requestType, status, response) {
//
//        if (status == constanObject.ERROR) {
//
//        } else {
//            switch (requestType) {
//                case 101:
//                    toolTipData = response;
//                    $rootScope.$broadcast('toolTipData', {dataDowloade: true});
//
//            }
//        }
//
//    }

    //this.download();




});
