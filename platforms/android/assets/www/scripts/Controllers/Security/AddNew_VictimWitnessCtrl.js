BandQModule.controller('AddNew_VictimWitnessCtrl', function ($scope, globalService, $rootScope, checkInternetConnectionService, WitnessService, VictimWitness, imageService, advanceFilter, getAllFieldLabel, getVictimWitnessCategory) {
//   alert("AddNew_VictimWitnessCtrl");
    $scope.modelData = {};
    $scope.formData = {};
//    $scope.isVictime = true;
    $scope.VictimWitnessData = null;
    $scope.victimWitnessSelection = null;
//    $scope.selectedCat = [];
   $scope.isCameraOption = false;
    $scope.isFileUpload = false;
    $scope.witnessVictim_id = 0;
    $scope.catagory = [];
    $scope.formData.image_users = ["images/profile_img.png"];
    $scope.title = "Add Witness";
    $scope.images = [];
    $scope.isVictim = null;
    $scope.title_usr = [];
    $scope.gender = [];
    $scope.country = [];
    $scope.states = [];
    $scope.cities = [];
    $scope.isDisableVictimBtn = false;
    $scope.isDisableWitnessBtn = false;
    var imageflag = false;
    var i = 0;
    $scope.isNoInterStrip = true;
    $scope.showProfileCancel = false;
    var isProfileImage = false;
    $scope.catagory= [];
    $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };
    $scope.addOnlyVictims = function () {
        $rootScope.filterViewVW = "Victim";
        $rootScope.subMenuTitle1 = "Add New Victim";
        $('#addOnlyVictims').addClass("active");
        $('#addOnlyWitness').removeClass("active");
    }
    $scope.addOnlyWitness = function () {
        $rootScope.filterViewVW = "Witness";
        $rootScope.subMenuTitle1 = "Add New Witness";
        $('#addOnlyVictims').removeClass("active");
        $('#addOnlyWitness').addClass("active");
    }
    $scope.init = function () {
        setFormFieldLableData();
     //  getVictimWitnessCategory.download();
       $scope.errorshow = false;
      $("#link_1").removeClass("activate");
        $("#link_2").removeClass("activate");
        $("#link_3").removeClass("activate");
        $("#link_4").removeClass("activate");
        $("#link_5").addClass("activate");
        window.scrollTo(0, 0);
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        getFilterData();
          getCatagory();
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
        $scope.isNoInterStrip = false;
        imageflag = false;
        $rootScope.show = true;
        $scope.formData = {};
        $scope.modelData = {};
        if ($rootScope.isVictimWitnessAdd) {
            $scope.victimWitnessSelection = false;
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            $rootScope.subMenuTitle1 = "Add New";
            if ($rootScope.filterViewVW == "Witness")
                $scope.isVictim = false;
            else
                $scope.isVictim = true;

            $scope.modelData.town_usr = {id_cit: 0, name_cit: "Please Select"};
            $scope.modelData.county_usr = {id_sta: 0, name_sta: "Please Select"};
            $scope.modelData.country_usr = {id_cnt: 0, name_cnt: "Please Select"};
//            $scope.modelData.sex_usr = {id: 0, val: "Please Select"};
//            $scope.modelData.title_usr = {id: 0, val: "Please Select"};
            var profileImage = document.getElementById("victimProfileImage");
            profileImage.src = "images/profile_img.png";
            $scope.images = [];
            getCountryList(function (country) {
                $scope.$apply(function () {
                    $scope.country = country;
                    $scope.country.unshift({id_cnt: 0, name_cnt: "Please Select"});
                });
            });
      
            if ($scope.witnessVictim_id) {
               
                $rootScope.menuTitle = "Security";
                $rootScope.subMenuTitle = "Victims & Witnesses";
                $scope.victimWitnessSelection = false;

                //var scope = angular.element('#List_VictimWitness').scope();
                //$scope.catagory = [];
                //$scope.catagory = scope.ListCatagory;

                $scope.isFileUpload = false;
                $scope.editInTitle = "Edit Victim/Witness: ";
                if ($rootScope.filterViewVW == "Witness") {
                    $rootScope.subMenuTitle1 = "Witness Edit";
                    $scope.isDisableVictimBtn = true;
                    $scope.isDisableWitnessBtn = false;
                } else {
                    $rootScope.subMenuTitle1 = "Victim Edit";
                    $scope.isDisableVictimBtn = false;
                    $scope.isDisableWitnessBtn = true;
//                    $scope.editInTitle = "Edit ";
                }
                var data = $scope.VictimWitnessData;
                $scope.formData.firstname_usr = (data.firstname_usr == "<b>Not Entered</b>") || (data.firstname_usr == "Not Entered") ? "" : data.firstname_usr;
                $scope.formData.lastname_usr = (data.lastname_usr == "<b>Not Entered</b>") || (data.lastname_usr == "Not Entered") ? "" : data.lastname_usr;
                $scope.formData.address_usr = (data.address_usr == "<b>Not Entered</b>") || (data.address_usr == "Not Entered") ? "" : data.address_usr;
                $scope.formData.address_2usr = (data.address_2_usr == "<b>Not Entered</b>") || (data.address_2_usr == "Not Entered") ? "" : data.address_2_usr;
                $scope.formData.address_3usr = (data.address_3_usr == "<b>Not Entered</b>") || (data.address_3_usr == "Not Entered") ? "" : data.address_3_usr;
                $scope.formData.p_tph_usr = data.p_tph_usr == "<b>Not Entered</b>" ? "" : data.p_tph_usr;
                $scope.formData.p_mob_usr = data.p_mob_usr == "<b>Not Entered</b>" ? "" : data.p_mob_usr;
                $scope.formData.email_usr = (data.email_usr == "<b>Not Entered</b>") || (data.email_usr == "Not Entered") ? "" : data.email_usr;
                $scope.formData.postcode_usr = data.postcode_usr == "<b>Not Entered</b>" ? "" : data.postcode_usr;
                $scope.modelData.category_usr = [];
                for (var i = 0; i < $scope.catagory.length; i++) {
                    for (var j = 0; j < data.categories.length; j++)
                        if ($scope.catagory[i].id_uct == data.categories[j].id_uct) {
                            $scope.modelData.category_usr.push($scope.catagory[i]);
                        }
                }

                if (data.images > 0) {
                    var profileImage = document.getElementById("victimProfileImage");
                    $scope.images = [];
                    if ($scope.isVictim) {
                        $scope.formData.image_users = constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/1";
                        profileImage.src = constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/1";
                    } else {
                        $scope.formData.image_users = constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/1";
                        profileImage.src = constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/1";
                    }

                    for (var i = 1; i <= data.images; i++) {
                        if ($scope.isVictim)
                            $scope.images.push({name: '', url: constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/" + i, id: i});
                        else
                            $scope.images.push({name: '', url: constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/" + i, id: i});

                    }
                }
                $scope.title_usr.forEach(function (obj) {
                    if (obj.keys == data.title_usr) {
                        $scope.modelData.title_usr = obj;
                        $scope.formData.title_usr = obj.keys;
                    }

                });
                if ((data.sex_usr != "Not Entered") || (data.sex_usr != "<b>Not Entered</b>")) {
                    $scope.gender.forEach(function (obj) {
                        if (obj.keys == data.sex_usr) {
                            $scope.modelData.sex_usr = obj;
                            $scope.formData.sex_usr = obj.keys;
                        }

                    });
                }

                getCountryList(function (country) {
                    if ((data.country_usr != "Not Entered") || (data.country_usr != "<b>Not Entered</b>")) {
                        country.forEach(function (obj) {
                            if (obj.id_cnt == data.country_usr) {
                                $scope.$apply(function () {
                                    $scope.modelData.country_usr = obj;
                                    $scope.formData.country_usr = obj.id;
                                });
                            }

                        });
                    }

                });
            } else {
//                var scope = angular.element('#List_VictimWitness').scope();
//                $scope.modelData.category_usr = scope.selectedCategory;
                $scope.editInTitle = null;
              
            }

        }
       
    };
             function setFormFieldLableData() {
        $scope.FormFieldLabelData = getAllFieldLabel.getData();


        if (!$scope.FormFieldLabelData) {
            setTimeout(function () {
                setFormFieldLableData();
            }, 1000);
        } else {
            setTimeout(function () {

                $scope.$apply(function () {
                    $scope.FormFieldLabelData = getAllFieldLabel.getData();
                    //  $scope.AllFieldLabelData = $scope.AllFieldLabelData.data;
                });


            }, 10);
        }

    }
    $scope.init();
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
    function getCatagory() {
          dataBaseObj.getDatafromDataBase("SELECT * FROM " + VICTIME_WITNESS_CATAGORY, function (result) {
            if (result[0]) {
                var victimWtnessCategory = JSON.parse(result[0].json_data);
                $scope.$apply(function () {
                   $scope.catagory = victimWtnessCategory;
                });
            }
        });

    }
    ;

    $scope.VictimeWitnessChamgeAction = function () {
        if ($scope.isVictim == "0") {
            $scope.isVictim = false;
        } else {
            $scope.isVictim = true;
        }
    };

    function getCountryList(callback) {
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
            if (result.length) {
                var data1 = JSON.parse(result[0].json_data);
                callback(data1.country);
            }
        });
    }
    $scope.removeProfileImage = function () {
        var profileImage = document.getElementById("victimProfileImage");
        profileImage.src = '';
        $scope.isCameraOption = false;
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
        $scope.isImageAdd = true;
        if (isProfileImage) {
          $scope.showProfileCancel = true;
                var profileImage = document.getElementById("victimProfileImage");
                profileImage.src = imageURI.src;
                $scope.profileImage = {name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage};
          
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
        if ($rootScope.isVictimWitnessAdd) {
            setFirstTab();
            if ($scope.witnessForm.$valid) {
//                $scope.formData
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    if ($rootScope.filterViewVW == "Witness") {
                        globalService.setWitness({witness: $scope.formData});
                    } else {
                        globalService.setVictim({victim: $scope.formData});
                    }

                    //setOfflineData();
                    return callback(true, 1);
                } else {
                    if ($rootScope.filterViewVW == "Witness") {
                        globalService.setWitness({witness: $scope.formData});
                    } else {
                        globalService.setVictim({victim: $scope.formData});
                    }

                    $scope.saveData();
                    //return callback(false, 0);
                }
            } else {
                $scope.errorshow = true;
                window.scrollTo(0, 0);
                $rootScope.alertMsg = "";
            }
            //return callback(false, 0);
        }
        //return callback(false, 0);
    };
    $scope.go_back = function (callback) {
          window.scrollTo(0, 0);
      $rootScope.menuTitle = "Security";
        $rootScope.subMenuTitle = "Victims & Witnesses";
        if ($rootScope.isVictimWitnessAdd) {
            $rootScope.show = false;
            $("#lastnamerequires").hide();
            setFirstTab();
            $scope.modelData = {};
            $scope.formData = {};
            $scope.images = [];
            $scope.catagory = null;
            if ($rootScope.backStatus == "main") {
              window.history.back();
                 
            } else {

                if ($scope.witnessVictim_id) {
                    $scope.modelData = {};
                    $scope.formData = {};
                    $scope.witnessVictim_id = 0;
                    $rootScope.isVictimWitnessDetail = true;
                    $rootScope.isVictimWitnessAdd = false;
                    
                } else {
                    $rootScope.isVictimWitnessList = true;
                    $rootScope.isVictimWitnessAdd = false;
                }
            }
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                return callback(true, 1);
            } else {
                //  return callback(false, 0);
            }

        }
      
    };
    $scope.saveButtonAction = function () {
    };
    $scope.saveData = function () {
        if ($scope.witnessForm.$valid) {
            if ($scope.VictimWitnessData == null) {
                if ($scope.isVictim) {
                    addNewVictim();
                } else {
                    addNewWitness();
                }

            } else {
                if ($scope.isVictim) {
                    updateVictim();
                } else {
                    updateWitness();

                }
            }

        } else {
            alert("enter valid fields");
        }
    }

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            return;
        }
        switch (requestType) {

            case 100:
                //console.log("ADD/UPDATE RESPONSE: " + JSON.stringify(responseData));
                if ($scope.VictimWitnessData == null){
                    console.log(JSON.stringify("$scope.victimIdforfileUpload" +$scope.victimIdforfileUpload));
                    afterAdd($scope.victimIdforfileUpload);
                }
                else
                    afterUpdate();
                break;
        }
    };
    $scope.textFocus = function () {
        $scope.errorshow = false;
    };
