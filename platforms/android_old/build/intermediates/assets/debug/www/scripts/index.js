
var app = {
// Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {


        document.addEventListener("backbutton", onBackKeyDown, false);
        DEVICE_0S_PLATFORM = device.platform;
        DEVICE_OS_VERSION = device.version;
        webRequestObject = new WebRequestApi();
        dataBaseObj = new LocalDataBase();


   


        // Applock start 
        var lastLoginTimeStamp = localStorage.getItem("loginTimeStamp");
        var serverIntervalTime = localStorage.getItem("serverIntervalTime");
        var lastTouchTime = localStorage.getItem("lastTouchTimeStamp");
        var currentTimeStamp = new Date().getTime();
        if (lastLoginTimeStamp !== null) {

            var oneDayTimeStamp = 24 * 60 * 60 * 1000;
            var fifteenMin = 1000 * 60 * 30; // for app lock 
            var TwentyFiveMin = 1000 * 60 * 60 * 8; // for log out




            //lastLoginTimeStamp = (parseInt(lastLoginTimeStamp) + parseInt(oneDayTimeStamp));





            if (lastTouchTime !== null) {
                //console.log("1");
                var addFifteen = parseInt(lastTouchTime) + fifteenMin;
                var addTwentyFive = parseInt(lastTouchTime) + TwentyFiveMin;
                if (addFifteen >= currentTimeStamp || addTwentyFive > currentTimeStamp) {
                    //console.log("2");
                    isPinscreenVisible = true;
                    resetCheckUserInteractionTimer(2);
                    var is_pin_available_DB = localStorage.getItem("is_pin_available");
                    var is_pin_allowed_DB = localStorage.getItem("is_pin_allowed");
                    if (is_pin_allowed_DB != null) {
                        if (is_pin_allowed_DB == 1) {
                            if (is_pin_available_DB == 1) {

                                $('#header_login').hide();
                                $('#header_pin').show();
                                $("#pin_header").html(localStorage.getItem("loginUsername") + " Enter Passcode");
                            } else {
                                $('#header_login').hide();
                                $('#header_pin').show();
                                $("#pin_header").html(localStorage.getItem("loginUsername") + " Enter Passcode");
                            }
                        }

                    }



                } else if (addTwentyFive < currentTimeStamp) {
                    //console.log("3");
                    $('#header_login').show();
                    $('#header_pin').hide();
                }
            }
        }



        var isErrorLoginPrompt = localStorage.getItem('isErrorLoginPrompt');
        if (isErrorLoginPrompt != null) {
            if (isErrorLoginPrompt) {
                $("#login_error_prompt").show();
            }
        }





        // FOR STATIC LOCATION AND DEVICE ID
        if (staticApp) {
            DEVICE_UUID = 222222;
            CURRENT_LATITUDE = 52.2318259011373; //pos.coords.latitude;
            CURRENT_LONGITUDE = 0.90169273743436;
        } else {
            // FOR DYNAMIC LOCATION AND DEVICE ID

            getDeviceId();
            getCurrentLocation();
        }

    }
};


function getDeviceId() {
    var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
    deviceInfo.get(
            function (result) {
                result = JSON.parse(result);
                DEVICE_UUID = result.deviceID;
            }, function () {
        //console.log("error");
    });
}
//getting current location of user
function getCurrentLocation() {
    var success = function (pos) {
        CURRENT_LATITUDE = pos.coords.latitude; //52.2318259011373;
        CURRENT_LONGITUDE = pos.coords.longitude; //0.90169273743436;
        //console.log("CURRENT_LATITUDE :" + CURRENT_LATITUDE + ":>>>>CURRENT_LONGITUDE: " + CURRENT_LONGITUDE);
        // findWithinRadious(curr_lat,curr_long);

    };
    var fail = function (error) {
        //console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };
    navigator.geolocation.getCurrentPosition(success, fail);
}

function closeErrorPrompt() {
    localStorage.removeItem('isErrorLoginPrompt');
    $("#login_error_prompt").hide();
}



var tap = 0;
function onBackKeyDown() {

    if ($("#header_pin").is(":visible")) {
        $("#header_pin").hide();
        $("#header_login").show();
        return;
    }
    if ($("#header_forgot_password").is(":visible")) {
        $("#header_forgot_password").hide();
        $("#header_login").show();
        return;
    }
    if ($("#header_reset_password").is(":visible")) {
        $("#header_reset_password").hide();
        $("#header_forgot_password").show();
        return;
    }
    if ($("#header_login").is(":visible")) {
        tap = tap + 1;
        if (tap < 2) {
            $("#exitNotification").show();
        }
        if (tap == 2)
            navigator.app.exitApp();
        setTimeout(function () {
            $("#exitNotification").hide();
            tap = 0;
        }, 2000);
    }
}
app.initialize();


