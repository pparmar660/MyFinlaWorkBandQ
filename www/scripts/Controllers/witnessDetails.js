BandQModule.controller('wictessDetailCnt', function ($scope, WitnessService, $rootScope,
        imageService, TaskAndCheckList, globalService, linkedModule) {
    $scope.witnessData = {};
    $scope.witness_id = null;
    $scope.isLargImage = false;
    $scope.images = [];
    $scope.witness = [];
    $scope.edit = null;
    $scope.witnessCategories = [];
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
    $scope.isUploadSuccess = false;
    var row_id = 0;
    var moduleId = 257;
    $scope.commsNote = [];
    $scope.staffImage = "";

    $scope.isCommAllowed = false;
    $scope.incidents = [];
    $scope.imageIndex = 0;
    $scope.isLargeImageView = false;
    $scope.init = function () {
        window.scrollTo(0, 0);
        // noOfPageMove = _noOfPageMove;
        $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
        $rootScope.successShow = false;
        //$scope.selectedCategory = globalService.getWitness().selectedWitnessCategory;
        if ($rootScope.witnessDetailShowStatus) {
            //console.log("Witness witness_Id: " + $scope.witness_id);
            row_id = $scope.witness_id;
            //console.log("WITNESS_ID : " + row_id);
            getCommsDetails(row_id);
            if ($scope.witness_id) {
                if ($scope.edit != null) {
                    if ($scope.edit) {
                        $rootScope.successShow = true;
                        $rootScope.successMessage = "Witness details updated successfully.";
                    } else {
                        $rootScope.successShow = true;
                        $rootScope.successMessage = "Witness added successfully.";
                    }
                }

                TaskAndCheckList.getTaskList("Victims & Witness", $scope.witness_id, function (status, data) {
                     if(status){
                        $scope.showChecklist=true;
                          $("#wicTasksTab").removeClass("hideTab");
                    }else{
                      $scope.showChecklist=false;   
                        $("#wicTasksTab").addClass("hideTab");
                    }
                    $scope.taskAndCheckList = data;
                    //console.log("");
                });
                WitnessService.getWitnessDetaile($scope.witness_id, function (status, data, witnessDetails) {
                    linkedModule.setScope($scope);
                    //console.log("Witness Details: " + JSON.stringify(data));

                    if ($scope.edit == true) {

                        var scopelist = angular.element('#218').scope();
                        scopelist.witnessData.forEach(function (obj) {
                            if (data.id_usr == obj.id_usr) {
                                obj.email_usr = data.email_usr;
                                obj.file_name = data.file_name;
                                obj.firstname_usr = data.firstname_usr;

                                obj.images = data.images;
                                obj.lastname_usr = data.lastname_usr;
                            }
                        });
                    }

                    $scope.$apply(function () {
                        $scope.images = witnessDetails.linked_images;
                        $scope.witness = angular.copy(data.data);
                        $scope.witnessData = data.data[0];
                        $scope.incidents = witnessDetails.incident;
                        if ($scope.incidents.length <= 0) {
                            $("#wicIncidentTab").addClass("hideTab");
                            $scope.showWicLinkedDetailsTab = false;
                        }
                        else {
                            $("#wicIncidentTab").removeClass("hideTab");
                            $scope.showWicLinkedDetailsTab = true;
                        }
                        if ($scope.witnessData.add_comm == 1) {
                             $("#wicCommsTab").removeClass("hideTab");
                            $scope.isCommAllowed = true;
                        } else {
                             $("#wicCommsTab").addClass("hideTab");
                            $scope.isCommAllowed = false;
                        }
                        $scope.witnessCategories = $scope.witnessData.categories;
                        for (var i in $scope.witnessData) {
//                            //console.log(i);
                            ($scope.witnessData[i] == null || $scope.witnessData[i] == "") ? $scope.witnessData[i] = "<b>Not Entered</b>" : $scope.witnessData[i] = $scope.witnessData[i];
                        }
                        $scope.witnessData.firstname_usr == "<b>Not Entered</b>" ? $scope.witnessData.firstname_usr = "" : $scope.witnessData.firstname_usr = $scope.witnessData.firstname_usr;
                        $scope.witnessData.lastname_usr == "<b>Not Entered</b>" ? $scope.witnessData.lastname_usr = "" : $scope.witnessData.lastname_usr = $scope.witnessData.lastname_usr;
                        $scope.witnessData.images == "<b>Not Entered</b>" ? $scope.witnessData.images = 0 : $scope.witnessData.images = $scope.witnessData.images;

                        if ($scope.witnessData.sex_usr == 0)
                            $scope.witnessData.sex_usr = "<b>Not Entered</b>";
                        if ($scope.witnessData.sex_usr == 1)
                            $scope.witnessData.sex_usr = "Male";
                        if ($scope.witnessData.sex_usr == 2)
                            $scope.witnessData.sex_usr = "Female";
                        if ($scope.witnessData.sex_usr == 3)
                            $scope.witnessData.sex_usr = "Transgender";


                        if ($scope.witnessData.country_usr !== null) {
                            var scope = angular.element($('#218')).scope();
                            if (scope.Countries)
                                scope.Countries.forEach(function (obj) {
                                    if (obj.id_cnt == $scope.witnessData.country_usr)
                                        $scope.witnessData.country_usr = obj.id_cnt;
                                });
                        }


                        if ($scope.witnessData.town_usr !== null) {
                            var scope = angular.element($('#218')).scope();
                            if (scope.city)
                                scope.city.forEach(function (obj) {
                                    if (obj.id_cit == $scope.witnessData.town_usr)
                                        $scope.witnessData.town_usr = obj.name_cit;
                                });
                        }

                        var scope = angular.element($('#218')).scope();
                        //var arr = scope.selectedWitness;
                        if (scope.selectedWitness)
                            scope.selectedWitness.forEach(function (obj) {
                                if (obj.id_usr == $scope.witness_id) {
                                    var index = scope.selectedWitness.indexOf(obj);
                                    scope.selectedWitness.splice(index, 1, $scope.witnessData);
                                }
                            });
                        if ($scope.witnessData.firstname_usr == "Not Entered") {
                            $scope.witnessData.firstname_usr = "";
                        }
                    });
                });
            }
        }
    };

    $scope.editBtnClicked = function () {
        $rootScope.witnessDetailShowStatus = false;
        $rootScope.witnessAddShowStatus = true;
        $rootScope.successShow = false;
        $scope.edit = true;
        var scope = angular.element('#217').scope();
        scope.witness_id = $scope.witnessData.id_usr;
        scope.witnessData = $scope.witnessData;
        scope.init();
    };
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

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.witnessDetailShowStatus) {
            window.scrollTo(0, 0);
            $rootScope.successShow = false;
            $rootScope.witnessListShowStatus = true;
            $rootScope.witnessDetailShowStatus = false;
            //var scope = angular.element('#220').scope();
            var scopelist = angular.element('#218').scope();
            if ($scope.witnessData) {

                var result = scopelist.selectedWitness.filter(
                        function (obj1) {
                            return (obj1.id_usr == $scope.witnessData.id_usr);
                        }
                );
                if (result.length <= 0)
                    scopelist.addWitness($scope.witnessData);
                // scope.witnessList = scopelist.selectedWitness;
                //   scope.catagory = $scope.catagory;
                globalService.setWitness({'witnesses': scopelist.selectedWitness, 'isWitnessInvolves': 'yes'});

                //console.log("Witness List : " + JSON.stringify(scope.witnessList));
            }
            return callback(true, 1);
        }
//        else
//         return callback(false, 0);
    };

    $scope.back = function (callback) {
        if ($rootScope.witnessDetailShowStatus) {
            window.scrollTo(0, 0);
            $rootScope.successShow = false;
            $rootScope.isBack = true;
            $rootScope.witnessListShowStatus = true;
            $rootScope.witnessDetailShowStatus = false;

            $scope.witnessData = {};
            var witnessListScope = angular.element('#218').scope();
            witnessListScope.init();
            return callback(false, 0);
        }
    };


    var getCommsDetails = function (rowId) {
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + rowId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function () {

        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + row_id;
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
        $scope.notes.id_jno_jnt = row_id;
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

    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            if (responseData)
                if (responseData.responseJSON) {
                    if (responseData.responseJSON.error != "Comms Config Not Generated") {
                        //  $rootScope.show = false;
                        $rootScope.alertMsg = responseData.responseJSON.error;
                    }
                }

            if (requestType == constanObject.CommsAndTaskWebRequestType.CommsDetails) {

                $scope.showComms = false;
                $scope.commsNote = responseData.responseJSON.error;
            }

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
                        getCommsDetails(row_id);
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
                    getCommsDetails(row_id);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                //console.log("Comms Details : " + JSON.stringify(responseData));
                $scope.$apply(function () {

                    $scope.commsNote = responseData.data.list_data;

                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    };

});
