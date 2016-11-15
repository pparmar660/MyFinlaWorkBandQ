BandQModule.service('VanueService', function ($http) {

    this.getVanueData = function (callback) {
        var token = window.localStorage.getItem("token");
        $http({
            method: 'GET',
            url: constanObject.VANUE_LIST,
            headers: {
                Authorization: token
            },
        }).then(function successCallback(response) {
            //console.log(JSON.stringify(response));
            var vanue = response.data.data;
            dataBaseObj.deleteTableData("vanue");
            vanue.forEach(function (obj) {
                var key = ["id", "venue_name", "address", "postcode", "Lat", "Lng", "telephone", "address2", "region_id", "zone_id", "venue_site_number", "venue_code", "venue_active", "sector_title", "organisation", "police_force", "swasareas"];
                var value = [obj.id == null ? "" : obj.id, obj.venue_name == null ? "" : obj.venue_name, obj.address == null ? "" : obj.address, obj.postcode == null ? "" : obj.postcode,
                    obj.gLat == null ? "" : obj.gLat, obj.gLng == null ? "" : obj.gLng, obj.telephone == null ? "" : obj.telephone, obj.address2 == null ? "" : obj.address2,
                    obj.region_vns == null ? "" : obj.region_vns, obj.zone_vns == null ? "" : obj.zone_vns, obj.venue_site_number == null ? "" : obj.venue_site_number,
                    obj.venue_code == null ? "" : obj.venue_code, obj.venue_active == null ? "" : obj.venue_active, obj.sector_title == null ? "" : obj.sector_title,
                    obj.rganisation == null ? "" : obj.rganisation, obj.police_force == null ? "" : obj.police_force, obj.swasareas == null ? "" : obj.swasareas];
                dataBaseObj.insertData("vanue", key, value);
            });
            callback(true);
        }, function errorCallback(response) {
            callback(false);
        });
    };

});