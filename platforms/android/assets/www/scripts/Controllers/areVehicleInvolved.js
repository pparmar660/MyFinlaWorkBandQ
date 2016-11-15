BandQModule.controller("VechileInvolvedStatus", function ($scope, $rootScope, globalService,
        checkInternetConnectionService, vehicleService) {
    $rootScope.show = false;
    $scope.isFullPlate = 2;
    $scope.errorMsg = "";
    $scope.isSkipPage = true;
    $scope.Vechiles = "";
    $scope.url = constanObject.vechileSearch;
    $scope.plateSearchVal = "";
    $scope.page = 1;
    //   var noOfPageMove;

    $scope.init = function () {
        $rootScope.plateSearchType = true;
        $scope.vehicleToolTipMessage = $scope.fieldData[54].question_hint;
        $scope.vehicleRegistrationToolTipMessage = $scope.fieldData[54].question_hint;
        $scope.reset();
    };
    if ($("#vechileStatusYesBtn").hasClass("active")) {
        $("#vechileRegSection").show();
    } else {
        $("#vechileRegSection").hide();
    }

    $scope.$watch('plateSearchVal', function (val) {
        //console.log("plateSearchVal: " + val);
        $scope.plateSearchVal = val;
        $rootScope.show = false;
    });
    $scope.vechileInvolved = function (status) {
        $scope.message = false;
        $scope.requiredMsg = "";
        if (status == "yes") {
            //alert(status);
            $("#vechileStatusYesBtn").addClass("active");
            $("#vechileStatusNoBtn").removeClass("active");
            $("#vechileRegSection").show();
            $rootScope.isvehicleInvolved = true;
            $scope.isSkipPage = false;
            $("#txtRegNum").focus();

        } else if (status == "no") {
            $("#vechileStatusNoBtn").addClass("active");
            $("#vechileStatusYesBtn").removeClass("active");
            $("#vechileRegSection").hide();
            $rootScope.isvehicleInvolved = false;
            $scope.isSkipPage = false;
            $rootScope.vehicleTemplates = new Array(0);
        }
    };



    $scope.plateStatus = function (status) {
        $scope.isFullPlate = status;
        if ($scope.isFullPlate == 1) {
            $("#fullPlateBtn").addClass("active");
            $("#partialPlateBtn").removeClass("active");
            // newVechileScope.VechileDetails.licence_plate_type = 1;
        } else {
            $("#fullPlateBtn").removeClass("active");
            $("#partialPlateBtn").addClass("active");

        }
    }

    $scope.fullPlate = function (isFull) {
        //console.log("isFull: " + isFull);
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            return isFull;
        } else {
            $scope.url = constanObject.vechileSearch;
            $scope.page = 1;
            var preData = globalService.getVenueId();
            var searchData = {search: {country: preData.country_vns, zone: preData.zone_vns, venue: preData.id, region: preData.region_vns, name: $scope.plateSearchVal}};
            if (isFull == 1) {
                webRequestObject.postRequest($scope, "GET", $scope.url + "/fullplate" + "?page=" + $scope.page, searchData, constanObject.WebRequestType.VechileFullPlate, true);

            } else {
                webRequestObject.postRequest($scope, "GET", $scope.url + "/partialplate" + "?page=" + $scope.page, searchData, constanObject.WebRequestType.VechilePartialPlate, true);


            }
        }

    };

    $scope.nextButtonClicked = function (callBack) {
        if (!$scope.isSkipPage) {
            if ($rootScope.isvehicleInvolved) {
                $rootScope.vehicleTemplates = new Array(0);
                $rootScope.vehicleTemplates = ["206", "207", "208"];
                if (!checkPlateText($scope.plateSearchVal)) {
                    //alert("Special Characters are not allowed.");
                    // if (!$scope.isVehicleInvolvedForm.$valid) {
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Special Characters are not allowed.";

                    $("#txtRegNum").focus();
                    return callBack(false, 0);
                    //}
                }
                if ($scope.plateSearchVal == "") {
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                    $scope.errorMsg = "Vehicle registration number cannot be blank.";
                    return callBack(false, 0);
                }

                if ($scope.plateSearchVal.length > 2) {

                    $scope.fullPlate($scope.isFullPlate);
                    $rootScope.vehicleListShowStatus = true;
                    $rootScope.vehicleAddShowStatus = false;
                    $rootScope.vehicleDetailShowStatus = false;
                    $rootScope.isNewVechile = false;
                } else {

                    $rootScope.show = true;
                    $scope.errorMsg = "Please enter atleast 3 characters.";
                    $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";

                    $("#txtRegNum").focus();
                    return callBack(false, 0);


                }

            } else {
                globalService.setInvolvedVehicleDetails({vehicleList: "", licence_plate_vtk: "", licence_plate_type: "", areVehicleInvolved: "no"});
                return callBack(true, 3);

            }

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isAddVechile = true;
                $rootScope.isEditVechile = false;
                vehicleService.setVehicleTitle("Add New Vehicle");
                vehicleService.setVehicleInvolvedData({licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, possible_false_plate: 0});
                $rootScope.isNewVechile = true;
                $rootScope.vehicleListShowStatus = false;
                $rootScope.vehicleAddShowStatus = true;
                $rootScope.vehicleDetailShowStatus = false;
                $rootScope.show = false;
                $rootScope.alertMsg = "";
                globalService.setInvolvedVehicleDetails({vehicleList: $scope.Vechiles, licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, areVehicleInvolved: "yes"});
                return callBack(true, 1);
            } else {
                vehicleService.setVehicleInvolvedData({licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, possible_false_plate: 0});
            }

            $rootScope.show = false;
            $rootScope.alertMsg = "";
            globalService.setInvolvedVehicleDetails({vehicleList: $scope.Vechiles, licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, areVehicleInvolved: "yes"});
            return callBack(true, 1);
        } else {
            $scope.message = true;
            $rootScope.show = true;
            $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
            $scope.requiredMsg = "Required";
            return callBack(false, 0);
        }
    };



    $scope.back = function (callBack) {
        $scope.message = false;
        $rootScope.show = false;
        return callBack(true, 1);

    }
    $scope.webRequestResponse = function (requestType, status, responseData) {

        // var vechileFullPlateScope = angular.element(document.getElementById("206")).scope();
        if (status == constanObject.ERROR) {
            $rootScope.showCount = false;
            $rootScope.isAddVechile = true;
            $rootScope.isEditVechile = false;
            vehicleService.setVehiclePlate($scope.plateSearchVal);
            vehicleService.setVehicleTitle("Add New Vehicle");
            $rootScope.isNewVechile = true;
            $rootScope.vehicleListShowStatus = false;
            $rootScope.vehicleAddShowStatus = true;
            $rootScope.vehicleDetailShowStatus = false;
            return;
        } else {
            if (responseData.data.length == 0) {
                $rootScope.showCount = false;
                $rootScope.isAddVechile = true;
                $rootScope.isEditVechile = false;
                vehicleService.setVehiclePlate($scope.plateSearchVal);
                vehicleService.setVehicleTitle("Add New Vehicle");
                $rootScope.isNewVechile = true;
                $rootScope.vehicleListShowStatus = false;
                $rootScope.vehicleAddShowStatus = true;
                $rootScope.vehicleDetailShowStatus = false;
                return;
            }
        }

        switch (requestType) {
            case constanObject.WebRequestType.VechileFullPlate:
                $rootScope.isNewVechile = false;
                if (responseData.data[0])
                    $rootScope.vehicleId = responseData.data[0].id_vtk;
                $rootScope.inputVal_ = $scope.plateSearchVal;
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = true;
                $rootScope.vehicleListShowStatus = false;
                $rootScope.isNewVechile = false;
                $rootScope.showCount = true;
                break;

            case constanObject.WebRequestType.VechilePartialPlate:
//                var vechileListScope = angular.element($("#207")).scope();
                $rootScope.isNewVechile = false;
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = false;
                $rootScope.vehicleListShowStatus = true;
//                vechileListScope.inputVal = $scope.plateSearchVal;
//                vechileListScope.Vechiles = [];
                vehicleService.setVehiclePlate($scope.plateSearchVal);
                vehicleService.setVehicleList(responseData);
                $rootScope.showCount = true;
                globalService.getVehicle().forEach(function (obj) {
                    $("div .vehicles-wrap ul li").children("#" + obj.id_vtk).addClass("active");
                });
                break;
        }
    };

    $scope.reset = function () {
        if (!globalService.getInvolvedVehicleDetails())
            return;
        if (globalService.getInvolvedVehicleDetails().areVehicleInvolved == 'no') {
            $scope.vechileInvolved('no');
        } else {
            $scope.vechileInvolved('yes');
            $scope.plateSearchVal = globalService.getInvolvedVehicleDetails().licence_plate_vtk;
            $scope.isFullPlate = globalService.getInvolvedVehicleDetails().licence_plate_type;
            $scope.Vechiles = globalService.getInvolvedVehicleDetails().vehicleList;
            vehicleService.setVehicleInvolvedData({licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, possible_false_plate: 0});
            if ($scope.isFullPlate == 1) {
                $("#fullPlateBtn").addClass("active");
                $("#partialPlateBtn").removeClass("active");
            } else {
                $("#fullPlateBtn").removeClass("active");
                $("#partialPlateBtn").addClass("active");
            }
        }
    };
    $scope.init();
});

function PartialPlateItem(data) {
    this.id_vtk = data.id_vtk;
    this.licence_plate_vtk = data.licence_plate_vtk;
    this.make_vtk = data.make_vtk;
    this.model_vtk = data.model_vtk;
    this.colour_vtk = data.colour_vtk;
    this.description_vtk = data.description_vtk;
    this.updated_time = dateFormat(data.updated_time);
}

function checkPlateText(text)
{
    if (/[^a-zA-Z0-9\-\/\s]/.test(text)) {
        return false;
    }
    return true;
}
