var token = "";
var user_id = "";
var is_pin_available = "";
var is_pin_allowed = "";
BandQModule.controller('LoginCntrl', function ($scope, checkInternetConnectionService,
        createIncidentReport, loadDynamicQuestionAndIncidentConfig, userConfig, filterData, appMenuConfig) {
    $scope.loginError = false;
    $scope.noInternetLogin = false;
    if (staticApp) {
        $scope.colorChangeUname = "rajesh@zincdigital.com";
        $scope.colorChangePassword = "QwErty12";
    }


    $('#password').on('keyup', function (e) {
        var theEvent = e || window.event;
        var keyPressed = theEvent.keyCode || theEvent.which;
        if (keyPressed == 13) {
            $('#button_login').trigger('click');
        }
        return true;
    });


    $('#username').on('keyup', function (e) {
        var theEvent = e || window.event;
        var keyPressed = theEvent.keyCode || theEvent.which;
        if (keyPressed == 13) {
            $('#button_login').trigger('click');
        }
        return true;
    });



    $scope.login1 = function (text) {

        //console.log(DEVICE_0S_PLATFORM + " : " + DEVICE_OS_VERSION + " : " + DEVICE_UUID);
        var email = $('#username').val();
        var password = $('#password').val();
//checkEmail(email)
        if (!true) {
            $("#username").addClass("tx_erorr");
            $scope.loginError = true;
            $scope.LoginErrorMessage = "Please provide valid username";
            return;
        } else {
            $("#username").removeClass("tx_erorr");
            $scope.loginError = false;
        }
        if (password == "") {
            $("#password").addClass("tx_erorr");
            $scope.loginError = true;
            $scope.LoginErrorMessage = "Please provide valid password";
            return;
        } else {
            $("#password").removeClass("tx_erorr");
            $scope.loginError = false;
        }


        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.noInternetLogin = false;
            $scope.loginError = false;
//            var is_pin_available_DB = localStorage.getItem("is_pin_available");
//            var is_pin_allowed_DB = localStorage.getItem("is_pin_allowed");
//            if (is_pin_allowed_DB != null) {
//                if (is_pin_allowed_DB == 1) {
//                    if (is_pin_available_DB == 1) {
//                        $('#header_login').hide();
//                        $('#header_pin').show();
//                    }
//                }
//                else {
//                    window.location.href = "dashboard.html";
//                }
//            }
            // else{
            $scope.noInternetLogin = true;
            // $scope.loginError = true;
            // $scope.LoginErrorMessage = "No Internet Connection";
            // }

            return;
        } else
            $scope.noInternetLogin = false;
        var incidentVersion = localStorage.getItem("incident_version") == null ? -1 : localStorage.getItem("incident_version");
        var requestJson = {
            'email': email,
            'password': password,
            'imei': DEVICE_UUID,
            'latitude': CURRENT_LATITUDE, //"52.2318259011373",
            'longitude': CURRENT_LONGITUDE, //"0.90169273743436"
            'incident_version': incidentVersion,
            'gcmRegisterId': GcmReciverId,
        };
        localStorage.setItem("deviceImei", DEVICE_UUID);
        //console.log("Login Data : " + JSON.stringify(requestJson));
        if(!webRequestObject){
            webRequestObject = new WebRequestApi();
        dataBaseObj = new LocalDataBase();
            
        }
        webRequestObject.postRequest($scope, "POST", constanObject.authenticateUser, requestJson, constanObject.WebRequestType.LoginRequest, true);
    };
    $scope.forgotPasswordButton = function () {
        $scope.loginError = false;
        $scope.noInternetLogin = false;
        $('#username').val("");
        $('#password').val("");
        $('#header_login').hide();
        $('#header_forgot_password').show();
    }

    $scope.closeInternetAlert = function () {
        $scope.noInternetLogin = false;
    };


    $scope.webRequestResponse = function (requestType, status, responseData) {
// stop it for temporary
        if (status == constanObject.ERROR) {
            //console.log("LOGIN : " + responseData.responseJSON.error);
            $scope.$apply(function () {
                $scope.loginError = true;
                $scope.LoginErrorMessage = responseData.responseJSON.error;
                //$scope.$parentalertErrorMessage=responseData.responseJSON.error; $scope.$parent.mainController.alertShowStatus=true;
            });
            return;
        }

        switch (requestType) {

            case constanObject.WebRequestType.LoginRequest:
                //var jsondata = responseData;//JSON.parse(responseData.data);

                var previosuVersion = localStorage.getItem("incident_version") == null ? -1 : localStorage.getItem("incident_version");
                //console.log("Login jsondata : " + JSON.stringify(responseData));
                is_pin_available = responseData.is_pin_available;
                is_pin_allowed = responseData.is_pin_allowed;
                token = responseData.token;
                user_id = responseData.user_id;
                localStorage.setItem("token", "Bearer " + token);
                localStorage.setItem("userId", user_id);
                // App lock start 
                var loginTimeStamp = new Date().getTime();
                localStorage.setItem("loginUsername", responseData.display_firstname);
                var fullUsername = (responseData.display_firstname + " " + responseData.display_lastname);
                localStorage.setItem("fullUsername", fullUsername);
                localStorage.setItem("loginTimeStamp", loginTimeStamp);
                localStorage.setItem("is_pin_available", is_pin_available);
                localStorage.setItem("is_pin_allowed", is_pin_allowed);
                localStorage.setItem("incident_version", responseData.incident_version);
                resetCheckUserInteractionTimer(1);
                // App lock end 
                if (previosuVersion != responseData.incident_version) {
                    userConfig.getUserConfigAtLogin();
                    appMenuConfig.getAppMenuConfigAtLogin();
                    filterData.downLoadDataAtLogin();
                }
                if (is_pin_allowed == 1) {

                    if (is_pin_available == 1) {

                        $("#pin_header").html(localStorage.getItem("loginUsername") + " Enter Passcode");
                        $('#header_login').hide();
                        $('#header_pin').show();
                    } else {

                        $('#header_login').hide();
                        $('#header_pin').show();
                        $('#pin_header').html("Enter a 6 digit PIN for quick access in the future");
                    }
                } else {
                    if(!dataBaseObj)
                         dataBaseObj = new LocalDataBase();

                    dataBaseObj.countNoOfRow(TABLE_CREATE_INCIDENT_REPORT, function (n) {
                        if (n > 0 && (checkNetworkConnection())) {
                            var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                            createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN, true);
                        } else
                            loadDynamicQuestionAndIncidentConfig.downloadData(previosuVersion, responseData.incident_version);
                    });
                    break;
                }
        }
        ;
        function checkEmail(email) {

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(email)) {
                //alert('Please provide a valid email address');
                //email.focus;
                return false;
            }
            return true;
        }
    }
});
BandQModule.directive('changeColorDirective', [function () {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attr) {

                scope.$watch(attr.ngModel, function (v) {
                    if (typeof v == 'undefined')
                        return;
                    colorOnTextType(v, scope.colorChangePassword)
                });
                scope.$watch('colorChangeUname', function (v) {//alert();
                    if (typeof v == 'undefined')
                        return;
                    scope.colorChangeUname = scope.colorChangeUname.replace(/\s+/g, '');
                });
                scope.$watch('colorChangePassword', function (v) {
                    if (typeof v == 'undefined')
                        return;
                    //console.log('1New Value from field 2: ' + v);
                    //console.log('2New Value from field 2: ' + scope.colorChangeUname);
                    colorOnTextType(scope.colorChangeUname, v)
                });
            }
        };
    }]);



function colorOnTextType(uname, pass) {
    //if (uname=="") {return;}
    // if (pass=="") {return;}
    if (typeof uname == 'undefined')
        return;
    if (typeof pass == 'undefined')
        return;
    //console.log('call');
    if (uname.length > 0 && pass.length > 0) {
        $('#button_login').addClass('btn-login');
        $('#button_login').removeClass('btn-deactive');
    } else {
        $('#button_login').addClass('btn-deactive');
        $('#button_login').removeClass('btn-login');
    }
}



