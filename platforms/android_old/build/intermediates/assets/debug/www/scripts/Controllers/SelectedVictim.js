BandQModule.controller('selectedVictimCnt', function ($scope, VictimWitness, $rootScope, globalService, imageService,checkInternetConnectionService) {
    $scope.victims = [];
    $scope.catagory = null;
    $scope.isCameraOption = false;
    $scope.victim = null;
    $scope.canclebtntitle = "Yes";
    $scope.alertMessage = "";
    $scope.alertshowstatus = false;
    $scope.assignedCategory = [];
    var noOfPageMove;
    $scope.selectedCatagory = [];
    $scope.init = function (_noOfPageMove) {
        $scope.catagory = [];
        var scope = angular.element('#212').scope();
        $scope.catagory = scope.categoryList;
        $scope.isCameraOption = false;
        noOfPageMove = _noOfPageMove;
        $scope.selectedCatagory = [];
        //console.log("INIT:" + JSON.stringify($scope.victims));
        
        
         for(var i=0;i<$scope.victims.length;i++){
           if($scope.victims[i].images > 0) {
                $scope.victims[i].file_name = constanObject.VICTIME_IMAGE + $scope.victims[i].id_usr + "/" + "1";
            }
            else{
                 $scope.victims[i].file_name = "images/offenders-pic/pic08.jpg";
            }
        }

        for (var j = 0; j < $scope.victims.length; j++) {
            $scope.selectedCatagory[j] = [];
            for (var l = 0; l < $scope.catagory.length; l++) {

                for (var k = 0; k < $scope.victims[j].categories.length; k++) {
                    if ($scope.catagory[l].id_uct == $scope.victims[j].categories[k].id_uct) {

                        $scope.selectedCatagory[j].push($scope.catagory[l]);

                    }
                }
            }

        }

           
       
        
        //console.log("INIT:" + JSON.stringify($scope.victims));
    };

    $scope.removeVictim = function (index) {
        $scope.alertShow("Are you sure you want to remove this victim?", function (status) {
            if (status) {
                var scope = angular.element('#212').scope();
                 scope.removeVictim($scope.victims[index]);
                 $scope.victims.splice(index, 1);
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
        $scope.victim = obj;
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
    function uploadPhoto(item) {
        var index = $scope.formData.image_users.indexOf("images/profile_img.png");
        if (index != null && index == 0)
            $scope.formData.image_users.splice(index, 1);
        $scope.$apply(function () {
            $scope.victim.file_name = item.src;
            webRequestObject.fileUpload($scope, item.src, constanObject.VICTIME_IMAGE_UPLOAD + $scope.victim.id_usr, "image_users", 100);
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
    $scope.catagoryChange = function (catagory,index) { 
        $scope.victims[index].categories = catagory;
         //console.log("catagory : "+JSON.stringify(catagory)+"//index : "+index);
    };
    $scope.nextButtonClicked = function (callback) {
        $scope.victims.forEach(function (obj) {
            console.log("obj VICTIM : "+JSON.stringify(obj))
            for (var i in obj) {
        
                (obj[i] == "<b>Not Entered</b>") ? obj[i] = "" : obj[i] = obj[i];
            }
        });
        
//        var selectedVitim=[];
//
//          for(var i=0;i<$scope.victims.length;i++)
//          {
//             if($scope.victims[i].id_usr)
//                 selectedVitim.push($scope.victims[i]);
//                // alert(JSON.stringify($scope.victim));
//          }
//        
        if($scope.victims.length<=0)
        globalService.setVictim({'whyNot': "", 'victimDetails': $scope.victims, 'isvictimInvolved': 'no'});
        else
        globalService.setVictim({'whyNot': "", 'victimDetails': $scope.victims, 'isvictimInvolved': 'yes'});
        
        return callback(true, 1);
    };

    $scope.back = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            return callback(true, 2);
        } else {
            return callback(true, noOfPageMove);
        }
    };

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
});
