BandQModule.controller("VechileInvolvedStatus", function ($scope, $rootScope, globalService, checkInternetConnectionService, vehicleService) {
    $rootScope.show = false;
    $scope.isFullPlate = false;
    $scope.errorMsg = "";
    $scope.isSkipPage = true;

    $scope.plateSearchVal = "";
    var noOfPageMove;

    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
        //console.log("isVechileInvolved INIT..");
        $scope.vehicleToolTipMessage = $scope.fieldData[54].question_hint;
        $scope.vehicleRegistrationToolTipMessage = $scope.fieldData[54].question_hint;
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
        //console.log("Full Status: " + status);
        // var newVechileScope = angular.element($("#206")).scope();
        $scope.isFullPlate = status;
        // alert("$rootScope.plateSearchVal: "+$rootScope.plateSearchVal);
        if (status) {
            $("#fullPlateBtn").addClass("active");
            $("#partialPlateBtn").removeClass("active");
            // newVechileScope.VechileDetails.licence_plate_type = 1;
        } else {
            $("#fullPlateBtn").removeClass("active");
            $("#partialPlateBtn").addClass("active");
            // newVechileScope.VechileDetails.licence_plate_type = 0;
        }
    }

    $scope.fullPlate = function (isFull) {
        //console.log("isFull: " + isFull);
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            return isFull;
        } else {
            var preData = globalService.getVenueId();
            var searchData = {search: {country: preData.country_vns, zone: preData.zone_vns, venue: preData.id, region: preData.region_vns}};
            if (isFull) {

                webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleByPlate + "?licence_number=" + $scope.plateSearchVal, searchData, constanObject.WebRequestType.VechileFullPlate, true);

            } else {
                webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleByPartialPlate + "?licence_number=" + $scope.plateSearchVal, searchData, constanObject.WebRequestType.VechilePartialPlate, true);


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
                if ($scope.isFullPlate) {
                    if ($scope.plateSearchVal.length > 6) {

                        $scope.fullPlate($scope.isFullPlate);
                    } else {
                        // alert("Please enter atleast 7 characters for full plate.");
                        //if (!$scope.isVehicleInvolvedForm.$valid) {
                        $rootScope.show = true;
                        //$scope.errorMsg = "Please enter atleast 7 characters for full plate.";
                        $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                        $scope.errorMsg = "Please enter atleast 7 characters for full plate.";
                        $("#txtRegNum").focus();
                        return callBack(false, 0);
                        //}
                    }
                } else {
                    if ($scope.plateSearchVal.length > 2) {

                        $scope.fullPlate($scope.isFullPlate);
                        $rootScope.vehicleListShowStatus = true;
                        $rootScope.vehicleAddShowStatus = false;
                        $rootScope.vehicleDetailShowStatus = false;
                        $rootScope.isNewVechile = false;
                    } else {
                        // alert("Please enter atleast 3 characters for partial plate.");
                        // if (!$scope.isVehicleInvolvedForm.$valid) {
                        $rootScope.show = true;
                        $scope.errorMsg = "Please enter atleast 3 characters for partial plate.";
                        $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";

                        $("#txtRegNum").focus();
                        return callBack(false, 0);

                        //}

                    }
                }

            } else {
                globalService.setVehicleData({isVehicleInvolved: "No", vehicles: ""});

                return callBack(true, 3);

            }

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isAddVechile = true;
                $rootScope.isEditVechile = false;

                vehicleService.setVehicleInvolvedData({licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, possible_false_plate: 0});
                $rootScope.isNewVechile = true;
                $rootScope.vehicleListShowStatus = false;
                $rootScope.vehicleAddShowStatus = true;
                $rootScope.vehicleDetailShowStatus = false;
                $rootScope.show = false;
                $rootScope.alertMsg = "";

                return callBack(true, 1);
            } else {
                vehicleService.setVehicleInvolvedData({licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, possible_false_plate: 0});
            }

            $rootScope.show = false;
            $rootScope.alertMsg = "";

            return callBack(true, 1);
        } else {
            $scope.message = true;
            $rootScope.show = true;
            $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
            $scope.requiredMsg = "Required";
            return callBack(false, 0);
        }



//        if($rootScope.isFullPlate){
//            alert("Full Plate Selected...");
//        }
//        else{
//            alert("Partial Plate Selected...");
//        }
//        
//        return true;


        //return;
    };
    $scope.back = function (callBack) {
        $scope.message = false;
        $rootScope.show = false;
        return callBack(true, noOfPageMove);

    }
    $scope.saveButtonAction = function () {
        //alert("saveButtonAction");
        $scope.isNewVechileSaveAlert = true;
    };

    $scope.webRequestResponse = function (requestType, status, responseData) {

        var vechileFullPlateScope = angular.element(document.getElementById("206")).scope();
        if (status == constanObject.ERROR) {
            //showErrorAlert(requestType, responseData);
            if (responseData.responseJSON.error === "No Match found") {
//                alert("No Match Found");
                $rootScope.showCount = false;
                $scope.$apply(function () {
                    $rootScope.isAddVechile = true;
                    $rootScope.isEditVechile = false;

                    vehicleService.setVehiclePlate($scope.plateSearchVal);
                    vehicleService.setVehicleTitle("Add New Vehicle");

                    //vechileFullPlateScope.VechileDetails.licence_plate_vtk = $scope.plateSearchVal;
                    //vechileFullPlateScope.VechileDetails.licence_plate_type = 1;
                    //vechileFullPlateScope.Plate = $scope.plateSearchVal;
                    // vechileFullPlateScope.VechileDetails.possible_false_plate = 0;
                    //vechileFullPlateScope.title = "Add New Vehicle";
                    $rootScope.isNewVechile = true;
                    $rootScope.vehicleListShowStatus = false;
                    $rootScope.vehicleAddShowStatus = true;
                    $rootScope.vehicleDetailShowStatus = false;

                });
                return;
            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = responseData.responseJSON.error;
                return;
            }

        }
        var vechileCount = angular.element($("#207")).scope();
        switch (requestType) {

            case constanObject.WebRequestType.VechileFullPlate:

                //console.log("VechilePartialPlate: " + JSON.stringify(responseData));
                var vechileListScope = angular.element($("#208")).scope();

                $rootScope.isNewVechile = false;
                $scope.$apply(function () {
                    vechileListScope.inputVal = $scope.plateSearchVal;
                    vechileListScope.vechileDetail(responseData.data[0].id_vtk);
                    $rootScope.vehicleListShowStatus = false;
                    $rootScope.vehicleAddShowStatus = false;
                    $rootScope.vehicleDetailShowStatus = true;
                    $rootScope.isNewVechile = false;
                    $rootScope.showCount = true;
                    vechileCount.vehicleCount = responseData.category_count;

                });

                break;

            case constanObject.WebRequestType.VechilePartialPlate:
//                var vechileListScope = angular.element($("#207")).scope();
                $rootScope.isNewVechile = false;
//                vechileListScope.inputVal = $scope.plateSearchVal;
//                vechileListScope.Vechiles = [];
                vehicleService.setVehiclePlate($scope.plateSearchVal);
                if (responseData)
                    vehicleService.setVehicleList(responseData.data);
                $rootScope.showCount = true;
                if (responseData)
                    vechileCount.vehicleCount = responseData.category_count;

                globalService.getVehicle().forEach(function (obj) {
                    $("div .vehicles-wrap ul li").children("#" + obj.id_vtk).addClass("active");
                });
                break;
        }
    }
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
