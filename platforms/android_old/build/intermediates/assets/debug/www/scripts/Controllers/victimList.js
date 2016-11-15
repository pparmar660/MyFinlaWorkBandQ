BandQModule.controller('victimwinessCnt', function ($scope, VictimWitness, $rootScope, checkInternetConnectionService, globalService) {
    $scope.categoryList = null;
    $scope.prevShowStatus = null;
    $scope.nextShowStatus = null;
    $scope.canclebtntitle = "Yes";
    $scope.alertMessage = "";
    $scope.alertshowstatus = false;
    $scope.searchText = "";
    $scope.isVictim = true;
    $scope.infoShow1 = false;
    $scope.country = [];
    $scope.region = [];
    $scope.zone = [];
    $scope.selectedCategory = [];
    $scope.venue = [];
    $scope.model = {};
    $scope.filterParam = {};
    $scope.victimeData = [];
    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];
    $scope.selectedVictims = [];
    $scope.selectedCountry = [];
    $scope.selectedVenue = [];
    $scope.selectedZone = [];
    $scope.selectedRegion = [];
    $scope.page = null;
    $scope.isNotePopUp = false;
    $scope.comms = [];
    $scope.ListStaff = [];
    $scope.isNoteDesc = false;
    $scope.isDeadLine = false;
    $scope.isRemind = false;
    $scope.isWith = false;
    $scope.isPhotoLibrary = false;
    $scope.isDuration = false;
    $scope.isMethod = false;
    $scope.isCameraOption = false;
    $scope.notes = {};
    $scope.CommsImages = [];

    var successMsg = "";
    $scope.isSuccess = false;
    var victimWitness_id = 0;
    var isSelection = false;
    var moduleId = 257;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isUploadSuccess = false;
    $scope.isCommAllowed = false;
    $scope.url = constanObject.VICTIME_LIST;
    var parent = $("#212").parents(".incident_report_wrapper");
    parent.removeClass("incident_report_wrapper");
    var noOfPageMove;
    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
        $rootScope.show = false;
        $scope.infoShow1 = false;
        $scope.categoryList = angular.copy(VictimWitness.getVictimCategory());
        $scope.selectedCategory=[];
        $scope.selectedCategory = angular.copy(VictimWitness.getSelectedVictimCategory());
        if ($rootScope.victimListShowStatus) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.victimListShowStatus = false;
                $rootScope.victimDetailShowStatus = false;
                $rootScope.victimAddShowStatus = true;
            } else {
                $scope.page = 1;
                $scope.prevShowStatus = false;
                $scope.nextShowStatus = true;
                $("div#victimListTab ul.staff_tabs li:first-child a").addClass("active");
                $("div#victimListTab ul.staff_tabs li:last-child a").removeClass("active");
                dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
                    var data = JSON.parse(result[0].json_data);

                    $scope.$apply(function () {
                        $scope.Countries = $scope.allCountryList = data.country;
                        $scope.Regions = $scope.allRegionList = data.regions;
                        $scope.Zones = $scope.allZoneList = data.zones;
                        $scope.Venues = $scope.allVenueList = data.venues.data;
                        $scope.city = data.city;
                        $scope.county = data.county;
                        var preData = globalService.getVenueId();
                        for (var i = 0; i < $scope.Countries.length; i++) {
                            var obj = $scope.Countries[i];
                            $scope.selectedCountry = new Array(0);
                            if (obj.id_cnt == preData.country_vns) {
                                $scope.selectedCountry.push(obj);
                                break;
                            }
                        }

                        for (var i = 0; i < $scope.Venues.length; i++) {
                            var obj = $scope.Venues[i];
                            $scope.selectedVenue = new Array(0);
                            if (obj.id == preData.id) {
                                $scope.selectedVenue.push(obj);
                                break;
                            }
                        }

                        for (var i = 0; i < $scope.Zones.length; i++) {
                            var obj = $scope.Zones[i];
                            $scope.selectedZone = new Array(0);
                            if (obj.pk_zone == preData.zone_vns) {
                                $scope.selectedZone.push(obj);
                                break;
                            }
                        }
                        for (var i = 0; i < $scope.Regions.length; i++) {
                            var obj = $scope.Regions[i];
                            $scope.selectedRegion = new Array(0);
                            if (obj.id_rgs == preData.region_vns) {
                                $scope.selectedRegion.push(obj);
                                break;
                            }
                        }
                        $scope.filterParam.country = preData.country_vns;
                        $scope.filterParam.region = preData.region_vns;
                        $scope.filterParam.zone = preData.zone_vns;
                        $scope.filterParam.venue = preData.id;
                        $scope.filterParam.category = $scope.selectedCategory;

                    });

                });
                $scope.getVictimWitnessList();
            }
        }
    };

    $scope.searchVictimAction = function () {
        $rootScope.show = false;
//        $scope.filterParam.name = $scope.searchText;
        $scope.filteroffender();
    };

    $scope.showVictimDetail = function (obj) {
        var scope = angular.element('#215').scope();
        scope.victim_Id = obj.id_usr;
        $rootScope.show = false;
        scope.catagory = $scope.categoryList;
        $rootScope.victimListShowStatus = false;
        $rootScope.victimDetailShowStatus = true;
        scope.edit == null;
        scope.init();

    };
    $scope.editVictim = function (obj) {
//        $rootScope.victimAddShowStatus = true;
//        $rootScope.victimListShowStatus = false;
//        var scope = angular.element('#214').scope();
//        scope.init(obj.id_usr);
    };
    $scope.selectVictim = function (obj) {
        $rootScope.multiSelection = true;
        $rootScope.show = false;
        $scope.addAndRemoveOffenders(obj, true);
        //console.log($scope.selectedOffenders);
    };

    $scope.addAndRemoveOffenders = function (obj, status) {
        var result = $scope.selectedVictims.filter(
                function (obj1) {
                    return (obj1.id_usr == obj.id_usr);
                }
        );
        if (result.length > 0) {
            if (status) {
                $scope.alertShow("Are you sure you want to remove this victim?", function (status1) {
                    if (status1) {
                        $scope.removeVictim(obj);
                    }
                });
            }
        } else {
            if (status) {
                $scope.alertShow("Are you sure you want to add this victim?", function (status1) {
                    if (status1) {
                        $scope.addVictim(obj);
                    }
                });
            } else {
                $scope.addVictim(obj);

            }


        }
    };

    $scope.addVictim = function (obj) {
        $("div .victim-view ul li").children("#" + obj.id_usr).addClass("active");
        $scope.selectedVictims.push(obj);
        //globalService.addVictim(obj);
    }
    $scope.removeVictim = function (obj) {
        $("div .victim-view ul li").children("#" + obj.id_usr).removeClass("active");
//                    $scope.selectedVictims.pop(obj);
        var index = $scope.selectedVictims.indexOf(obj);
        $scope.selectedVictims.splice(index, 1);
        //globalService.removeVictimIndex(obj);
        ////console.log($scope.selectedVictims);
    }


    $scope.alertShow = function (msg, callBack) {
        $scope.alertMessage = msg;
        $scope.alertshowstatus = true;
        $scope.yesAction = function () {
            $scope.alertshowstatus = false;
            callBack(true);
        };
        $scope.noAction = function () {
            $scope.alertshowstatus = false;
            callBack(false);
        };
    };

    $scope.getCountry = function (selectedCountry) {
        //console.log("selectedCountry : " + JSON.stringify(selectedCountry));
        $scope.filterParam.country = [];
        if (selectedCountry.length == 0) {
            $scope.filterParam.country = 0;
            $scope.filterParam.region = 0;
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;

            $scope.selectedCountry = new Array(0);
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedCountry.length; i++) {
                //console.log("Selected countries are " + selectedCountry[i].id_cnt);
                $scope.filterParam.country.push(selectedCountry[i].id_cnt);
            }

        }

        // set region, zone and venue
        $scope.Regions = new Array(0);
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        for (var i = 0; i < $scope.allRegionList.length; i++) {

            for (var j = 0; j < selectedCountry.length; j++) {

                for (var k = 0; k < $scope.allRegionList[i].country.length; k++) {

                    if ($scope.allRegionList[i].country[k].id_cnt == selectedCountry[j].id_cnt)
                        if ($.inArray($scope.allRegionList[i], $scope.Regions) < 0)
                            $scope.Regions.push($scope.allRegionList[i]);
                }
            }
        }

    };
    $scope.regionChange = function (selectedRegion) {
        $scope.newSelectedZone = new Array(0);
        angular.copy($scope.selectedZone, $scope.newSelectedZone);
        $scope.filterParam.region = [];
        if (selectedRegion.length == 0) {
            $scope.filterParam.region = 0;
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedRegion.length; i++) {
                //console.log("Selected regions are " + selectedRegion[i].id_rgs);
                $scope.filterParam.region.push(selectedRegion[i].id_rgs);
            }
            $scope.filterParam.country = [];
            $scope.selectedCountry = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < selectedRegion.length; j++) {
                    for (var k = 0; k < selectedRegion[j].country.length; k++) {
                        if ($scope.allCountryList[i].id_cnt == selectedRegion[j].country[k].id_cnt)
                            if ($.inArray($scope.allCountryList[i], $scope.selectedCountry) < 0) {
                                $scope.selectedCountry.push($scope.allCountryList[i]);
                                $scope.filterParam.country.push(selectedRegion[j].country[k].id_cnt);
                                console.log("selectedRegion : " + JSON.stringify(selectedRegion[j]));
                            }
                    }
                }
            }

        }

        // set  zone and venue
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        for (var i = 0; i < $scope.allZoneList.length; i++) {

            for (var j = 0; j < selectedRegion.length; j++) {

                for (var k = 0; k < $scope.allZoneList[i].region.length; k++) {

                    if ($scope.allZoneList[i].region[k].fk_region == selectedRegion[j].id_rgs)
                        if ($.inArray($scope.allZoneList[i], $scope.Zones) < 0)
                            $scope.Zones.push($scope.allZoneList[i]);
                }
            }
        }
        
                $scope.selectedZone = new Array(0);
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.selectedZone = new Array(0);
                for (var i = 0; i < $scope.Zones.length; i++) {
                    for (var j = 0; j < $scope.newSelectedZone.length; j++)
                        if ($scope.Zones[i].pk_zone == $scope.newSelectedZone[j].pk_zone) {
                            $scope.selectedZone.push($scope.Zones[i]);
                            break;
                        }
                }
            });
        }, 200);

    };
    $scope.zoneChange = function (selectedZone) {
        $scope.filterParam.zone = [];
        if (selectedZone.length == 0) {
            $scope.filterParam.zone = 0;
            $scope.filterParam.venue = 0;
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (i = 0; i < selectedZone.length; i++) {
                //console.log("Selected regions are " + selectedZone[i].pk_zone);
                $scope.filterParam.zone.push(selectedZone[i].pk_zone);
            }
            if ($scope.filterParam.region == 0) {
                $scope.filterParam.region = [];
            }


            $scope.filterParam.region = [];
            $scope.selectedRegion = [];

            for (var i = 0; i < $scope.allRegionList.length; i++) {
                for (var j = 0; j < selectedZone.length; j++) {
                    for (var k = 0; k < selectedZone[j].region.length; k++) {
                        if ($scope.allRegionList[i].id_rgs == selectedZone[j].region[k].fk_region) {
                            if ($.inArray($scope.allRegionList[i], $scope.selectedRegion) < 0) {
                                $scope.selectedRegion.push($scope.allRegionList[i]);
                                $scope.filterParam.region.push(selectedZone[j].region[k].fk_region);
                                console.log("New Selected Region : " + JSON.stringify($scope.selectedRegion));
                            }
                        }
                    }

                    //$scope.region.push($scope.allRegionList[i]);

                }
            }

        }
        $scope.Venues = new Array(0);
        for (var i = 0; i < $scope.allVenueList.length; i++) {
            for (var j = 0; j < selectedZone.length; j++) {
                if ($scope.allVenueList[i].zone_vns == selectedZone[j].pk_zone)
                    if ($.inArray($scope.allVenueList[i], $scope.Venues) < 0)
                        $scope.Venues.push($scope.allVenueList[i]);

            }
        }
    };
    $scope.getVenue = function (selectedVenue) {
        //console.log("selectedVenue : " + JSON.stringify(selectedVenue));
        $scope.filterParam.venue = [];
        $scope.filterParam.zone = [];
        if (selectedVenue.length == 0) {
            $scope.filterParam.venue = 0;
        } else {
            if ($scope.filterParam.venue == 0) {
                $scope.filterParam.venue = []
            }
            if ($scope.filterParam.zone == 0) {
                $scope.filterParam.zone = [];
            }
            $scope.filterParam.venue = [];
            $scope.filterParam.zone = [];
            $scope.selectedZone = [];

            for (i = 0; i < selectedVenue.length; i++) {
                $scope.filterParam.venue.push(selectedVenue[i].id);
            }

            for (var i = 0; i < $scope.allZoneList.length; i++) {
                for (var j = 0; j < selectedVenue.length; j++) {
                    if ($scope.allZoneList[i].pk_zone == selectedVenue[j].zone_vns) {
                        $scope.selectedZone.push($scope.allZoneList[i]);
                        $scope.filterParam.zone.push($scope.allZoneList[i].pk_zone);
                    }
                }
            }
        }


    };



    $scope.filteroffender = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        $scope.filterParam.name = $scope.searchText;
        //console.log(JSON.stringify($scope.filterParam));
        var filterData = {search: $scope.filterParam};
        $scope.page = null;
        VictimWitness.getVictimeData($scope.page, $scope.url, filterData, function (status, response, data, next_page_url, prev_page_url) {
            if (status) {
                $scope.$apply(function () {
                    $scope.infoShow1 = false;
                    //console.log(JSON.stringify(data));
                    $scope.victimeData = data;
                    if (next_page_url == null) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    } else {
                        if (prev_page_url != null) {
                            $scope.prevShowStatus = true;
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.prevShowStatus = false;
                            $scope.nextShowStatus = true;
                        }
                    }

                });

                hilightVictim();
            } else {
                $scope.$apply(function () {
                    $scope.victimeData = [];
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                });
            }
        });
    };
    $scope.infoClose = function () {
        $scope.infoShow1 = false;
    }
    $scope.addVictimAction = function () {
        var nextPageScope = angular.element($('#214')).scope();
        nextPageScope.victim_id = null;
        nextPageScope.victimData = null;
        nextPageScope.catagory = $scope.categoryList;
        $rootScope.victimListShowStatus = false;
        $rootScope.victimAddShowStatus = true;
        nextPageScope.init();
    };

    $scope.categoryChangeAction = function (index, catObj) {
        ($scope.categoryList[index].selected == true) ? ($scope.categoryList[index].selected = false) : ($scope.categoryList[index].selected = true);
        
        if ($scope.selectedCategory.indexOf(catObj.id_uct) == -1) {
            //console.log("element doesn't exist");
            $scope.selectedCategory.push(catObj.id_uct);
        } else {
            //console.log("element found");
            var index = $scope.selectedCategory.indexOf(catObj.id_uct);
            $scope.selectedCategory.splice(index, 1);
        }
    };

