BandQModule.factory('CategoryOutcomeTypeService', function ($http) {

    this.testValue = "CategoryOutcomeTypeService";

    this.tempData = [];


    this.getTempData = function(){
        return this.tempData;
    }

    this.setTempData = function(dt){
        this.tempData = dt;
    }


    return {
        testValue: this.testValue,
        tempData: this.tempData,

        getTempData : this.getTempData,
        setTempData : this.setTempData,


    };

});