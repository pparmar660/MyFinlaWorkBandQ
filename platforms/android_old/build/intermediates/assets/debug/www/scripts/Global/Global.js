//var LoginObject=new Login();
//var forgotPassObject=new ForgotPassword();
//var pinLockObject=new PinLock();
var webRequestObject;//=new WebRequestApi();
var constanObject = new Constant();
var dataBaseObj;//=new LocalDataBase();
//var navigation=new Navigation();
//var allIncident=new AllIncident();
//var security=new Security();

var CURRENT_LATITUDE = 0.0;
var CURRENT_LONGITUDE = 0.0;
var DEVICE_0S_PLATFORM = "";
var DEVICE_OS_VERSION = "";
var DEVICE_UUID = "222222";
var SPINNER_MESSAGE = "Loading...";
var staticApp =false;
var showNotification = false;

var isTimeOutPopUp = false;
var Time_Out_Period = 0;
var isIdleTimeOut = false;
var Idle_TimeOut_Period = 0;
var GcmReciverId = -1;


var globalApp = {
// Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        // Register push 
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(
                successHandler,
                errorHandler,
                {
                    'senderID': constanObject.PushSenderId,
                    'ecb': 'onNotificationGCM' // callback function
                }
        );
        // push end
    }
}



function successHandler(result) {
    // console.log('Success: ' + result);
}
function errorHandler(error) {
    //console.log('Error: ' + error);
}

function deviceRegistered(id) {
    GcmReciverId = id;
}

function onNotificationGCM(e) {
    //  debugger;
    // alert(JSON.stringify(e));
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                deviceRegistered(e.regid);
            }
            break;

        case 'message':
            if (e.foreground) {
                // When the app is running foreground. 
                //alert("Forground " + e.data);
                return;
            }

            if ((!e.foreground && !e.coldstart && JSON.parse(e.data).id) || e.coldstart) {
                alert("BackGround " + e.data);
                var obj = JSON.parse(e.data);

                switch (obj.modid) {

                    case 213:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/incidentView";
                        break;
                    case 203:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/inboxView";
                        break;
                    case 35:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/inboxView";
                        break;
                    case 249:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/inboxView";
                        break;
                    case 36:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/inboxView";
                        break;
                    case 204:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/taskAndCheckList";
                        break;
                    case 258:
                        localStorage.setItem("pushItemId", obj.id);
                        localStorage.setItem("moduleId", obj.modid);
                        if (obj.id)
                            window.location.href = "dashboard.html#/offenderView";
                        break;

                }
                return;



            }
            break;

        case 'error':
            console.log('Error: ' + e.msg);
            break;

        default:
            console.log('An unknown event was received');
            break;
    }
}

globalApp.initialize();


var checkNetworkConnection = function () {
    //return true;
    try {
        if (!navigator.network)
        {
            // set the parent windows navigator network object to the child window
            navigator.network = window.top.navigator.network;
        }


        // return the type of connection found


        if (staticApp) {
            return ((navigator.network.connection.type === "none" || navigator.network.connection.type === null ||
                    navigator.network.connection.type === "unknown") ? true : true);
        } else {
            return ((navigator.network.connection.type === "none" || navigator.network.connection.type === null ||
                    navigator.network.connection.type === "unknown") ? false : true);
        }
    } catch (e) {

    }
}





var showErrorAlert = function (requestType, responseData) {

    //  alert("Web Request Error : "+ requestType+" : "+ JSON.stringify(responseData));
}

getUserConfig();


//------------------App lock ----------------------


var fifteenMin = 0;//1000 * 60 * 30;// for app lock 
var TwentyFiveMin = 1000 * 60 * 60 * 8; // for log out 




var isPinscreenVisible = false;

var myternerval;

function checkIfLoginPagePinScreen() {
    var isloginPage = false;
    if (isPinscreenVisible) {
        isloginPage = true;
    }
    return isloginPage;
}

