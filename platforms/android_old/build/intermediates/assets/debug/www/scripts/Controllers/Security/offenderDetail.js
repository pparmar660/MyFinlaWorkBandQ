BandQModule.controller('offenderDetailCtrl', function ($scope, OffenderService, $rootScope, imageService, TaskAndCheckList, checkInternetConnectionService, getAllFieldLabel) {
    $scope.offender = null;
    $scope.isLargImage = false;
    $scope.edit = null;
    $scope.images = [];
    $scope.offenderDetail = {};
    $scope.last_updated = null;
    $scope.characteristic = true;
    $scope.personalDetail = false;
    $scope.contactDetail = false;
    $scope.imageMedia = false;
    $scope.data = {};
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
    var successMsg = "";
    $scope.isSuccess = false;
    var offenderID = 0;
    var isSelection = false;
    var moduleId = 258;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isCommAllowed = false;
    $scope.isUploadSuccess = false;
    $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
    $scope.incidents = [];
    var latlngset;
    $scope.linkedLocation = [];
    var eyecolor = [{id: 0, val: "Please Select"}, {id: 1, val: "Blue"}, {id: 2, val: "Brown"}, {id: 3, val: "Green"}, {id: 4, val: "Hazel"}];
    $scope.link = {};
    $scope.isNextRecord = false;
    $scope.isBackRecord = false;
    $scope.imageIndex = 0;
    $scope.isLargeImageView = false;
    $scope.showMap = false;
    $scope.init = function () {
        window.scrollTo(0, 0);
        setFormFieldLableData();
        if (localStorage.getItem("pushItemId")) {
            $scope.getOffenderDetail(localStorage.getItem("pushItemId"));
            localStorage.setItem("pushItemId", '');
            localStorage.setItem("moduleId", '')
        }

        $('#offLoctionMap').on('shown', function (e) {
            initialize();
        });
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
    $scope.getOffenderDetail = function (offender_id) {
        window.scrollTo(0, 0);
        offenderID = offender_id;
        $scope.imageIndex = 0;
        setDetailTab();
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Offenders & OCGs';
        $rootScope.subMenuTitle1 = 'Offender Details';
        $rootScope.dashboardLink = '#/dashboard';
        TaskAndCheckList.getTaskList("Offender", offender_id, function (status, data) {
            if (status)
                $scope.showchecklist = true;
            else
                $scope.showchecklist = false;
            $scope.$apply(function () {
                $scope.taskAndCheckList = data;
            });

            //console.log("");
        });
        OffenderService.getOffenderDetail(offender_id, function (status, offenderData, data) {
            //console.log("Offender Details : "+JSON.stringify(data));
            $scope.images = data.linked_images;
            $scope.link = data.link;
            $scope.isBackRecord = $scope.link.previous > 0 ? true : false;
            $scope.isNextRecord = $scope.link.next > 0 ? true : false;
            data.linked_offender.forEach(function (obj) {
                obj.image = constanObject.offenderImageBaseUrl + obj.id + "/" + 1;
                var name = "";
                if (obj.firstname_usr != null || obj.firstname_usr != "")
                    name = obj.firstname_usr;
                if (obj.middlename_usr != null || obj.middlename_usr != "")
                    name = name + " " + obj.middlename_usr;
                if (obj.lastname_usr != null || obj.lastname_usr != "")
                    name = name + " " + obj.lastname_usr;
                if (name.length <= 0)
                    name = "";
                obj.fullName = name;
            });
            data.vehicle.forEach(function (obj) {
                obj.model_vtk == null ? obj.model_vtk = "" : obj.model_vtk = obj.model_vtk;
                obj.make_vtk == null ? obj.make_vtk = "" : obj.make_vtk = obj.make_vtk;
                var colorName = "";
                try {
                    colorName = obj.colour ? obj.colour : "";
                } catch (e) {
                    colorName = "";
                }
                if (obj.make_vtk.length > 0) {
                    if (colorName.length > 0)
                        colorName = colorName + ", " + obj.make_vtk;
                    else
                        colorName = obj.make_vtk;
                }
                if (obj.model_vtk.length > 0) {

                    if (colorName.length > 0)
                        colorName = colorName + ", " + obj.model_vtk;
                    else
                        colorName = obj.model_vtk;
                }
                if (colorName.length <= 0)
                    colorName = "";
                obj.name = colorName;
//                obj.model_vtk==null?obj.model_vtk="":obj.model_vtk=obj.model_vtk;
            });
            $scope.data = data;
            $scope.incidents = data.incident;
            $scope.linkedLocation = data.linked_locations;
            document.getElementById("linkedMapOffenderOutSideDetail").style.display = "none";
            if (data.linked_locations.length > 0) {
                $scope.showMap = true;
                handleLinkedNavigation(data.linked_locations);

            } else {
                $scope.showMap = false;
            }
            dataBaseObj.getDatafromDataBase("SELECT * FROM " + ADVANCE_FILTER_DATA, function (result) {

                if (result[0]) {
                    var Jsondata = JSON.parse(result[0].json_data);
                    getCommsDetails(offender_id);
                    Jsondata.form_identity_usr.forEach(function (obj) {

                        data.form_identity.forEach(function (formData) {
                            if (formData.form_identity_usr == obj.keys) {
                                formData.idDis = obj.val;
                            }
                        });
                    });

                    $scope.$apply(function () {
                        $scope.offenderDetail = data;

                    });
                }
            });

            if ($scope.edit == true) {
                var scope = angular.element('#listOffender_202').scope();
                scope.offendersVal.forEach(function (obj) {
                    if (obj.id_usr == offender_id) {
                        obj.email_usr = offenderData.email_usr;
                        obj.last_updated = offenderData.last_updated;

                        obj.file_name = offenderData.file_name;
                        obj.firstname_usr = offenderData.firstname_usr == "Not Entered" ? "" : offenderData.firstname_usr;
                        obj.images = offenderData.images;
                        obj.middlename_usr = offenderData.middlename_usr == "Not Entered" ? "" : offenderData.middlename_usr;
                        obj.lastname_usr = offenderData.lastname_usr;

                    }
                });
            }


            if ($scope.edit == true) {
                $rootScope.successShow = true;
                $rootScope.successMessage = "Offender details updated successfully.";
            } else if ($scope.edit == false) {
                $rootScope.successShow = true;
                $rootScope.successMessage = "Offender added successfully.";
            }
            $scope.$apply(function () {
                $scope.offender = offenderData;
                if (offenderData.add_comm == 1) {
                    $scope.isCommAllowed = true;
                } else {
                    $scope.isCommAllowed = false;
                }

                //  //console.log("offenderDetail" +JSON.stringify($scope.offender.last_updated));
                $scope.offenderLastUpdate = $scope.offender.last_updated;
                $scope.last_updated = $scope.offender.last_updated;

                if (moment($scope.offender.dob_usr, 'YYYY/MM/DD').format('DD/MM/YYYY') != "Invalid date") {
                    $scope.offender.dob_usr = moment($scope.offender.dob_usr, 'YYYY/MM/DD').format('DD/MM/YYYY');
                } else {
                    $scope.offender.dob_usr = "<b>Not Entered</b>"
                }


                //$scope.images = [];
                if ($scope.offender.eye_color_usr == "<b>Not Entered</b>" || $scope.offender.eye_color_usr == "0") {
                    $scope.offender.eye_color_title = "<b>Not Entered</b>";
                } else {
                    eyecolor.forEach(function (obj) {
                        if (obj.id == $scope.offender.eye_color_usr)
                            $scope.offender.eye_color_title = obj.val;

                    });
                }
//                if ($scope.offender.images > 0) {
//                    $scope.baseUrl = constanObject.offenderImageBaseUrl + $scope.offender.id_usr + "/";
//                    for (var i = 1; i <= $scope.offender.images; i++)
//                    {//, img: constanObject.offenderImageBaseUrl + $scope.offender.id_usr + "/" + i
//                        //setTimeout(function () {
//                        $scope.images.push({id: i});
//                        //}, 100);
//                    }
//                } else {
//                    $scope.images.push({id: 0, img: "images/offenders-pic/pic08.jpg"});
//                }
                if ($scope.offender.lastname_usr == "Unknown" && $scope.offender.firstname_usr == "Unknown" && $scope.offender.middlename_usr == "Unknown") {
                    $scope.offender.lastname_usr = "";
                    $scope.offender.middlename_usr = "";
                } else if ($scope.offender.lastname_usr == "Unknown" && $scope.offender.middlename_usr == "Unknown") {
                    $scope.offender.lastname_usr = "";
                    $scope.offender.middlename_usr = ""
                } else if ($scope.offender.firstname_usr == "Unknown" && $scope.offender.middlename_usr == "Unknown") {
                    $scope.offender.firstname_usr = "";
                    $scope.offender.middlename_usr = ""
                } else if ($scope.offender.firstname_usr == "Unknown" && $scope.offender.lastname_usr == "Unknown") {
                    $scope.offender.firstname_usr = "";
                    $scope.offender.lastname_usr = ""
                } else if ($scope.offender.firstname_usr == "Unknown") {
                    $scope.offender.firstname_usr = "";
                } else if ($scope.offender.lastname_usr == "Unknown") {
                    $scope.offender.lastname_usr = ""
                } else if ($scope.offender.middlename_usr == "Unknown") {
                    $scope.offender.middlename_usr = ""
                }

                if ($scope.offender.offender_category == null) {
                    $scope.offenderStatus = "(Unknown Offender)";
                } else {
                    $scope.offenderStatus = "(" + $scope.offender.offender_category + ")";
                }



//                $("#offendercharacteristic").addClass("resp-tab-active");
//                $("#offenderPersonalDetail").removeClass("resp-tab-active");
//                $("#offenderContactDetail").removeClass("resp-tab-active");
//                $("#offenderImage").removeClass("resp-tab-active");
            });

        });
        
    };


    var linkedLocationData;
    function handleLinkedNavigation(data) {
        if (!data)
            return;

        if (!data.length > 0)
        {
            document.getElementById("linkedMapOffenderOutSideDetail").style.display = "none";
            return;
        }
        linkedLocationData = data;//,
        document.getElementById("linkedMapOffenderOutSideDetail").style.display = "block";
        var mapDiv = document.getElementById("linkedMapOffenderOutSideDetail");
        var gMap = new google.maps.Map(mapDiv);
        var infowindow = new google.maps.InfoWindow();
        var markers = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].latitude && data[i].longitude) {
                var marker1 = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                    map: gMap

                });
                google.maps.event.addListener(marker1, 'click', (function (marker1, i) {
                    return function () {
                        infowindow.setContent(data[i].name);
                        infowindow.open(mapDiv, marker1);
                    }
                })(marker1, i));
                markers.push(marker1);
            }
        }

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        gMap.fitBounds(bounds);
        google.maps.event.trigger(gMap, 'resize');
        gMap.setZoom(5);
    }

    $scope.resizeMap = function () {

        handleLinkedNavigation(linkedLocationData);

    }

    function setMarkers(map, locations) {

        var marker, i;

        for (i = 0; i < locations.length; i++)
        {

            var lat = locations[i].latitude
            var long = locations[i].longitude

            latlngset = new google.maps.LatLng(lat, long);

            var marker = new google.maps.Marker({
                map: map, position: latlngset, title: 'My Location'
            });
            map.setCenter(marker.getPosition())

        }
    }
    ;



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
    $scope.nextPrevDetail = function (id) {
       
        $scope.imageIndex = 0;
        $scope.getOffenderDetail(id);
        setDetailTab();
       
    };

    $scope.openImageInFullScreen = function () {
        $scope.isLargImage = true;
    };
    $scope.closeImage = function () {
        $scope.isLargImage = false;
    };

    var getCommsDetails = function (offenderId) {
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + offenderId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function () {
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + offenderID;
        //function(classObject,type,webUrl,parameters,requestType,showProgress)
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

        //$scope.isNotePopUp = true;
    };

    $scope.hideAddNotePopup = function () {
        $scope.isNotePopUp = false;
    };
    $scope.$on('checkInternetConnection', function (event, arg) {
        $scope.$apply(function () {
            if (!arg.network)
                $scope.noInternetConnectionOnView = true;
            else {
                $scope.noInternetConnectionOnView = false;

            }
        });
    });


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
        $scope.notes.id_jno_jnt = offenderID;
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

    $scope.editOffender = function () {
        var scope = angular.element($('#addOffender_204')).scope();
        scope.isEditOffender = true;
        $rootScope.moveToSecurityDashboard = false;
        $rootScope.offenderAddShowStatus = true;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderListShowStatus = false;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Offenders & OCGs';
        $rootScope.subMenuTitle1 = 'Offender Edit';
        $rootScope.dashboardLink = '#/dashboard';
        $rootScope.successShow = false;
        scope.offData = $scope.offenderDetail;
        scope.updateOffender = $scope.offender;
        scope.refrenceIds = $scope.offenderDetail.form_identity;
        scope.init();
        scope.getOffenderData($scope.offender.id_usr);

        if ($scope.offender.lastname_usr == "Unknown") {
            $scope.offender.lastname_usr = "";

        }
        if ($scope.offender.middlename_usr == "Unknown") {
            $scope.offender.middlename_usr = "";
        }
        if ($scope.offender.firstname_usr == "Unknown") {
            $scope.offender.firstname_usr = "";
        }

    };



    $scope.backToOffenderList = function (item) {
        if (item == 'viewOffender') {
            $rootScope.offenderListShowStatus = true;
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderAddShowStatus = false;
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';

        }
        setDetailTab();
        window.scrollTo(0, 0);
    };

    function setDetailTab() {
        $("#offenderDetail_203").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
        $("#offenderDetail_203").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
        $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents h2:first-child").addClass("resp-tab-active");
        $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents h2:first-child").siblings().removeClass("resp-tab-active");
        $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents div.tabing-content").first().addClass("resp-tab-content-active");
        $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents div.tabing-content").first().css("display", "block");
        $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents div.tabing-content").first().siblings().css("display", "none");
        $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents div.tabing-content").first().siblings().removeClass("resp-tab-content-active");
        if ($(window).width() < 768) {
            $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents h2").css("display", "block");
        } else {
            $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents h2").css("display", "none");
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents h2").css("display", "block");
            } else {
                $("#offenderDetail_203").find(".parentHorizontalTab div.tabs_contents h2").css("display", "none");
            }
        });
    }
    ;

    //  $rootScope.showOffenderList();
    $scope.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.ERROR) {
            if (responseData.responseJSON) {
                if (responseData.responseJSON.error != "Comms Config Not Generated") {
                    $rootScope.show = true;
                    $rootScope.alertMsg = responseData.responseJSON.error;
                }
            }
        }

        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.CommsConfigType:
                if (status == constanObject.SUCCESS) {
                    $scope.$apply(function () {
                        $scope.commsTitle = responseData.data.comm_row_title;
                        $scope.comms = responseData.data.comms;
                        if ($scope.comms.length < 2)
                            $scope.isMethod = false;
                        else
                            $scope.isMethod = true;
                        $scope.isNotePopUp = true;
                    });
                    $scope.selectedMethod = responseData.data.comms[0];
                    $scope.methodChange($scope.selectedMethod);
                }
                break;
            case constanObject.CommsAndTaskWebRequestType.ListStaff:
                if (status == constanObject.SUCCESS) {
                    $scope.$apply(function () {
                        $scope.ListStaff = responseData.data;
                    });
                }
                break;
            case constanObject.CommsAndTaskWebRequestType.AddComms:
                if (status == constanObject.SUCCESS) {
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
                            getCommsDetails(offenderID);
                        });
                    }
                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                if (status == constanObject.SUCCESS) {
                    $scope.$apply(function () {
                        $scope.CommsImages = [];
                        $scope.isSuccess = true;
                        $scope.successMsg = successMsg;
                        $scope.isNotePopUp = false;
                        getCommsDetails(offenderID);
                    });
                }
                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                $scope.$apply(function () {
                    if (status == constanObject.ERROR) {
                        $scope.showComms = false;
                        $scope.commsNote = responseData.responseJSON.error;
                    }
                    else {
                        $scope.showComms = true;
                        $scope.commsNote = responseData.data.list_data;
                    }
                });

                break;
        }
    };

    var loadData = function () {

        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            $scope.init();
        } else
            setTimeout(function () {
                $scope.$apply(function () {
                    loadData();
                })

            }, 150);
    }



    loadData();
    checkInternetConnectionService.setValueOfNetWorkConnection();

});
