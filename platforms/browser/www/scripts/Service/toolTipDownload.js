BandQModule.service('toolTipDownload', function ($rootScope) {

     this.toolTipData;
    var self = this;
    this.download = function () {


        if (dataBaseObj) {

            var getQuestionQuery = "SELECT * from " + TABLE_APP_MENU_CONFIG;
            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
                if (result.length < 1)
                    return;
                self.toolTipData = JSON.parse(result[0].json_data);
                

            });
        } else
            setTimeout(function () {
                self.download();
            }, 1000);


//        if (webRequestObject && constanObject)
//            webRequestObject.postRequest(self, "GET", constanObject.GetAppMenuConfig, null, 101, false);
//        else
//            setTimeout(function () {
//                self.download();
//            }, 1000);
    }



    this.getToolTipData = function () {
        return self.toolTipData;
    }


    this.webRequestResponse = function (requestType, status, response) {

        if (status == constanObject.ERROR) {

        } else {
            switch (requestType) {
                case 101:
                    toolTipData = response;
                    $rootScope.$broadcast('toolTipData', {dataDowloade: true});

            }
        }

    }

    //this.download();




});