function logOut() {

    if (myternerval !== null) {
        window.clearInterval(myternerval);
    }

    var pushNotification = window.plugins.pushNotification;
    pushNotification.unregister(
            successHandler,
            errorHandler
            );



    // console.log('Success: ' + result);

    function errorHandler(error) {
        //console.log('Error: ' + error);
    }

    //localStorage.removeItem("lastTouchTimeStamp");
    var data = {};
    data.uid = localStorage.getItem("userId");
    data.imei = localStorage.getItem("deviceImei");

    function successHandler(result) {
    }

    webRequestObject.postRequest(this, "POST", constanObject.LOG_OUT, data, constanObject.WebRequestType.logOut, false);
    this.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            // alert(JSON.stringify(responseData.responseText));
            return;
        }
        switch (requestType) {

            case constanObject.WebRequestType.logOut:
                $("#logout_timer").hide();
                window.location.href = "index.html";
                break;
        }
    }
    ;

}


function CheckUserInteractionTimer() {

    var timer = 31;
    var circleTimer = 9;


    myternerval = setInterval(function () {
        getUserConfig();
        var lastTouchTime = localStorage.getItem("lastTouchTimeStamp");
        var currentTimeStamp = new Date().getTime();
        var addFifteen_min = parseInt(lastTouchTime) + fifteenMin;
        var addTwentyFive_min = parseInt(lastTouchTime) + TwentyFiveMin;
//        //console.log("isTimeOutPopUp : " + isTimeOutPopUp);
//        //console.log("fifteenMin : " + fifteenMin);
//        //console.log("TwentyFiveMin : " + TwentyFiveMin);
//        
//        //console.log("isIdleTimeOut : "+isIdleTimeOut);
//        //console.log("isTimeOutPopUp : "+isTimeOutPopUp);
        if (lastTouchTime !== null) {
            // //console.log("addTwentyFive_min : "+addTwentyFive_min + ">>Current Time : "+(currentTimeStamp-30000));
            var timer30sec = parseInt(addTwentyFive_min) - parseInt(30000);
            var timer30sec1 = parseInt(addFifteen_min) - parseInt(30000);

            if (timer30sec1 <= currentTimeStamp && !checkIfLoginPagePinScreen() && isIdleTimeOut) {
                //console.log("kkk");
                $("#logout_timer").show();
                timer = timer - 1;

                $("#timerCount").html(timer);

                $(".c100").toggleClass("p" + (circleTimer));
                circleTimer = parseInt(circleTimer + 3);
                //console.log("circleTimer: " + circleTimer);
                if (timer == 0) {
                    //console.log("Final Logout timer : " + timer);
                    timer = 31;
                    RedirectTOLoginOrPin(1);
                }




            } else if (addTwentyFive_min <= currentTimeStamp && checkIfLoginPagePinScreen() && isTimeOutPopUp) {
                // //console.log("qqq");
                RedirectTOLoginOrPin(2);
            }
        } else {

            //console.log("abbbb");
            window.clearInterval(myternerval);
        }
    }, 1000);
}
;// start timer function ends

function resetCheckUserInteractionTimer(type) {
    var currentTimeStamp = new Date().getTime();
    if (myternerval !== null) {
        ////console.log("cleartimer");
        window.clearInterval(myternerval);
    }

    if (type == 1) {
        $("#logout_timer").hide();
        var currentTimeStamp = new Date().getTime();
        localStorage.setItem("lastTouchTimeStamp", currentTimeStamp);
    }
    CheckUserInteractionTimer();
}
;

function RedirectTOLoginOrPin(type) {
    //   //console.log("redirect type" + type);
    var is_pin_available = localStorage.getItem("is_pin_available");
    var is_pin_allowed = localStorage.getItem("is_pin_allowed");

    if (myternerval !== null) {
        if (type == 1) {
            var currentTimeStamp = new Date().getTime();
            localStorage.setItem("lastTouchTimeStamp", currentTimeStamp);
            if (is_pin_allowed == 0) {
                logOut();
//                window.location.href = "index.html";
//                $('#header_login').show();
//                $('#header_pin').hide();
            } else {
                window.location.href = "index.html";
            }

        } else if (type == 2) {
            var currentTimeStamp = new Date().getTime();
            localStorage.setItem("lastTouchTimeStamp", currentTimeStamp);
            window.clearInterval(myternerval);
            $('#header_login').show();
            $('#header_pin').hide();
        }
    }
}
;


