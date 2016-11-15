BandQModule.controller("NewVehicle", function ($scope, $rootScope, checkInternetConnectionService, globalService, imageService, vehicleService, getUniqueId) {
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
    $scope.VechileDetails = {
        licence_plate_vtk: null,
        licence_plate_type: 2,
        possible_false_plate: 0,
        make_vtk: null,
        model_vtk: null,
        colour_vtk: null,
        description_vtk: null,
        image_vehicle: []
    };
    $scope.profileImage = null;
    var isProfileImage = false;
    $scope.showProfileCancel = false;
    var isProfileImage = false;
    var noOfPageMove;

    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
        $rootScope.show = false;
        if (vehicleService.getVehicleTitle())
            $scope.title = vehicleService.getVehicleTitle();

        if ($scope.title.length <= 0)
            $scope.title = "Add New Vehicle";
        $scope.Plate = vehicleService.getVehiclePlate();
        var vehicleInvolvedData = vehicleService.getVehicleInvolvedData();
        //console.log("vehicleInvolvedData: " + JSON.stringify(vehicleInvolvedData));
        $scope.VechileDetails.id_vtk = 0;
        $scope.VechileDetails.licence_plate_vtk = vehicleInvolvedData.licence_plate_vtk;
        $scope.VechileDetails.make_vtk = "";
        $scope.VechileDetails.model_vtk = "";
        $scope.VechileDetails.description_vtk = "";
        $scope.VechileDetails.colour_vtk = "";
        $scope.VechileDetails.possible_false_plate = vehicleInvolvedData.possible_false_plate;
        $scope.VechileDetails.licence_plate_type = vehicleInvolvedData.licence_plate_type;

        var largeImage = document.getElementById('profileImage');
        largeImage.src = "images/car_img.jpg";
        $scope.VechileDetails.image_vehicle = "";
        $scope.images = [];
        window.scrollTo(0, 0);
        setFirstTab();
    };

    $scope.$watch('VechileDetails.licence_plate_vtk', function (val) {
        //console.log("VechileDetails.licence_plate_vtk: " + val);
        $(".help-inline").addClass("ng-hide");
        $scope.VechileDetails.licence_plate_vtk = val;
    });

    $scope.isSaveSuccess = false;
    $scope.isNewVechileSaveAlert = false;
    var imagePath = null;
    $scope.getPlateType = function (item) {
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



    $scope.getVechileDetails = function (vechileId) {
        var vechileListScope = angular.element($("#208")).scope();
        vechileListScope.vechileDetail(vechileId);
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

    $scope.previousPageRequest = function () {
        if ($scope.page == 1)
            $scope.page = 1;
        else
            $scope.page--;

    };

    $scope.nextPageRequest = function () {
    };

    $scope.nextButtonClicked = function (callBack) {

        if ($rootScope.vehicleAddShowStatus) {
            window.scrollTo(0, 0);
            if ($scope.VechileDetails.licence_plate_vtk.length > 2) {

                if (!checkInternetConnectionService.checkNetworkConnection()) {

                    $scope.images.unshift({name: name, url: $scope.VechileDetails.image_vehicle});
                    $scope.VechileDetails.fileid = [];

                    for (var i = 0; i < $scope.images.length; i++) {
                        if ($scope.images[i].url) {
                            var TimeStamp = getUniqueId.getId();
                            $scope.VechileDetails.fileid.push(TimeStamp);
                            dataBaseObj.insertData(
                                    TABLE_CREATE_INCIDENT_REPORT_FILE,
                                    FILES_UPLOAD_KEY, [constanObject.FileUploadModuleId.VECHILE.toString(),
                                        TimeStamp,
                                        constanObject.CREATE_INCIDEN_TEMP_ID.toString(),
                                        $scope.images[i].url.toString(),
                                        "image", "0",
                                        TimeStamp,
                                        globalService.getUserId().toString(), "-1"]
                                    );
                        }

                    }
                    
                    
                    globalService.setVehicleData({vehicle: $scope.VechileDetails});
                    globalService.addVehicle($scope.VechileDetails);
                    return callBack(true, noOfPageMove);
                } else {
                    if ($rootScope.isAddVechile)
                        webRequestObject.postRequest($scope, "POST", constanObject.AddNewVechile, $scope.VechileDetails, constanObject.WebRequestType.AddNewVechile, true);
                    else
                        webRequestObject.postRequest($scope, "POST", constanObject.UpdateVechile + $scope.VechileDetails.id_vtk, $scope.VechileDetails, constanObject.WebRequestType.UpdateVechile, true);
                }
                return callBack(false, noOfPageMove);
            } else {
                if (!$scope.addVehicleForm.$valid) {
                    //$("#errorAddVehicle").show();
                    $(".help-inline").removeClass("ng-hide");

                    $rootScope.alertMsg = "At least 3 characters required for vehicle registration number.";
                    $("#newPlateTxt").focus();

                }
                return callBack(false, noOfPageMove);
            }
        }

    };
    $scope.$watch('addVehicleForm.$valid', function (isValid) {
        //alert('valid' + validity);
        if (isValid) {
            console.log("isValid : " + isValid);
            $rootScope.enableBtn = "btn-green";
        } else {
            console.log("isValid : " + isValid);
            $rootScope.enableBtn = "";
        }
    });
    $scope.back = function (callBack) {
        if ($rootScope.vehicleAddShowStatus) {
            window.scrollTo(0, 0);
            $scope.isOneOfThese = false;
            $scope.Plates = [];
            if ($scope.isFromVehicleList || $scope.isFromVehicleDetails || $rootScope.isEditVechile) {
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = false;
                $rootScope.vehicleListShowStatus = true;
                $scope.isFromVehicleList = false;
                return callBack(false, noOfPageMove);
            }
            return callBack(true, noOfPageMove);
        }
    };

    $scope.saveButtonAction = function () {

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
//        navigator.camera.getPicture(uploadPhoto, function (message) {
//            //console.log('get picture failed: '+message);
//        }, {
//            quality: 50,
//            destinationType: navigator.camera.DestinationType.FILE_URI,
//            correctOrientation: true,
//            allowEdit: true,
//        });
        imageService.getCameraImage(function (item) {
            uploadPhoto(item);
        });
        $scope.isCameraOption = false;
    };

    $scope.openGallery = function () {
//        navigator.camera.getPicture(uploadPhoto, function (message) {
//            //console.log('get picture failed: '+message);
//        }, {
//                        quality: 50,
//                        destinationType: navigator.camera.DestinationType.FILE_URI,
//                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
//                        
//                    }); 
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
    ;
    $scope.removeProfileImage = function () {
//          var profileImage = document.getElementById("profileImage");
//            profileImage.src = '';
//             $scope.VechileDetails.image_vehicle = '';
//            $scope.isCameraOption = false;


        var profileImage = document.getElementById("profileImage");
        $scope.showProfileCancel = false;
        profileImage.src = "images/car_img.jpg";
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
        var vechileDetatisScope = angular.element(document.getElementById("208")).scope();
        var vechileViewsScope = angular.element($("#vechilesViewPage")).scope();
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
                    $scope.vechileID = responseData.data;
                    if ($scope.profileImage)
                        $scope.images.unshift($scope.profileImage);
                    if (imageflag && $scope.images.length > 0) {

                        for (var i = 0; i < $scope.images.length; i++) {

                            // if (imagePath != null)
                            webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UploadVechileFile + $scope.vechileID, constanObject.VEHICLE_IMAGE_KEY, constanObject.WebRequestType.FILE_UPLOAD, true);
                        }
                    } else {
                        var vehicleDetailScope = angular.element($("#208")).scope();
                        vehicleDetailScope.vechileDetail($scope.vechileID);
                    }

                    $scope.$apply(function () {
                        var vehicleDetailScope = angular.element($("#208")).scope();
                        $rootScope.vehicleAddShowStatus = false;
                        $rootScope.vehicleDetailShowStatus = true;
                        $rootScope.vehicleListShowStatus = false;
                        vehicleDetailScope.edit = false;
                        vehicleDetailScope.init();
                    });
                }

                break;
            case constanObject.WebRequestType.VechileDetailsById :
                //console.log("Vechile Details Response: " + JSON.stringify(responseData.data[0]));
                var vechileListScope = angular.element($("#207")).scope();

                $scope.$apply(function () {
                    vechileListScope.vechileDetail($scope.vechileID);
                });
                break;
            case constanObject.WebRequestType.FILE_UPLOAD :

                var vehicleDetailScope = angular.element($("#208")).scope();
                vehicleDetailScope.vechileDetail($scope.vechileID);

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
                $scope.vechileID = $scope.VechileDetails.id_vtk;
                $scope.$apply(function () {
                    var vehicleDetailScope = angular.element($("#208")).scope();
                    $rootScope.vehicleAddShowStatus = false;
                    $rootScope.vehicleDetailShowStatus = true;
                    $rootScope.vehicleListShowStatus = false;
                    vehicleDetailScope.edit = true;
                    vehicleDetailScope.init();
                });
                if (imageflag) {
                    var arr = $scope.VechileDetails.image_vehicle.split("/");
                    var name = arr[arr.length - 1];
                    $scope.images.unshift({name: name, url: $scope.VechileDetails.image_vehicle});
                    for (var i = 0; i < $scope.images.length; i++) {
                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UploadVechileFile + $scope.VechileDetails.id_vtk, constanObject.VEHICLE_IMAGE_KEY, constanObject.WebRequestType.FILE_UPLOAD, false);
                    }
                } else {
                    $scope.$apply(function () {

                        var vechileListScope = angular.element($("#208")).scope();
                        $rootScope.isNewVechile = false;
                        vechileListScope.vechileDetail($scope.VechileDetails.id_vtk);


                    });
                }
                break;
        }
    }


    //set data for editing

    $scope.setDataForEditing = function (data, images) {
        setFirstTab();
        //console.log("Data: " + JSON.stringify(data));
        //console.log("Images: " + JSON.stringify(images));
        $rootScope.isAddVechile = false;
        $rootScope.isEditVechile = true;
        $rootScope.successShow = false;
        $scope.VechileDetails = data;
        if (images.length > 0)
            document.getElementById('profileImage').src = images[0].url;
        $scope.images = images;
        $scope.PlateSearchOption = data.licence_plate_type;
        $scope.title = "Edit Vehicle";
        $rootScope.vehicleAddShowStatus = true;
        $rootScope.vehicleDetailShowStatus = false;
        $rootScope.vehicleListShowStatus = false;


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

    function setFirstTab() {
        $("#206").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#206").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#206").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#206").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#206").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#206").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#206").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#206").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#206").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#206").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#206").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#206").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    }

});

function Item(data) {
    this.licence_plate_vtk = data.licence_plate_vtk;
}


function win(r) {
    //console.log("Code = " + r.responseCode);
    //console.log("Response = " + r.response);
    //console.log("Sent = " + r.bytesSent);
    //console.log(r.response);
}

function fail(error) {
    //console.log("An error has occurred: Code = " + JSON.stringify(error));
}


    