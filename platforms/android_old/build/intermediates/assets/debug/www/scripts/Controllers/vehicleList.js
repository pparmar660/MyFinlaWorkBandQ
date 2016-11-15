var selectedVechileScope = null;
var vehicle_id = 0;
BandQModule.controller("ViewVechiles", function ($scope, $rootScope, globalService, vehicleService) {
    var parent = $("#207").parents(".incident_report_wrapper");
    parent.removeClass("incident_report_wrapper");
    $scope.selectedVechile = [];
    $scope.vechilesNextURL = null;
    $scope.vechilePrevURL = null;
    $scope.Plate = "";
    $rootScope.show = false;
    $scope.vehicleCount = [];
    $scope.infoShow2 = false;
    $scope.search = {
        "country": [],
        "region": [],
        "zone": [],
        "venue": [],
        "name": ""
    };
    $scope.pagingNext = false;
    $scope.pagingPrev = false;

    $scope.tempSelectedVehicle = null;
    //$scope.search.inputVal = "";
    $scope.Vechiles = [];
    $scope.Countries = [];
    $scope.isVenue = false;
    $scope.isZone = false;
    $scope.Regions = [];
    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];
    $scope.Zones = [];
    $scope.selectedCountry = [];
    $scope.selectedVenue = [];
    $scope.selectedZone = [];
    $scope.selectedRegion = [];
    $scope.Venues = [];
    $scope.selectedVehicleIds = [];
    $scope.filterData = [];
//
//    $scope.allVehicleCount = 0;
//    $scope.partialVehicleCount = 0;
//    $scope.fullVehicleCount = 0;

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
    var row_id = 0;
    var successMsg = "";
    $scope.isSuccess = false;
    var vehicle_id = 0;
    var isSelection = false;
    var moduleId = 265;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isUploadSuccess = false;
    $scope.isCommAllowed = false;

    var noOfPageMove;
    $scope.init = function (_noOfPageMove) {
        $scope.activeMenu = 'All';
        noOfPageMove = _noOfPageMove;
        window.plugins.spinnerDialog.show();
        $rootScope.show = false;
        $scope.infoShow2 = false;
        $scope.Vechiles = [];
        var vehicleList = angular.copy(vehicleService.getVehicleList());
        $scope.search.name = angular.copy(vehicleService.getVehiclePlate());
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_COUNTRY_STATE_REGION_CITY, function (result) {
            var data = result;

            $scope.$apply(function () {
                $scope.Countries = $scope.allCountryList = data.country;
                $scope.Regions = $scope.allRegionList = data.regions;
                $scope.Zones = $scope.allZoneList = data.zones;
                $scope.Venues = $scope.allVenueList = data.venues.data;

                var preData = globalService.getVenueId();
                //console.log("preData : " + JSON.stringify(preData));

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




                var preData = globalService.getVenueId();
                $scope.search.country = preData.country_vns;
                $scope.search.region = preData.region_vns;
                $scope.search.zone = preData.zone_vns;
                $scope.search.venue = preData.id;





                window.plugins.spinnerDialog.hide();
            });
        }, true);

        $scope.$apply(function () {
            for (var i = 0; i < vehicleList.length; i++)
                $scope.Vechiles.push(new Item(vehicleList[i]));

            $scope.searchVechileActive("tab_partial");

        });

        getVehicleCount();
        hilightVehicle();
        window.scrollTo(0, 0);
    };

