BandQModule.controller('selectedWitnessCnt', function ($scope, WitnessService, $rootScope, globalService, imageService, checkInternetConnectionService) {
    $scope.witnessList = [];
    // $scope.catagory = null;
    $scope.witness;
    $scope.canclebtntitle = "Yes";
    $scope.alertMessage = "";
    $scope.alertshowstatus = false;
    $scope.selectedCatagory = [];
    $scope.assignedCategory = [];
    //   var noOfPageMove;
    $scope.init = function () {
        $scope.isCameraOption = false;
        $scope.catagory = WitnessService.getWitnessCategory().category;
        $scope.selectedCategory1 = WitnessService.getWitnessCategory().selectedWitnessCategory;
        $scope.witnessList = globalService.getWitness().witnesses;
        for (var j = 0; j < $scope.witnessList.length; j++) {
            $scope.selectedCatagory[j] = [];
            for (var l = 0; l < $scope.catagory.length; l++) {
                if ($scope.witnessList[j].categories) {
                    for (var k = 0; k < $scope.witnessList[j].categories.length; k++) {
                        if ($scope.catagory[l].id_uct == $scope.witnessList[j].categories[k].id_uct) {
                            $scope.selectedCatagory[j].push($scope.catagory[l]);
                        }
                    }
                }
            }
        }

        for (var i = 0; i < $scope.witnessList.length; i++) {
            if ($scope.witnessList[i].images > 0) {
                $scope.witnessList[i].file_name = constanObject.WITNESS_IMAGE + $scope.witnessList[i].id_usr + "/" + "1";
            } else {
                $scope.witnessList[i].file_name = "images/offenders-pic/pic08.jpg";
            }
        }

        //console.log("INIT:" + JSON.stringify($scope.witnessList));
    };

    $scope.removeWitness = function (index) {
        $scope.alertShow("Are you sure you want to remove this witness?", function (status) {
            if (status) {
                //var scope = angular.element('#218').scope();
                //scope.removeWitness($scope.witnessList[index]);
                $scope.witnessList.splice(index, 1);
            }
        });
    };
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


    $scope.uploadImage = function (obj) {

        $scope.witness = obj;
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
        // var index = $scope.formData.image_users.indexOf("images/profile_img.png");
        // if (index != null && index == 0)
        //  $scope.formData.image_users.splice(index, 1);
        var arr = imageURI.src.split("/");
        var name = arr[arr.length - 1];
        $scope.$apply(function () {
            $scope.witness.file_name = name;
            //console.log(imageURI.src);
            webRequestObject.fileUpload($scope, imageURI.src, constanObject.UPLOAD_WITNESS_FILES + $scope.witness.id_usr, "image_users", 100);
        });

    }
    ;

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            $scope.loginError = true;
            $scope.LoginErrorMessage = responseData.responseJSON.error;
            return;
        }
        switch (requestType) {

            case 100:
                //console.log(JSON.stringify(responseData));
                break;
        }
    };
    $scope.catagoryChange = function (catagory, index) {
        $scope.witnessList[index].categories = catagory;
    };
    $scope.nextButtonClicked = function (callback) {
        $scope.witnessList.forEach(function (obj) {
            for (var i in obj) {
                (obj[i] == "<b>Not Entered</b>") ? obj[i] = "" : obj[i] = obj[i];
            }
        });
        WitnessService.setWitnessCategory({'category': $scope.catagory, 'selectedWitnessCategory': $scope.selectedCategory1});
        globalService.setWitness({'witnesses': $scope.witnessList, 'isWitnessInvolves': 'yes'});
        return callback(true, 1);
    };

    $scope.back = function (callback) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            return callback(true, 2);
        } else {
            return callback(true);
        }
    };

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
    $scope.addNewWitness = function () {

        $rootScope.witnessAddShowStatus = true;
        $rootScope.witnessListShowStatus = false;
        $rootScope.witnessDetailShowStatus = false;
        $rootScope.addNewVictimSelectedWitnessList = true;
        var index = $rootScope.currentVisibleIdex - 1;
        $scope.heidAndShowIndex(index, 1);
    }
    $scope.init();
});
