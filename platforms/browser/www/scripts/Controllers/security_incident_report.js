var angular;
BandQModule.controller("secIncidentReportCtrl1", ['$scope', '$rootScope', 'globalService',
    function ($scope, $rootScope, globalService) {
        $scope.isSkipPage = true;
        $rootScope.show = false;
        $scope.message = false;
        $scope.policeInfo = undefined;
        $scope.mySelectedValues = '';
        //var noOfPageMove;

        $scope.init = function () {
            $scope.policeToolTipMessage = $scope.AllFieldLabelData[18].question_hint;
            $scope.whyNotPoliceToolTipMessage = $scope.AllFieldLabelData[19].question_hint;
            dataBaseObj.countNoOfRow(POLICE_AND_AUTHORITY, function (n) {
                if (n <= 0 && (checkNetworkConnection()))
                    webRequestObject.postRequest($scope, "GET", constanObject.POLICE_LIST, null, constanObject.WebRequestType.PoliceList, false);
            });
            $scope.reset();
        }
        $scope.policeInform = function (status) {
            // globalService.setIsPoliceInform(status);
            if (status == "yes") {
                $rootScope.hasInformedPolice = true;
                $scope.isSkipPage = false;
                $("#yesInfo").addClass("active");
                $("#noInfo").removeClass("active");
            } else if (status == "no") {
                $rootScope.hasInformedPolice = false;
                $scope.isSkipPage = false;
                $("#noInfo").addClass("active");
                $("#yesInfo").removeClass("active");
            }
        }

        $scope.nextButtonClicked = function (callBack) {

            if (!$scope.isSkipPage) {
                $scope.message = false;
                if (!$rootScope.hasInformedPolice) {
                    if (!$scope.policeInfoForm.$valid) {
                        $rootScope.show = true;
                        $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                        return callBack(false, 0);
                    } else {
                        $rootScope.show = false;
                        globalService.setSecurityIncidentReport({"whyNot": $scope.whyNotDesc, "respondingOfficer": '', "isPoliceInform": 'no', "actionTaken": ''});
                        return callBack(true, 3);
                    }

                } else {
                    globalService.setSecurityIncidentReport({"whyNot": '', "respondingOfficer": $scope.policeInfo, "isPoliceInform": 'yes', "actionTaken": $scope.mySelectedValues});
                    return callBack(true, 1);
                }
            } else {
                $scope.message = true;
                $rootScope.show = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                $scope.requiredMsg = "Required";
                return callBack(false, 0);
            }

        };
        $scope.saveButtonClicked = function (callBack) {
            if ($rootScope.hasInformedPolice == false)
                globalService.setSecurityIncidentReport({"whyNot": $scope.whyNotDesc, "respondingOfficer": '', "isPoliceInform": 'no', "actionTaken": ''});
            if ($rootScope.hasInformedPolice == true)
                globalService.setSecurityIncidentReport({"whyNot": '', "respondingOfficer": $scope.policeInfo, "isPoliceInform": 'yes', "actionTaken": $scope.mySelectedValues});

            return callBack(true);
        };
        $scope.back = function (callBack) {
            $scope.message = false;
            return callBack(true);

        }

        $scope.webRequestResponse = function (requestType, status, responseData) {

            if (status == constanObject.ERROR) {
                showErrorAlert(requestType, responseData);
                return;
            }

            switch (requestType) {

                case constanObject.WebRequestType.PoliceList:
                    var data = JSON.stringify(responseData.data);
                    data = data.replace(/[']/g, '');
                    var value = [data, ""];
                    dataBaseObj.deleteTableData(POLICE_AND_AUTHORITY);
                    dataBaseObj.insertData(POLICE_AND_AUTHORITY, JSON_DATA_KEY, value);
                    break;
            }
        };
        $scope.reset = function () {
            var data = globalService.getSecurityIncidentReport();
            if (!data)
                return;
            if (data.isPoliceInform == "no") {
                $scope.policeInform("no");
                $scope.commentText = data.whyNot;
                $scope.whyNotDesc = $scope.commentText;
            } else {
                $scope.policeInform("yes");
                $scope.policeInfo = globalService.getSecurityIncidentReport().respondingOfficer;
                $scope.mySelectedValues = globalService.getSecurityIncidentReport().actionTaken;
            }
        };
        $scope.init();
    }]);
BandQModule.controller("secIncidentReportCtrl2", ['$scope', '$rootScope', '$filter', 'globalService', function ($scope, $rootScope, $filter, globalService) {
        // var noOfPageMove;
        $rootScope.show = false;
        $scope.init = function () {
            //  noOfPageMove = _noOfPageMove;

            $scope.venueId = globalService.getVenueId();
            $scope.policeId = globalService.getPoliceForceId();
            dataBaseObj.countNoOfRow(POLICE_AND_AUTHORITY, function (n) {
                if (n > 0 && (!checkNetworkConnection()))
                    policeList();
                else {
                    webRequestObject.postRequest($scope, "GET", constanObject.POLICE_LIST, null, constanObject.WebRequestType.PoliceList, false);
                    $scope.reset();
                }
            });

        };
        function policeList() {
            var getQuery = "SELECT json_data from " + POLICE_AND_AUTHORITY;
            dataBaseObj.getDatafromDataBase(getQuery, function (result) {
                var addPoliceList = angular.element($("#72")).scope();
                $scope.$apply(function () {
                    addPoliceList.secIncidentReports = result;
                    $scope.policeInfo = {};
//                        alert($scope.policeId);
                    $scope.reset();
                    if (!globalService.getSecurityIncidentReport().respondingOfficer) {
                        var report = ($filter('filter')($scope.secIncidentReports, {id_pat: $scope.policeId}));
                        $scope.policeInfo.selectedRespondingOfficer = report[0];
                        $scope.policeInfo.selectedOfficerInCharge = report[0];
                    }
                });
            }, true);
        }
        ;

        $scope.nextButtonClicked = function (callBack) {
            $rootScope.show = false;

            $scope.selectedOffenderData = globalService.getOffender();
            // alert(JSON.stringify($scope.selectedOffenderData));
            if ($scope.officerForm.$valid) {
                $rootScope.show = false;
                ////console.log("Responding officer" +JSON.stringify($scope.policeInfo));
                globalService.setSecurityIncidentReport({"whyNot": '', "respondingOfficer": $scope.policeInfo, "isPoliceInform": 'yes', "actionTaken": $scope.mySelectedValues});
                if ($scope.selectedOffenderData.offenderDetails == 0) {
                    return callBack(true, 2);
                } else {
                    return callBack(true, 1);
                }
            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                return callBack(false, 0);
            }
        };
         $scope.saveButtonClicked = function (callBack) {
              globalService.setSecurityIncidentReport({"whyNot": '', "respondingOfficer": $scope.policeInfo, "isPoliceInform": 'yes', "actionTaken": $scope.mySelectedValues});
             return callBack(true);
        };

        $scope.back = function (callBack) {
            return callBack(true);
        };


       
        $scope.webRequestResponse = function (requestType, status, responseData) {

            if (status == constanObject.ERROR) {
                showErrorAlert(requestType, responseData);
                return;
            }

            switch (requestType) {

                case constanObject.WebRequestType.PoliceList:
                    var data = JSON.stringify(responseData.data);
                    data = data.replace(/[']/g, '');
                    var value = [data, ""];
                    dataBaseObj.deleteTableData(POLICE_AND_AUTHORITY);
                    dataBaseObj.insertData(POLICE_AND_AUTHORITY, JSON_DATA_KEY, value);
                    policeList();
                    break;
            }
        };
        $scope.reset = function () {
            var data = globalService.getSecurityIncidentReport();
            if (data.respondingOfficer) {
                if (data.isPoliceInform == "yes") {
                    $scope.policeInfo = data.respondingOfficer;
                    $scope.mySelectedValues = data.actionTaken;
                }
            }
        };
        $scope.init();
    }]);

BandQModule.controller("secIncidentReportCtrl3", ['$scope', '$http', 'globalService', function ($scope, $http, globalService) {
        $scope.policeInfos = {};
        // var noOfPageMove;
        $scope.mySelectedValues = {};
        $scope.selectedOffenderData = [];
        //  $scope.years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        $scope.init = function () {
            $scope.selectedOffenderData = globalService.getOffender().offenderDetails;
            for (var i = 0; i < $scope.selectedOffenderData.length; i++) {
                if (!$scope.selectedOffenderData[i].day)
                    $scope.selectedOffenderData[i].day = "0";
                if (!$scope.selectedOffenderData[i].month)
                    $scope.selectedOffenderData[i].month = "0";
                if (!$scope.selectedOffenderData[i].year)
                    $scope.selectedOffenderData[i].year = "0";
            }

            //  $scope.ActionTakenToolTipMessage = $scope.fieldData[86].question_hint;
            $scope.selectedOffenderData.forEach(function (offender) {
                if (offender.images > 0) {
                    offender.image = constanObject.offenderImageBaseUrl + offender.id_usr + "/" + "1";
                } else {
                    offender.image = "images/offenders-pic/pic08.jpg";
                }
            });
            $scope.offenderPath = constanObject.offenderImageBaseUrl;
            var getQuestionQuery = "SELECT * from " + TABLE_INCIDENT_CONFIG;
            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
                $scope.policeActionTaken = JSON.parse(result[0].json_data);
                //console.log($scope.policeActionTaken);
                $scope.$apply(function () {
                    $scope.actionTaken = $scope.policeActionTaken.police_action_taken_list;
                });

            });
            $scope.reset();
        };
        $scope.nextButtonClicked = function (callBack) {

            globalService.setOffender({'whyNot': "", 'offenderDetails': $scope.selectedOffenderData, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
            return callBack(true, 1);

        };

        $scope.back = function (callBack) {
            return callBack(true);
        };
        $scope.saveButtonClicked = function (callBack) {
              globalService.setOffender({'whyNot': "", 'offenderDetails': $scope.selectedOffenderData, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
            return callBack(true);
        };

        $scope.reset = function () {
            // console.log("offenderReset" + JSON.stringify(globalService.getOffender()));
            $scope.selectedOffenderAction = globalService.getOffender();
            if (!globalService.getOffender().actionTaken)
                return;
            if (globalService.getOffender().actionTaken) {
                $scope.selectedOffenderData = $scope.selectedOffenderAction.offenderDetails;
                $scope.mySelectedValues = globalService.getOffender().actionTaken;
                //   $scope.mySelectedValues = $scope.selectedOffenderAction.actionTaken;
                for (var i = 0; i < $scope.selectedOffenderData.length; i++) {
                    $scope.mySelectedValues[$scope.selectedOffenderData[i].id_usr] = $scope.selectedOffenderAction.actionTaken[$scope.selectedOffenderData[i].id_usr];
                    if ($scope.selectedOffenderData[i].sentenced == true)
                        $scope.selectedOffenderData[i].sentenced = "true";
                    else if ($scope.selectedOffenderData[i].sentenced == false)
                        $scope.selectedOffenderData[i].sentenced = "false"
                }
            }
        };
        $scope.init();

    }]);