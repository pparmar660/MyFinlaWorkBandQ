BandQModule.controller('IncidentReportContrl12', ["$scope", "$http", "$timeout", "showHidePageService", "$rootScope",
    "globalService", "imageService", "breadCrum", "createIncidentReport", "loadDynamicQuestionAndIncidentConfig", "checkInternetConnectionService", "manageDropDownFieldSet", "$window", "getListIncidentReportFieldLabels", "getAllFieldLabel", function ($scope, $http, $timeout, showHidePageService, $rootScope,
            globalService, imageService, breadCrum, createIncidentReport, loadDynamicQuestionAndIncidentConfig, checkInternetConnectionService, manageDropDownFieldSet, $window, getListIncidentReportFieldLabels, getAllFieldLabel) {
        $scope.Hello = "hi";

        $scope.chekIncidenetReportOnOnline = true;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Incident Reports';
        $rootScope.highlightedFooter = 'Security';
        $rootScope.moduleIconClass = 'security-icon';
        if ($rootScope.editIncident)
            $rootScope.subMenuTitle1 = 'Incident Edit';
        else
            $rootScope.subMenuTitle1 = 'Add New';
        $rootScope.dashboardLink = '#/dashboard';
        $scope.pageArray = [];
        $scope.NextIndexArray = [];
        $scope.BackIndexArray = [];
        $scope.visiblePagePosition = 1;
        $scope.isBreadCrumIsActive = true;
        $scope.showBackbutton = false;
        $scope.FormFieldLabelData;
        $scope.breadCrumDropDown = {};
        $rootScope.indexOfThankYouPage;

        //----------------------------offender------------------------
        $rootScope.offenserAddShowStatus = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderListShowStatus = true;
        $rootScope.isOffenderInvolved = null;
        $rootScope.multiSelection = false;
        $rootScope.currentVisibleIndex = 0;
        $rootScope.showIncidentSavedPopus = false;

//----------------------------------------------- vehicle---------------------

        $rootScope.vehicleAddShowStatus = false;
        $rootScope.vehicleDetailShowStatus = false;
        $rootScope.vehicleListShowStatus = false;
        $rootScope.isAddVechile = false;
        $rootScope.isEditVechile = false;
        $rootScope.isvehicleInvolved = false;
        $rootScope.isNewVechile = false;
        $rootScope.index = 0;
        $rootScope.prevIndex = 0;
        //----------------------------------------------- victim---------------------
        $rootScope.victimListShowStatus = true;
        $rootScope.victimAddShowStatus = false;
        $rootScope.victimDetailShowStatus = false;
        $rootScope.isVictimInvolved = null;
        //----------------------------------------------- WITNESS---------------------
        $rootScope.witnessListShowStatus = true;
        $rootScope.witnessAddShowStatus = false;
        $rootScope.witnessDetailShowStatus = false;
        $rootScope.iswitnessInvolved = null;
        $rootScope.venueLocation = -1;

        //-----------------------securityIncident--------------
        $rootScope.hasInformedPolice = true;
        $rootScope.civilRecovery = true;
        $rootScope.hideFieldSetArray = [];

        $scope.currentVisibleIdex = 0;
        $scope.incidentSubmittedShowHide = false;
        $scope.breadCrumDropdownShowHide = true;

        //--------------hide/show button--------------------
        $rootScope.hideButton = false;
        $rootScope.showHomeButton = false;
        $scope.dataSaved = false;
        $scope.fieldData = {};
        var HideFiledSetId = [];
        $scope.networkNotAvailable = false;
        $scope.hideFieldSetForBreadCrum = [];
        $rootScope.currentPagesScopeArray = [];
        $rootScope.idOfFilledFieldSet = [];




        $scope.nextPage = function (page) {

            // Vaildate current page's fiels  

            var index = $scope.pageArray.indexOf(page);
            window.scrollTo(0, 0);

            ;//= ["dy1", "st7"];//showHidePageService.getHideFieldSetArray();
            HideFiledSetId = [];

            var currentPageid;
            var currentPageScope;

            var currentPage = $scope.pageArray[index];
            var canMoveToNext = true;
            var noOfPageMove = 1;
            var noOfFieldSetMove = 1;
            var pageFieldSetArray = showHidePageService.getPageFieldSetArray();
            var tabFieldIdArray = showHidePageService.getTabFieldIdArray();

            for (var j = 0; j < currentPage.fields.length; j++) {

                currentPageid = currentPage.fields[j];
                currentPageScope = angular.element($('#' + currentPageid)).scope();

                if (currentPageScope) {
                    try
                    {
                        currentPageScope.nextButtonClicked(function callBack(_canMoveToNext, _noOfPageMove) {
                            if (canMoveToNext) {
                                canMoveToNext = _canMoveToNext;
                                noOfPageMove = _noOfPageMove;

                            }

                        });
                    } catch (e) {
                    }
                }

            }



            if (!canMoveToNext) {
//                $(".alertvalidate").animate({
//                    scrollTop: 0
//                }, 600);



                return;
            }
            //------------------------------------------------
            var HideFiledSetIdTemp = [];
            HideFiledSetIdTemp.length = 0;
            HideFiledSetIdTemp = angular.copy($rootScope.hideFieldSetArray);


            $scope.hideFieldSetForBreadCrum = HideFiledSetId = $scope.hideShowCivilRecovery(HideFiledSetIdTemp);

            // Hide field set form array---------------START------------
            manageDropDownFieldSet.setDropDownFieldSet($scope.hideFieldSetForBreadCrum);

            //-----------------------------------------END--------------------------------------



            if ($.inArray(pageFieldSetArray[index + noOfPageMove], HideFiledSetId) > -1) { // check the next field set is allowed or not on the base of outcome and type

                var fieldSetId = pageFieldSetArray[index + noOfPageMove];


                for (var j = index + noOfPageMove; j < pageFieldSetArray.length; j++) {

                    if (pageFieldSetArray[j] == fieldSetId)
                        noOfFieldSetMove++;
                    else {
                        if ($.inArray(pageFieldSetArray[index + noOfFieldSetMove], HideFiledSetId) > -1)

                        {
                            fieldSetId = pageFieldSetArray[index + noOfFieldSetMove];
                            noOfFieldSetMove++;
                            continue;
                        } else
                            break;

                    }
                    ;
                }
            }



            // on the bse of outcoem and type hide fiels set
            if (noOfFieldSetMove > 1)
                noOfPageMove = noOfFieldSetMove;



            $rootScope.show = false;
            breadCrum.setBreadCrumOnNextClick(tabFieldIdArray[index], tabFieldIdArray[index + noOfPageMove]);

            //alert();

            // Call Next page's  init-----------------

            var nextPageid;
            var nextPageScope;

            globalService.setNoOfPageMove(noOfPageMove);
            var nextPage = $scope.pageArray[index + noOfPageMove];


            // set completely fieldset in array
            if (!($.inArray($scope.pageArray[index].fieldSetId, $rootScope.idOfFilledFieldSet) > -1)) {
                $rootScope.idOfFilledFieldSet.push($scope.pageArray[index].fieldSetId);
            }

            setTimeout(function () {
                $scope.$apply(function () {

                    $scope.setFieldSetOnNextAndBackInDropDown(nextPage);
                    $rootScope.currentPagesScopeArray = [];
                    for (var j = 0; j < nextPage.fields.length; j++) {

                        nextPageid = nextPage.fields[j];
                        nextPageScope = angular.element($('#' + nextPageid)).scope();
                        $rootScope.currentPagesScopeArray.push(nextPageScope);
                    }

                })
            }, 1000);


            //------------------------
            $rootScope.backCalled = false;
            $scope.showBackbutton = true;
            $scope.heidAndShowIndex(index + noOfPageMove, noOfPageMove);


        }


        $scope.hideShowCivilRecovery = function (HideFiledSetId_) {
            // if offender and product is selected then hide civil recovery

            // if offender or product not selected then hide 

            if (HideFiledSetId_.indexOf("st7") > -1)
                return HideFiledSetId_;

            var isProducContain = true, isOffenderContain = true;
            if (HideFiledSetId_.indexOf("st6") > -1)
                isProducContain = false;

            if (HideFiledSetId_.indexOf("st3") > -1)
                isOffenderContain = false;

            var offenderArray = globalService.getOffender();

            if (offenderArray)
                if (offenderArray.isOffenderInvolved)
                    if (offenderArray.isOffenderInvolved == "no")
                        isOffenderContain = false;


            if (isProducContain) {
                if (globalService.getProductDetail().recProdect == 0)
                    isProducContain = false;
            } else {
                globalService.setProductDetail({"recProdect": "", "recProdectVal": "", "demProduct": "", "demProducVal": "", "totalItem": "", "totalItemVal": ""});
                globalService.setAllProduct("");
            }


            if (!isProducContain || !isOffenderContain)
            {
                HideFiledSetId_.push("st7");

            }
            return HideFiledSetId_;
        };

//        $scope.addIncident = function () {
//            $window.location.reload();
//
//            window.location.href = "dashboard.html#/createIncident";
//
//        };

        $scope.backPage = function (page) {

            var index = $scope.pageArray.indexOf(page);
            if (index <= 1) {
                $scope.showBackbutton = false;
            }

            var currentPageid;
            var currentPageScope;
            var currentPage = $scope.pageArray[index];
            var canMoveToNext = true;
            var noOfPageMove = 1;
            for (var j = 0; j < currentPage.fields.length; j++) {

                currentPageid = currentPage.fields[j];
                currentPageScope = angular.element($('#' + currentPageid)).scope();

                if (currentPageScope) {
                    try
                    {
                        currentPageScope.back(function callBack(_canMoveToNext, _noOfPageMove) {
                            if (canMoveToNext) {
                                canMoveToNext = _canMoveToNext;
                                noOfPageMove = _noOfPageMove;
                            }
                        }

                        );
                    } catch (e) {
                    }
                }

            }


            if (!canMoveToNext) {

                return;
            }

            $rootScope.backCalled = true;
            if (page.noOfPageMove)
                noOfPageMove = page.noOfPageMove;
            else
                noOfPageMove = globalService.getNoOfPageMove();
            window.scrollTo(0, 0);
            $rootScope.show = false;

            if ($scope.pageArray[index].showStatus)
                $scope.pageArray[index].showStatus = false;
            if ($scope.pageArray[index - noOfPageMove])
                $scope.pageArray[index - noOfPageMove].showStatus = true;


            var tabFieldIdArray = showHidePageService.getTabFieldIdArray();
            breadCrum.setBreadCrumOnBackClick(tabFieldIdArray[index], tabFieldIdArray[index - noOfPageMove]);

        }


        $scope.saveBtn = function (page) {

            $rootScope.showSavePopup = false;

            showSpinner(true, true, SPINNER_MESSAGE);
            var index = $scope.pageArray.indexOf($scope.currentPageData);
            window.scrollTo(0, 0);

            ;//= ["dy1", "st7"];//showHidePageService.getHideFieldSetArray();
            HideFiledSetId = [];

            var currentPageid;
            var currentPageScope;
            var fieldSync;
            var currentPage = $scope.pageArray[index];
            for (var j = 0; j < currentPage.fields.length; j++) {

                currentPageid = currentPage.fields[j];
                currentPageScope = angular.element($('#' + currentPageid)).scope();

                if (currentPageScope) {
                    try
                    {
                        currentPageScope.saveButtonClicked(function callBack(status) {
                            if (status) {
                                if (fieldSync)
                                    window.clearTimeout(fieldSync);

                                fieldSync = setTimeout(function () {


                                    var incidentFinalData = globalService.getCompGlobalData();
                                    incidentFinalData.incidentTempId = constanObject.CREATE_INCIDEN_TEMP_ID;
                                    incidentFinalData.timeOfIncidentCreatae = moment().format('YYYY-MM-DD HH:mm:ss');
                                    incidentFinalData.insertType = "save";
                                    incidentFinalData.incidentId = constanObject.CREATE_INCIDENT_ID;


                                    //  console.log("Incident Final Data on Save : " + JSON.stringify(incidentFinalData));

                                    var value = [JSON.stringify(incidentFinalData), constanObject.CREATE_INCIDEN_TEMP_ID.toString(), "save"];


                                    dataBaseObj.checkRecordIsExist("Select Count(*) AS c from " + TABLE_CREATE_INCIDENT_REPORT + "  where temp_id = '"

                                            //  dataBaseObj.checkRecordIsExist("SELECT * FROM " + TABLE_CREATE_INCIDENT_REPORT + " WHERE incidentTempId = '"

                                            + constanObject.CREATE_INCIDEN_TEMP_ID.toString() + "' ", function (noOfRecord) {

                                        if (noOfRecord > 0) {
                                            // update 

                                            var query = "UPDATE " + TABLE_CREATE_INCIDENT_REPORT + " SET " + FIELD_JSON_DATA + " = '" + JSON.stringify(incidentFinalData) +
                                                    "' WHERE temp_id ='" + constanObject.CREATE_INCIDEN_TEMP_ID.toString() + "' ";

                                            dataBaseObj.update(query);

                                        } else {
                                            dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT, CREATE_INCIDENT_REPORT_KEY, value);

                                        }


                                        if (checkInternetConnectionService.checkNetworkConnection()) {
                                            var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                                            createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_SAVE, false, constanObject.CREATE_INCIDEN_TEMP_ID, $scope);
                                        } else {
                                            window.plugins.spinnerDialog.hide();
                                            $rootScope.showIncidentSavedPopus = true;
                                        }

                                    });
                                }, 1000);
                            }




                        });
                    } catch (e) {
                    }
                }

            }

        };

        $scope.submitBtn = function (page) {
            $rootScope.showSavePopup = false;

            showSpinner(true, true, SPINNER_MESSAGE);
            var currentPageId;
            var currentScope;
            for (var j = 0; j < page.fields.length; j++) {

                currentPageId = page.fields[j];
                if (currentPageId == 20) {

                    currentScope = angular.element($('#' + currentPageId)).scope();
                    if (currentScope) {
                        try
                        {
                            currentScope.submitBtnAction(function callBack(status) {
                                if (status == true) {
                                    var incidentFinalData = (globalService.getCompGlobalData());
                                    incidentFinalData.incidentTempId = constanObject.CREATE_INCIDEN_TEMP_ID;
                                    incidentFinalData.timeOfIncidentCreatae = moment().format('YYYY-MM-DD HH:mm:ss');
                                    incidentFinalData.insertType = "submit";

                                    incidentFinalData.incidentId = constanObject.CREATE_INCIDENT_ID;

                                    var value = [JSON.stringify(incidentFinalData), constanObject.CREATE_INCIDEN_TEMP_ID.toString(), "submit"];
                                    dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT, CREATE_INCIDENT_REPORT_KEY, value);
                                    if (checkInternetConnectionService.checkNetworkConnection()) {
                                        var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                                        createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_SUBMIT, false, constanObject.CREATE_INCIDEN_TEMP_ID, $scope);
                                    } else {
                                        window.plugins.spinnerDialog.hide();
                                        $scope.dataSaved = true;
                                        // window.location.href = "securityMain.html";
                                    }
                                }
                            });

                        } catch (e) {
                        }
                    }

                }
            }
        };

        $scope.goToDashboard = function () {
            $scope.dataSaved = false;
            $rootScope.showIncidentCanNotSubmitted = false;
            window.location.href = "dashboard.html#/security";
        };
        $scope.addOffenderParent = function () {
            $scope.offenserAddShowStatus = true;
            $scope.offenderListShowStatus = false;
        }



        $scope.showLinkedStaff = false;

        $scope.toggleLinkedStaff = function () {

        }
        $scope.moveFieldSetByBreadCrum = function (tabData) {


            $rootScope.hideButton = false;
            $rootScope.show = false;

            if (!$scope.isBreadCrumIsActive)
                return;


            var index = -1;
            $rootScope.previousBreadCrumDropDownFielsSet = $scope.breadCrumDropDownFielsSet;
            if (tabData.class == "deactive" || tabData.class == "current")
            {
                var tabFieldIdArray = showHidePageService.getTabFieldIdArray();
                for (var i = 0; i < tabFieldIdArray.length; i++)
                {
                    if (tabFieldIdArray[i] == tabData.pk_incident_report_tabs)
                    {

                        $scope.breadCrumDropDownFielsSet = angular.copy(tabData.fieldSet);
                        manageDropDownFieldSet.setDropDownFieldSet($scope.hideFieldSetForBreadCrum);

                        for (var p = 0; p < $scope.breadCrumDropDownFielsSet.length; p++)
                        {
                            if ($scope.breadCrumDropDownFielsSet[p].show) {
                                $scope.chagefieldsByDropDown($scope.breadCrumDropDownFielsSet[p], function (canMove) {

                                    if (canMove) {
                                        index = 1;
                                        $rootScope.show = false;

                                        for (var i = 0; i < $scope.tabDataArray.length; i++)
                                        {
                                            if (i == tabData.index)
                                                $scope.tabDataArray[i].BoldClass = "txt_bold";
                                            else
                                                $scope.tabDataArray[i].BoldClass = "";
                                        }
                                    } else {
                                        // index = 0;
                                        $scope.breadCrumDropDownFielsSet = $rootScope.previousBreadCrumDropDownFielsSet;
                                    }

                                });

                                return;
                                ;
                            }
                        }

                    }
                }

            }
            if (index < 0)
                $scope.breadCrumDropDownFielsSet = $rootScope.previousBreadCrumDropDownFielsSet;

        }
        $scope.chagefieldsByDropDown = function (data, callBack) {

            if (!$scope.isBreadCrumIsActive)
                return;

            if ($rootScope.settingBreadCrumOfBack)
            {
                $rootScope.settingBreadCrumOfBack = false;
                return;
            }

            if ($rootScope.settingBreadCrumOfNext) {
                $rootScope.settingBreadCrumOfNext = false;
                return;
            }

            $rootScope.show = false;
            var index = -1;
            var tabId = -1;
            var canMove = false;


            for (var i = 0; i < HideFiledSetId.length; i++) {
                if (HideFiledSetId[i] == data.pk_incident_report_fieldset) {
                    return;
                }
            }


            var pageFieldSetArray = showHidePageService.getPageFieldSetArray();
            var tabFieldIdArray = showHidePageService.getTabFieldIdArray();

            for (var i = 0; i < pageFieldSetArray.length; i++)
            {
                if (pageFieldSetArray[i] == data.pk_incident_report_fieldset)
                {
                    index = i;
                    tabId = tabFieldIdArray[i];
                    break;
                }
            }


            if (($.inArray(data.pk_incident_report_fieldset, $rootScope.idOfFilledFieldSet) > -1)) {
                canMove = true;
            }


            for (var i = 0; i < $scope.tabDataArray.length; i++) {

                if ($scope.tabDataArray[i].pk_incident_report_tabs == tabId)
                {
                    if ($scope.tabDataArray[i].class == "deactive")
                        canMove = true;

                    if ($scope.tabDataArray[i].class == "current" && callBack)
                        canMove = true;



                }
            }


            if (index != -1) {
                if (callBack)
                    callBack(canMove);
                if (canMove) {
                    $rootScope.show = false;
                    $scope.heidAndShowIndex(index);
                } else {
                    $rootScope.show = true;
                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;

                    if ($rootScope.currentPagesScopeArray)
                        if ($rootScope.currentPagesScopeArray.length > 0)
                            for (var p = 0; p < $rootScope.currentPagesScopeArray.length; p++) {
                                $rootScope.nextclick = 1;
                                $rootScope.currentPagesScopeArray[p].nextButtonClicked(function () {
                                });
                            }

                }


            }

        }


        $scope.heidAndShowIndex = function (index, noOfPageMove) {

            for (var i = 0; i < $scope.pageArray.length; i++) {
                if (i == index) {
                    $scope.pageArray[i].showStatus = true;
                    if (noOfPageMove)
                        $scope.pageArray[i].noOfPageMove = noOfPageMove;
                } else
                    $scope.pageArray[i].showStatus = false;
            }
            $rootScope.currentVisibleIdex = index;
        }

        $scope.getIndexFromFieldsId = function () {



        };

        $scope.savePopup = function (page, value) {
            $scope.currentPageData = page;
            $rootScope.showSavePopup = value;
        };
        $rootScope.savedPopup = function () {
            $rootScope.showIncidentSavedPopus = false;
        };
        $scope.openDashboard = function () {
            window.location.href = "dashboard.html#/security";
            $rootScope.showIncidentSavedPopus = false;
        };



        $scope.setIncidentConfig = function () {


            var getQuestionQuery = "SELECT * from " + TABLE_INCIDENT_CONFIG;
            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
                //          $http.get('Json_Data/jsonData.json').success(function (data) {
                if (result.length < 1)
                    return;

                $scope.$apply(function () {
                    var data = JSON.parse(result[0].json_data);
                    var obj = data.incident_tabs.incident_report_tabs_sequence;

                    $scope.reports = data.incident_tabs;
                    showHidePageService.setOutcomeTypeLink(data.outcome_type_link);
                    showHidePageService.setVenuRadious(data.venue_radius);

                    $scope.fieldData = {};
                    $scope.AllFieldData = {};
                    $scope.menuIds = obj;
                    var fieldSetArray = {};
                    var pageFieldSetArray = [];
                    $scope.tabDataArray = [];
                    $scope.breadCrumDropDownFielsSet = [];
                    var tabFieldArray = [];

                    for (var i = 0; i < obj.length; i++) { // for tab
                        var tab_id = obj[i];
                        //debugger;

                        var obj_tab = data.incident_tabs[tab_id];
//                  //console.log("Log of field set sequesce: "+obj_tab);

                        var tabData = obj_tab.config;
                        if (i == 0) {
                            tabData.class = "current"
                            tabData.BoldClass = "txt_bold";
                        } else {
                            tabData.class = "";
                            tabData.BoldClass = "";
                        }
                        tabData.index = i;


                        var fieldSetData = [];
//                $scope.$apply(function(){
//                 });
//                  
                        //   //console.log("Look 1: "+ obj_tab);
                        if (obj_tab.hasOwnProperty("fieldset_sequence")) {
                            for (var j = 0; j < obj_tab.fieldset_sequence.length; j++) { // no of field set in a tab

                                var fieldSet_id = obj_tab.fieldset_sequence[j]; // one field set
                                // now break a fields array  on the base of splitter in multiple
                                var fieldsIdArray = obj_tab.fieldset[fieldSet_id].field_sequence;


                                fieldSetData.push(obj_tab.fieldset[fieldSet_id].config);
                                fieldSetArray[fieldSet_id] = fieldsIdArray;
                                var splitterArray = [];
                                var map = [];


                                if (obj_tab.fieldset[fieldSet_id].hasOwnProperty("field_sequence")) {


                                    angular.forEach(obj_tab.fieldset[fieldSet_id].fields, function (value, key) {
                                        $scope.AllFieldData[key] = value;
                                    });



                                    for (var k = 0; k < obj_tab.fieldset[fieldSet_id].field_sequence.length; k++) {

                                        var fieldId = obj_tab.fieldset[fieldSet_id].field_sequence[k];

                                        $scope.fieldData[fieldId] = obj_tab.fieldset[fieldSet_id].fields[fieldId];

                                        if (fieldId == 0) {
                                            //   debugger;
                                            splitterArray.push(map);
                                            map = [];
                                            continue;
                                        }

                                        if (fieldId == "225")
                                        {
                                            $rootScope.indexOfThankYouPage = $scope.pageArray.length + 1;
                                        }

                                        map.push(fieldId);
                                        //  //console.log("Map: "+JSON.stringify(map));

                                    }
                                    //debugger;
                                    if (map.length > 0) {
                                        splitterArray.push(map);
                                    }

                                    for (var q = 0; q < splitterArray.length; q++) {
                                        var spliteField = splitterArray[q];
                                        // create a div and load the field in it
                                        ////console.log(spliteField);

                                        $scope.pageArray.push({"fields": splitterArray[q], "showStatus": false, "fieldSetId": fieldSet_id});
                                        $scope.NextIndexArray.push(1);
                                        $scope.BackIndexArray.push(1);
                                        pageFieldSetArray.push(fieldSet_id);
                                        tabFieldArray.push(tab_id);
                                    }
                                    //   //console.log('splitter'); 

                                }
                            }
                        }

                        tabData.fieldSet = fieldSetData;
                        $scope.tabDataArray.push(tabData);
                        if (i == 0) {
                            $scope.breadCrumDropDownFielsSet = angular.copy(fieldSetData);
                            //console.log(JSON.stringify($scope.breadCrumDropDownFielsSet));
                        }

                    }
                    showHidePageService.setPageArray($scope.pageArray);
                    showHidePageService.setFieldSetArray(fieldSetArray);
                    showHidePageService.setPageFieldSetArray(pageFieldSetArray);
                    showHidePageService.setTabArray($scope.tabDataArray);
                    showHidePageService.setTabFieldIdArray(tabFieldArray);
                    $scope.pageArray = angular.copy(showHidePageService.showPage(0));

                });
            });
        }



        $scope.loadIncidentConfigData = function () {

            if (dataBaseObj) {

                dataBaseObj.countNoOfRow(TABLE_INCIDENT_CONFIG, function (noOfRow) {
                    if (noOfRow <= 0) {
                        loadDynamicQuestionAndIncidentConfig.loadAndSetConfig($scope.setIncidentConfig());
                    } else {
                        $scope.setIncidentConfig();


                    }
                });
            } else {
                setTimeout(function () {
                    $scope.loadIncidentConfigData();
                }, 1500);
            }
        }




        $scope.$on('checkInternetConnection', function (event, arg) {
            if (!arg.network)
                $scope.networkNotAvailable = true;
            else {
                $scope.chekIncidenetReportOnOnline = true;
                $scope.networkNotAvailable = false;
            }


//            if (!arg.network && $scope.chekIncidenetReportOnOnline) {
//
//                dataBaseObj.countNoOfRow(TABLE_CREATE_INCIDENT_REPORT, function (n) {
//
//                    $scope.chekIncidenetReportOnOnline = false;
//                    if (n > 0 && (checkInternetConnectionService.checkNetworkConnection())) {
//                        var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
//                        createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN, true);
//                    }
//                });
//                //$scope.profileImg = null;
//            }

        });

        $(window).on('beforeunload', function () {
            $rootScope.showSavePopup = true;

            return;
        });



        function setAllFieldLabelData() {
            $scope.AllFieldLabelData = getListIncidentReportFieldLabels.getData();


            if (!$scope.AllFieldLabelData) {
                setTimeout(function () {
                    setAllFieldLabelData();
                }, 1000);
            } else {
                setTimeout(function () {

                    $scope.$apply(function () {
                        $scope.AllFieldLabelData = getListIncidentReportFieldLabels.getData();
                        $scope.AllFieldLabelData = $scope.AllFieldLabelData.data;
                    });


                }, 10);
            }

        }

        function setFormFieldLableData() {
            $scope.FormFieldLabelData = getAllFieldLabel.getData();


            if (!$scope.FormFieldLabelData) {
                setTimeout(function () {
                    setFormFieldLableData();
                }, 1000);
            } else {
                setTimeout(function () {

                    $scope.$apply(function () {
                        $scope.FormFieldLabelData = getAllFieldLabel.getData();
                        //  $scope.AllFieldLabelData = $scope.AllFieldLabelData.data;
                    });


                }, 10);
            }

        }

        $scope.setFieldSetOnNextAndBackInDropDown = function (data) {
            if (!data)
                return;

            if (!data.fieldSetId)
                return;

            for (var i = 0; i < $scope.breadCrumDropDownFielsSet.length; i++)
            {
                if ($scope.breadCrumDropDownFielsSet[i].pk_incident_report_fieldset === data.fieldSetId) {
                    if (!$scope.breadCrumDropDown.data)
                        $scope.breadCrumDropDown.data = {};
                    $scope.breadCrumDropDown.data = $scope.breadCrumDropDownFielsSet[i];
                    return;
                }

            }

        }

        //-------------------------------------------------------------------------------------------------------------
        $scope.resetAll = function () {


            $rootScope.vehicleAddShowStatus = false;
            $rootScope.vehicleDetailShowStatus = false;
            $rootScope.vehicleListShowStatus = false;
            $rootScope.isAddVechile = false;
            $rootScope.isEditVechile = false;
            $rootScope.isvehicleInvolved = false;
            $rootScope.isNewVechile = false;
            $rootScope.index = 0;
            $rootScope.prevIndex = 0;
            //----------------------------------------------- victim---------------------
            $rootScope.victimListShowStatus = true;
            $rootScope.victimAddShowStatus = false;
            $rootScope.victimDetailShowStatus = false;
            $rootScope.isVictimInvolved = null;
            //----------------------------------------------- WITNESS---------------------
            $rootScope.witnessListShowStatus = true;
            $rootScope.witnessAddShowStatus = false;
            $rootScope.witnessDetailShowStatus = false;
            $rootScope.iswitnessInvolved = null;
            $rootScope.venueLocation = -1;

            //-----------------------securityIncident--------------
            $rootScope.hasInformedPolice = true;
            $rootScope.civilRecovery = true;
            $rootScope.hideFieldSetArray = [];

            $rootScope.currentVisibleIdex = 0;
            $scope.incidentSubmittedShowHide = false;
            $scope.breadCrumDropdownShowHide = true;

            //--------------hide/show button--------------------
            $rootScope.hideButton = false;
            $rootScope.showHomeButton = false;
            $scope.dataSaved = false;
            $scope.fieldData = {};
            var HideFiledSetId = [];
            $scope.networkNotAvailable = false;
            $scope.hideFieldSetForBreadCrum = [];
            $rootScope.currentPagesScopeArray = [];
            $rootScope.idOfFilledFieldSet = [];

            $scope.setIncidentConfig();
            setFormFieldLableData();
            setAllFieldLabelData();

        }



        $scope.loadIncidentConfigData();
//        setTimeout(function () {
//            $scope.$apply(function () {
//                $scope.loadIncidentConfigData();
//               // $scope.setIncidentConfig()
//            });
//
//        }, 2000);
        setFormFieldLableData();
        setAllFieldLabelData();

    }]);
