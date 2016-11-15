BandQModule.service('advanceFilter', function () {
    this.getAdvanceSearchConfig = function (callback) {
        this.webRequestResponse = function (requestType, status, response) {

            if (status == constanObject.ERROR) {
//            alert(JSON.parse(responseData.responseText).error);
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                    if (status) {
                        var array = [];

                        for (var index in response.data.gender) {
                            if (response.data.gender.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.gender[index];
                                array.push(obj);
                            }
                        }
                        response.data.gender = array;


                        var array = [];
                        for (var index in response.data.titles) {
                            if (response.data.titles.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.titles[index];
                                array.push(obj);
                            }
                        }
                        response.data.titles = array;



                        array = [];
                        for (var index in response.data.ethnicity) {
                            if (response.data.ethnicity.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.ethnicity[index];
                                array.push(obj);
                            }
                        }
                        response.data.ethnicity = array;
                        array = [];
                        for (var index in response.data.eyecolour) {
                            if (response.data.eyecolour.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.eyecolour[index];
                                array.push(obj);
                            }
                        }
                        response.data.eyecolour = array;
                        array = [];
                        for (var index in response.data.facialhair) {
                            if (response.data.facialhair.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.facialhair[index];
                                array.push(obj);
                            }
                        }
                        response.data.facialhair = array;
                        array = [];
                        for (var index in response.data.haircolour) {
                            if (response.data.haircolour.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.haircolour[index];
                                array.push(obj);
                            }
                        }
                        response.data.haircolour = array;
                        array = [];
                        for (var index in response.data.build) {
                            if (response.data.build.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.build[index];
                                array.push(obj);
                            }
                        }
                        response.data.build = array;
                        array = [];
                        for (var index in response.data.height) {
                            if (response.data.height.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.height[index];
                                array.push(obj);
                            }
                        }
                        response.data.height = array;
                        array = [];
                        for (var index in response.data.piercings) {
                            if (response.data.piercings.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.piercings[index];
                                array.push(obj);
                            }
                        }
                        response.data.piercings = array;
                        array = [];
                        for (var index in response.data.position) {
                            if (response.data.position.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.position[index];
                                array.push(obj);
                            }
                        }

                        response.data.position = array;


                        array = [];
                        for (var index in response.data.tattos) {
                            if (response.data.tattos.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.tattos[index];
                                array.push(obj);
                            }
                        }

                        response.data.tattos = array;




                        array = [];
                        for (var index in response.data.category) {
                            if (response.data.category.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.category[index];
                                array.push(obj);
                            }
                        }
                        response.data.category = array;
                        array = [];
                        for (var index in response.data.severity) {
                            if (response.data.severity.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.severity[index];
                                array.push(obj);
                            }
                        }

                        response.data.severity = array;
                        array = [];
                        for (var index in response.data.form_identity_usr) {
                            if (response.data.form_identity_usr.hasOwnProperty(index)) {
                                var obj = {};
                                obj.keys = index;
                                obj.val = response.data.form_identity_usr[index];
                                array.push(obj);
                            }
                        }
                        response.data.form_identity_usr = array;
                        return callback(true, response.data);
                    }
                    break;
            }
        };
        webRequestObject.postRequest(this, "GET", constanObject.SEARCH_CINFIG_URL, null, 101, true);

    };
});