//    $scope.$watch('addVehicleForm.$valid', function (isValid) {
//        //alert('valid' + validity);
//        if (isValid) {
//            console.log("isValid : " + isValid);
//            $rootScope.enableBtn = "btn-green";
//        }
//        else {
//            console.log("isValid : " + isValid);
//            $rootScope.enableBtn = "";
//        }
//    });
    function getVehicleCount() {

        webRequestObject.postRequest($scope, "GET", constanObject.VehicleCount, null, constanObject.WebRequestType.VEHICLE_COUNT, true);
    }

    $scope.getCountry = function (selectedCountry) {
        // set region, zone and venue
        $scope.Regions = new Array(0);
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        $scope.search.country = [];
        if (selectedCountry.length == 0) {
            $scope.selectedCountry = new Array(0);
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);


            $scope.search.country = 0;
            $scope.search.region = 0;
            $scope.search.zone = 0;
            $scope.search.venue = 0;
        } else {
            for (var i = 0; i < selectedCountry.length; i++) {
                //console.log("Selected countries are " + selectedCountry[i].id_cnt);
                $scope.search.country.push(selectedCountry[i].id_cnt);
            }
            //console.log("Selected Country Ids : " + $scope.search.country);
        }


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
        // set  zone and venue
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        $scope.newSelectedZone = new Array(0);
        angular.copy($scope.selectedZone, $scope.newSelectedZone);

        $scope.search.region = [];
        if (selectedRegion.length == 0) {
            $scope.search.region = 0;
            $scope.search.zone = 0;
            $scope.search.venue = 0;

            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);

        } else {

            for (var i = 0; i < selectedRegion.length; i++) {
                //console.log("Selected regions are " + selectedRegion[i].id_rgs);
                $scope.search.region.push(selectedRegion[i].id_rgs);
            }
            //console.log("Selected Region Ids : " + $scope.search.region);
            $scope.search.country = [];
            $scope.selectedCountry = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < selectedRegion.length; j++) {
                    for (var k = 0; k < selectedRegion[j].country.length; k++) {
                        if ($scope.allCountryList[i].id_cnt == selectedRegion[j].country[k].id_cnt)
                            if ($.inArray($scope.allCountryList[i], $scope.selectedCountry) < 0) {
                                $scope.selectedCountry.push($scope.allCountryList[i]);
                                $scope.search.country.push(selectedRegion[j].country[k].id_cnt);
                                console.log("selectedRegion : " + JSON.stringify(selectedRegion[j]));
                            }
                    }
                }
            }
            //console.log("Selected Region Ids : " + $scope.search.region);
        }

        $scope.Zones = new Array(0);
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
        $scope.Venues = new Array(0);
        $scope.search.zone = [];
        if (selectedZone.length == 0) {
            $scope.search.zone = 0;
            $scope.search.venue = 0;
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (var i = 0; i < selectedZone.length; i++) {
                //console.log("Selected regions are " + selectedZone[i].pk_zone);
                $scope.search.zone.push(selectedZone[i].pk_zone);
            }
            if ($scope.search.region == 0) {
                $scope.search.region = [];
            }
            $scope.search.region = [];
            $scope.selectedRegion = [];

            for (var i = 0; i < $scope.allRegionList.length; i++) {
                for (var j = 0; j < selectedZone.length; j++) {
                    for (var k = 0; k < selectedZone[j].region.length; k++) {
                        if ($scope.allRegionList[i].id_rgs == selectedZone[j].region[k].fk_region) {
                            if ($.inArray($scope.allRegionList[i], $scope.selectedRegion) < 0) {
                                $scope.selectedRegion.push($scope.allRegionList[i]);
                                $scope.search.region.push(selectedZone[j].region[k].fk_region);
                                console.log("New Selected Region : " + JSON.stringify($scope.selectedregion));
                            }
                        }
                    }

                    //$scope.region.push($scope.allRegionList[i]);

                }
            }
            //console.log("Selected Zone Ids : " + $scope.search.zone);
        }

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
        $scope.search.venue = [];

        if (selectedVenue.length == 0) {
            $scope.search.venue = 0;
        } else {
            for (var i = 0; i < selectedVenue.length; i++) {
                $scope.search.venue.push(selectedVenue[i].id);
            }
            $scope.selectedZone = [];
            if ($scope.search.venue == 0) {
                $scope.search.venue = []
            }
            if ($scope.search.zone == 0) {
                $scope.search.zone = [];
            }


            for (var i = 0; i < $scope.allZoneList.length; i++) {
                for (var j = 0; j < selectedVenue.length; j++) {
                    if ($scope.allZoneList[i].pk_zone == selectedVenue[j].zone_vns) {
                        $scope.selectedZone.push($scope.allZoneList[i]);
                        $scope.search.zone.push($scope.allZoneList[i].pk_zone);
                    }
                }
            }
            //console.log("Selected venue Ids : " + $scope.search.venue);

        }


    };
    $scope.addNewVechile = function () {

        $rootScope.vehicleAddShowStatus = true;
        $rootScope.vehicleDetailShowStatus = false;
        $rootScope.vehicleListShowStatus = false;

        $rootScope.isAddVechile = true;
        $rootScope.isEditVechile = false;
        var vechileFullPlateScope = angular.element($("#206")).scope();
        vechileFullPlateScope.init();
        vechileFullPlateScope.isFromVehicleList = true;
        vechileFullPlateScope.VechileDetails.licence_plate_vtk = "";
        vechileFullPlateScope.VechileDetails.make_vtk = "";
        vechileFullPlateScope.VechileDetails.model_vtk = "";
        vechileFullPlateScope.VechileDetails.description_vtk = "";
        vechileFullPlateScope.VechileDetails.colour_vtk = "";
        vechileFullPlateScope.VechileDetails.taxed_vtk = "";
        vechileFullPlateScope.VechileDetails.possible_false_plate = 0;
        //vechileFullPlateScope.VechileDetails.licence_plate_type = 1;
        vechileFullPlateScope.VechileDetails.year_of_manufacture_vtk = null;
        vechileFullPlateScope.VechileDetails.mot_vtk = "";
        vechileFullPlateScope.title = "Add New Vehicle";




    };


    $scope.nextPage = function () {
        window.scrollTo(0, 0);
        if ($scope.vechilesNextURL != null) {
            //alert("$scope.vechilesNextURL: "+$scope.vechilesNextURL);
            var page = $scope.vechilesNextURL.split("?")[1];

            webRequestObject.postRequest($scope, "GET", constanObject.vechileSearch + "?" + page, null, constanObject.WebRequestType.VechileSearch, false);
            window.scrollTo(0, 0);
        }
    };

    $scope.prevPage = function () {
        if ($scope.vechilePrevURL != null) {
            var page = $scope.vechilePrevURL.split("?")[1];
            webRequestObject.postRequest($scope, "GET", constanObject.vechileSearch + "?" + page, null, constanObject.WebRequestType.VechileSearch, false);
            window.scrollTo(0, 0);
        }
    };

    $scope.removeItem = function (obj) {
        $("#" + obj.id_vtk).removeClass("active");
    };

    $scope.selectItem = function (obj) {
        $("#" + obj.id_vtk).addClass("active");
    };
    $scope.hidePopUp = function () {
        $scope.isAddVehicleModal = false;
    };


    $scope.$on('selectVehicle', function (event, args) {
        if (args.count_of_vehicle > 0) {
            $rootScope.enableBtn = "btn-green";
        } else {
            $rootScope.enableBtn = "";
        }
        // console.log("BroadCast : "+JSON.stringify(args));
    });

    $scope.addRemoveVechile = function (obj, isShowMsg) {

        //console.log("Selected Object : " + JSON.stringify(obj));

        if (obj == "undefined")
        {
            alert("obj of vehicle is undefined ");
            return;
        }

        var isSelect = false;

        if (isShowMsg) {
            if (!$("#" + obj.id_vtk).hasClass('active')) {
                //isSelect = confirm("Are you sure you want to add selected vehicle to incident?");
                $scope.isAddVehicleModal = true;

                $scope.popButton = "Add";
                $scope.tempSelectedVehicle = obj;
                $scope.vehicleAddRemoveMsg = "Are you sure you want to add selected vehicle to incident?";

            } else {
                $scope.isAddVehicleModal = true;
                $scope.tempSelectedVehicle = obj;
                $scope.popButton = "Remove";
                $scope.vehicleAddRemoveMsg = "Are you sure you want to remove this vehicle?";

            }
        } else {
            if (isSelect) {
                var className = $("#" + obj.id_vtk).attr('class');
                var classes = className.split(" ");
                //ckeck vechile is selected or not 
                var result = classes.filter(
                        function (value) {
                            return (value === 'active');
                        }
                );
                if (result.length > 0) {
                    $("#" + obj.id_vtk).removeClass("active");
                    globalService.removeVehicle(obj);
                    $scope.$broadcast('selectVehicle', {count_of_vehicle: globalService.getVehicle()});
                    return;

                }

            } else {
                if (isShowMsg)
                    return;


                var selectedVehicleList = globalService.getVehicle();
                try {
                    for (var j = 0; j < selectedVehicleList.length; j++) {
                        if (selectedVehicleList[j].id_vtk === obj.id_vtk)
                        {
                            return;
                        }
                    }
                } catch (e) {
                }


            }

            try {
                $("#" + obj.id_vtk).addClass("active");
            } catch (e) {
            }
            globalService.addVehicle(obj);
            $scope.$broadcast('selectVehicle', {count_of_vehicle: globalService.getVehicle()});
        }



    };
    $scope.addVehicle = function (status) {
        isSelect = status;
        var obj = $scope.tempSelectedVehicle;
        $scope.isAddVehicleModal = false;
        if (isSelect) {
            var className = $("#" + obj.id_vtk).attr('class');
            var classes = className.split(" ");
            //ckeck vechile is selected or not 
            var result = classes.filter(
                    function (value) {
                        return (value === 'active');
                    }
            );
            if (result.length > 0) {
                $("#" + obj.id_vtk).removeClass("active");
                globalService.removeVehicle(obj);
                $scope.$broadcast('selectVehicle', {count_of_vehicle: globalService.getVehicle().length});
                return;

            }

        } else {
//            if (isShowMsg)
//                return;
//

            var selectedVehicleList = globalService.getVehicle();
            try {
                for (var j = 0; j < selectedVehicleList.length; j++) {
                    if (selectedVehicleList[j].id_vtk === obj.id_vtk)
                    {
                        return;
                    }
                }
            } catch (e) {
            }


        }

        try {
            $("#" + obj.id_vtk).addClass("active");
        } catch (e) {
        }
        globalService.addVehicle(obj);
        $scope.$broadcast('selectVehicle', {count_of_vehicle: globalService.getVehicle().length});
    };
    $scope.getVechileDetail = function (vechileId) {
        vehicle_id = vechileId;
        $rootScope.isEditVechile = false;
        $rootScope.show = false;
        var vechileDetailScope = angular.element($("#208")).scope();
        vechileDetailScope.vechileDetail(vechileId);


    };

    $scope.getVechiles = function () {
        //$scope.search.name = $scope.Plate;
        var search = {search: $scope.search};
        webRequestObject.postRequest($scope, "GET", constanObject.vechileSearch, search, constanObject.WebRequestType.VechileSearch, false);
    };

    $scope.previousPageRequest = function () {
        if ($scope.page == 1)
            $scope.page = 1;
        else
            $scope.page--;

        //VictimWitness.getVictimeData($scope.page, null, function (status, data) {
        // $scope.victimeData = data;
        // });
    };
    $scope.nextPageRequest = function () {
//        VictimWitness.getVictimeData(++$scope.page, null, function (status, data) {
//            if (status)
//                $scope.victimeData = data;
//            else
//                --$scope.page;
//
//        });
    };

    $scope.nextButtonClicked = function (callBack) {

        if ($rootScope.vehicleListShowStatus) {
            window.scrollTo(0, 0);
            $rootScope.show = false;

            try {
                if (globalService.getVehicle().length > 0) {



                    return callBack(true, noOfPageMove);
                } else {
                    //alert("Please select vehicle.");
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Please add/select a vehicle.";
                    return callBack(false, noOfPageMove);
                }
            } catch (e) {
                //alert("Please select vehicle.: "+e.message);
                return callBack(false, noOfPageMove);
            }
        }
        //return callBack(true, noOfPageMove);


    };
    $scope.back = function (callBack) {
        if ($rootScope.vehicleListShowStatus) {
            window.scrollTo(0, 0);
            $scope.pagingNext = false;
            $scope.pagingPrev = false;

            return callBack(true, noOfPageMove);
        }
        $rootScope.show = false;
    }
    $scope.saveButtonAction = function () {
        // alert("saveButtonAction");
        $scope.isNewVechileSaveAlert = true;

    };

    $scope.editVechile = function (vechileId) {
        //alert("Edit Vechile: "+vechileId);
        var editVechileScope = angular.element($("#206")).scope();
        editVechileScope.isOneOfThese = false;
        editVechileScope.Plates = [];
        $rootScope.isAddVechile = false;
        $rootScope.isEditVechile = true;

        webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleDetailsById + vechileId, $scope.VechileDetails, constanObject.WebRequestType.UpdateVechile, false);
    };


    var getCommsDetails = function (vechileId) {
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function (vehicleId) {
        vehicle_id = vehicleId;
        //console.log("showAddNotePopup");
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + vehicle_id;
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
        $scope.notes.id_jno_jnt = vehicle_id;
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

    $scope.infoClose = function () {
        //console.log("info Button closed.");
        $scope.infoShow2 = false;
    };
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            //console.log("Vehicle Search : " + JSON.stringify(responseData));
            $rootScope.showCount = false;
            if (responseData.statusText == "Not Found") {

                $scope.$apply(function () {
                    $scope.Vechiles = [];
                    $scope.infoShow2 = true;
                    $scope.pagingNext = false;
                    $scope.pagingPrev = false;
                });

            }
            //else {
//                $scope.$apply(function () {
//                    $rootScope.show = true;
//                    $rootScope.alertMsg = responseData.responseJSON.error;
//                });
            //  }


            return;
        }


        switch (requestType) {
            case constanObject.WebRequestType.VechileSearch:
                $scope.Vechiles = [];

                $scope.$apply(function () {
                    $scope.infoShow2 = false;
                    $scope.vechilesNextURL = responseData.next_page_url;
                    $scope.vechilePrevURL = responseData.prev_page_url;
                    $rootScope.showCount = true;
                    $scope.vehicleCount = responseData.category_count;
                    if ($scope.vechilesNextURL != null && $scope.vechilePrevURL != null) {
                        $scope.pagingNext = true;
                        $scope.pagingPrev = true;
                        return;
                    }
                    if ($scope.vechilesNextURL != null) {
                        $scope.pagingNext = true;
                        $scope.pagingPrev = false;
                        return;
                    }
                    if ($scope.vechilePrevURL != null) {
                        $scope.pagingNext = false;
                        $scope.pagingPrev = true;
                        return;
                    } else {
                        $scope.pagingNext = false;
                        $scope.pagingPrev = false;
                    }


                });
                for (var i = 0; i < responseData.data.length; i++) {
                    $scope.$apply(function () {
                        $scope.Vechiles.push(new Item(responseData.data[i]));

                    });

                }
                hilightVehicle();

                break;
            case constanObject.WebRequestType.VechileDetailsById:


                var vechileViewByIdScope = angular.element($("#208")).scope();

                //selectedVechileScope.Vechiles = [];
                //vechileViewByIdScope.vechileData = [];
                $scope.$apply(function () {



                    $scope.addRemoveVechile(responseData.data[0]);
                    vechileViewByIdScope.images = $scope.getImageSrc(responseData.data[0]);

                    $rootScope.vehicleAddShowStatus = false;
                    $rootScope.vehicleDetailShowStatus = true;
                    $rootScope.vehicleListShowStatus = false;




                });

                break;
            case constanObject.WebRequestType.UpdateVechile:
                var editVechileScope = angular.element($("#206")).scope();
                $scope.$apply(function () {
                    editVechileScope.VechileDetails = responseData.data[0];
                    editVechileScope.PlateSearchOption = responseData.data[0].licence_plate_type;
                    editVechileScope.title = "Edit Vehicle";
                    $rootScope.vehicleAddShowStatus = true;
                    $rootScope.vehicleDetailShowStatus = false;
                    $rootScope.vehicleListShowStatus = false;
                });

                break;
//            case constanObject.WebRequestType.VEHICLE_COUNT:
//                //$scope.allVehicleCount = responseData.data[0];
//                $scope.$apply(function () {
//                    $scope.partialVehicleCount = responseData.data[0].partialplate_count;
//                    $scope.fullVehicleCount = responseData.data[0].fullplate_count;
//                    $scope.allVehicleCount = (parseInt($scope.partialVehicleCount) + parseInt($scope.fullVehicleCount));
//                });
//
//                ////console.log("VEHICLE_COUNT : "+JSON.stringify(responseData.data));
//                break;

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
                        getCommsDetails(vehicle_id);
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
                    getCommsDetails(vehicle_id);
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
    };

    $scope.searchVechileTab = function (tab) {
        $scope.activeMenu = tab;
        var newVechileScope = angular.element($("#206")).scope();
        if (tab == "All") {
            $("#tab_all").addClass("active");
            $("#tab_full").removeClass("active");
            $("#tab_partial").removeClass("active");
            webRequestObject.postRequest($scope, "GET", constanObject.vechileSearch, null, constanObject.WebRequestType.VechileSearch, false);
            newVechileScope.VechileDetails.licence_plate_type = 1;

        } else if (tab == "Full Plate") {
            $("#tab_full").addClass("active");
            $("#tab_all").removeClass("active");
            $("#tab_partial").removeClass("active");
            webRequestObject.postRequest($scope, "GET", constanObject.vechileFullPlate, null, constanObject.WebRequestType.VechileSearch, false);
            newVechileScope.VechileDetails.licence_plate_type = 1;
        } else if (tab == "Partial Plate") {
            $("#tab_partial").addClass("active");
            $("#tab_full").removeClass("active");
            $("#tab_all").removeClass("active");
            webRequestObject.postRequest($scope, "GET", constanObject.vechilePartial, null, constanObject.WebRequestType.VechileSearch, false);
            newVechileScope.VechileDetails.licence_plate_type = 0;
        }

    };

    $scope.searchVechileActive = function (tab) {

        var newVechileScope = angular.element($("#206")).scope();
        if (tab == "tab_all") {
            $("#tab_all").addClass("active");
            $("#tab_full").removeClass("active");
            $("#tab_partial").removeClass("active");
            newVechileScope.VechileDetails.licence_plate_type = 1;
        } else if (tab == "tab_full") {
            $("#tab_full").addClass("active");
            $("#tab_all").removeClass("active");
            $("#tab_partial").removeClass("active");
            newVechileScope.VechileDetails.licence_plate_type = 1;
        } else if (tab == "tab_partial") {
            $("#tab_partial").addClass("active");
            $("#tab_full").removeClass("active");
            $("#tab_all").removeClass("active");
            newVechileScope.VechileDetails.licence_plate_type = 0;
        }

    };

    function hilightVehicle() {
        //console.log("globalService.getVehicle(): " + JSON.stringify(globalService.getVehicle()));
        globalService.getVehicle().forEach(function (obj) {
            $("div .vehicles-wrap ul li").children("#" + obj.id_vtk).addClass("active");
        });
    }
    ;
});


