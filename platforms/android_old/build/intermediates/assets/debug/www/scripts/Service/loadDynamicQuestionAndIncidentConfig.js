BandQModule.service("loadDynamicQuestionAndIncidentConfig", function () {
    var self = this;
    var dynQusDetailCallBackFunc;
    var incidentConfigCallBackFunc;
    var isFromIncidentReport = false;
    var previousVersion;
    var currentVersion;
    var movetodashboard = false;
    var isQuestionDownloading = false;
    var downLoadQuestion = false;


    this.downloadData = function (previousVersion_, currentVersion_) {
        previousVersion = previousVersion_;
        currentVersion = currentVersion_;
        downLoadQuestion = true;
        movetodashboard = true;
        isQuestionDownloading = false;

        loadIncidentCongig();

        setTimeout(function () {
            if (movetodashboard)
                window.location.href = "dashboard.html";
        }, 15000);


    }

    loadIncidentCongig = function () {
        dataBaseObj.countNoOfRow(TABLE_INCIDENT_CONFIG, function (noOfRow) {
            if (noOfRow <= 0) {
                sendIncidentConfigRequest();
            } else {
                if (previousVersion != currentVersion)
                    sendIncidentConfigRequest();
                else
                    downloadQueston();

            }
        });
    }
    sendIncidentConfigRequest = function () {
        movetodashboard = false;
        webRequestObject.postRequest(self, "GET", constanObject.GENERATE_INCIDENT_REPORT,
                "", constanObject.WebRequestType.INCIDENT_CONFIG, true);

    }

    sendQuestionRequest = function () {
        isQuestionDownloading = true;
        movetodashboard = false;
        webRequestObject.postRequest(self, "GET", constanObject.dynamicQuestionUrl_,
                "", constanObject.WebRequestType.DYNAMIC_QUESTION, true);

    }

    downloadQueston = function () {
        isFromIncidentReport = false;
        dataBaseObj.countNoOfRow(TABLE_DYNAMIC_QUESTION, function (noOfRow) {
            if (noOfRow <= 0) {
                sendQuestionRequest();
            } else {
                if (previousVersion != currentVersion)
                    sendQuestionRequest();
                else
                    window.location.href = "dashboard.html";
            }


        });

    }


    this.loadAndSetConfig = function (incidentConfigCallBackFunc_) {
        incidentConfigCallBackFunc = incidentConfigCallBackFunc_;
        downLoadQuestion = false;
        isQuestionDownloading = false;
        sendIncidentConfigRequest();

    }



    this.loadAndShowDynamciQuestion = function (dynQusDetailCallBackFunc_) {
        dynQusDetailCallBackFunc = dynQusDetailCallBackFunc_;
        isFromIncidentReport = true;
        sendQuestionRequest();

    }


    this.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            return;
        }
        //    alert(requestType);

        //     //console.log(JSON.stringify(responseData));

        switch (requestType) {
            case constanObject.WebRequestType.DYNAMIC_QUESTION:
                showSpinner(true, true, SPINNER_MESSAGE);
                loadDataToLocalDataBase(responseData, function (isLoaded) {

                    if (isFromIncidentReport) {
                        dynQusDetailCallBackFunc();
                    }
                });
                break;

            case constanObject.WebRequestType.INCIDENT_CONFIG :


                dataBaseObj.deleteTableData(TABLE_INCIDENT_CONFIG);
                dataBaseObj.insertDataWithCallBack(TABLE_INCIDENT_CONFIG, JSON_FIELD_ARRAY, responseData, true, function () {


                    if (downLoadQuestion)
                        downloadQueston();
                    else
                        incidentConfigCallBackFunc();


                });



                break;





        }
    };



    loadDataToLocalDataBase = function (response, callBack) {

        try {


            response = response;
            dataBaseObj.deleteTableData(TABLE_DYNAMIC_QUESTION);
            //dataBaseObj.deleteTableData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_RELATION);
            dataBaseObj.deleteTableData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION);


            var questionNumber_;
            var noOfLoaded = 0;
            var totalQuestion = response.dynamic.keySeq.length;
            for (var j = 0; j < response.dynamic.keySeq.length; j++) {

                questionNumber_ = response.dynamic.keySeq[j];
                var dynamicQuestion = response.dynamic[questionNumber_];
                if (dynamicQuestion != "undefind") {
                    var value = [dynamicQuestion.question_id == null ? "" : dynamicQuestion.question_id, dynamicQuestion.sort_order == null ? "" : dynamicQuestion.sort_order, dynamicQuestion.question_title == null ? "" : dynamicQuestion.question_title,
                        dynamicQuestion.option_type == null ? "" : dynamicQuestion.option_type, dynamicQuestion.question_ctg == null ? "" : dynamicQuestion.question_ctg,
                        dynamicQuestion.question_type == null ? "" : dynamicQuestion.question_type, dynamicQuestion.errmessage_opt == null ? "" : dynamicQuestion.errmessage_opt,
                        dynamicQuestion.question_hint == null ? "" : dynamicQuestion.question_hint, dynamicQuestion.question_man == null ? "" : dynamicQuestion.question_man,
                        dynamicQuestion.validate_opt == null ? "" : dynamicQuestion.validate_opt, dynamicQuestion.location_countries == null ? "" : "," + dynamicQuestion.location_countries + ",",
                        dynamicQuestion.location_venues == null ? "" : "," + dynamicQuestion.location_venues + ",", dynamicQuestion.location_regions == null ? "" : "," + dynamicQuestion.location_regions + ",",
                        dynamicQuestion.location_zones == null ? "" : "," + dynamicQuestion.location_zones + ",", dynamicQuestion.questionIncidentCategory == null ? "" : "," + dynamicQuestion.questionIncidentCategory + ",",

                        dynamicQuestion.questionoptions == null ? "" : JSON.stringify(dynamicQuestion.questionoptions), dynamicQuestion.childquestionsbyoption == null ? "" : JSON.stringify(dynamicQuestion.childquestionsbyoption),
                        dynamicQuestion.is_child == null ? 0 : JSON.stringify(dynamicQuestion.is_child),
                        dynamicQuestion.location_option == null ? 0 : JSON.stringify(dynamicQuestion.location_option),
                        dynamicQuestion.fieldset_display_options == null ? 0 : JSON.stringify(dynamicQuestion.fieldset_display_options),
                        dynamicQuestion.use_fieldsetoption == null ? 0 : JSON.stringify(dynamicQuestion.use_fieldsetoption), false];
                    
                    dataBaseObj.insertDataWithCallBack(TABLE_DYNAMIC_QUESTION, DYNAMIC_QUESTION_KEY, value, false, function () {
                        noOfLoaded++;
                        if (noOfLoaded == totalQuestion) {
                            setTimeout(function () {
                                window.plugins.spinnerDialog.hide();
                                if (!isFromIncidentReport)
                                    window.location.href = "dashboard.html";

                            }, 3000);
                        }


                    });
                    if (dynamicQuestion.questionOutcomes)
                        if(typeof dynamicQuestion.questionOutcomes == "object" ){
                        for (var p = 0; p < dynamicQuestion.questionOutcomes.keyseq.length; p++) {

                            var outcomeId = dynamicQuestion.questionOutcomes.keyseq[p];
                            var outcomeType = "," + dynamicQuestion.questionOutcomes[outcomeId] + ",";
                            //   dataBaseObj.insertData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_RELATION, QUESTOIN_OUTCOME_KEY, [dynamicQuestion.question_id, outcomeId]);
                            dataBaseObj.insertData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION, QUESTOIN_OUTCOME_TYPE_KEY, [dynamicQuestion.question_id, dynamicQuestion.questionOutcomes.keyseq[p], outcomeType]);

                        }
                    }

                }

            }

            return  callBack(true);
        } catch (e) {
            console.log("Catch Error: "+JSON.stringify(e) );
            return  callBack(false);
        }
    }


});
