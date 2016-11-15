var selfOfMain = this;
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
        // FastClick.attach(document.body);
        DEVICE_0S_PLATFORM = device.platform;
        DEVICE_OS_VERSION = device.version;
        DEVICE_UUID = device.uuid;

//        CURRENT_LATITUDE = 28.6139391,//52.2318259011373;//pos.coords.latitude;
//        CURRENT_LONGITUDE = 77.21802120000005,//0.90169273743436;

        webRequestObject = new WebRequestApi();
        dataBaseObj = new LocalDataBase();

        // get country,state ,region and zone list


        if (staticApp) {
            DEVICE_UUID = 222222;
            CURRENT_LATITUDE = 52.2318259011373; //pos.coords.latitude;
            CURRENT_LONGITUDE = 0.90169273743436;
        } else {
            // FOR DYNAMIC LOCATION AND DEVICE ID

            setTimeout(function () {
                getCurrentLocation();

            }, 500)
        }



        // get country,state ,region and zone list

//        if (checkNetworkConnection()) {
//            webRequestObject.postRequest(self, "GET", constanObject.FILTER_DATA,
//                    "", constanObject.WebRequestType.FilterData, false);
//                    
//                     webRequestObject.postRequest(selfOfMain, "GET", constanObject.VENUE_LIST,
//                    "", constanObject.WebRequestType.VENUE_LIST, false);
//        }

    }
};

this.webRequestResponse = function (requestType, status, responseData) {

    if (status == constanObject.ERROR) {
        showErrorAlert(requestType, responseData);
        return;
    }
    switch (requestType) {
        case constanObject.WebRequestType.FilterData:
            insertCountryReginonZoneCityStae(responseData);
            break;

        case  constanObject.WebRequestType.VENUE_LIST:
            insertVenueListData(responseData);
            break;



    }
};

function onBackKeyDown() {


    var tap = tap + 1;
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

function insertCountryReginonZoneCityStae(response) {

    if (response != null) {
        dataBaseObj.deleteTableData(TABLE_COUNTRY_STATE_REGION_CITY);
        dataBaseObj.insertData(TABLE_COUNTRY_STATE_REGION_CITY, JSON_FIELD_ARRAY, response, true);
    }
}


function insertVenueListData(response) {

    // Venue

    dataBaseObj.deleteTableData(TABLE_VENUE);
    dataBaseObj.insertData(TABLE_VENUE, JSON_FIELD_ARRAY, response.data, true);


}


function getCurrentLocation() {
    //console.log("getCurrentLocation")
    var success = function (pos) {
        CURRENT_LATITUDE = pos.coords.latitude;//52.2318259011373;//pos.coords.latitude;
        CURRENT_LONGITUDE = pos.coords.longitude;//0.90169273743436;//pos.coords.longitude;
        //console.log("current :" + CURRENT_LATITUDE + ":" + CURRENT_LONGITUDE);
        // findWithinRadious(curr_lat,curr_long);
        dataBaseObj.countNoOfRow(TABLE_COUNTRY_STATE_REGION_CITY, function (noOfRow) {
            if (noOfRow <= 0 || checkNetworkConnection())
                webRequestObject.postRequest(selfOfMain, "GET", constanObject.FILTER_DATA + "?latitude=" + CURRENT_LATITUDE + "&longitude=" + CURRENT_LONGITUDE,
                        "", constanObject.WebRequestType.FilterData, true);

        });

    };
    var fail = function (error) {
        //console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };
    navigator.geolocation.getCurrentPosition(success, fail);
}




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
        navigator.app.exitApp();
    }
}
app.initialize();


