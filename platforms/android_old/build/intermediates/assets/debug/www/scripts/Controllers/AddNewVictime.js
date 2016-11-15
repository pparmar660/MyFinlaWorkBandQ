BandQModule.controller('addNewVictimeCnt', function ($scope, VictimWitness, $rootScope, imageService,
checkInternetConnectionService, globalService, getUniqueId, advanceFilter) {
    $scope.modelData = {};
    $scope.formData = {};
    $scope.extraImages = false;
    $scope.images = [];
    $rootScope.show = false;
    $scope.victimData = null;
    $scope.isCameraOption = false;
    var imageflag = false;
    $scope.catagory = [];
    $scope.formData.image_users = ["images/profile_img.png"];
    $scope.victimORwitness = 1;
    $scope.victim_id = null;
    $scope.addURL = constanObject.ADD_NEW_VICTIME;
    $scope.title_usr = [];
    $scope.gender = [];
    $scope.country = [];
    $scope.states = [];
    $scope.cities = [];
    var i = 0;
    $scope.profileImage = null;
    var isProfileImage = false;
    $scope.showProfileCancel = false;
    var isProfileImage = false;
    $scope.modelData.category_usr = [];
    $scope.init = function () {
        window.scrollTo(0, 0);
        imageflag = false;
        $rootScope.show = false;
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

        if ($rootScope.victimAddShowStatus) {
            setFirstTab();
            var scope = angular.element('#212').scope();
            $scope.catagory = [];
            $scope.catagory = scope.categoryList;
            // $scope.catagory.unshift({id_cnt: 0, name_cnt: "Please Select"});
            $scope.modelData.town_usr = {id_cit: 0, name_cit: "Please Select"};
            $scope.modelData.county_usr = {id_sta: 0, name_sta: "Please Select"};
            $scope.modelData.country_usr = {id_cnt: 0, name_cnt: "Please Select"};
            $scope.modelData.sex_usr = {id: 0, val: "Gender"};
            $scope.modelData.title_usr = {keys: 0, val: "Title"};
            $scope.modelData.catagory_usr = {id_cnt: 0, name_cnt: "Catagory"};
            var profileImage = document.getElementById("victimProfileImage");
            profileImage.src = "images/profile_img.png";
            $scope.addOrEdit = "Add";
            $scope.images = [];
            dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
                var data = JSON.parse(result[0].json_data);

                $scope.$apply(function () {
                    $scope.country = data.country;
                    $scope.country.unshift({id_cnt: 0, name_cnt: "Please Select"});
                });
            });
            if ($scope.victim_id) {

                $scope.addOrEdit = "Edit";
                var data = $scope.victimData;
                var scopeVictimDetails = angular.element('#215').scope();
                $scope.modelData.category_usr = [];
                for (var i = 0; i < $scope.catagory.length; i++) {
                    for (var j = 0; j < scopeVictimDetails.victimCategories.length; j++)
                        if ($scope.catagory[i].id_uct == scopeVictimDetails.victimCategories[j].id_uct) {
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
                $scope.formData.postcode_usr = data.postcode_usr == "<b>Not Entered</b>" ? "" : data.postcode_usr;

                if (data.images >= 1) {
                    $scope.formData.image_users = constanObject.VICTIME_IMAGE + $scope.victim_id + "/1";
                    var profileImage = document.getElementById("victimProfileImage");
                    profileImage.src = constanObject.VICTIME_IMAGE + $scope.victim_id + "/1";
                }
                $scope.images = [];
                if (data.images > 0) {
                    for (var i = 1; i <= data.images; i++) {
                        $scope.images.push({id: i, url: constanObject.VICTIME_IMAGE + $scope.victim_id + "/" + i});
                    }
                } else {
                    $scope.images.push({id: i, url: "images/offenders-pic/pic08.jpg"});
                }
                $scope.title_usr.forEach(function (obj) {
                    if (obj.keys == data.title_usr) {
                        $scope.modelData.title_usr = obj;
                        $scope.formData.title_usr = obj.keys;
                    }

                });
                if (data.sex_usr != "<b>Not Entered</b>") {
                    $scope.gender.forEach(function (obj) {
                        if (obj.val == data.sex_usr) {
                            $scope.modelData.sex_usr = obj;
                            $scope.formData.sex_usr = obj.keys;
                        }

                    });
                }

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

        }
    };

    $scope.$watch('victimForm.$valid', function (isValid) {
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
        var profileImage = document.getElementById("victimProfileImage");
        profileImage.src = "images/profile_img.png";
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
        $scope.isCameraOption = false;
        imageService.getCameraImage(function (item) {
            uploadPhoto(item);
        });
    };
    $scope.openGallery = function () {
        $scope.isCameraOption = false;
        imageService.getMediaImage(function (item) {
            uploadPhoto(item);
        });
    };
    $scope.closeCameraOption = function () {
        $scope.isCameraOption = false;
    };
    function uploadPhoto(imageURI) {
        imageflag = true;
//        $scope.$apply(function () {
//            $scope.images.push({name: item.title, url: item.src, id: item.id});
//        });
//        if (!$scope.extraImages) {
//            var profileImage = document.getElementById("victimProfileImage");
//            profileImage.src = item.src;
//        }

        if (isProfileImage) {
            $scope.$apply(function () {
                $scope.showProfileCancel = true;
                var profileImage = document.getElementById("victimProfileImage");
                profileImage.src = imageURI.src;
                $scope.profileImage = {name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage};
            });
        } else {
            $scope.$apply(function () {
                $scope.images.push({name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage});
            });
        }
    }
    ;
    $scope.catagoryChange = function (catagory) {
        $scope.formData.category_usr = [];
        catagory.forEach(function (obj) {
            $scope.formData.category_usr.push(obj.id_uct);
        });
        //console.log("$scope.formData.category_usr : " + JSON.stringify($scope.formData.category_usr));
    };
    $scope.deleteImage = function (image) {
        var index = $scope.images.indexOf(image);
        $scope.images.splice(index, 1);
    };
    $scope.titleChange = function (title) {
        //console.log("title.id : " + JSON.stringify(title));
        $scope.formData.title_usr = title.keys;
    };
    $scope.genderChange = function (gend) {
        //console.log("gend.id : " + JSON.stringify(gend));
        $scope.formData.sex_usr = gend.keys;
    };

    $scope.countryChange = function (country) {
        $scope.formData.country_usr = country.id_cnt;
    };
    $scope.stateChange = function (state) {
        $scope.formData.county_usr = state.id_sta;
    }
    $scope.cityChange = function (city) {
        //console.log("result:::::" + JSON.stringify(city));
        $scope.formData.town_usr = city.id_cit;

    };
    $scope.textFocus = function () {
        var scope1 = angular.element('#212').scope();
        $rootScope.show = false;
        $("#lastnamerequires").hide();
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.victimAddShowStatus) {
            window.scrollTo(0, 0);
            if ($scope.victimForm.$valid) {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
//                    globalService.setOffender({addedOffender: $scope.formData});
                    var scope1 = angular.element('#212').scope();
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

        }
    };
    $scope.back = function (callback) {
        if ($rootScope.victimAddShowStatus) {
            window.scrollTo(0, 0);
            $rootScope.show = false;

            $("#lastnamerequires").hide();
            if ($scope.victim_id) {
                $rootScope.victimDetailShowStatus = true;
                $rootScope.victimAddShowStatus = false;
                $scope.modelData = {};
                $scope.formData = {};
                $scope.images = [];
                $scope.catagory = null;
            } else {
                $scope.images = [];
                $scope.modelData = {};
                $scope.formData = {};
                $rootScope.victimListShowStatus = true;
                $rootScope.victimAddShowStatus = false;
            }
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                callback(true, 1);
            } else {
                setFirstTab();
                callback(false, 0);
            }
        }
    };

    $scope.saveButtonAction = function () {
        setFirstTab();
    };
    $scope.saveData = function () {
        //console.log("SAVE");
        if ($scope.victimForm.$valid) {
            if ($scope.victimData == null) {
                VictimWitness.addNewVictim($scope.addURL, $scope.formData, function (status, victime_id) {
                    if (victime_id) {
                        $scope.victim_id = victime_id;
                        var scope = angular.element('#215').scope();
                        scope.edit = false;
                        if ($scope.profileImage)
                            $scope.images.unshift($scope.profileImage);
                            $scope.profileImage = null
                        if (imageflag && $scope.images.length > 0) {
                            for (var i = 0; i < $scope.images.length; i++) {
                                webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.VICTIME_IMAGE_UPLOAD + victime_id, "image_users", 100);
                            }
                            imageflag = false;
                        } else {
                            var scope = angular.element('#215').scope();
                            $scope.formData = {};
                            $scope.modelData = {};
                            $scope.images = [];
                            $scope.$apply(function () {
                                $rootScope.victimDetailShowStatus = true;
                                $rootScope.victimAddShowStatus = false;
                                setFirstTab();

                            });
                            scope.victim_Id = victime_id;
                            scope.init();
                        }
                    }
                });
                //console.log(JSON.stringify($scope.formData));
            } else {
                VictimWitness.addNewVictim(constanObject.VICTIME_EDIT + $scope.victim_id, $scope.formData, function (status, victime_id) {
                    if (victime_id) {
                        var scope = angular.element('#212').scope();
                        scope.selectedVictims.forEach(function (obj) {
                            if (obj.id_usr == $scope.victim_id) {
                                var index = scope.selectedVictims.indexOf(obj);
                                scope.selectedVictims.splice(index, 1);
                            }
                        });
                        var scope1 = angular.element('#215').scope();
                        scope1.edit = true;
                        if ($scope.profileImage)
                            $scope.images.unshift($scope.profileImage);
                        $scope.profileImage = null
                        if (imageflag && $scope.images.length > 0) {


                            for (var i = 0; i < $scope.images.length; i++) {
                                // webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.VICTIME_IMAGE_UPLOAD + victime_id, "image_users", 100);
                                webRequestObject.fileUpload($scope, $scope.images[i].url,
                                constanObject.VICTIME_IMAGE_UPLOAD + $scope.victim_id, "image_users", 100);
                            }
                        } else {
                            $scope.$apply(function () {
                                $scope.formData = {};
                                $scope.modelData = {};
                                $scope.images = [];
                                var scope1 = angular.element('#215').scope();
                                $rootScope.victimDetailShowStatus = true;
                                $rootScope.victimAddShowStatus = false;
                                scope1.victim_Id = $scope.victim_id;
                                setFirstTab();
                                scope1.init();
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
                $scope.formData = {};
                $scope.modelData = {};
                $scope.images = [];

                var scope = angular.element('#215').scope();
                scope.victim_Id = $scope.victim_id;


                try {
                    //$scope.$apply(function () {

                    setFirstTab();

                    $rootScope.victimDetailShowStatus = true;
                    $rootScope.victimAddShowStatus = false;
                    scope.init();


                    // });
                } catch (e) {
                    setFirstTab();
                    $rootScope.victimDetailShowStatus = true;
                    $rootScope.victimAddShowStatus = false;
                    scope.init();

                }
                //console.log(JSON.stringify(responseData));
                break;
        }
    };
    var tempId = 0;
    function setOfflineData() {
        $scope.formData.id_usr = tempId--;

        //console.log("$scope.formData : " + JSON.stringify($scope.formData));
        var scope1 = angular.element('#212').scope();
        var formDataCopy = angular.copy($scope.formData);
        formDataCopy.categories = [];
        if (formDataCopy.category_usr != undefined) {
            for (var i = 0; i < formDataCopy.category_usr.length; i++) {
                formDataCopy.categories.push({id_uct: formDataCopy.category_usr[i]});
            }
        }

        scope1.addAndRemoveOffenders(formDataCopy, false);
        formDataCopy.fileid = [];

        $scope.images.forEach(function (obj) {
            var TimeStamp=getUniqueId.getId();
            formDataCopy.fileid.push(TimeStamp);
            dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT_FILE, FILES_UPLOAD_KEY,
            [constanObject.FileUploadModuleId.VICTIM.toString(), ++(obj.id), 
                constanObject.CREATE_INCIDEN_TEMP_ID.toString(),
                obj.url.toString(), "image", "0", TimeStamp,
                globalService.getUserId(), "-1"], null);
        });
        
        var scope = angular.element('#213').scope();
        scope.victims.push(formDataCopy);
        globalService.setVictim({addedVictim: formDataCopy});



    }
    function setFirstTab() {
        $("#214").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#214").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#214").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#214").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#214").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#214").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#214").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#214").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#214").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#214").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#214").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#214").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    }
    ;
});

//BandQModule.filter('startFrom', function () {
//    return function (input, start) {
//        if (input) {
//            start = +start; //parse to int
//            return input.slice(start);
//        }
//        return [];
//    };
//});