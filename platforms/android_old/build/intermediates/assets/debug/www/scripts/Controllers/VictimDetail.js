BandQModule.controller('victimDetailCnt', function ($scope, VictimWitness, $rootScope, imageService, TaskAndCheckList) {
    $scope.victimData = {};
    $scope.victim_Id = null;
    $scope.catagory = null;
    $scope.edit = null;
    $scope.isLargImage = false;
    $scope.images = [];
    $scope.victimCategories = [];
    var noOfPageMove;
    $scope.taskAndCheckList1 = [];
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
    $scope.isUploadSuccess = false;
    $scope.incidents = [];
    $scope.imageIndex = 0;
    $scope.isLargeImageView = false;
    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
        window.scrollTo(0, 0);
        $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
        if ($rootScope.victimDetailShowStatus) {
            setFirstTab();
            row_id = $scope.victim_Id;
            //console.log("victim_Id : " + row_id);
            getCommsDetails(row_id);
            if ($scope.victim_Id) {
                if ($scope.edit == true) {
                    $rootScope.successShow = true;
                    $rootScope.successMessage = "Victim details updated successfully.";
                } else if ($scope.edit == false) {
                    $rootScope.successShow = true;
                    $rootScope.successMessage = "Victim added successfully.";
                }
                TaskAndCheckList.getTaskList("Victims & Witness", $scope.victim_Id, function (status, data) {
                    $scope.taskAndCheckList1 = data;
                    //console.log("");
                });
                VictimWitness.getVictimeDetaile($scope.victim_Id, function (status, data, victimDetails) {

                    //console.log("Victim Details : " + JSON.stringify(data.data));

                    
                    $scope.$apply(function () {
                        $scope.images = victimDetails.linked_images
                        $scope.victim = angular.copy(data.data);

                        if ($scope.edit == true) {
                            var scope = angular.element('#212').scope();
                            scope.victimeData.forEach(function (obj) {
                                if (obj.id_usr == $scope.victim_Id) {
                                    obj.email_usr = data.email_usr;
                                    obj.file_name = data.file_name;
                                    obj.firstname_usr = data.firstname_usr == "Not Entered" ? "" : data.firstname_usr;
                                    obj.images = data.images;
                                    obj.lastname_usr = data.lastname_usr;
                                    obj.last_updated = data.last_updated;
                                }
                            });
                        }
                        $scope.victimData = data.data[0];
                        $scope.incidents = victimDetails.incident;
                        $scope.victimCategories = $scope.victimData.categories;
                        //    $scope.victimData.last_updated = dateFormat($scope.victimData.last_updated);
                        if ($scope.victimData.add_comm == 1) {
                            $scope.isCommAllowed = true;
                        } else {
                            $scope.isCommAllowed = false;
                        }

                        for (var i in $scope.victimData) {
                            //console.log(i);
                            ($scope.victimData[i] == null || $scope.victimData[i] == "") ? $scope.victimData[i] = "<b>Not Entered</b>" : $scope.victimData[i] = $scope.victimData[i];
                        }
                        $scope.victimData.firstname_usr == "<b>Not Entered</b>" ? $scope.victimData.firstname_usr = "" : $scope.victimData.firstname_usr = $scope.victimData.firstname_usr;
                        $scope.victimData.lastname_usr == "<b>Not Entered</b>" ? $scope.victimData.lastname_usr = "" : $scope.victimData.lastname_usr = $scope.victimData.lastname_usr;
                        $scope.victimData.images == "<b>Not Entered</b>" ? $scope.victimData.images = 0 : $scope.victimData.images = $scope.victimData.images;
                        if ($scope.victimData.sex_usr == 0)
                            $scope.victimData.sex_usr = "<b>Not Entered</b>";
                        if ($scope.victimData.sex_usr == 1)
                            $scope.victimData.sex_usr = "Male";
                        if ($scope.victimData.sex_usr == 2)
                            $scope.victimData.sex_usr = "Female";
                        if ($scope.victimData.sex_usr == 3)
                            $scope.victimData.sex_usr = "Transgender";


//                        if($scope.victimData.country_usr!==null){
//                            var scope = angular.element($('#212')).scope();
//                            scope.country.forEach(function(obj){
//                                if(obj.id_cnt == $scope.victimData.country_usr)
//                                $scope.victimData.country_usr = obj.name_cnt;
//                            });
//                        }

//                        if($scope.victimData.county_usr!==null){
//                            var scope = angular.element($('#212')).scope();
//                            scope.county.forEach(function(obj){
//                                if(obj.id_sta == $scope.victimData.county_usr)
//                                $scope.victimData.county_usr = obj.name_sta;
//                                
//                            });
//                        }

//                        if($scope.victimData.town_usr!==null){
//                            var scope = angular.element($('#212')).scope();
//                            scope.city.forEach(function(obj){
//                                if(obj.id_cit == $scope.victimData.town_usr)
//                                $scope.victimData.town_usr = obj.name_cit;
//                            });
//                        }



//                        $scope.images = [];
//                        if ($scope.victimData.images > 0) {
//                            for (var i = 1; i <= $scope.victimData.images; i++) {
//                                $scope.images.push({id: i, url: constanObject.VICTIME_IMAGE + $scope.victimData.id_usr + "/" + i});
//                            }
//                        } else {
//                            $scope.images.push({id: i, url: "images/offenders-pic/pic08.jpg"});
//                        }
                        //console.log(JSON.stringify(data));
                        if ($scope.victimData.firstname_usr == "Not Entered") {
                            $scope.victimData.firstname_usr = "";
                        }
                    });
                });
            }
        }
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
    $scope.editBtnClicked = function () {
        $rootScope.successShow = false;
        $rootScope.victimDetailShowStatus = false;
        $rootScope.victimAddShowStatus = true;
        var scope = angular.element('#214').scope();
        scope.victim_id = $scope.victimData.id_usr;
        scope.victimData = $scope.victimData;

        scope.init();
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.victimDetailShowStatus) {
            window.scrollTo(0, 0);

            $scope.edit = null;
            $rootScope.successShow = false;
            $rootScope.victimListShowStatus = true;
            $rootScope.victimDetailShowStatus = false;
            var scope = angular.element('#213').scope();
            var scopelist = angular.element('#212').scope();
            scope.assignedCategory = [];
            setFirstTab();
            if ($scope.victimData) {
                var result = scopelist.selectedVictims.filter(
                        function (obj1) {
                            return (obj1.id_usr == $scope.victimData.id_usr);
                        }
                );
                if (result.length <= 0)
                    scopelist.addVictim($scope.victimData);
                scope.victims = scopelist.selectedVictims;
                //scope.assignedCategory = $scope.victimCategories;
                scope.catagory = $scope.catagory;
            }
            return callback(true, 1);
        }
    };

    $scope.back = function (callback) {
        if ($rootScope.victimDetailShowStatus) {
            window.scrollTo(0, 0);
            $scope.edit = null;
            $rootScope.successShow = false;
            setFirstTab();
//            var scopelist = angular.element('#212').scope();
//            scopelist.addAndRemoveOffenders($scope.victimData, false);
            $rootScope.victimListShowStatus = true;
            $rootScope.victimDetailShowStatus = false;
            $scope.victimData = {};
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
            if (responseData.responseJSON.error != "Comms Config Not Generated") {
                $rootScope.show = true;
                $rootScope.alertMsg = responseData.responseJSON.error;
            }
            else {
                $scope.commsNote = [];
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

    function setFirstTab() {
        $("#215").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#215").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#215").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
        $("#215").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
        $("#215").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
        $("#215").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
        $("#215").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
        $("#215").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#215").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
        } else {
            $("#215").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#215").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#215").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
        });
    }
    ;
});
