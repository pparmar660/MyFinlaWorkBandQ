BandQModule.service('getUniqueId', function () {

    this.getId = function () {


        var milliseconds = new Date().getTime();
        return milliseconds;

    }  

    

});
