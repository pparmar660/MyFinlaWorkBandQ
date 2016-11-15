BandQModule.controller("addNewVehicle", function ($scope, $rootScope, checkInternetConnectionService, imageService, getAllFieldLabel) {
    $scope.vechileID = null;
    $scope.Plates = [];
    $scope.Plate = '';
    $scope.templateUrl = "";
    $scope.isOneOfThese = false;
    $scope.falsePlate = 0;
    $scope.plateType = 0;
    $scope.isFromVehicleList = false;
    $scope.isFromVehicleDetails = false;
    $scope.isCameraOption = false;
    $scope.title = "Add New Vehicle";
    var imageflag = false;

    $scope.images = [];
    var imageCount = 0;
    var isProfileImage = false;
    $scope.showProfileCancel = false;
    $scope.VechileDetails = {
        id_vtk: 0,
        licence_plate_vtk: null,
        licence_plate_type: 1,
        possible_false_plate: 0,
        make_vtk: null,
        model_vtk: null,
        colour_vtk: null,
        description_vtk: null,
        image_vehicle: []
    };
    $scope.isNoInterStrip = false;
    $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };
    $scope.init = function () {
        window.scrollTo(0, 0);
        setFormFieldLableData();
        $("#link_1").removeClass("activate active");
        $("#link_2").removeClass("activate active");
        $("#link_3").removeClass("activate active");
        $("#link_4").addClass("activate active");
        $("#link_5").removeClass("activate active");
        $scope.title = "Add New Vehicle";
        //$scope.$broadcast('angucomplete-ie8:clearInput', 'vehicles_value');
        //console.log("Vehicles Value : " + $("#vehicles_value").val());
        $scope.VechileDetails.id_vtk = 0;
        $scope.VechileDetails.licence_plate_vtk = null;
        $scope.VechileDetails.make_vtk = "";
        $scope.VechileDetails.model_vtk = "";
        $scope.VechileDetails.description_vtk = "";
        $scope.VechileDetails.colour_vtk = "";
        $scope.VechileDetails.possible_false_plate = 0;
        $scope.VechileDetails.licence_plate_type = 1;
        $("#vehicles_value").val("");
        var largeImage = document.getElementById('profileImage');
        largeImage.src = "images/car_img.jpg";
        $scope.VechileDetails.image_vehicle = "";
        setFirstTab();

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
    $scope.$watch('vehicleObj', function (val) {
        //console.log("vehicleObj : " + JSON.stringify($scope.vehicleObj));
        if (val != null) {
            //console.log("VechileDetails.licence_plate_vtk: " + JSON.stringify(val));
            $scope.VechileDetails.licence_plate_vtk = val.title;
        }
        if ($scope.VechileDetails.licence_plate_type == 2) {
            if ($scope.VechileDetails.licence_plate_vtk != null) {
                if ($scope.VechileDetails.licence_plate_vtk.length > 2) {
                    webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleByPartialPlate + "?licence_number=" + $scope.VechileDetails.licence_plate_vtk, null, constanObject.WebRequestType.VechilePartialPlate, true);
                }
            }
        }
    });
    $scope.isSaveSuccess = false;
    $scope.isNewVechileSaveAlert = false;
    var imagePath = null;

    $scope.getPlateType = function (item) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        if (item == 1) {
            $scope.isOneOfThese = false;
            $scope.Plates = [];
            $scope.VechileDetails.licence_plate_type = 1;
        } else {
            $scope.VechileDetails.licence_plate_type = 2;
            webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleByPartialPlate + "?licence_number=" + $scope.VechileDetails.licence_plate_vtk, null, constanObject.WebRequestType.VechilePartialPlate, true);
        }
    };

    $scope.getFalsePlate = function (item) {
        $scope.VechileDetails.possible_false_plate = item;
    };

    $scope.cancelSaveAlert = function () {
        $scope.isNewVechileSaveAlert = false;
    };

    $scope.cancelSaveSuccessAlert = function () {
        $scope.isSaveSuccess = false;
    };

    $scope.saveAlert = function () {
        $scope.cancelSaveAlert();
    };

    $scope.vehicleDetails = function (vehicleID) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        var vehicleDetailScope = angular.element($("#vehicleDetails")).scope();
        vehicleDetailScope.vehicle_id = vehicleID;
        vehicleDetailScope.init();
    };

    $scope.save = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        //console.log("Vehicle Saving Data : " + JSON.stringify($scope.VechileDetails));
        $scope.VechileDetails.licence_plate_vtk = $("#vehicles_value").val();
        if ($scope.VechileDetails.id_vtk > 0) {
            // $scope.VechileDetails.licence_plate_vtk = vehicleService.getVehiclePlate();
            webRequestObject.postRequest($scope, "POST", constanObject.UpdateVechile + $scope.VechileDetails.id_vtk, $scope.VechileDetails, constanObject.WebRequestType.UpdateVechile, true);
        }
        else {
            // if ($scope.VechileDetails.licence_plate_vtk.length > 0) {
            webRequestObject.postRequest($scope, "POST", constanObject.AddNewVechile, $scope.VechileDetails, constanObject.WebRequestType.AddNewVechile, true);
            // } 
        }


    };
    $scope.back = function () {
        $rootScope.menuTitle = "Security";
        $rootScope.subMenuTitle = "Vehicles";

        if ($rootScope.backStatus == "main") {
            window.history.back();
        }

        else if ($rootScope.backStatus == "addVehicleFromList") {
            $rootScope.isNewVehicle = false;
            $rootScope.isVehicleList = true;
            $rootScope.isVehicleDetails = false;
            $rootScope.subMenuTitle1 = "";
        }
        else if ($rootScope.backStatus == "editVehicleFromDetails") {
            $rootScope.isNewVehicle = false;
            $rootScope.isVehicleList = false;
            $rootScope.isVehicleDetails = true;
            $rootScope.subMenuTitle1 = "Vehicle Details";
        }
        else {
            $rootScope.isNewVehicle = false;
            $rootScope.isVehicleList = true;
            $rootScope.isVehicleDetails = false;
            $rootScope.subMenuTitle1 = "";
        }
        window.scrollTo(0, 0);
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
//        //console.log("imageURI : " + imageURI);
//        imageflag = true;
//        $scope.isFileUpload = true;
//        var arr = imageURI.src.split("/");
//        var name = arr[arr.length - 1];
//        if ($scope.extraImages) {
//            $scope.$apply(function () {
//                $scope.images.push({name: name, url: imageURI.src});
//            });
//        } else {
//            var profileImage = document.getElementById("profileImage");
//            profileImage.src = imageURI.src;
//            $scope.VechileDetails.image_vehicle = imageURI.src;
//            $scope.images.splice(0, 1);
//        }
        if (isProfileImage) {
            $scope.$apply(function () {
                $scope.showProfileCancel = true;
                var profileImage = document.getElementById("profileImage");
                profileImage.src = imageURI.src;
                $scope.VechileDetails.image_vehicle = imageURI.src;
                $scope.profileImage = {name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage};
            });
        } else {
            $scope.$apply(function () {
                $scope.images.push({name: imageURI.title, url: imageURI.src, id: imageURI.id, isProfileImage: isProfileImage});
            });
        }
    }

    $scope.removeProfileImage = function () {
//          var profileImage = document.getElementById("profileImage");
//            profileImage.src = '';
//             $scope.VechileDetails.image_vehicle = '';
//            $scope.isCameraOption = false;


        var profileImage = document.getElementById("profileImage");
        $scope.showProfileCancel = false;
        profileImage.src = '';
        $scope.isCameraOption = false;
        $scope.profileImage = null;
    };

    $scope.deleteImage = function (image) {
        var index = $scope.images.indexOf(image);
        $scope.images.splice(index, 1);
    };

    function win(r) {
        //console.log("Code = " + r.responseCode);
        //console.log("Response = " + r.response);
        //console.log("Sent = " + r.bytesSent);
        //alert(r.response);
    }

    function fail(error) {
        //console.log("An error has occurred: Code = " + JSON.stringify(error));
    }




    $scope.webRequestResponse = function (requestType, status, responseData) {


        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            $scope.$apply(function () {
                $rootScope.isNewVechile = true;
                $scope.isOneOfThese = false;
            });
            return;
        }

        switch (requestType) {
            case constanObject.WebRequestType.AddNewVechile:

                if (responseData.hasOwnProperty('data')) {
                    $rootScope.backStatus = "addVehicle";
                    $scope.vechileID = responseData.data;
                    if ($scope.profileImage)
                        $scope.images.unshift($scope.profileImage);
                    if (imageflag && $scope.images.length) {

                        for (var i = 0; i < $scope.images.length; i++) {

                            // if (imagePath != null)
                            webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UploadVechileFile + $scope.vechileID, constanObject.VEHICLE_IMAGE_KEY, constanObject.WebRequestType.FILE_UPLOAD, true);
                        }
                    }
                    else {
                        $scope.$apply(function () {
                            $scope.VechileDetails.licence_plate_vtk = null;
                            var vehicleDetailScope = angular.element($("#vehicleDetails")).scope();
                            vehicleDetailScope.vehicle_id = $scope.vechileID;
                            vehicleDetailScope.add = true;
                            vehicleDetailScope.edit = false;
                            vehicleDetailScope.init();
                        });


                    }

                }

                break;
            case constanObject.WebRequestType.VechileDetailsById :
                //console.log("Vechile Details Response: " + JSON.stringify(responseData.data[0]));

                break;
            case constanObject.WebRequestType.FILE_UPLOAD :
                $rootScope.isVehicleDetails = true;
                $rootScope.isNewVehicle = false;
                $rootScope.backStatus = "addVehicle";
                $scope.$apply(function () {
                    $scope.VechileDetails.licence_plate_vtk = null;
                    var vehicleDetailScope = angular.element($("#vehicleDetails")).scope();
                    vehicleDetailScope.vehicle_id = $scope.vechileID;
                    vehicleDetailScope.add = true;
                    vehicleDetailScope.edit = false;
                    vehicleDetailScope.init();
                });
                break;
            case constanObject.WebRequestType.VechilePartialPlate:
                //console.log("Partial Plate : " + JSON.stringify(responseData));
                $scope.Plates = [];
                $scope.$apply(function () {
                    $scope.isOneOfThese = true;
                    $scope.Plates = responseData;
                });
                break;
            case constanObject.WebRequestType.UpdateVechile :
                //console.log("Vehicle Updated");
                $scope.vechileID = $scope.VechileDetails.id_vtk;

                if (imageflag) {
                    var arr = $scope.VechileDetails.image_vehicle.split("/");
                    var name = arr[arr.length - 1];
                    $scope.images.unshift({name: name, url: $scope.VechileDetails.image_vehicle});
                    for (var i = 0; i < $scope.images.length; i++) {
                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UploadVechileFile + $scope.VechileDetails.id_vtk, constanObject.VEHICLE_IMAGE_KEY, constanObject.WebRequestType.FILE_UPLOAD, false);
                    }
                }

                else {
                    $scope.$apply(function () {
                        var vehicleDetailScope = angular.element($("#vehicleDetails")).scope();
                        $rootScope.isVehicleDetails = true;
                        $rootScope.isNewVehicle = false;
                        vehicleDetailScope.edit = true;
                        vehicleDetailScope.add = false;
                        vehicleDetailScope.vehicle_id = $scope.vechileID;
                        vehicleDetailScope.init();
                    });
                }
                break;
        }
    }


    //set data for editing

    $scope.setDataForEditing = function (data, images) {
        //console.log("Data: " + JSON.stringify(data));
        //console.log("Images: " + JSON.stringify(images));
        $rootScope.isAddVechile = false;
        $rootScope.isEditVechile = true;
        $scope.VechileDetails = data;
        if (images.length > 0)
            document.getElementById('profileImage').src = images[0].src;
        $scope.PlateSearchOption = data.licence_plate_type;
        $scope.title = "Edit Vehicle";
        $rootScope.isVehicleDetails = false;
        $rootScope.isNewVehicle = true;

        $rootScope.menuTitle = "Security";
        $rootScope.subMenuTitle = "Vehicles";
        $rootScope.subMenuTitle1 = "Vehicle Edit";
        if ($scope.VechileDetails.licence_plate_vtk == "Unknown") {
            $("#vehicles_value").val("");
        }
        else {
            $("#vehicles_value").val($scope.VechileDetails.licence_plate_vtk);
        }
        $scope.VechileDetails.make_vtk = data.make_vtk == "<b>Not Entered</b>" ? "" : data.make_vtk;
        $scope.VechileDetails.model_vtk = data.model_vtk == "<b>Not Entered</b>" ? "" : data.model_vtk;
        $scope.VechileDetails.taxed_vtk = data.taxed_vtk == "<b>Not Entered</b>" ? "" : data.taxed_vtk;
        $scope.VechileDetails.year_of_manufacture_vtk = data.year_of_manufacture_vtk == "<b>Not Entered</b>" ? "" : data.year_of_manufacture_vtk;
        $scope.VechileDetails.colour_vtk = data.colour_vtk == "<b>Not Entered</b>" ? "" : data.colour_vtk;
        $scope.VechileDetails.tax_details_vtk = data.tax_details_vtk == "<b>Not Entered</b>" ? "" : data.tax_details_vtk;
        $scope.VechileDetails.mot_details_vtk = data.mot_details_vtk == "<b>Not Entered</b>" ? "" : data.mot_details_vtk;
        $scope.VechileDetails.mot_vtk = data.mot_vtk == "<b>Not Entered</b>" ? "" : data.mot_vtk;
        $scope.VechileDetails.description_vtk = data.description_vtk == "<b>Not Entered</b>" ? "" : data.description_vtk;
    };


    function win(r) {
        //console.log("Code = " + r.responseCode);
        //console.log("Response = " + r.response);
        //console.log("Sent = " + r.bytesSent);
        //console.log(r.response);
    }

    function fail(error) {
        //console.log("An error has occurred: Code = " + JSON.stringify(error));
    }
    
    function setFirstTab() {
        $("#newVehicle").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#newVehicle").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#newVehicle").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#newVehicle").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#newVehicle").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#newVehicle").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#newVehicle").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#newVehicle").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#newVehicle").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        }
        else {
            $("#newVehicle").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#newVehicle").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            }
            else {
                $("#newVehicle").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    }
    
});

$(document).ready(function () {
    document.addEventListener('deviceready', onDeviceReady, false);
});

function onDeviceReady() {
    webRequestObject = new WebRequestApi();

}
