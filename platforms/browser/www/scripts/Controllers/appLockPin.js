var pin1 = "";
var pin2 = "";
BandQModule.controller('AppLockPinCntrl', function ($scope, $sce, checkInternetConnectionService, createIncidentReport, loadDynamicQuestionAndIncidentConfig, filterData, userConfig) {
    $scope.pinValue = "";
    $scope.PinError = false;
    $scope.noInternetPin = false;


    /*$scope.$watch('PinError', function() {
     if($("#header_pin").not(":visible")){
     $scope.PinError = false;
     $scope.noInternetPin = false;
     }
     });*/
    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        if ($("#header_pin").is(":visible")) {
            $scope.PinError = false;
            $scope.noInternetPin = false;
            deleteAllKey();
        }
    }


    $scope.init = function () {

        if (localStorage.getItem("is_pin_allowed") == "1") {

            dataBaseObj.countNoOfRow(TABLE_CREATE_INCIDENT_REPORT, function (n) {
                if (n > 0 && (checkNetworkConnection())) {
                    var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                    createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN, true);
                }
            });

        }
    }


    $scope.keyTouch = function (keyValue) {
        //alert("keyValue : "+keyValue);

        if ($scope.pinValue.length >= 6) {
            $scope.PinError = true;
            $scope.noInternetPin = false;
            $scope.PincodeErrorMessage = $sce.trustAsHtml("Only 6 digits are allowed");
            // alert("Only 6 digits are allowed");
            return;
        } else {
            // $scope.PinError = false;
            $("#loginPinBtn").addClass("btn-deactive");

        }
        $scope.PinError = false;
        $scope.pinValue = $scope.pinValue.concat(keyValue);
        if ($scope.pinValue.length == 6) {
            $("#loginPinBtn").removeClass("btn-deactive");
        } else {
            $("#loginPinBtn").addClass("btn-deactive");
        }
        for (var i = 1; i <= $scope.pinValue.length; i++) {
            if ($scope.pinValue.length == i) {
                $("#numKey" + i).html('<li><span></span></li>');
            }
        }
    };
    $scope.buttonLoginWithPin = function () {


        //console.log("is_pin_available: " + is_pin_available + " >>>is_pin_allowed: " + is_pin_allowed + ">>token: " + token + ">>user_id: " + user_id);

        if (!checkInternetConnectionService.checkNetworkConnection()) {
//            $scope.noInternetPin = true;
//            $scope.PinError = false;
            var is_pin_available1 = localStorage.getItem("is_pin_available");
            var is_pin_allowed1 = localStorage.getItem("is_pin_allowed");
            var LoginPin = localStorage.getItem("LoginPin");
            if (is_pin_allowed1 == 1) {
                if (is_pin_available1 == 1) {

                    if ($scope.pinValue == LoginPin) {
                        window.location.href = "dashboard.html";
                    } else {

                        $scope.PinError = false;
                        $scope.noInternetPin = false;
                        $scope.PincodeErrorMessage = $sce.trustAsHtml("Please provide valid passcode!");
                    }
                }
            }

            //return;
        }
//        else {
//            $scope.noInternetPin = false;
//            $scope.PinError = false;
//        }


        if (is_pin_allowed == 1) {
            if (is_pin_available == 1) { //1
                if ($scope.pinValue.length == 6) {


                    if (!checkInternetConnectionService.checkNetworkConnection()) {
                        $scope.noInternetPin = true;
                        $scope.PinError = false;
                        return;
                    } else {
                        $scope.noInternetPin = false;
                        $scope.PinError = false;
                    }
                    var incidentVersion = localStorage.getItem("incident_version") == null ? -1 : localStorage.getItem("incident_version");


                    var requestJson = {
                        'uid': user_id, //832,
                        'pin': $scope.pinValue,
                        'imei': DEVICE_UUID,
                        'latitude': CURRENT_LATITUDE, //"52.2318259011373",
                        'longitude': CURRENT_LONGITUDE, //"0.90169273743436"
                        'incident_version': incidentVersion,
                    };
                    webRequestObject.postRequest($scope, "POST", constanObject.authenticatePin, requestJson, constanObject.WebRequestType.LoginPinrequest, false);
                } else {
                    $scope.PinError = true;
                    $scope.noInternetPin = false;
                    $scope.PincodeErrorMessage = $sce.trustAsHtml("Please provide 6 digits passcode");
                    // alert('Please provide 6 digits passcode');
                    // deleteAllKey();
                }
            } else {

                //console.log("$scope.pinValue: " + $scope.pinValue + ">>pin_header text: " + $('#pin_header').html());
                var header_text = $('#pin_header').html();
                if (!checkpin($scope.pinValue)) {
                    $scope.PinError = true;
                    $scope.noInternetPin = false;
                    $scope.PincodeErrorMessage = $sce.trustAsHtml("Error : Please enter a different PIN with <br> - No sequence (forward/backward) <br> - No repetitive number");
                    deleteAllKey();
                    return false;
                }
                if (header_text == "Enter a 6 digit PIN for quick access in the future") {
                    pin1 = $scope.pinValue;
                    deleteAllKey();
                    $scope.PinError = false;
                    $('#header_login').hide();
                    $('#header_pin').show();
                    $('#pin_header').html("Repeat PIN");
                    return;
                } else {
                    pin2 = $scope.pinValue;
                }
                deleteAllKey();
                //console.log("PIN1: " + pin1 + ">>>PIN2: " + pin2);

                var incidentVersion = localStorage.getItem("incident_version") == null ? -1 : localStorage.getItem("incident_version");


                if (pin1 == pin2) {
                    if (pin1.length == 6) {
                        var requestJson = {
                            'uid': user_id,
                            'pin': pin1,
                            'incident_version': incidentVersion,
                        };
                        webRequestObject.postRequest($scope, "POST", constanObject.updatePin, requestJson, constanObject.WebRequestType.UpdatePinRequest, false);
                    } else {
                        $scope.PinError = true;
                        $scope.noInternetPin = false;
                        $scope.PincodeErrorMessage = $sce.trustAsHtml("Please provide 6 digits passcode");
                        //deleteAllKey();
                    }
                } else {
                    $scope.PinError = true;
                    $scope.noInternetPin = false;
                    $scope.PincodeErrorMessage = $sce.trustAsHtml("Sorry. Passcodes do not match.");
                }

            }
        } else {
            if ($scope.pinValue.length == 6) {

                var incidentVersion = localStorage.getItem("incident_version") == null ? -1 : localStorage.getItem("incident_version");

                var requestJson = {
                    'uid': localStorage.getItem("userId"), //832,
                    'pin': $scope.pinValue,
                    'imei': DEVICE_UUID,
                    'latitude': CURRENT_LATITUDE, //"52.2318259011373",
                    'longitude': CURRENT_LONGITUDE,
                    'incident_version': incidentVersion, //"0.90169273743436" 
                };
                webRequestObject.postRequest($scope, "POST", constanObject.authenticatePin, requestJson, constanObject.WebRequestType.LoginPinrequest, false);
            } else {
                $scope.PinError = true;
                $scope.noInternetPin = false;
                $scope.PincodeErrorMessage = $sce.trustAsHtml("Please provide 6 digits passcode");
            }

        }
    };

    function checkpin(pin) {
        var ascendingPin = "";
        var descendingPin = "";
        var isValidPIN = false;
        for (var i = 0; i < pin.length; i++) {
            ascendingPin = ascendingPin.concat(parseInt(pin.charAt(0)) + i);
            descendingPin = descendingPin.concat(parseInt(pin.charAt(0)) - i);
        }
        if (ascendingPin == pin) {
            //alert("Pin can't be ascending oreder.");
            isValidPIN = false;
            return false;
        } else {
            isValidPIN = true;
        }

        if (descendingPin == pin) {
            //alert("Pin can't be descending oreder.")
            isValidPIN = false;
            return false;
        } else {
            isValidPIN = true;
        }

        for (var i = 0; i < pin.length; i++) {
            for (var j = i + 1; j < pin.length; j++) {
                if (pin.charAt(i) == pin.charAt(j)) {
                    // alert("Pin can't be match.");
                    isValidPIN = false;
                    return false;
                }
            }
        }
        return isValidPIN;
    }
    ;

    function deleteAllKey() {
        for (var i = 1; i <= $scope.pinValue.length; i++) {
            $("#numKey" + i).html(' <li></li> ');
        }
        $scope.pinValue = "";
    }
    ;

    $scope.buttonCancel = function () {
        $scope.PinError = false;
        $scope.noInternetPin = false;
        deleteAllKey();
        $('#header_pin').hide();
        $('#header_login').show();
    };

    $scope.buttonDelete = function () {

        if ($scope.pinValue.length > 0) {
            $("#numKey" + $scope.pinValue.length).html('<li></li>');
            $scope.pinValue = $scope.pinValue.substring(0, $scope.pinValue.length - 1);
            //console.log("$scope.pinValue.length : " + $scope.pinValue.length);
            if ($scope.pinValue.length < 6) {
                $("#loginPinBtn").addClass("btn-deactive");
            }
            $scope.PinError = false;
            $scope.noInternetPin = false;
        }

    };
    $scope.closeInternetAlert = function () {
        $scope.noInternetPin = false;
    }

    $scope.webRequestResponse = function (requestType, status, responseData) {
        //console.log("requestType: " + requestType + ">>>>status: " + status);
        if (status == constanObject.ERROR) {
            $scope.$apply(function () {
                $scope.PinError = true;
                $scope.noInternetPin = false;
                $scope.PincodeErrorMessage = $sce.trustAsHtml(responseData.responseJSON.error);
                if ($scope.PincodeErrorMessage == "Login Error : Invalid Credentials")
                    deleteAllKey();
            });
            return;
        }

        switch (requestType) {
            case constanObject.WebRequestType.LoginPinrequest:
                var previosuVersion = localStorage.getItem("incident_version") == null ? -1 : localStorage.getItem("incident_version");
                is_pin_available = responseData.is_pin_available;
                is_pin_allowed = responseData.is_pin_allowed;
                token = responseData.token;
                user_id = responseData.user_id;
                localStorage.setItem("token", "Bearer " + token);
                localStorage.setItem("LoginPin", $scope.pinValue);
                localStorage.setItem("incident_version", responseData.incident_version);

                dataBaseObj.countNoOfRow(TABLE_CREATE_INCIDENT_REPORT, function (n) {
                    if (n > 0 && (checkNetworkConnection())) {
                        var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                        createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN, true);
                    } else {
                        loadDynamicQuestionAndIncidentConfig.downloadData(previosuVersion, responseData.incident_version);

                    }
                });
                // window.location.href = "dashboard.html";



                // alert( $scope.$parent.mainController.incidentReportShowStatus);
                break;
            case constanObject.WebRequestType.UpdatePinRequest:
                //alert(responseData.data);
                window.location.href = "dashboard.html";
                break;
        }

    };
    $scope.touchStart = function ($event) {
        //console.log('touchstart event called');
    }
    
    
    var loadData = function () {

        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            $scope.init();



        } else
            setTimeout(function () {
                $scope.$apply(function () {
                    loadData();
                })

            }, 150);
    }



    loadData();
    checkInternetConnectionService.setValueOfNetWorkConnection();
});