//function PartialPlateItem(data) {
//    this.id_vtk = data.id_vtk;
//    this.licence_plate_vtk = data.licence_plate_vtk;
//    this.make_vtk = data.make_vtk;
//    this.model_vtk = data.model_vtk;
//    this.colour_vtk = data.colour_vtk;
//    this.description_vtk = data.description_vtk;
//    this.updated_time = dateFormat(data.updated_time);
//}

function Item(data) {
    // //console.log("data: "+JSON.stringify(data));
    this.id_vtk = data.id_vtk;
    this.licence_plate_vtk = data.licence_plate_vtk;
    this.make_vtk = data.make_vtk;
    this.model_vtk = data.model_vtk;
    this.description_vtk = data.description_vtk;
    this.colour_vtk = data.colour_vtk;
    this.isAddComm = data.add_comm == 1 ? true : false;
    this.updated_time = data.updated_time;
}

function forEmptyData(data) {

    this.make_vtk = data.make_vtk == "<b>Not Entered</b>" ? "" : data.make_vtk;
    this.model_vtk = data.model_vtk == "<b>Not Entered</b>" ? "" : data.model_vtk;
    this.taxed_vtk = data.taxed_vtk == "<b>Not Entered</b>" ? "" : data.taxed_vtk;
    this.year_of_manufacture_vtk = data.year_of_manufacture_vtk == "<b>Not Entered</b>" ? "" : data.year_of_manufacture_vtk;
    this.colour_vtk = data.colour_vtk == "<b>Not Entered</b>" ? "" : data.colour_vtk;
    this.tax_details_vtk = data.tax_details_vtk == "<b>Not Entered</b>" ? "" : data.tax_details_vtk;
    this.mot_details_vtk = data.mot_details_vtk == "<b>Not Entered</b>" ? "" : data.mot_details_vtk;
    this.mot_vtk = data.mot_vtk == "<b>Not Entered</b>" ? "" : data.mot_vtk;
    this.description_vtk = data.description_vtk == "<b>Not Entered</b>" ? "" : data.description_vtk;
}



