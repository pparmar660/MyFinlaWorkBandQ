BandQModule.controller('addNewWitnessCnt', function ($scope, WitnessService, $rootScope, permissionService, checkInternetConnectionService, globalService, imageService, getUniqueId, advanceFilter) {
    $scope.modelData = {};
    $scope.formData = {};
    $scope.witnessData = null;
    $scope.isCameraOption = false;
    $scope.isFileUpload = false;
    $scope.witness_id = null;
    $scope.catagory = [];
    $scope.formData.image_users = ["images/profile_img.png"];
    $scope.title = "Add Witness";
    $scope.images = [];
    $scope.title_usr = [];
    $scope.gender = [];
    $scope.country = [];
    $scope.states = [];
    $scope.cities = [];
    $scope.selectedCategory = [];
    var noOfPageMove;
    var imageflag = false;
    $scope.profileImage = null;
    var isProfileImage = false;
    $scope.showProfileCancel = false;
    var isProfileImage = false;
    $scope.formData = {
        id_usr: 0
    };
    var i = 0;
    $scope.init = function (_noOfPageMove) {

        noOfPageMove = _noOfPageMove;
        imageflag = false;
        $rootScope.show = false;
        $scope.profileImage = null;
        //permissionService.init();

        ////console.log("Permission: "+permissionService.checkAction(217,'add'));
        ////console.log("Permission Access: "+permissionService.checkAccess(217));
        getFilterData();

        advanceFilter.getAdvanceSearchConfig(function (status, data) {
            $scope.$apply(function () {
                if (status) {
                    var milliseconds = new Date().getTime();
                    dataBaseObj.deleteTableData(ADVANCE_FILTER_DATA);
                    dataBaseObj.insertData(ADVANCE_FILTER_DATA, JSON_DATA_KEY, [JSON.stringify(data), milliseconds], null);
                    getFilterData();
                }
            });
        });
        if ($rootScope.witnessAddShowStatus) {
            $scope.modelData.town_usr = {id_cit: 0, name_cit: "Please Select"};
            $scope.modelData.county_usr = {id_sta: 0, name_sta: "Please Select"};
            $scope.modelData.country_usr = {id_cnt: 0, name_cnt: "Please Select"};
//            $scope.modelData.sex_usr = {id: 0, val: "Please Select"};
//            $scope.modelData.title_usr = {id: 0, val: "Please Select"};

            //$scope.setCatagory();
            var scope = angular.element('#218').scope();
            $scope.catagory = [];
            $scope.catagory = scope.categoryList;
            //$scope.catagory.unshift({id_cnt: 0, name_cnt: "Please Select"});
            //$scope.modelData.catagory_usr.unshift({id_cnt: 0, name_cnt: "Please Select"});
            var profileImage = document.getElementById("witnessProfileImage");
            profileImage.src = "images/profile_img.png";
            $scope.title = "Add Witness";
            $scope.images = [];
            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
                var data = JSON.parse(result[0].json_data);

                $scope.$apply(function () {
                    $scope.country = data.country;
                    $scope.country.unshift({id_cnt: 0, name_cnt: "Please Select"});
                });
            });
            if ($scope.witness_id) {
                $scope.isFileUpload = false;
                $scope.title = "Edit Witness";
                var data = $scope.witnessData;
                //console.log("WITNESS DATA: " + JSON.stringify(data));
                var scope = angular.element('#219').scope();

                $scope.modelData.category_usr = [];
                for (var i = 0; i < $scope.catagory.length; i++) {
                    for (var j = 0; j < scope.witnessCategories.length; j++)
                        if ($scope.catagory[i].id_uct == scope.witnessCategories[j].id_uct) {
                            $scope.modelData.category_usr.push($scope.catagory[i]);
                        }
                }
                $scope.formData.firstname_usr = data.firstname_usr == "Not Entered" ? "" : data.firstname_usr;
                $scope.formData.lastname_usr = data.lastname_usr == "<b>Not Entered</b>" ? "" : data.lastname_usr;
                $scope.formData.address_usr = data.address_usr == "<b>Not Entered</b>" ? "" : data.address_usr;
                $scope.formData.address_2usr = data.address_2_usr == "<b>Not Entered</b>" ? "" : data.address_2_usr;
                $scope.formData.address_3usr = data.address_3_usr == "<b>Not Entered</b>" ? "" : data.address_3_usr;
                $scope.formData.sex_usr = data.sex_usr == "<b>Not Entered</b>" ? "" : data.sex_usr;
                $scope.formData.p_tph_usr = data.p_tph_usr == "<b>Not Entered</b>" ? "" : data.p_tph_usr;
                $scope.formData.p_mob_usr = data.p_mob_usr == "<b>Not Entered</b>" ? "" : data.p_mob_usr;
                $scope.formData.email_usr = data.email_usr == "<b>Not Entered</b>" ? "" : data.email_usr;
//                 $scope.formData.country_usr = data.country_usr == "<b>Not Entered</b>" ? 0 : data.country_usr;
                $scope.formData.postcode_usr = data.postcode_usr == "<b>Not Entered</b>" ? "" : data.postcode_usr;
                if (data.images > 0) {
                    $scope.formData.image_users = constanObject.WITNESS_IMAGE + $scope.witness_id + "/1";
                    var profileImage = document.getElementById("witnessProfileImage");
                    profileImage.src = constanObject.WITNESS_IMAGE + $scope.witness_id + "/1";
                }
                $scope.title_usr.forEach(function (obj) {
                    if (obj.keys == data.title_usr) {
                        $scope.modelData.title_usr = obj;
                        $scope.formData.title_usr = obj.keys;
                    }

                });
                if (data.sex_usr != "Not Entered") {
                    $scope.gender.forEach(function (obj) {
                        if (obj.val == data.sex_usr) {
                            $scope.modelData.sex_usr = obj;
                            $scope.formData.sex_usr = obj.keys;
                        }

                    });
                }
                if (data.town_usr != "Not Entered") {
                    $scope.cities.forEach(function (obj) {
                        if (obj.id == data.town_usr) {
                            $scope.modelData.town_usr = obj;
                            $scope.formData.town_usr = obj.id;
                        }

                    });
                }

//                if (data.country_usr != "Not Entered") {
//                    $scope.country.forEach(function (obj) {
//                        if (obj.id_cnt == data.country_usr) {
//                            $scope.modelData.country_usr = obj;
//                            $scope.formData.country_usr = obj.id_cnt;
//                        }
//
//                    });
//                }

                if (data.country_usr != "<b>Not Entered</b>") {
                    dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
                        var coun = JSON.parse(result[0].json_data);
                        $scope.$apply(function () {
                            coun.country.forEach(function (obj) {
                                if (obj.id_cnt == data.country_usr) {
                                    $scope.modelData.country_usr = obj;
                                    $scope.formData.country_usr = obj.id;
                                }

                            });
                        });
                    });
                }


            }

