BandQModule.controller('Details_VictimWitnessCtrl', function ($scope, 
WitnessService, VictimWitness, $rootScope, checkInternetConnectionService, imageService, TaskAndCheckList,getAllFieldLabel) {
    $scope.witnessData = {};
    //$scope.witnessVictim_id = null;
    $scope.catagory = null;
    $scope.isVictim = null;
    $scope.isLargImage = false;
    $scope.images = [];
    $scope.fromList = null;
    $scope.witness = [];
    $scope.title = '';
    $scope.edit = null;
    $scope.successMessage = "";
    $scope.successShow = false;
    var noOfPageMove;
    $scope.taskAndCheckList = [];
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
    var moduleId = 257;
    $scope.commsNote = [];
    $scope.staffImage = "";

    $scope.isCommAllowed = false;
    $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
    $scope.isNoInterStrip = true;
    $scope.incidents = [];
    $scope.isNextRecord = false;
    $scope.isBackRecord = false;
    $scope.link = {};
    $scope.imageIndex = 0;

    $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };
    $scope.successClose = function () {
        $scope.successShow = false;
    };

    $scope.init = function () {
                setFormFieldLableData();
        window.scrollTo(0, 0);
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        $rootScope.successShow = false;
        if ($rootScope.isVictimWitnessDetail) {
           
            if ($scope.witnessVictim_id) {
                try {
                    getCommsDetails($scope.witnessVictim_id);
                }
                catch (e) {
                    ////console.log(e);
                }

                TaskAndCheckList.getTaskList("Victims & Witness", $scope.witnessVictim_id, function (status, data) {
                    $scope.taskAndCheckList = data;
                    ////console.log("");
                });
                if ($scope.edit != null) {
                    if ($scope.edit) {
                        $rootScope.successShow = true;
                        $rootScope.successMessage = "Witness details updated successfully.";
                    } else {
                        $rootScope.successShow = true;
                        $rootScope.successMessage = "Witness added successfully.";
                    }
                }
                if ($scope.isVictim) {
                    $scope.title = 'Victim';
                    VictimWitness.getVictimeDetaile($scope.witnessVictim_id, function (status, data, victimDetails) {
                        $rootScope.menuTitle = "Security";
                        $rootScope.subMenuTitle = "Victims & Witnesses";
                        $rootScope.subMenuTitle1 = "Victim Details";
                        prepareVictimeWitnessData(data, victimDetails);
                    });
                } else {
                    $scope.title = 'Witness';
                    WitnessService.getWitnessDetaile($scope.witnessVictim_id, function (status, data, witnessDetails) {
                        $rootScope.menuTitle = "Security";
                        $rootScope.subMenuTitle = "Victims & Witnesses";
                        $rootScope.subMenuTitle1 = "Witness Details";
                        prepareVictimeWitnessData(data, witnessDetails);
                    });
                }
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
    $scope.imageLargeView = function (image) {
        var index = $scope.images.indexOf(image);
        //console.log("Image Index : " + index);
        $scope.imageIndex = index;
        // $timeout(function () {
        $scope.isLargeImageView = true;
    };
    $scope.closeLargeImageView = function () {
        $scope.isLargeImageView = false;
    };
    function prepareVictimeWitnessData(data, victimWitness) {
        if (!victimWitness)
            return;
        $scope.images = victimWitness.linked_images;
        $scope.incidents = victimWitness.incident;
        $scope.link = victimWitness.link;
        console.log("$scope.link : " + JSON.stringify($scope.link));
        if ($scope.edit == true) {
            var scopelist = angular.element('#List_VictimWitness').scope();

            scopelist.victimWitnessData.forEach(function (obj) {
                if (data.id_usr == obj.id_usr) {
                    obj.email_usr = data.email_usr;
                    obj.file_name = data.file_name;
                    obj.firstname_usr = data.firstname_usr;
                    obj.images = data.images;
                    obj.last_updated = dateFormat(data.last_updated);
                    obj.lastname_usr = data.lastname_usr;
                }
            });
        }
        $scope.$apply(function () {
            $scope.witnessData = {};
            $scope.isBackRecord = $scope.link.previous > 0 ? true : false;
            $scope.isNextRecord = $scope.link.next > 0 ? true : false;
            $scope.witnessData = data.data[0];
            if ($scope.witnessData.add_comm == 1) {
                $scope.isCommAllowed = true;
            } else {
                $scope.isCommAllowed = false;
            }
            for (var i in $scope.witnessData) {
                ($scope.witnessData[i] == null || $scope.witnessData[i] == "") ? $scope.witnessData[i] = "<b>Not Entered</b>" : $scope.witnessData[i] = $scope.witnessData[i];
            }
            $scope.witnessData.images == "<b>Not Entered</b>" ? $scope.witnessData.images = 0 : $scope.witnessData.images = $scope.witnessData.images;
            $scope.witnessData.catagoriedTitle = "";
            if ($scope.witnessData.categories != "<b>Not Entered</b>") {
                $scope.witnessData.categories.forEach(function (obj) {
                    $scope.witnessData.catagoriedTitle = $scope.witnessData.catagoriedTitle + obj.title_uct + ',';
                });
            }
            $scope.witnessData.catagoriedTitle = $scope.witnessData.catagoriedTitle.slice(0, $scope.witnessData.catagoriedTitle.length - 1);
//            $scope.images = [];
//            if ($scope.witnessData.images > 0) {
//                for (var i = 1; i <= $scope.witnessData.images; i++) {
//                    if ($scope.isVictim)
//                        $scope.images.push({id: i, img: constanObject.VICTIME_IMAGE + $scope.witnessVictim_id + "/" + i});
//                    else
//                        $scope.images.push({id: i, img: constanObject.WITNESS_IMAGE + $scope.witnessVictim_id + "/" + i});
//                }
//            } else {
//                $scope.images.push({id: 0, img: "images/offenders-pic/pic08.jpg"});
//            }
        });

    }
    ;

    //$scope.init($scope.witnessVictim_id);
    $scope.nextPrevDetail = function (id) {
        $scope.imageIndex = 0;
        $scope.witnessVictim_id= id;
        $scope.init();
        setFirstTab();
    };
    $scope.editBtnClicked = function () {
        $scope.successShow = false;
        if ($scope.isVictim) {
            $rootScope.subMenuTitle1 = "Edit Victim";
            $rootScope.filterViewVW = "Victim";
        } else {
            $rootScope.subMenuTitle1 = "Edit Witness";
            $rootScope.filterViewVW = "Witness";
        }
        $rootScope.isVictimWitnessDetail = false;
        $rootScope.isVictimWitnessAdd = true;
        $rootScope.successShow = false;
        $scope.edit = true;
        var scope = angular.element('#Add_VictimWitness').scope();
        scope.witnessVictim_id = $scope.witnessData.id_usr;
        scope.VictimWitnessData = $scope.witnessData;
        scope.init();
    };
    $scope.openImageInFullScreen = function () {
        $scope.isLargImage = true;
    };
    $scope.closeImage = function () {
        $scope.isLargImage = false;
    };


    var getCommsDetails = function (victimWitnessId) {

        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + victimWitnessId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function () {
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + $scope.witnessVictim_id;
        //function(classObject,type,webUrl,parameters,requestType,showProgress)
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

        //$scope.isNotePopUp = true;
    };

    $scope.hideAddNotePopup = function () {
        $scope.isNotePopUp = false;
    };



    $scope.methodChange = function (method) {
        ////console.log("Method : " + JSON.stringify(method));
        $scope.$apply(function () {
            $scope.notes = {};
            $scope.isNoteDesc = method.detail == 1 ? true : false;
            $scope.isDeadLine = method.deadline == 1 ? true : false;
            $scope.isRemind = method.remind_me == 1 ? true : false;
            $scope.isWith = method.opt_with == 1 ? true : false;
            $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
            $scope.isDuration = method.duration == 1 ? true : false;
            $scope.notes.note_type_jnt = method.id_comms;
        });
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
        // //console.log("Selected Staff : " + JSON.stringify(staff));
    };

//    $scope.uploadImage = function () {
//        $scope.CommsImages = [];
//        $scope.isCameraOption = true;
//    };
//
//
//    $scope.openCamera = function () {
//
//        imageService.getCameraImage(function (item) {
//            uploadPhoto(item);
//        });
//        $scope.isCameraOption = false;
//    };
//
//    $scope.openGallery = function () {
//
//        imageService.getMediaImage(function (item) {
//            uploadPhoto(item);
//        });
//        $scope.isCameraOption = false;
//    };
//    $scope.closeCameraOption = function () {
//        $scope.isCameraOption = false;
//    };
//    function uploadPhoto(imageURI) {
//        //console.log("imageURI : " + imageURI);
//        var arr = imageURI.src.split("/");
//        var name = arr[arr.length - 1];
//        $scope.$apply(function () {
//            $scope.CommsImages.push({name: name, url: imageURI.src});
//        });
//
//    }

    $scope.AddNote = function () {
        $scope.notes.module_id = moduleId;
        $scope.notes.id_jno_jnt = vehicle_id;
        $scope.notes.id_usr_jnt = localStorage.getItem("userId");
        $scope.notes.note_by = localStorage.getItem("userId");
        $scope.notes.latitude = CURRENT_LATITUDE;
        $scope.notes.longitude = CURRENT_LONGITUDE;
        ////console.log("Add Note Data : " + JSON.stringify($scope.notes));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.InsertComms, JSON.stringify($scope.notes), constanObject.CommsAndTaskWebRequestType.AddComms, true);
    };

    $scope.closeSuccess = function () {
        $scope.isSuccess = false;
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.isVictimWitnessDetail) {
            $rootScope.successShow = false;
            $rootScope.isVictimWitnessList = true;
            $rootScope.isVictimWitnessDetail = false;
            var scope = angular.element('#220').scope();
            var scopelist = angular.element('#Details_VictimWitnes').scope();
            if ($scope.witnessData) {
                scopelist.addWitness($scope.witnessData);
                scope.witnessList = scopelist.selectedWitness;
                scope.catagory = $scope.catagory;
            }
            return callback(true, 1);
        }
//        else
//         return callback(false, 0);
    };

//    $scope.back = function (callback) {
//        $scope.successShow = false;
//        if ($rootScope.isVictimWitnessDetail) {
//            if ($rootScope.backStatus == "main") {
//                window.history.back();
//            } else {
//                $rootScope.successShow = false;
//                $rootScope.isBack = true;
//                $rootScope.isVictimWitnessList = true;
//                $rootScope.isVictimWitnessDetail = false;
//
//                $scope.witnessData = {};
//                return callback(false, 0);
//            }
//        }
//    };

    $scope.goBackToList = function () {
        $scope.successShow = false;
        $rootScope.subMenuTitle1 = null;
          window.scrollTo(0, 0);
        if ($rootScope.filterViewVW == "Witness") {
            $rootScope.isVictimWitnessList = true;
            $rootScope.filterViewVW = "Witness";
            $rootScope.isVictimWitnessDetail = false;
        } else {
            $rootScope.isVictimWitnessList = true;
            $rootScope.filterViewVW = "Victim";
            $rootScope.isVictimWitnessDetail = false;
        }
      

    };
    function setFirstTab() {
        console.log("Set First tab function called");
        $("#Details_VictimWitness").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#Details_VictimWitness").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#Details_VictimWitness").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    }
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
//            if (responseData.responseJSON.error != "Comms Config Not Generated") {
//                $rootScope.show = true;
//                $rootScope.alertMsg = responseData.responseJSON.error;
//
//            }
//            else {
                $scope.commsNote = [];
          //  }
            return;
        }

        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.CommsConfigType:
                ////console.log("responseData : " + JSON.stringify(responseData));
                ////console.log("responseData.data.comms.comm_row_title : " + responseData.data.comm_row_title);
                $scope.$apply(function () {
                    $scope.commsTitle = responseData.data.comm_row_title;
                    $scope.comms = responseData.data.comms;
                    if ($scope.comms.length < 2)
                        $scope.isMethod = false;
                    else
                        $scope.isMethod = true;

                    // //console.log(" $scope.isMethod : " + $scope.isMethod);
                    $scope.isNotePopUp = true;
                });
                $scope.selectedMethod = responseData.data.comms[0];
                $scope.methodChange($scope.selectedMethod);
                break;
            case constanObject.CommsAndTaskWebRequestType.ListStaff:

                $scope.$apply(function () {
                    $scope.ListStaff = responseData.data;
                });
                ////console.log("$scope.ListStaff : " + JSON.stringify($scope.ListStaff));

                break;
            case constanObject.CommsAndTaskWebRequestType.AddComms:

                ////console.log("AddComms : " + JSON.stringify(responseData));
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
                        getCommsDetails($scope.witnessVictim_id);
                    });

                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                ////console.log(JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.CommsImages = [];
                    $scope.isSuccess = true;
                    $scope.successMsg = successMsg;
                    $scope.isNotePopUp = false;
                    getCommsDetails($scope.witnessVictim_id);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                ////console.log("Comms Details : " + JSON.stringify(responseData));
                $scope.$apply(function () {

                    $scope.commsNote = responseData.data.list_data;

                });
                ////console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    };

});