//    $scope.previousPageRequest = function () {
//        if ($scope.page == 1) {
//            $scope.prevShowStatus = false;
//            $scope.nextShowStatus = true;
//            return;
//        } else {
//            $scope.prevShowStatus = true;
//            $scope.nextShowStatus = true;
//            $scope.page--;
//        }
//
//        VictimWitness.getVictimeData($scope.page, $scope.url, null, function (status, data) {
//            $scope.$apply(function () {
//                $scope.victimeData = data;
//            });
//            hilightVictim();
//        });
//    };

    $scope.previousPageRequest = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        if ($scope.page > 1) {
            $scope.prevShowStatus = true;
            $scope.nextShowStatus = true;
            window.scrollTo(0, 0);
            var page = ($scope.page > 1 ? (--$scope.page) : 1);
            VictimWitness.getVictimeData(page, $scope.url, null, function (status, response, data, next_page_url, prev_page_url) {
                $scope.$apply(function () {
                    if (page == 1) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = true;
                    }
                    $scope.victimeData = data;
                });
                $scope.infoShow1 = false;

                hilightVictim();

            });
        } else {
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
        }
    };


    $scope.nextPageRequest = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        $scope.page++;
        window.scrollTo(0, 0);
        VictimWitness.getVictimeData($scope.page, $scope.url, null, function (status, response, data, next_page_url, prev_page_url) {
            $scope.$apply(function () {
                if (status) {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = true;
                    $scope.victimeData = data;
                    $scope.infoShow1 = false;
                } else {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = false;
                    $scope.infoShow1 = true;
                    $scope.page--;
                }
            });
            hilightVictim();
        });
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.victimListShowStatus) {
            window.scrollTo(0, 0);
            if ($scope.selectedVictims.length > 0) {
                var scope = angular.element('#213').scope();
                scope.catagory = $scope.categoryList;
                scope.victims = $scope.selectedVictims;
                return callback(true, 1);
            } else {
                $rootScope.show = true;
                window.scrollTo(0, 0);
                $rootScope.alertMsg = "Please add/select a victim.";
                return callback(false, 0);
            }
        }