BandQModule.service('OffenderService', function () {
    var self = this;
    var callBack;
    this.getOffenderList = function (pageno, url, parameters, callback) {
        var urll;
        if (url.indexOf("?") >= 0)
            urll = url + "&page=" + pageno;
        else
            urll = url + "?page=" + pageno;

        callBack = callback;
          self.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            return callback(false, JSON.parse(responseData.responseText));
        }
        switch (requestType) {
            case 2541:
                if (status) {
                    //console.log(JSON.stringify(responseData.data));
                    var offenderList = responseData.data;
//                        if (offenderList) {
                    if (offenderList.length > 0) {
                        var buddyList = [];
                        offenderList.forEach(function (buddy) {
                            var image;
                            if (buddy.images == 0)
                                image = "images/offenders-pic/pic08.jpg";
                            else
                                image = constanObject.offenderImageBaseUrl + buddy.id_usr + "/" + "1"
                            buddy.file_name = image;
                            buddy.last_updated = moment(buddy.last_updated).format('Do MMM YYYY');
                            buddyList.push(buddy);
                        });
//                            }

                        return callback(true, responseData, buddyList);
                    }
                }
                break;
        }
    };
        webRequestObject.postRequest(self, "GET", urll, parameters, 2541, true);

    };

    this.getOffenderTypeList = function (pageno, url, parameters, callback) {
        var urll = url + "&page=" + pageno;

        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
//            alert(JSON.parse(responseData.responseText).error);
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case 254:
                    if (status) {
                        //console.log(JSON.stringify(responseData.data));
                        var offenderList = responseData.data;
//                        if (offenderList) {
                        if (offenderList.length > 0) {
                            var buddyList = [];
                            offenderList.forEach(function (buddy) {
                                var image;
                                if (buddy.images == 0)
                                    image = "images/offenders-pic/pic08.jpg";
                                else
                                    image = constanObject.offenderImageBaseUrl + buddy.id_usr + "/" + "1"
                                buddy.file_name = image;
                                buddy.last_updated = moment(buddy.last_updated).format('Do MMM YYYY');
                                buddyList.push(buddy);
                            });
//                            }

                            return callback(true, responseData, buddyList);
                        }
                    }
                    break;
            }
        };

        webRequestObject.postRequest(this, "GET", urll, parameters, 254, true);

    };

    this.addNewOffender = function (parameters, callback) {
        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
//            alert(JSON.parse(responseData.responseText).error);
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case 1017:
                    callback(true, responseData);
                    break;
            }
        };

        webRequestObject.postRequest(this, "POST", constanObject.ADD_OFFENDER_URL, parameters, 1017, true);

    };

    this.getOffenderDetail = function (offenderId, callback) {
        var self = this;
        self.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
//            alert(JSON.parse(responseData.responseText).error);
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case constanObject.WebRequestType.OFFENDER_FILTER:
//                    if (response.hasOwnProperty("data")) {
                    var userdata = response.data.offender_detail[0];
                    var piercing = {};
                    var tattoo = {};
                    var scar = {};
                    for (var i in userdata) {
                        //console.log(i);
                        (userdata[i] == null || userdata[i] == "") ? userdata[i] = "<b>Not Entered</b>" : userdata[i] = userdata[i];
                    }

                    if (!userdata.hasOwnProperty("facial_hair_title"))
                        userdata.facial_hair_title = "<b>Not Entered</b>";

                    userdata.firstname_usr == "<b>Not Entered</b>" ? userdata.firstname_usr = "Unknown" : userdata.firstname_usr = userdata.firstname_usr;
                    userdata.middlename_usr == "<b>Not Entered</b>" ? userdata.middlename_usr = "Unknown" : userdata.middlename_usr = userdata.middlename_usr;
                    userdata.lastname_usr == "<b>Not Entered</b>" ? userdata.lastname_usr = "Unknown" : userdata.lastname_usr = userdata.lastname_usr;
                    userdata.images == "<b>Not Entered</b>" ? userdata.images = 0 : userdata.images = userdata.images;
                    userdata.offender_category == "<b>Not Entered</b>" ? userdata.offender_category = null : userdata.offender_category = userdata.offender_category;
                    userdata.build_type_usr == "<b>Not Entered</b>" ? userdata.build_type_usr = null : userdata.build_type_usr = userdata.build_type_usr;

                    if (response.data.piercing)
                        piercing = response.data.piercing[0];
                    if (response.data.tattoo)
                        tattoo = response.data.tattoo[0];
                    if (response.data.scar)
                        scar = response.data.scar[0];
//
//                    if (userdata.sex_usr == 1)
//                        userdata.sex_usr = "Male";
//                    else if (userdata.sex_usr == 2)
//                        userdata.sex_usr = "Female";
//                    else if (userdata.sex_usr == 3)
//                        userdata.sex_usr = "Transgender";

                    if (typeof userdata.form_identity != "object")
                        userdata.form_identity = [];

                    callback(true, userdata, response.data);

                    break;
            }
        };

        webRequestObject.postRequest(self, "GET", constanObject.OFFENDER_DETAIL_URL + offenderId, null, constanObject.WebRequestType.OFFENDER_FILTER, true);

    };
    this.editOffender = function (offenderID, parameters, callback) {
        this.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
//            alert(JSON.parse(responseData.responseText).error);
                return callback(false, JSON.parse(responseData.responseText).error);
            }
            switch (requestType) {
                case 1987:
                    if (responseData.hasOwnProperty("data")) {
//                        //console.log(responseData.config.headers.Authorization);
                        callback(true, offenderID);
                    }
                    break;
            }
        };

        webRequestObject.postRequest(this, "POST", constanObject.EDIT_OFFENDER_URL + offenderID, parameters, 1987, true);

    };

  
});