//    closeMsg
    function addNewWitness() {
        WitnessService.addNewWitness(constanObject.ADD_NEW_WITNESS, $scope.formData, function (status, witness_id) {
          //  console.log("witness_id: " + witness_id);
            $scope.witnessVictim_id = witness_id;
            $scope.victimIdforfileUpload = witness_id;
            if (witness_id) {
                var scope = angular.element('#Details_VictimWitness').scope();
                scope.edit = false;
            
                    if ($scope.profileImage)
                        $scope.images.unshift($scope.profileImage);
                        if ($scope.images.length > 0) {
                    for (var i = 0; i < $scope.images.length; i++) {
                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UPLOAD_WITNESS_FILES + witness_id, "image_users", 100, true);
                    }
                    imageflag = false;

                } else {
                    afterAdd(witness_id);
                }
                
               
                        
            }
        });
        //console.log(JSON.stringify($scope.formData));
    }
    function updateWitness() {
        WitnessService.addNewWitness(constanObject.UPDATE_WITNESS + $scope.witnessVictim_id, $scope.formData, function (status, witness_id) {

            if ($scope.witnessVictim_id) {
                var scope1 = angular.element('#Details_VictimWitness').scope();
                scope1.edit = true;
                if ($scope.profileImage)
                    $scope.images.unshift($scope.profileImage);
                if ($scope.isImageAdd && $scope.images.length) {
                    for (var i = 0; i < $scope.images.length; i++) {
                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UPLOAD_WITNESS_FILES + $scope.witnessVictim_id, "image_users", 100, true);
                    }
                    imageflag = false;
                } else {
                    afterUpdate();
                }
            }


        });
        //console.log(JSON.stringify($scope.formData));
    }

    function addNewVictim() {
        VictimWitness.addNewVictim(constanObject.ADD_NEW_VICTIME, $scope.formData, function (status, victime_id) {
              console.log("witness_id: " + victime_id);
              $scope.victimIdforfileUpload = victime_id;
            if (victime_id) {
                if ($scope.profileImage)
                    $scope.images.unshift($scope.profileImage);
                $scope.witnessVictim_id = victime_id;
                var scope = angular.element('#Details_VictimWitness').scope();
                scope.edit = false;
                if ($scope.images.length > 0) {
                    for (var i = 0; i < $scope.images.length; i++) {
                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.VICTIME_IMAGE_UPLOAD + victime_id, "image_users", 100);
                    }
//
//                    setTimeout(function () {
//                        imageflag = false;
//                        afterAdd(victime_id);
//                    }, 1000);
                } else {
                    imageflag = false;
                    afterAdd(victime_id);
                }

            }
        });
    }


    function updateVictim() {
        VictimWitness.addNewVictim(constanObject.VICTIME_EDIT + $scope.witnessVictim_id, $scope.formData, function (status, victime_id) {

            if ($scope.witnessVictim_id) {
                var scope1 = angular.element('#Details_VictimWitness').scope();
                scope1.edit = true;
                if ($scope.profileImage)
                    $scope.images.unshift($scope.profileImage);
                if ($scope.isImageAdd && $scope.images.length) {
                    for (var i = 0; i < $scope.images.length; i++) {
                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.VICTIME_IMAGE_UPLOAD + $scope.witnessVictim_id, "image_users", 100, true);
                    }
//                    imageflag = false;
//                    setTimeout(function () {
//                        afterUpdate();
//                    }, 1000);
                } else {
                    afterUpdate();
                }
            }


        });
        //console.log(JSON.stringify($scope.formData));
    }

    function afterAdd(id) {
        $scope.$apply(function () {
            $scope.formData = {};
            $scope.modelData = {};
            $scope.images = [];
            $rootScope.isVictimWitnessDetail = true;
            $rootScope.isVictimWitnessAdd = false;
            var scope = angular.element('#Details_VictimWitness').scope();
            scope.successShow = true;
            scope.fromList = false;
            scope.witnessVictim_id =id;
             if ($scope.isVictim) {
                scope.successMessage = "Victim added successfully";
                scope.isVictim = true;
            } else {
                scope.successMessage = "Witness added successfully";
                scope.isVictim = false;
            }
            setFirstTab();
            scope.init();

        });
    };
    

    function afterUpdate() {
        $scope.$apply(function () {
            $scope.formData = {};
            $scope.modelData = {};
            $scope.images = [];
            $rootScope.isVictimWitnessDetail = true;
            $rootScope.isVictimWitnessAdd = false;
            var scope = angular.element('#Details_VictimWitness').scope();
            scope.fromList = false;
            scope.victim_Id = scope.witnessVictim_id = $scope.witnessVictim_id;
            scope.successShow = true;
            $scope.witnessVictim_id = null;
            if ($scope.isVictim) {
                scope.successMessage = "Victim updated successfully";
                scope.isVictim = true;
            } else {
                scope.successMessage = "Witness updated successfully";
                scope.isVictim = false;
            }
            setFirstTab();
            scope.init($scope.witnessVictim_id);
        });
    }

    function setOfflineData() {

        if ($rootScope.filterViewVW == "Witness") {

            globalService.setWitness({addedWitness: $scope.formData});
            var scope = angular.element('#220').scope();
            $scope.formData.id_usr = i--;
            scope.witnessList.push($scope.formData);
            var milliseconds = new Date().getTime();
            dataBaseObj.insertData(TABLE_CRETAE_WITNESS, JSON_DATA_KEY, [JSON.stringify($scope.formData), milliseconds], null);
            $scope.images.forEach(function (obj) {

                dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT_FILE, FILES_UPLOAD_KEY, [constanObject.FileUploadModuleId.WITNESS.toString(), ++(obj.id), constanObject.CREATE_INCIDEN_TEMP_ID.toString(), obj.url.toString(), "image", "0", getUniqueId.getId(), globalService.getUserId(), "-1"], null);
            });
        } else {
            $scope.formData.id_usr = i--;
            globalService.setVictim({addedVictim: $scope.formData});
            var scope = angular.element('#213').scope();
            scope.victims.push($scope.formData);
            var milliseconds = new Date().getTime();
            dataBaseObj.insertData(TABLE_CRETAE_VICTIM, JSON_DATA_KEY, [JSON.stringify($scope.formData), milliseconds], null);
            $scope.images.forEach(function (obj) {
                dataBaseObj.insertData(TABLE_CREATE_INCIDENT_REPORT_FILE, FILES_UPLOAD_KEY, [constanObject.FileUploadModuleId.VICTIM.toString(), ++(obj.id), constanObject.CREATE_INCIDEN_TEMP_ID.toString(), obj.url.toString(), "image", "0", getUniqueId.getId(), globalService.getUserId(), "-1"], null);
            });
        }
    }
});
function setFirstTab() {
    $("#Add_VictimWitness").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
    $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
    if ($(window).width() < 768) {
        $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
    } else {
        $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
    }
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#Add_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
    });
}
;
BandQModule.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});