//        return callback(false, 0);
    };

    $scope.back = function (callback) {
        if ($rootScope.victimListShowStatus)
            return callback(true, noOfPageMove);
    };

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };

    $scope.getVictimWitnessList = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var preData = globalService.getVenueId();
        var searchData = {search: {country: preData.country_vns, zone: preData.zone_vns, venue: preData.id, region: preData.region_vns, category: $scope.selectedCategory}};
        VictimWitness.getVictimeData($scope.page, $scope.url, searchData, function (status, response, data, next_page_url, prev_page_url) {
            $scope.$apply(function () {
                if (!status) {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.victimeData = [];
                } else {
                    //console.log(JSON.stringify(data));
                    $scope.victimeData = data;
                    if (data.length >= 20) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    }
                    hilightVictim();
                }
            });
        });

    };

    function hilightVictim() {
        $scope.selectedVictims.forEach(function (obj) {
            $("div .victim-view ul li").children("#" + obj.id_usr).addClass("active");
        });
    }
    ;

//    var getCommsDetails = function (vechileId) {
//        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
//                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
//    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function (victimWitness) {
        victimWitness_id = victimWitness.id_usr;
        //console.log("showAddNotePopup");
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + victimWitness_id;
        //function(classObject,type,webUrl,parameters,requestType,showProgress)
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

        //$scope.isNotePopUp = true;
    };

    $scope.hideAddNotePopup = function () {
        $scope.isNotePopUp = false;
    };



    $scope.methodChange = function (method) {
        //console.log("Method : " + JSON.stringify(method));
        $scope.notes = {};
        $scope.isNoteDesc = method.detail == 1 ? true : false;
        $scope.isDeadLine = method.deadline == 1 ? true : false;
        $scope.isRemind = method.remind_me == 1 ? true : false;
        $scope.isWith = method.opt_with == 1 ? true : false;
        $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
        $scope.isDuration = method.duration == 1 ? true : false;
        $scope.notes.note_type_jnt = method.id_comms;


    };

    $scope.staffChange = function (staff) {

        $scope.notes.tagged_user = [];
        $scope.$apply(function () {
            if (staff.length > 1) {
                for (var i = 0; i < staff.length; i++) {

                    $scope.notes.tagged_user.push(staff[i].id_usr);

                }

            } else {
                $scope.notes.tagged_user.push(staff[0].id_usr);
            }
        });

        //console.log("Selected Staff : " + JSON.stringify(staff));


    };

    $scope.uploadImage = function () {
        $scope.CommsImages = [];
        $scope.isCameraOption = true;
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
        //console.log("imageURI : " + imageURI);
        $scope.isUploadSuccess = true;
        var arr = imageURI.src.split("/");
        var name = arr[arr.length - 1];
        $scope.$apply(function () {
            $scope.CommsImages.push({name: name, url: imageURI.src});
        });
        hideUploadSuccessMsg();
    }
    function hideUploadSuccessMsg() {
        $timeout(function () {
            $scope.isUploadSuccess = false;
        }, 5000);
    }

    $scope.AddNote = function () {
        $scope.notes.module_id = moduleId;
        $scope.notes.id_jno_jnt = victimWitness_id;
        $scope.notes.id_usr_jnt = localStorage.getItem("userId");
        $scope.notes.note_by = localStorage.getItem("userId");
        $scope.notes.latitude = CURRENT_LATITUDE;
        $scope.notes.longitude = CURRENT_LONGITUDE;
        //console.log("Add Note Data : " + JSON.stringify($scope.notes));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.InsertComms, JSON.stringify($scope.notes), constanObject.CommsAndTaskWebRequestType.AddComms, true);
    };

    $scope.closeSuccess = function () {
        $scope.isSuccess = false;
    };

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            $scope.$apply(function () {
                $rootScope.show = true;
                $rootScope.alertMsg = responseData.responseJSON.error;
            });
            return;
        }
        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.CommsConfigType:
                //console.log("responseData : " + JSON.stringify(responseData));
                //console.log("responseData.data.comms.comm_row_title : " + responseData.data.comm_row_title);
                $scope.$apply(function () {
                    $scope.commsTitle = responseData.data.comm_row_title;
                    $scope.comms = responseData.data.comms;
                    if ($scope.comms.length < 2)
                        $scope.isMethod = false;
                    else
                        $scope.isMethod = true;

                    //console.log(" $scope.isMethod : " + $scope.isMethod);
                    $scope.isNotePopUp = true;
                });
                $scope.selectedMethod = responseData.data.comms[0];
                $scope.methodChange($scope.selectedMethod);
                break;
            case constanObject.CommsAndTaskWebRequestType.ListStaff:

                $scope.$apply(function () {
                    $scope.ListStaff = responseData.data;
                });
                //console.log("$scope.ListStaff : " + JSON.stringify($scope.ListStaff));

                break;
            case constanObject.CommsAndTaskWebRequestType.AddComms:

                //console.log("AddComms : " + JSON.stringify(responseData));
                //{"data":{"note_id":400,"message":" Comms Inserted Successfully"}}
                var note_id = responseData.data.note_id;
                successMsg = responseData.data.message;
                if ($scope.CommsImages.length > 0) {
                    for (var i = 0; i < $scope.CommsImages.length; i++) {

                        webRequestObject.fileUpload($scope, $scope.CommsImages[i].url, constanObject.UploadCommsFile + note_id, constanObject.COMMS_IMAGE_KEY, constanObject.CommsAndTaskWebRequestType.UploadCommsFile, true);
                    }
                } else {
                    $scope.$apply(function () {
                        $scope.isSuccess = true;
                        $scope.successMsg = successMsg;
                        $scope.isNotePopUp = false;
                        //getCommsDetails(victimWitness_id);
                    });

                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                //console.log(JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.CommsImages = [];
                    $scope.isSuccess = true;
                    $scope.successMsg = successMsg;
                    $scope.isNotePopUp = false;
                    //getCommsDetails(victimWitness_id);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                //console.log("Comms Details : " + JSON.stringify(responseData));
                $scope.$apply(function () {

                    $scope.commsNote = responseData.data.list_data;

//                    for(var i=0;i<$scope.commsNote.length;i++){
//                        $scope.staffImage.push({src:constanObject.GetStaffImage+$scope.commsNote[i].id_usr+"/1"})
//                    }
                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    }
});