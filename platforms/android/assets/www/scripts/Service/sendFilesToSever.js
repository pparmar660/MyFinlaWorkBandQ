BandQModule.service('sendFilesToServer', function ($rootScope, checkInternetConnectionService) {
    var self = this;

    var fileId;
    var currentScope;
    var requestType;
    var noOfTryies = 0;


    //
    // var currentFileId;
    this.sendFile = function (fileName, incidentId, options) {
        //     incidentId=constanObject.CREATE_INCIDENT_ID;

        var webUrl = constanObject.UPLOAD_DO_YOU_HAVE_ANY_FILE_URL + incidentId;

        console.log("fileUpload :" + JSON.stringify(options));

        webRequestObject.fileUploadWithOption(self, fileName, webUrl, constanObject.WebRequestType.FILE_UPLOAD, options, false);


    };


    this.setCurrentScope = function (_currentScope, type) {
        currentScope = _currentScope;
        noOfTryies = 0;
        requestType = type;
        incidentId = -1;
    }
    this.sendNextFile = function () {
        dataBaseObj.checkRecordIsExist("Select Count(*) AS c from '" + TABLE_CREATE_INCIDENT_REPORT_FILE + "' WHERE orignalIncidentId !='-1' ", function (noOfRecord) {

            if (noOfRecord > 0) {

                if (checkInternetConnectionService.checkNetworkConnection()) {
                    var getUploadedFile = "SELECT *  from '" + TABLE_CREATE_INCIDENT_REPORT_FILE + "' WHERE orignalIncidentId !='-1' LIMIT 1";
                    dataBaseObj.getDatafromDataBase(getUploadedFile, function (result) {
                        if(!result)
                            return;
                        if(result.length<=0)
                            return ;
                        //console.log(JSON.stringify(result));
                        var options = {};
                        fileId = result[0].timeStamp;
                        options.moduleId = result[0].moduleId;
                        options.tempId = result[0].timeStamp;
                        options.type = result[0].fileType;
                        //console.log(JSON.stringify(options));

                        self.sendFile(result[0].filePath, result[0].orignalIncidentId, options);
                    });
                }


            } else {
                
               //    var query = "DELETE from " + TABLE_CREATE_INCIDENT_REPORT_FILE + " WHERE timeStamp = '" + fileId + "'";
                  dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT_FILE);
                if (currentScope)
                {
                    if (requestType == constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT) {
                        // var thankyouPage = angular.element($("#225")).scope();
                        //thankyouPage.init();

                        currentScope.$apply(function () {
                            //currentScope.heidAndShowIndex(++currentScope.currentVisibleIndex);
                            currentScope.tabDataArray[currentScope.tabDataArray.length - 1].class = "complete"
                            currentScope.isBreadCrumIsActive = false;
                        });
                    }

                } else if (requestType == constanObject.WebRequestType.INCIDENT_REPORT_LOGIN) {

                    if (angular.element('#header').scope()) {
                        angular.element('#header').scope().$apply(function () {
                            $rootScope.showIncidentSubmitPopup = true;
                        });
                    }
                    //window.location.href = "dashboard.html";
                }

            }


        });


        //  

    };

    this.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.SUCCESS) {

            switch (requestType) {
                case constanObject.WebRequestType.FILE_UPLOAD:
                    var query = "DELETE from " + TABLE_CREATE_INCIDENT_REPORT_FILE + " WHERE timeStamp = '" + fileId + "'";
                    dataBaseObj.runQueryWithCallBack(query, function () {
                        self.sendNextFile();
                        noOfTryies = 0;
                    });
                    break;
            }
        } else {
            showErrorAlert(requestType, responseData);
            if (noOfTryies >= 3) {
                var query = "DELETE from " + TABLE_CREATE_INCIDENT_REPORT_FILE + " WHERE timeStamp = '" + fileId + "'";
                dataBaseObj.runQueryWithCallBack(query, function () {
                    self.sendNextFile();
                    noOfTryies = 0;
                });
            } else {
                self.sendNextFile();
                noOfTryies++;
            }

        }

    }

});