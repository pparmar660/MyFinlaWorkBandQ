
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
     
        webRequestObject = new WebRequestApi();
        dataBaseObj = new LocalDataBase();

    }
};




function onBackKeyDown() {

}
app.initialize();