//            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
//                var data = JSON.parse(result[0].json_data);
//
//                $scope.$apply(function () {
//                    $scope.country = data.country;
//                    $scope.states = data.county;
//                    $scope.cities = data.city;
//                    if ($scope.witnessData != null) {
//                        $scope.country.forEach(function (obj) {
//                            if (obj.id_cnt == $scope.witnessData.country_usr)
//                                $scope.modelData.country_usr = obj;
//
//                        });
//                    }
//                    $scope.country.unshift({id_cnt: 0, name_cnt: "Please Select"});
//                    $scope.states.unshift({id_sta: 0, name_sta: "Please Select"});
//                    $scope.cities.unshift({id_cit: 0, name_cit: "Please Select"});
//
//                });
//            });

        }
        window.scrollTo(0, 0);
    };
    $scope.$watch('witnessForm.$valid', function (isValid) {
        //alert('valid' + validity);
        if (isValid) {
            console.log("isValid : " + isValid);
            $rootScope.enableBtn = "btn-green";
        } else {
            console.log("isValid : " + isValid);
            $rootScope.enableBtn = "";
        }
    });
    function getFilterData() {
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + ADVANCE_FILTER_DATA, function (result) {
            if (result[0]) {
                var data = JSON.parse(result[0].json_data);
                $scope.$apply(function () {
                    $scope.title_usr = data.titles;
                    $scope.gender = data.gender;
                    $scope.title_usr.unshift({keys: 0, val: "Please Select"});
                    $scope.gender.unshift({keys: 0, val: "Please Select"});
                });
            }
        });
    }

    $scope.removeProfileImage = function () {
        var profileImage = document.getElementById("witnessProfileImage");
        profileImage.src = "images/profile_img.png";
        $scope.formData.image_users = '';
        $scope.isCameraOption = false;
        $scope.profileImage = null;
    };
    $scope.uploadImage = function () {
        $scope.extraImages = false;
        $scope.isCameraOption = true;
        isProfileImage = true;
    };
    $scope.uploadExtraImages = function () {
        $scope.extraImages = true;
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
    function uploadPhoto(imageURI) {
        imageflag = true;
//        $scope.$apply(function () {
//            $scope.images.push({name: imageURI.title, url: imageURI.src, id: imageURI.id});
//        });
//        if (!$scope.extraImages) {
//            var profileImage = document.getElementById("witnessProfileImage");
//            profileImage.src = imageURI.src;
//            $scope.formData.image_users = imageURI.src;
//            $scope.images.splice(0, 1);
//        }

        if (isProfileImage) {
            $scope.$apply(function () {
                $scope.showProfileCancel = true;
                var profileImage = document.getElementById("witnessProfileImage");
                profileImage.src = imageURI.src;
                $scope.profileImage = {name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage};
            });
        } else {
            $scope.$apply(function () {
                $scope.images.push({name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage});
            });
        }
    }
    $scope.deleteImage = function (image) {
        var index = $scope.images.indexOf(image);
        $scope.images.splice(index, 1);
    };
    $scope.catagoryChange = function (catagory) {
        $scope.formData.category_usr = [];
        catagory.forEach(function (obj) {
            $scope.formData.category_usr.push(obj.id_uct);
        });

    };
    $scope.titleChange = function (title) {
        $scope.formData.title_usr = title.keys;
    };
    $scope.genderChange = function (gend) {
        $scope.formData.sex_usr = gend.keys;
    };

    $scope.countryChange = function (country) {

        $scope.formData.country_usr = country.id_cnt;
    };
    $scope.stateChange = function (state) {

        $scope.formData.county_usr = state.id_sta;
    };
    $scope.cityChange = function (city) {
        //console.log("result:::::" + JSON.stringify(city));
        $scope.formData.town_usr = city.id_cit;

    };
    $scope.textFocus = function () {
        $rootScope.show = false;
        $("#lastnamerequires").hide();
    };
    $scope.nextButtonClicked = function (callback) {

        if ($rootScope.witnessAddShowStatus) {
            window.scrollTo(0, 0);
            setFirstTab();
            if ($scope.witnessForm.$valid) {
//                $scope.formData
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    globalService.setWitness({witness: $scope.formData});
                    if ($scope.profileImage)
                        $scope.images.unshift($scope.profileImage);
                    $scope.profileImage = null
                    setOfflineData();
                    return callback(true, 1);
                } else {
                    $scope.saveData();
                    return callback(false, 0);
                }
            } else {
                $("#lastnamerequires").show();
                $rootScope.show = true;
                window.scrollTo(0, 0);
                $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                return callback(false, 0);
            }
            return callback(false, 0);
        }
//        return callback(false, 0);
    };
    $scope.back = function (callback) {
        if ($rootScope.witnessAddShowStatus) {
            window.scrollTo(0, 0);
            $rootScope.show = false;
            $("#lastnamerequires").hide();
            setFirstTab();
            if ($scope.witness_id) {
                $rootScope.witnessDetailShowStatus = true;
                $rootScope.witnessAddShowStatus = false;
                $scope.modelData = {};
                $scope.formData = {};
                $scope.images = [];
                $scope.catagory = null;
            } else {
                $rootScope.witnessListShowStatus = true;
                $rootScope.witnessAddShowStatus = false;
            }
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                return callback(true, 1);
            } else {
                return callback(false, 0);
            }

        }
    };

    $scope.saveButtonAction = function () {

    };
    $scope.saveData = function () {
        //console.log("SAVE");
        if ($scope.witnessForm.$valid) {
            if ($scope.witnessData == null) {
                WitnessService.addNewWitness(constanObject.ADD_NEW_WITNESS, $scope.formData, function (status, witness_id) {
                    //console.log("witness_id: " + witness_id);
                    $scope.witness_id = witness_id;
                    if (witness_id) {
                        var scope = angular.element('#219').scope();
                        scope.edit = false;
                        if ($scope.profileImage)
                            $scope.images.unshift($scope.profileImage);
                        $scope.profileImage = null
                        if (imageflag && $scope.images.length > 0) {

                            for (var i = 0; i < $scope.images.length; i++) {
                                webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UPLOAD_WITNESS_FILES + witness_id, "image_users", 100, true);
                            }
                            imageflag = false;
                        } else {
                            $scope.$apply(function () {
                                $scope.formData = {};
                                $scope.modelData = {};
                                $scope.images = [];
                                $rootScope.witnessDetailShowStatus = true;
                                $rootScope.witnessAddShowStatus = false;
                                var scope = angular.element($('#219')).scope();
                                scope.witness_id = witness_id;
                                scope.edit = false;
                                scope.init();
                            });
                        }
                    }
                });
                //console.log(JSON.stringify($scope.formData));
            } else {
                WitnessService.addNewWitness(constanObject.UPDATE_WITNESS + $scope.witness_id, $scope.formData, function (status, witness_id) {

                    if ($scope.witness_id) {
                        var scope1 = angular.element('#219').scope();
                        scope1.edit = true;

                        if (imageflag) {
                            if ($scope.profileImage)
                                $scope.images.unshift($scope.profileImage);
                            $scope.profileImage = null
                            for (var i = 0; i < $scope.images.length; i++) {
                                webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UPLOAD_WITNESS_FILES + $scope.witness_id, "image_users", 100, true);
                            }
                        } else {
                            $scope.$apply(function () {
                                $scope.formData = {};
                                $scope.modelData = {};
                                $scope.images = [];
                                setFirstTab();
                                $rootScope.witnessDetailShowStatus = true;
                                $rootScope.witnessAddShowStatus = false;
                                var scope = angular.element($('#219')).scope();
                                scope.edit = true;
                                scope.init();
                            });
                        }
                    }

                });
                //console.log(JSON.stringify($scope.formData));
            }
        } else {
            alert("enter valid fields");
        }
    }
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
//            $scope.loginError = true;
//            $scope.LoginErrorMessage = responseData.responseJSON.error;
            return;
        }
        switch (requestType) {

            case 100:
                //console.log("ADD/UPDATE RESPONSE: " + JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.formData = {};
                    $scope.modelData = {};
                    $scope.images = [];
                    setFirstTab();
                    $rootScope.witnessDetailShowStatus = true;
                    $rootScope.witnessAddShowStatus = false;
                    var scope = angular.element($('#219')).scope();
                    scope.witness_id = $scope.witness_id;
                    scope.init();
                });

                break;
        }
    };
    var ij = 0;
    function setOfflineData() {

        $scope.formData.id_usr = ij--;
        var scope1 = angular.element('#218').scope();
        var formDataCopy = angular.copy($scope.formData);

        formDataCopy.categories = [];
        formDataCopy.fileid = [];
        if (formDataCopy.category_usr != undefined) {
            for (var i = 0; i < formDataCopy.category_usr.length; i++) {
                formDataCopy.categories.push({id_uct: formDataCopy.category_usr[i]});
            }
        }

        scope1.addAndRemoveWitness(formDataCopy, false);


        var scope = angular.element('#220').scope();

        $scope.images.forEach(function (obj) {
            var TimeStamp = getUniqueId.getId();
            formDataCopy.fileid.push(TimeStamp);
            dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT_FILE, FILES_UPLOAD_KEY,
                    [constanObject.FileUploadModuleId.WITNESS.toString(), ++(obj.id),
                        constanObject.CREATE_INCIDEN_TEMP_ID.toString(), obj.url.toString(),
                        "image", "0", TimeStamp, globalService.getUserId(), "-1"], null);
        });
        scope.witnessList.push(formDataCopy);
        globalService.setWitness({addedWitness: formDataCopy});
    }
});

function setFirstTab() {
    $("#217").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
    $("#217").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
    $("#217").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
    $("#217").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
    $("#217").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
    $("#217").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
    $("#217").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
    $("#217").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");

    if ($(window).width() < 768) {
        $("#217").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
    } else {
        $("#217").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
    }
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $("#217").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#217").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
    });
}
;


//BandQModule.filter('startFrom', function () {
//    return function (input, start) {
//        if (input) {
//            start = +start; //parse to int
//            return input.slice(start);
//        }
//        return [];
//    };
//});
