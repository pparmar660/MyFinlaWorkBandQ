BandQModule.service('WitnessService', function () {
    var selectedWitnessCategory = [];
    var witnessCategory = [];
    this.getWitnessCategory = function (callback) {
        if (!checkNetworkConnection())
            return callback(false);

        webRequestObject.postRequest(this, "GET", constanObject.VICTIME_CATEGORY, null, 101, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText));
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
    };
    this.getWitnessData = function (pageno, url, parameters, callback) {

        //console.log(JSON.stringify(parameters));
        if (pageno == null) {
            webRequestObject.postRequest(this, "GET", url, parameters, 101, true);
        }
        else {
            webRequestObject.postRequest(this, "GET", url + "?page=" + pageno, parameters, 101, true);
        }
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText));
            }
            switch (requestType) {
                case 101:
                    {
                        var offenderList = response.data;
                        if (offenderList.length > 0) {
                            var buddyList = [];
                            offenderList.forEach(function (buddy) {
                                var image;
                                if (buddy.images == 0)
                                    image = "images/offenders-pic/pic08.jpg";
                                else
                                    image = constanObject.WITNESS_IMAGE + buddy.id_usr + "/" + buddy.images;
                                buddy.file_name = image;
                                buddyList.push(buddy);
                            });
                        }

                    }
                    callback(true, response, buddyList, response.next_page_url, response.prev_page_url);
                    break;
            }
        };

    };

    this.addNewWitness = function (URL, parameters, callback) {

        webRequestObject.postRequest(this, "POST", URL, parameters, 101, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                    {
                        callback(true, parseInt(response));
                    }

                    break;
            }
        };

    };
    this.getWitnessDetaile = function (witness_id, callback) {

        var token = window.localStorage.getItem("token");
        webRequestObject.postRequest(this, "GET", constanObject.WITNESS_DETAILS + witness_id, null, 101, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                showErrorAlert(requestType, responseData);
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                    var witness = {};
                    witness.data = [];
                    var categories = [];
                    var categoriesData = response.data.categories;
                    var incident = response.data.incident;
                    witness.data.push(response.data.witness_detail[0]);
                    for (var i in categoriesData) {

                        var item = categoriesData[i];

                        categories.push({
                            "id_uct": item.id_uct,
                            "title_uct": item.title_uct,
                        });
                    }
                    witness.data[0].categories = categories;
                    callback(true, witness, response.data);
                    break;
            }
        };
    };
    this.setSelectedVitnessCategory = function (category_id,doEmpty) {
        if(doEmpty)
            selectedWitnessCategory=[];
        selectedWitnessCategory.push(category_id);
    };
    this.getSelectedVitnessCategory = function () {
        return selectedWitnessCategory;
    };
    this.setWitnessCategory = function(category){
        witnessCategory = angular.copy(category);
    };
    this.getWitnessCategory = function(){
        return witnessCategory;
    };
});
