BandQModule.service("vehicleService", function () {
    var vehicleInvolvedData = {};
    var plate = null;
    var vehicleList = {};
    this.setVehicleInvolvedData = function (data) {
        vehicleInvolvedData = angular.copy(data);
    };
    this.getVehicleInvolvedData = function () {
        return vehicleInvolvedData;
    };

    this.setVehiclePlate = function (selectedPlate) {
        plate = selectedPlate;
        //console.log("setVehiclePlate : "+plate);
    };

    this.getVehiclePlate = function () {
        return plate;
    };
    this.setVehicleList = function (obj) {
        vehicleList = angular.copy(obj);
    };
    this.getVehicleList = function () {
        return vehicleList;
    };
    var title = "";
    this.setVehicleTitle = function (title1) {
        title = title1;
    };
     this.getVehicleTitle = function () {
        return title;
    };
});


