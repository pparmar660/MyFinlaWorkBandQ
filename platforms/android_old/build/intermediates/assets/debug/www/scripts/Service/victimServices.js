BandQModule.service('VictimWitness', function ($http) {
    var selectedVictimCategory = [];
  var victimCategory = [];
    this.getVictimeCategory = function (callback) {
        webRequestObject.postRequest(this, "GET", constanObject.VICTIME_CATEGORY, null, 101, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                    {
                        //console.log(JSON.stringify(response));
                        callback(true, response.data);
                    }

                    break;
            }
        };
//        var token = window.localStorage.getItem("token");
//        $http({
//            method: 'GET',
//            url: constanObject.VICTIME_CATEGORY,
//            headers: {
//                Authorization: token
//            },
//        }).then(function successCallback(response) {
//            //console.log(JSON.stringify(response));
//            if (response.hasOwnProperty("data")) {
//                callback(true, response.data.data);
//            }
//
//        }, function errorCallback(response) {
//            //console.log(response.data.error);
//            callback(false, null);
//        });
    };
    this.getVictimeData = function (pageno, url, parameters, callback) {

        //console.log(JSON.stringify(parameters));
        if(pageno == null){
            webRequestObject.postRequest(this, "GET", url , parameters, 1011, true);
        }
        else{
            webRequestObject.postRequest(this, "GET", url + "?page=" + pageno, parameters, 1011, true);
        }
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText));
            }
            switch (requestType) {
                case 1011:
                    {
                        var offenderList = response.data;
                        if (offenderList.length > 0) {
                            var buddyList = [];
                            offenderList.forEach(function (buddy) {
                                var image;
                                if (buddy.images == 0)
                                    image = "images/offenders-pic/pic08.jpg";
                                else
                                    image = constanObject.VICTIME_IMAGE + buddy.id_usr + "/" + buddy.images;
                                buddy.file_name = image;
                                buddyList.push(buddy);
                            });
                        }

                    }
                    callback(true, response, buddyList, response.next_page_url,response.prev_page_url);
                    break;
            }
        };

    };

    this.addNewVictim = function (URL, parameters, callback) {
           var self = this;
        webRequestObject.postRequest(self, "POST", URL, parameters, 10111, true);
        self.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 10111:
                    {
                        callback(true, response);
                    }

                    break;
            }
        };

    };
    this.getVictimeDetaile = function (victim_id, callback) {

        var token = window.localStorage.getItem("token");
        webRequestObject.postRequest(this, "GET", constanObject.VICTIME_DETAILS + victim_id, null, 101111, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101111:
                    {
                        var victims = {};
                        victims.data = [];
                        var categories = [];
                        var categoriesData = response.data.categories;
                         var incident = response.data.incident;
                        victims.data.push(response.data.victim_detail[0]);
                        for (var i in categoriesData) {
                            var item = categoriesData[i];

                            categories.push({
                                "id_uct": item.id_uct,
                                "title_uct": item.title_uct,
                            });
                        }
                        victims.data[0].categories = categories;
                        //callback(true, victims,incident);
                        callback(true, victims,response.data);
                    }
                    break;
            }
        };
    };
    
    this.setSelectedVictimCategory = function(category_id,doEmpty){
        if(doEmpty)
            selectedVictimCategory=[];
        
        selectedVictimCategory.push(category_id);
    };
    
    this.getSelectedVictimCategory = function(){
        return selectedVictimCategory;
    };
    this.setVictimCategory = function(category){
        victimCategory = angular.copy(category);
    };
    this.getVictimCategory = function(){
        return victimCategory;
    };
});
