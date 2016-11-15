var angular;
BandQModule.controller("secIncidentReportCtrl1", ['$scope', '$rootScope', 'globalService', function ($scope, $rootScope, globalService) {
        $scope.isSkipPage = true;
        $rootScope.show = false;
        $scope.message = false;
        var noOfPageMove;

        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
            $scope.policeToolTipMessage = $scope.AllFieldLabelData[18].question_hint;
            $scope.whyNotPoliceToolTipMessage = $scope.AllFieldLabelData[19].question_hint;

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
                        globalService.setSecurityIncidentReport({"whyNot": $scope.policeData.whyNot, "respondingOfficer": '', "isPoliceInform": 'no', "actionTaken": ''});
                        return callBack(true, 3);
                    }

                } else {
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
        $scope.back = function (callBack) {
            $scope.message = false;
            return callBack(true, noOfPageMove);

        }
        $scope.saveButtonAction = function (callBack) {
            return callBack(true);
        };


    }]);
BandQModule.controller("secIncidentReportCtrl2", ['$scope', '$rootScope', '$filter', 'globalService', function ($scope, $rootScope, $filter, globalService) {
        var noOfPageMove;
        $rootScope.show = false;
        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;

            $scope.venueId = globalService.getVenueId();
            $scope.policeId = globalService.getPoliceForceId();
            dataBaseObj.countNoOfRow(POLICE_AND_AUTHORITY, function (n) {
                if (n > 0 && (!checkNetworkConnection()))
                    policeList();
                else
                    webRequestObject.postRequest($scope, "GET", constanObject.POLICE_LIST, null, constanObject.WebRequestType.PoliceList, false);
            });

        };

        $scope.nextButtonClicked = function (callBack) {
            $rootScope.show = false;

            $scope.selectedOffenderData = globalService.getOffender();
            // alert(JSON.stringify($scope.selectedOffenderData));
            if ($scope.officerForm.$valid) {
                $rootScope.show = false;
                ////console.log("Responding officer" +JSON.stringify($scope.policeInfo));
                globalService.setSecurityIncidentReport({"whyNot": '', "respondingOfficer": $scope.policeInfo, "isPoliceInform": 'yes', "actionTaken": ''});
                if ($scope.selectedOffenderData.offenderDetails == 0) {
                    return callBack(true, 2);
                } else {
                    return callBack(true, 1);
                }
            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate
                return callBack(false, 0);
            }
        };

        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);
        };

        function policeList() {
            var getQuery = "SELECT json_data from " + POLICE_AND_AUTHORITY;
            dataBaseObj.getDatafromDataBase(getQuery, function (result) {
                var addPoliceList = angular.element($("#72")).scope();
                $scope.$apply(function () {
                    addPoliceList.secIncidentReports = result;
                    $scope.policeInfo = {};
//                        alert($scope.policeId);
                    var report = ($filter('filter')($scope.secIncidentReports, {id_pat: $scope.policeId}));
                    $scope.policeInfo.selectedRespondingOfficer = report[0];
                    $scope.policeInfo.selectedOfficerInCharge = report[0];

                });
            }, true);
        }

        $scope.saveButtonAction = function (callBack) {
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

    }]);

BandQModule.controller("secIncidentReportCtrl3", ['$scope', '$http', 'globalService', function ($scope, $http, globalService) {
        $scope.policeInfos = {};
        var noOfPageMove;
        $scope.mySelectedValues = {};
        $scope.selectedOffenderData = [];
        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
            $scope.selectedOffenderData = globalService.getOffender().offenderDetails;
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

        };
        $scope.nextButtonClicked = function (callBack) {

            globalService.setOffender({'whyNot': "", 'offenderDetails': $scope.selectedOffenderData, 'isOffenderInvolved': 'Yes', "actionTaken": $scope.mySelectedValues});
            return callBack(true, 1);

        };

        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);
        };
        $scope.saveButtonAction = function (callBack) {
            return callBack(true);
        };
        $scope.policeInfo = '';



//        $http.get('Json_Data/jsonData.json').success(function (data) {
//            $scope.actionTaken = data.police_action_taken_list;
//        });


    }]);