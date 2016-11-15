BandQModule.controller('SelectedVechiles', ['$scope', '$rootScope', 'globalService', 'checkInternetConnectionService', 'vehicleService', function ($scope, $rootScope, globalService, checkInternetConnectionService, vehicleService) {
        $scope.Vechiles = [];
        $scope.vechilId = "";
        $scope.isImageOption = false;
        $scope.isCameraOption = false;
        $scope.tempVehicle = null
        // var noOfPageMove;
        $scope.closeVechileItem = function (obj) {
            $scope.tempVehicle = obj;
            $scope.isRemoveVehicleModal = true;
            $scope.vehicleAddRemoveMsg = "Are you sure you want to remove this vehicle?";
        };

        $scope.removeVehicle = function () {
            $scope.isRemoveVehicleModal = false;
            var obj = $scope.tempVehicle;
            for (var i = 0; i < $scope.Vechiles.length; i++) {
                if ($scope.Vechiles[i] == obj)
                {
                    $scope.removeItem(obj);
                    globalService.removeVehicleIndex(i);
                }
            }
        };

        $scope.removeItem = function (obj) {
            $("#" + obj.id_vtk).removeClass("active");
        };
        $scope.hidePopUp = function () {
            $scope.isRemoveVehicleModal = false;
        };
        $scope.init = function () {
            $scope.Vechiles = globalService.getVehicle();
            console.log("Vehicles : " + JSON.stringify($scope.Vechiles))
            $rootScope.plateSearchType = false;
            $scope.plateSearchVal = globalService.getInvolvedVehicleDetails().licence_plate_vtk;
            $scope.isFullPlate = globalService.getInvolvedVehicleDetails().licence_plate_type;
        };


        $scope.previousPageRequest = function () {
            if ($scope.page == 1)
                $scope.page = 1;
            else
                $scope.page--;

        };
        $scope.nextPageRequest = function () {
            return false;
        };

        $scope.nextButtonClicked = function (callback) {
            globalService.setVehicleData({isVehicleInvolved: "Yes", vehicles: $scope.Vechiles});
            globalService.setInvolvedVehicleDetails({vehicleList: $scope.Vechiles, licence_plate_vtk: $scope.plateSearchVal, licence_plate_type: $scope.isFullPlate, areVehicleInvolved: "yes"});
            return callBack(true, 1);
        };
        $scope.back = function (callBack) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.vehicleListShowStatus = false;
                $rootScope.vehicleAddShowStatus = true;
                $rootScope.vehicleDetailShowStatus = false;

                return callBack(true, 1);
            } else {

                $rootScope.vehicleListShowStatus = true;
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = false;
                return callBack(true, 1);
            }


        }
        $scope.saveButtonAction = function () {
            //alert("saveButtonAction");

        }


        $scope.getImage = function (vechileId) {
            $scope.vechilId = vechileId;
            $scope.isCameraOption = true;
        };

        $scope.openCamera = function () {
            navigator.camera.getPicture(uploadPhoto, function (message) {
                //console.log('get picture failed');
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                allowEdit: true,
            });
            $scope.isCameraOption = false;
        };

        $scope.openGallery = function () {
            navigator.camera.getPicture(uploadPhoto, function (message) {
                //console.log('get picture failed');
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            });
            $scope.isCameraOption = false;
        };
        $scope.closeCameraOption = function () {
            $scope.isCameraOption = false;
        };
        function uploadPhoto(imageURI) {
            imagePath = imageURI;

            webRequestObject.fileUpload($scope, imagePath, constanObject.UploadVechileFile + $scope.vechilId, constanObject.VEHICLE_IMAGE_KEY, constanObject.WebRequestType.FILE_UPLOAD, true);
        }

        $scope.webRequestResponse = function (requestType, status, responseData) {

            switch (requestType) {
                case constanObject.WebRequestType.FILE_UPLOAD :
                    //console.log(responseData.response);
                    break;
            }
        };
        $scope.addNewVehicle = function () {
            $rootScope.vehicleListShowStatus = false;
            $rootScope.vehicleAddShowStatus = true;
            $rootScope.vehicleDetailShowStatus = false;
            $rootScope.isAddVechile=true;
              vehicleService.setVehicleTitle("Add New Vehicle");
            var index = $rootScope.currentVisibleIdex - 1;
            $scope.heidAndShowIndex(index, 1);


        }
        $scope.init();
    }]);