BandQModule.service('createIncidentReport', ["sendFilesToServer", "globalService", "$rootScope", "$timeout", function (sendFilesToServer, globalService, $rootScope, $timeout) {
        var self = this;
        //var moveToDashboard = false;
        var currentPageScope;
        var currentIncidentId;
        var currentRequestData;
        var noOfRetry = 0;
        this.incidentReportData = function (query, type, _moveToDashboard, currentIncId, scope) {
            currentRequestData = {};
            noOfRetry = 0;
            currentRequestData.query = query;
            currentRequestData.type = type;
            currentRequestData._moveToDashboard = _moveToDashboard;
            currentRequestData.currentIncId = currentIncId;
            currentRequestData.scope = scope;
            currentPageScope = scope;
            currentIncidentId = currentIncId;
            sendRequest(query, type);
            $rootScope.requestSendToServer = true;
        };
        function sendRequest(query, type) {

            noOfRetry++;
            dataBaseObj.getDatafromDataBase(query, function (result) {
                var incidentData = [];
                //  //console.log(JSON.stringify(result));
                for (var i = 0; i < result.length; i++) {
                    try {// //console.log(result[i].json_data);
                        incidentData.push(JSON.parse(result[i].json_data));
                    } catch (e) {
                        //console.log(e);
                    }
                }

                var data = {};
                data.data = incidentData;
                console.log(JSON.stringify(data));
                $rootScope.requestSendToServer = true;
                webRequestObject.postRequest(self, "POST", constanObject.INSERT_INCIDENT_REPORT, data, type, true);
            }, false);
        }



        this.webRequestResponse = function (requestType, status, responseData) {

            $rootScope.requestSendToServer = false;

            if (status == constanObject.SUCCESS) {
                for (var i = 0; i < responseData.data.length; i++) {
                    var query = "UPDATE " + TABLE_CREATE_INCIDENT_REPORT_FILE + " SET orignalIncidentId = '" + responseData.data[i].inc_id.toString() +
                            "' WHERE incidentTempId ='" + responseData.data[i].tmp_id + "' ";
                    dataBaseObj.updateWithCallBack(query, function (id) {

                        //   sendFilesToServer.setIncidentId(responseData.data[0].inc_id.toString() );
                        switch (requestType) {
                            case constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT:
//                                var query= "DELETE FROM "+TABLE_CREATE_INCIDENT_REPORT
//                                        + "WHERE temp_id ='"+id+"'";

                                //  dataBaseObj.deleteRecord(query);

                                dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                                sendFilesToServer.setCurrentScope(currentPageScope,
                                        constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT);
                                sendFilesToServer.sendNextFile();
                                //console.log(responseData);
                                constanObject.CREATE_INCIDENT_ID = responseData.data[0].inc_id;
                                if (currentPageScope)
                                {
                                    window.plugins.spinnerDialog.hide();
                                    currentPageScope.$apply(function () {
                                        currentPageScope.heidAndShowIndex($rootScope.indexOfThankYouPage);
                                        // currentPageScope.heidAndShowIndex(++currentPageScope.currentVisibleIndex);
                                        currentPageScope.tabDataArray[currentPageScope.tabDataArray.length - 1].class = "complete"
                                        currentPageScope.isBreadCrumIsActive = false;
                                        currentPageScope.incidentSubmittedShowHide = true;
                                        currentPageScope.breadCrumDropdownShowHide = false;
                                    });
                                }
                                break;
                            case constanObject.WebRequestType.INCIDENT_REPORT_LOGIN:

                                dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                                sendFilesToServer.setCurrentScope(currentPageScope, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN);
                                sendFilesToServer.sendNextFile();
                                window.plugins.spinnerDialog.hide();
                                break;
                            case constanObject.WebRequestType.INCIDENT_REPORT_SAVE:

                                $rootScope.$apply(function () {
                                    $rootScope.showIncidentSavedPopus = true;
                                });
                                constanObject.CREATE_INCIDENT_ID = responseData.data[0].inc_id;
                                dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                                sendFilesToServer.setCurrentScope(currentPageScope, constanObject.WebRequestType.INCIDENT_REPORT_SAVE);
                                sendFilesToServer.sendNextFile();
                                window.plugins.spinnerDialog.hide();
                                break;
                        }
                    }, responseData.data[i].tmp_id);
                    if (responseData.data[i].tmp_id == currentIncidentId) {
                        globalService.setIncidentResData(responseData.data[i]);
                    }
                }



            } else {
                showErrorAlert(requestType, responseData);

                if (noOfRetry < 3) {
                    sendRequest(currentRequestData.query, currentRequestData.type)
                } else {
                    dataBaseObj.deleteTableData(TABLE_CREATE_INCIDENT_REPORT);
                    if (constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT == requestType) {
                        if (currentPageScope)
                        {
                            window.plugins.spinnerDialog.hide();
                            currentPageScope.$apply(function () {
                                $rootScope.showIncidentCanNotSubmitted = true;
                            });
                        }
                    }
                }
            }
//  if (moveToDashboard)
//     window.location.href = "dashboard.html";
        }

    }]);