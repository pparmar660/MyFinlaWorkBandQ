BandQModule.controller('addNewOffenderCnt', function ($scope, OffenderService, $rootScope, imageService, checkInternetConnectionService, globalService, getUniqueId, getCountryStateRegion, getAdvanceFilter) {
    $scope.formData = {image_users: ["images/profile_img.png"]};
    $scope.offData = {};
    $scope.heightinFeet = "0 ft 0 in";
    $scope.weightStone = "0 st 0 lb";
    $scope.modelData = {};
    $scope.modelData.scarfield = {};
    $scope.modelData.scarfield.dropValue = [];
    $scope.images = [];
    $scope.formIdentity = [];
    var multifile;
    $scope.updateOffender = null;
    $scope.title;
    $scope.offenderId = null;
    $scope.Desc = null;
    $scope.isImageAdd = null;
    $scope.editOffender = false;
    $scope.profileImage = null;
    $scope.isCameraOption = false;
    $scope.refrenceIds = [];
    $scope.showProfileCancel = false;
    var i = 0;
    $scope.picrcingsFields = [{id: i, dropValue: "", desc: ""}];
    $scope.tattoosFields = [{id: i, dropValue: "", desc: ""}];
    $scope.scarFields = [{id: i, dropValue: "", desc: ""}];
    $scope.identityUsed = {};
    $scope.scarFieldsSendData = [];
    $scope.tattoosFieldsSendData = [];
    $scope.picrcingsFieldsSendData = [];
    var isProfileImage = false;
    $scope.identityFields = [{id: i, refID: "", refNumber: "", other: 0, form_identity_other: ""}];

    $scope.title_usr = [];
    $scope.weight = [];
    $scope.ethnicity = [];
    $scope.gender = [];
    $scope.eyecolor = [];
    $scope.haircolor = [];
    $scope.facialcolor = [];
    $scope.piePosition = [];
    $scope.tattooPosition = [];

    $scope.heightSliderValue = 0;
    $scope.weightSliderValue = 0;

    $scope.country = [];
    $scope.state = [];
    $scope.city = [];

    $scope.piercings = [{id: 0, val: "NO"}, {id: 1, val: "YES"}];
    $scope.glasses = [{id: 0, val: "NO"}, {id: 1, val: "YES"}];
    $scope.tattos = [{id: 0, val: "NO"}, {id: 1, val: "YES"}];
    $scope.scarification = [{id: 0, val: "NO"}, {id: 1, val: "YES"}];




    var i = 0;
    var noOfPageMove;
    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
        if ($rootScope.offenserAddShowStatus) {
            $scope.isCameraOption = false;
            $scope.formData = {};
            $scope.modelData = {};
            $scope.images = [];
            $scope.isImageAdd = false;
            $scope.identityFields = [{id: i, refID: "", refNumber: "", other: 0, form_identity_other: ""}];
            $scope.modelData.tattoo_usr = 0;
            $scope.modelData.piercing_usr = 0;
            $scope.modelData.glasses_usr = 0;
            $scope.modelData.scar_usr = 0;
            $scope.modelData.sex_usr = {id: 0, val: "Please select"};
            $scope.modelData.ethnicity = {id: 0, val: "Please select"};
            $scope.modelData.height_type_usr = {id: 0, val: "Please select"};
            $scope.modelData.weight_usr = {id: 0, val: "Please select"};
            $scope.modelData.hair_color_usr = {id: 0, val: "Please select"};
            $scope.modelData.eye_color_usr = {id: 0, val: "Please select"};
            $scope.modelData.facial_hair_usr = {id: 0, val: "Please select"};
            $scope.modelData.title_usr = {id: 0, val: "Please select"};
            $scope.modelData.id = {id: 0, val: "Please select"};
            $scope.modelData.city_usr = {id_cit: 0, name_cit: "Please select"};
            $scope.modelData.state_usr = {id_sta: 0, name_sta: "Please select"};
            $scope.modelData.country_usr = {id_cnt: 0, name_cnt: "Please select"};
            $scope.modelData.piercing_usr_pos = {id: 0, val: "Please Select"};
            $scope.modelData.tattoo_usr_pos = {id: 0, val: "Please Select"};
            $scope.modelData.scar_usr_pos = {id: 0, val: "Please Select"};

            $scope.picrcingsFields = [{id: i, dropValue: "", desc: ""}];
            $scope.tattoosFields = [{id: i, dropValue: "", desc: ""}];
            $scope.scarFields = [{id: i, dropValue: "", desc: ""}];

            $scope.profileImage = null;
            $scope.formData = {image_users: ["images/profile_img.png"]};
            $scope.formData.slider_height_value = 0;
            $scope.formData.slider_weight_value = 0;
            var profileImage = document.getElementById("offenderProfileImage");
            profileImage.src = "images/profile_img.png";
            if ($scope.editOffender) {
                $scope.title = "Edit Offender";
            } else {
                $scope.title = "Add New Offender";
            }
            setFirstTab();
//            getFilterData();
//            loadCountryData();

        }
    };

    function getFilterData() {

        var data = getAdvanceFilter.getData();
        if (!data) {
            setTimeout(function () {
                getFilterData();
            }, 50);
        } else {
            setTimeout(function () {

                $scope.$apply(function () {
                    $scope.formIdentity = data.form_identity_usr;
                    $scope.height = data.height;
                    $scope.title_usr = data.titles;
                    $scope.weight = data.build;
                    $scope.ethnicity = data.ethnicity;
                    $scope.gender = data.gender;
                    $scope.eyecolor = data.eyecolour;
                    $scope.haircolor = data.haircolour;
                    $scope.facialcolor = data.facialhair;
                    $scope.piePosition = data.piercings;
                    $scope.tattooPosition = data.tattos;

                    $scope.height.unshift({keys: 0, val: "Please Select"});
                    $scope.title_usr.unshift({keys: 0, val: "Please Select"});
                    $scope.weight.unshift({keys: 0, val: "Please Select"});
                    $scope.ethnicity.unshift({keys: 0, val: "Please Select"});
                    $scope.gender.unshift({keys: 0, val: "Please Select"});
                    $scope.eyecolor.unshift({keys: 0, val: "Please Select"});
                    $scope.haircolor.unshift({keys: 0, val: "Please Select"});
                    $scope.facialcolor.unshift({keys: 0, val: "Please Select"});
                    $scope.piePosition.unshift({keys: 0, val: "Please Select"});
                    $scope.tattooPosition.unshift({keys: 0, val: "Please Select"});
                })

            }, 10);
        }

    }

    //  });


    function loadCountryData() {
        var data = getCountryStateRegion.getData();
        if (!data) {
            setTimeout(function () {
                loadCountryData();
            }, 50);
        } else {
            setTimeout(function () {

                $scope.$apply(function () {
                    $scope.country = data.country;
                    $scope.state = data.county;
                    $scope.city = data.city;

                    $scope.country.unshift({id_cnt: 0, name_cnt: "Country"});
                    $scope.state.unshift({id_sta: 0, name_sta: "State"});
                    $scope.city.unshift({id_cit: 0, name_cit: "City"});

                })

            }, 10);
        }

    }



    $scope.genderChange = function (gender) {
        if (gender.keys == 0)
            $scope.formData.sex_usr = "";
        else
            $scope.formData.sex_usr = gender.keys;
    };
    $scope.ethnicityChange = function (ethnicity) {
        if (ethnicity.keys == 0)
            $scope.formData.ethnicity_usr = "";
        else
            $scope.formData.ethnicity_usr = ethnicity.keys;
    };
    $scope.heightChange = function (height) {
        if (height.keys == 0)
            $scope.formData.height_type_usr = "";
        else
            $scope.formData.height_type_usr = height.keys;
    };
    $scope.weightChange = function (weight) {
        if (weight.keys == 0)
            $scope.formData.weight_usr = "";
        else
            $scope.formData.weight_usr = weight.keys;
    };
    $scope.hairColorChange = function (hairColor) {
        if (hairColor.keys == 0)
            $scope.formData.hair_color_usr = "";
        else
            $scope.formData.hair_color_usr = hairColor.keys;
    };
    $scope.facialColorChange = function (facialColor) {
        if (facialColor.key == 0)
            $scope.formData.facial_hair_usr = "";
        else
            $scope.formData.facial_hair_usr = facialColor.keys;
    };
    $scope.eyeColorChange = function (eyecolor) {
        if (eyecolor.keys == 0)
            $scope.formData.eye_color_usr = "";
        else
            $scope.formData.eye_color_usr = eyecolor.keys;
    };
    $scope.approxAgeChange = function (age) {

    }
    $scope.piercingschange = function (piercings) {
        if (piercings == 0) {
            $scope.picrcingsFieldsSendData = new Array(0);
            $scope.picrcingsFields = [{keys: i}];
            $scope.formData.piercing_usr_pos = "";
            $scope.formData.piercing_usr_pos = "";


        }
        $scope.formData.piercing_usr = piercings;


        if (piercings == 1) {
            if ($scope.picrcingsFields.length <= 0)
                $scope.picrcingsFields = [{id: i, dropValue: "", desc: ""}];

        } else
            $scope.picrcingsFields = [];
    };
    $scope.piePositionChange = function (piePosition, index) {
        var data = {};
        data.desc = piePosition.desc;
        data.value = piePosition.dropValue.val;

        if (!$scope.picrcingsFieldsSendData)
            $scope.picrcingsFieldsSendData = [];

        $scope.picrcingsFieldsSendData[index] = data;
//        $scope.picrcingsFields[index] = piePosition;
//        if (piePosition.id == 0)
//            $scope.formData.piercing_usr_pos = "";
//        else
//            $scope.formData.piercing_usr_pos = piePosition.id;
    };
    $scope.tattoochange = function (tattoo_usr) {
        getpiercingData();
        if (tattoo_usr == 0) {
            $scope.tattoosFieldsSendData = new Array(0);
            $scope.tattoosFields = [{keys: i}];
            $scope.formData.tattoo_usr_pos = "";
            $scope.formData.tattoo_usr_desc = "";

        }
        $scope.formData.tattoo_usr = tattoo_usr;



        if (tattoo_usr == 1) {
            if ($scope.tattoosFields.length <= 0)
                $scope.tattoosFields = [{id: i, dropValue: "", desc: ""}];

        } else
            $scope.tattoosFields = [];


    };
    $scope.tattooPosChange = function (position, index) {
        var data = {};
        data.desc = position.desc;
        data.value = position.dropValue.val;

        if (!$scope.tattoosFieldsSendData)
            $scope.tattoosFieldsSendData = [];

        $scope.tattoosFieldsSendData[index] = data;

//        $scope.tattoosFields[index] = position;
//        if (position.id == 0)
//            $scope.formData.tattoo_usr_pos = "";
//        else
//            $scope.formData.tattoo_usr_pos = position.id;
    };
    $scope.scarchange = function (scar) {
        if (scar == 0) {
            $scope.scarFields = [{keys: i}];
            $scope.formData.scar_usr_pos = "";
            $scope.scarFieldsSendData = new Array(0);
            $scope.formData.scar_usr_desc = "";

        }
        $scope.formData.scar_usr = scar;


        if (scar == 1) {
            if ($scope.scarFields.length <= 0)
                $scope.scarFields = [{id: i, dropValue: "", desc: ""}];
        } else
            $scope.scarFields = [];
    };
    $scope.scarPosChange = function (scar, index) {

        var data = {};
        data.desc = scar.desc;
        data.value = scar.dropValue.val;

        if (!$scope.scarFieldsSendData)
            $scope.scarFieldsSendData = [];

        $scope.scarFieldsSendData[index] = data;
        // $scope.scarFieldsSendData.push(data);

//        $scope.scarFields[index].desc = desc;
//        $scope.modelData.scarfield.dropValue[index] = scar;
    };
    $scope.glasseschange = function (glasses_usr) {

        $scope.formData.glasses_usr = glasses_usr;
    };
    $scope.userTitleChange = function (title) {
        if (title.keys == 0)
            $scope.formData.title_usr = "";
        else
            $scope.formData.title_usr = title.keys;
    }
    $scope.countryChange = function (country) {
        if (country.id_cnt == 0)
            $scope.formData.country_usr = "";
        else
            $scope.formData.country_usr = country.id_cnt;
//        dataBaseObj.getDatafromDataBase("SELECT * FROM state where country_id=" + country.id_cnt, function (result) {
//            $scope.$apply(function () {
//                $scope.state = result;
//                //console.log("result:::::" + JSON.stringify($scope.state));
//            });
//        });

    };
    $scope.stateChange = function (state) {
        if (state.id_cnt == 0)
            $scope.formData.state_usr = "";
        else
            $scope.formData.state_usr = state.id_cnt;


//        var query = "SELECT * FROM city where county_id="+state.county_id;
//        var query = "SELECT * FROM city";
//        dataBaseObj.getDatafromDataBase(query, function (result) {
//            $scope.$apply(function () {
//                $scope.city = result;
//                //console.log("result:::::" + JSON.stringify($scope.city));
//            });
//        });
    };

    $scope.getImageOfOffender = function () {
        $scope.isCameraOption = true;
        multifile = false;
        isProfileImage = true;
    };
    $scope.uploadOtherImage = function () {
        multifile = true;
        $scope.isCameraOption = true;
        isProfileImage = false;
    };
    $scope.openCamera = function () {
        imageService.getCameraImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };
    $scope.openGallery = function () {
        imageService.getMediaImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };
    $scope.closeCameraOption = function () {
        $scope.isCameraOption = false;
    };
    function uploadPhoto(item) {
        $scope.isImageAdd = true;


        if (isProfileImage) {
            isProfileImage = false;
            $scope.$apply(function () {
                $scope.showProfileCancel = true;
                var profileImage = document.getElementById("offenderProfileImage");
                profileImage.src = item.src;
                $scope.profileImage = {name: item.title, url: item.src, id: item.id, isProfileImage: isProfileImage};
            });
        } else {
            $scope.$apply(function () {
                $scope.images.push({name: item.title, url: item.src, id: item.id, isProfileImage: isProfileImage});
            });
        }

    }
    $scope.removeImage = function (index) {
//        $scope.$apply(function () {
        $scope.images.splice(index, 1);
//            $scope.images.push({name: item.title, url: item.src});
//        });
    };

    $scope.removeProfileImage = function () {
        var profileImage = document.getElementById("offenderProfileImage");
        profileImage.src = "images/profile_img.png";
        $scope.showProfileCancel = false;
        //   profileImage.src = '';
        $scope.isCameraOption = false;
        $scope.profileImage = null;

    };

    $scope.getOffenderData = function (offender_id) {
        $scope.offenderId = offender_id;
//        OffenderService.getOffenderDetail(offender_id, function (status, offenderData) {
        var offenderData = $scope.updateOffender;
        // //console.log("testOffenderdata" +JSON.stringify(offenderData));
        $scope.isImageAdd = false;
//        if($scope.identityFields.length>0){
//            $scope.identityFields.forEach(function(obj){
//                
//                $scope.identityFields.push({id: i++, refID: obj, refNumber: "", other: 0, form_identity_other: ""});
//            });
//            
//        }
        $scope.gender.forEach(function (obj) {
            if (obj.val == offenderData.sex_usr) {
                $scope.modelData.sex_usr = obj;
                $scope.formData.sex_usr = obj.keys;
            }

        });
        $scope.ethnicity.forEach(function (obj) {
            if (obj.val == offenderData.ethnicity) {
                $scope.modelData.ethnicity = obj;
                $scope.formData.ethnicity = obj.keys;
            }
        });
        $scope.height.forEach(function (obj) {

            if (obj.keys == offenderData.height_type_usr) {
                $scope.modelData.height_type_usr = obj;
                $scope.formData.height_type_usrs = obj.keys;
            }
        });
        $scope.weight.forEach(function (obj) {
            if (obj.keys == offenderData.weight_type_usr) {
                $scope.modelData.weight_usr = obj;
                $scope.formData.weight_usr = obj.keys;
            }
        });
        $scope.haircolor.forEach(function (obj) {
            if (obj.keys == offenderData.hair_color_usr) {
                $scope.modelData.hair_color_usr = obj;
                $scope.formData.hair_color_usr = obj.keys;
            }
        });
        $scope.eyecolor.forEach(function (obj) {
            if (obj.keys == offenderData.eye_color_usr) {
                $scope.modelData.eye_color_usr = obj;
                $scope.formData.eye_color_usr = obj.keys;
            }
        });
        $scope.facialcolor.forEach(function (obj) {
            if (obj.keys == offenderData.facial_hair_usr) {
                $scope.modelData.facial_hair_usr = obj;
                $scope.formData.facial_hair_usr = obj.keys;
            }
        });
        $scope.title_usr.forEach(function (obj) {
            if (obj.keys == offenderData.title_usr) {
                $scope.modelData.title_usr = obj;
                $scope.formData.title_usr = obj.keys;
            }
        });

        $scope.country.forEach(function (obj) {
            if (obj.id_cnt == offenderData.country_usr) {
                $scope.modelData.country_usr = obj;
                $scope.formData.country_usr = obj.id_cnt;
            }
        });

        offenderData.piercing_usr == null || offenderData.piercing_usr == "<b>Not Entered</b>" ? offenderData.piercing_usr = "0" : offenderData.piercing_usr = offenderData.piercing_usr;
        (offenderData.scar_usr == null || offenderData.scar_usr == "<b>Not Entered</b>") ? offenderData.scar_usr = "0" : offenderData.scar_usr = offenderData.scar_usr;
        (offenderData.tattoo_usr == null | offenderData.tattoo_usr == "<b>Not Entered</b>") ? offenderData.tattoo_usr = "0" : offenderData.tattoo_usr = offenderData.tattoo_usr;
        (offenderData.glasses_usr == null | offenderData.glasses_usr == "<b>Not Entered</b>") ? offenderData.glasses_usr = "0" : offenderData.glasses_usr = offenderData.glasses_usr;

        $scope.modelData.scar_usr = offenderData.scar_usr;
        $scope.modelData.piercing_usr = offenderData.piercing_usr;
        $scope.modelData.tattoo_usr = offenderData.tattoo_usr;
        $scope.modelData.glasses_usr = offenderData.glasses_usr;
        //console.log("offenderdata" + JSON.stringify(offenderData));
        $scope.formData.scar_usr = offenderData.scar_usr;
        $scope.formData.piercing_usr = offenderData.piercing_usr;
        $scope.formData.tattoo_usr = offenderData.tattoo_usr;
        $scope.formData.glasses_usr = offenderData.glasses_usr;
        $scope.formData.clothing_usr = offenderData.clothing_usr == "<b>Not Entered</b>" ? "" : offenderData.clothing_usr;
        $scope.formData.char_notes_usr = offenderData.char_notes_usr == "<b>Not Entered</b>" ? "" : offenderData.char_notes_usr;
        $scope.formData.other_details_usr = offenderData.other_details_usr == "<b>Not Entered</b>" ? "" : offenderData.other_details_usr;
        $scope.formData.p_mob_usr = offenderData.p_mob_usr == "<b>Not Entered</b>" ? "" : offenderData.p_mob_usr;
        $scope.formData.p_tph_usr = offenderData.p_tph_usr == "<b>Not Entered</b>" ? "" : offenderData.p_tph_usr;
        $scope.formData.telephone_usr = offenderData.telephone_usr == "<b>Not Entered</b>" ? "" : offenderData.telephone_usr;
        $scope.formData.mobile_usr = offenderData.mobile_usr == "<b>Not Entered</b>" ? "" : offenderData.mobile_usr;
        $scope.formData.p_mail_usr = offenderData.p_mail_usr == "<b>Not Entered</b>" ? "" : offenderData.p_mail_usr;
        $scope.formData.address_usr = offenderData.address_usr == "<b>Not Entered</b>" ? "" : offenderData.address_usr;
        $scope.formData.address_2usr = offenderData.address_2_usr == "<b>Not Entered</b>" ? "" : offenderData.address_2_usr;
        $scope.formData.address_3usr = offenderData.address_3_usr == "<b>Not Entered</b>" ? "" : offenderData.address_3_usr;
        $scope.formData.postcode_usr = offenderData.postcode_usr == "<b>Not Entered</b>" ? "" : offenderData.postcode_usr;
        $scope.formData.firstname_usr = offenderData.firstname_usr == "Unknown" ? "" : offenderData.firstname_usr;
        $scope.formData.middlename_usr = offenderData.middlename_usr == "Unknown" ? "" : offenderData.middlename_usr;
        $scope.formData.lastname_usr = offenderData.lastname_usr == "Unknown" ? "" : offenderData.lastname_usr;
        $scope.formData.approximate_age_usr = offenderData.approximate_age_usr;

        if (offenderData.slider_height_value == null || offenderData.slider_height_value == "<b>Not Entered</b>")
            $scope.formData.slider_height_value = 0;
        else
            $scope.formData.slider_height_value = offenderData.slider_height_value;
        if (offenderData.slider_weight_value == null || offenderData.slider_weight_value == "<b>Not Entered</b>")
            $scope.formData.slider_weight_value = 0;
        else
            $scope.formData.slider_weight_value = offenderData.slider_weight_value;
        $scope.formData.dob_usr = offenderData.dob_usr == "<b>Not Entered</b>" ? "" : offenderData.dob_usr;


        $scope.picrcingsFields = [];
        $scope.tattoosFields = [];
        $scope.scarFields = [];
        try {
            $scope.offData.scar.forEach(function (screObj) {
                var data = {};
                data.id = screObj.id_ppc;
                data.desc = screObj.desc;
                $scope.tattooPosition.forEach(function (posiObj) {
                    if (posiObj.val == screObj.value)
                        data.dropValue = posiObj;
                });
                $scope.scarFields.push(data);
            });
        } catch (e) {
        }


        if ($scope.modelData.scar_usr == 1) {
            if ($scope.scarFields.length <= 0)
                $scope.scarFields = [{id: i, dropValue: "", desc: ""}];
        } else
            $scope.scarFields = [];


        try {
            $scope.offData.piercing.forEach(function (piercObj) {
                var data = {};
                data.id = piercObj.id_ppc;
                data.desc = piercObj.desc;
                $scope.piePosition.forEach(function (posiObj) {
                    if (posiObj.val == piercObj.value)
                        data.dropValue = posiObj;
                });
                $scope.picrcingsFields.push(data);
            });
        } catch (e) {
        }


        if ($scope.modelData.piercing_usr == 1) {
            if ($scope.picrcingsFields.length <= 0)
                $scope.picrcingsFields = [{id: i, dropValue: "", desc: ""}];

        } else
            $scope.picrcingsFields = [];




        try {
            $scope.offData.tattoo.forEach(function (tattooObj) {
                var data = {};
                data.id = tattooObj.id_ppc;
                data.desc = tattooObj.desc;
                $scope.tattooPosition.forEach(function (posiObj) {
                    if (posiObj.val == tattooObj.value)
                        data.dropValue = posiObj;
                });
                $scope.tattoosFields.push(data);
            });

        } catch (e) {
        }



        if ($scope.modelData.tattoo_usr == 1) {
            if ($scope.tattoosFields.length <= 0)
                $scope.tattoosFields = [{id: i, dropValue: "", desc: ""}];

        } else
            $scope.tattoosFields = [];


        $scope.identityFields = [];
        var k = 0;
        $scope.refrenceIds.forEach(function (obj) {
            var data = {};
            data.id = ++k;
            var SelID = {};
            $scope.formIdentity.forEach(function (idObj) {
                if (idObj.keys == obj.form_identity_usr)
                    SelID = idObj;
            })
            data.refID = SelID;
            data.refNumber = obj.form_identity_refernce;

            try {
                data.other = obj.form_identity_other.length > 0 ? 1 : 0;
                data.form_identity_other = obj.form_identity_other;
            } catch (e) {
            }
            $scope.identityFields.push(data);
        });




        if (offenderData.images == 0) {
            $scope.formData.image_users = [];
            $scope.formData.image_users.push("images/profile_img.png");
        } else {
            $scope.formData.image_users = [];
            for (var i = 1; i <= offenderData.images; i++) {
                var url = constanObject.offenderImageBaseUrl + offender_id + "/" + i;
                $scope.images.push({name: "img", url: url});
                $scope.formData.image_users.push(constanObject.offenderImageBaseUrl + offender_id + "/" + i);
            }
        }
        var profileImage = document.getElementById("offenderProfileImage");

        profileImage.src = $scope.formData.image_users[0];

    };
    $scope.addNewID = function () {
        $scope.identityFields.push({id: ++i, refID: "", refNumber: "", other: 0, form_identity_other: ""});
    };
    $scope.removeID = function (index) {
        $scope.identityFields.splice(index, 1);
    };
    $scope.IDRefrenceChange = function (index, obj) {
        if (obj.keys == "5") {
            $scope.identityFields[index].other = 1;
        } else {
            $scope.identityFields[index].other = 0;
        }
    };
    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.offenserAddShowStatus) {
//            if (!$scope.offenderForm.$valid) {
//                alert("enter valid fields");
//                return callback(false, 0);
//            } else {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                if ($scope.profileImage)
                    $scope.images.unshift($scope.profileImage);

                $scope.profileImage = null;

                $scope.formData.form_identity = prepare_ID_Data();
                $scope.formData.scar = $scope.scarFieldsSendData;
                $scope.formData.piercing = $scope.picrcingsFieldsSendData;
                $scope.formData.tattoo = $scope.tattoosFieldsSendData;
                setOfflineData();
                return callback(true, 1);
            } else {
                if ($scope.formData.piercing_usr == 1) {
                    var data = getpiercingData();
                }
                $scope.formData.form_identity = prepare_ID_Data();
                $scope.formData.scar = $scope.scarFieldsSendData;
                $scope.formData.piercing = $scope.picrcingsFieldsSendData;
                $scope.formData.tattoo = $scope.tattoosFieldsSendData;
                $scope.submitOffenderData();
                return callback(false, 0);
            }

        }
        //  }

    };
    function prepare_ID_Data() {
        var array = [];
        $scope.identityFields.forEach(function (obj) {
            array.push({form_identity_usr: obj.refID.keys, form_identity_refernce: obj.refNumber, form_identity_other: obj.form_identity_other});
        });
        return array;
    }
    ;
    $scope.back = function (callback) {

        if ($rootScope.offenserAddShowStatus) {
            window.scrollTo(0, 0);
            setFirstTab();
            $scope.images = [];
            if ($scope.editOffender) {
                $rootScope.offenserAddShowStatus = false;
                $rootScope.offenderDetailShowStatus = true;
            } else {
                $rootScope.offenserAddShowStatus = false;
                $rootScope.offenderListShowStatus = true;
            }
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                return callback(true, 1);
            } else {
                return callback(false, 0);
            }
        }

    };
    $scope.saveButtonAction = function () {
//        $scope.submitOffenderData();
    };
    $scope.submitOffenderData = function () {

        $scope.modelData = {};
        //console.log(JSON.stringify($scope.formData));
        $scope.formData.dob_usr = moment($scope.formData.dob_usr, 'DD/MM/YYYY').format('YYYY/MM/DD');

        if ($scope.editOffender) {
            if (!$scope.isImageAdd) {
                $scope.formData.image_users = []
            }
            OffenderService.editOffender($scope.offenderId, $scope.formData, function (status, offenderID) {
                if (status) {
                    $scope.offenderId = offenderID;
                    var scope = angular.element($('#202')).scope();
                    var arr = scope.selectedOffenders;

                    scope.selectedOffenders.forEach(function (obj) {
                        if (obj.id_usr == offenderID) {
                            var index = scope.selectedOffenders.indexOf(obj);
                            scope.selectedOffenders.splice(index, 1);
                        }
                    });
                    for (var i = 0; i < $scope.images.length; i++) {
                        if ($scope.images[i].url == 'images/profile_img.png') {
                            $scope.images.splice(i, 1);
                            break;
                        }
                    }
                    if ($scope.profileImage)
                        $scope.images.unshift($scope.profileImage);
                    if ($scope.isImageAdd) {
                        for (var i = 0; i < $scope.images.length; i++) {
                            webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UPLOAD_OFFENDER_FILE_URL + offenderID, "image_users", 100);
                        }
                    } else {
                        $rootScope.offenserAddShowStatus = false;
                        $rootScope.offenderDetailShowStatus = true;
                        $scope.images = [];
                        var scope = angular.element('#203').scope();
                        scope.edit = true;
                        scope.getOffenderDetail($scope.offenderId);
                    }
                }
            });
        } else {
            if (!$scope.isImageAdd) {
                $scope.formData.image_users = []
            }

            OffenderService.addNewOffender($scope.formData, function (status, offenderID) {
                if (status) {
                    $scope.offenderId = offenderID;
                    for (var i = 0; i < $scope.images.length; i++) {
                        if ($scope.images[i].url == 'images/profile_img.png') {
                            $scope.images.splice(i, 1);
                            break;
                        }
                    }
                    if ($scope.profileImage)
                        $scope.images.unshift($scope.profileImage);

                    if ($scope.isImageAdd && $scope.images.length > 0) {
                        for (var i = 0; i < $scope.images.length; i++) {
                            webRequestObject.fileUploadForImages($scope, $scope.images[i].url, constanObject.UPLOAD_OFFENDER_FILE_URL + offenderID, "image_users", 100, $scope.images[i]);
                        }
                    } else {
                        $rootScope.offenserAddShowStatus = false;
                        $rootScope.offenderDetailShowStatus = true;
                        $scope.images = [];
                        var scope = angular.element('#203').scope();
                        scope.edit = false;
                        scope.getOffenderDetail($scope.offenderId);
                    }

                }
            });
        }
    };

    $scope.$watch('formData.slider_height_value', function (eth) {
        if ($rootScope.offenserAddShowStatus == true) {


//            var feet = (eth * 0.0328084).toFixed(2);
//            var arr = feet.split(".");
//            if(arr[1] == 00)
//            $scope.heightinFeet = arr[0] + " ft " ;
            var inches = (eth * 0.393700787).toFixed(0);
            var feet = Math.floor(inches / 12);
            inches %= 12;
            $scope.heightinFeet = feet + " ft " + " " + inches + " in";
//        else
//            $scope.heightinFeet = arr[0] + " ft " + ((arr[1] == 00) ? "" : arr[1]) + " in";
//            
        }


    });

    $scope.$watch('formData.slider_weight_value', function (eth) {
        if ($rootScope.offenserAddShowStatus == true) {

            var lbs = (eth * 2.2046226).toFixed(0);
            var stone = Math.floor(lbs / 14);
            lbs %= 14;

            $scope.weightStone = stone + " st" + " " + lbs + " lbs";

        }

    });

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            return callback(false, JSON.parse(responseData.responseText).error);
        }
        switch (requestType) {
            case 100:
                setFirstTab();
                $rootScope.offenserAddShowStatus = false;
                $rootScope.offenderDetailShowStatus = true;
                var scope = angular.element('#203').scope();
                $scope.images = [];
                scope.getOffenderDetail($scope.offenderId);
                break;
        }
    };
    $scope.picrcingsRemove = function (index) {
        if ($scope.picrcingsFields.length > 1) {
            $scope.picrcingsFields.splice(index, 1);
            $scope.picrcingsFieldsSendData.splice(index, 1);
        }
    };
    $scope.picrcingsAdd = function () {
        $scope.picrcingsFields.push({id: i});
    };
    $scope.tattoRemove = function (index) {
        if ($scope.tattoosFields.length > 1) {
            $scope.tattoosFields.splice(index, 1);
            $scope.tattoosFieldsSendData.splice(index, 1);
        }
    };
    $scope.tattoAdd = function () {
        $scope.tattoosFields.push({id: i});
    };
    $scope.scarRemove = function (index) {
        if ($scope.scarFields.length > 1) {
            $scope.scarFields.splice(index, 1);
            $scope.scarFieldsSendData.splice(index, 1);
        }
    };
    $scope.scarAdd = function () {
        $scope.scarFields.push({id: i});
    };

    function getpiercingData() {

        $("#204").find(".tab_container").children("div").first().find(".right").children("ul").children("li:nth-child(3)").children("ul").children("li").each(function (ele, index) {
            // //console.log("klkl");
        });
    }
    ;

    function setFirstTab() {
        $("#204").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#204").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#204").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#204").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#204").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#204").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#204").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#204").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#204").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#204").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#204").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#204").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    };

    function setOfflineData() {
        var scope1 = angular.element('#205').scope();
        $scope.formData.id_usr = i--;
        scope1.selectedOff.push($scope.formData);
     //   var milliseconds = new Date().getTime();
        $scope.formData.fileid=[];
        //  dataBaseObj.insertData(TABLE_CRETAE_OFFENDER, JSON_DATA_KEY, [JSON.stringify($scope.formData), milliseconds], null);
        $scope.images.forEach(function (obj) {
            var TimeStamp=getUniqueId.getId();//++(obj.id);
            $scope.formData.fileid.push(TimeStamp);
            dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT_FILE, FILES_UPLOAD_KEY,
            [constanObject.FileUploadModuleId.OFFENDER.toString(), 
                ++obj.id, constanObject.CREATE_INCIDEN_TEMP_ID.toString(), 
                obj.url.toString(), 
                "image", "0", TimeStamp, globalService.getUserId(), "-1"], null);
        });
    }


    getFilterData();
    loadCountryData();
});