function isLoginPage() {
    var isloginPage = false;
    var pageUrl = document.URL;

    if (pageUrl.indexOf("index") > -1) {
        isloginPage = true;
    } else {

        if (pageUrl.indexOf(".html") > -1) {

        } else {
            isloginPage = true;
        }
    }

    return isloginPage;
}


function showSpinner(isShow, isCancleAble, message) {

    if (isShow) {
        window.plugins.spinnerDialog.show(null, message, isCancleAble);
    }

}





var selectedDDId = null;

function setDropDownDirection(id) {
    //console.log("setDropDownDirection");
    selectedDDId = id;
    var scrollTop = $(window).scrollTop();
    var topOffset = $("#" + selectedDDId).offset().top;
    var relativeOffset = topOffset - scrollTop;
    var windowHeight = $(window).height();


    if (relativeOffset > (windowHeight / 2)) {
        $(".dropdown-menu").addClass("reverse");
    } else {
        $(".dropdown-menu").removeClass("reverse");
    }
}

function setLogOutPromptData(data) {
    Time_Out_Period = data.user_config.time_out_period;
    Idle_TimeOut_Period = data.user_config.idle_time_out_period;

    isTimeOutPopUp = (data.user_config.time_out == 1) ? true : false;
    isIdleTimeOut = (data.user_config.idle_time_out == 1) ? true : false;
    switch (Time_Out_Period) {
        case 1:
            Time_Out_Period = 5;
            break;
        case 2:
            Time_Out_Period = 10;
            break;
        case 3:
            Time_Out_Period = 20;
            break;
        case 4:
            Time_Out_Period = 30;
            break;
        case 5:
            Time_Out_Period = 60;
            break;
        case 6:
            Time_Out_Period = 120;
            break;
    }

    switch (Idle_TimeOut_Period) {
        case 1:
            Idle_TimeOut_Period = 5;
            break;
        case 2:
            Idle_TimeOut_Period = 10;
            break;
        case 3:
            Idle_TimeOut_Period = 20;
            break;
        case 4:
            Idle_TimeOut_Period = 30;
            break;
        case 5:
            Idle_TimeOut_Period = 60;
            break;
        case 6:
            Idle_TimeOut_Period = 120;
            break;
    }
    fifteenMin = 1000 * 60 * parseInt(Idle_TimeOut_Period);// for app lock 
    //TwentyFiveMin = 1000 * 60 * parseInt(Time_Out_Period); // for log out 
//    //console.log("Time_Out_Period ??? " + Time_Out_Period);
//    //console.log("isTimeOutPopUp ??? " + isTimeOutPopUp);
//    //console.log("isIdleTimeOut ??? " + isIdleTimeOut);
//    //console.log("Idle_TimeOut_Period ??? " + Idle_TimeOut_Period);

}

function getUserConfig() {
    if (dataBaseObj) {
        dataBaseObj.getDatafromDataBase("SELECT * from " + TABLE_USER_INFO, function (result) {
            if (result.length < 1)
                return;
            var data = JSON.parse(result[0].json_data);
            setLogOutPromptData(data);
            ////console.log("USER CONFIG FROM DB : " + JSON.stringify(data));
        });
    }
}
$(document).ready(function () {


    $(window).scroll(function () {
        setTimeout(function () {
            if (selectedDDId != null)
                setDropDownDirection(selectedDDId);
        }, 100);
    });
});
$(document.body).click(function () {
    if (!isLoginPage()) {
        ////console.log("anywhere click");
        resetCheckUserInteractionTimer(1);
    }
});

///--------------------------------------------------------------------
