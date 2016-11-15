
BandQModule.controller("ViewVechileById", ['$scope', '$rootScope', 'globalService', 'imageService', 
    'TaskAndCheckList','linkedModule', function ($scope, $rootScope, globalService, imageService, 
    TaskAndCheckList,linkedModule) {
        var parent = $("#208").parents(".incident_report_wrapper");
        parent.removeClass("incident_report_wrapper");
        $rootScope.show = false;
        $scope.vechileData = [];
        $scope.backPage = null;
        $scope.imageIndex = 0;
        $scope.images = [];
        $scope.isLargeImageView = false;
        $scope.edit = null;
         $scope.add = null;
        $scope.vehicle_id = null;
        //var noOfPageMove;
        $scope.taskAndCheckList = [];

        $scope.data = {};
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
        var vehicle_id = 0;
        var isSelection = false;
        var moduleId = 265;
        $scope.commsNote = [];
        $scope.staffImage = "";
        $scope.showMapInVehicle = false;
        $scope.isCommAllowed = false;
        $scope.isUploadSuccess = false;
        $scope.images = [
            {"id": 1, "url": "images/car_slider.jpg"}
        ];

        $scope.incidents = [];
        $scope.imageIndex = 0;
        $scope.init = function () {
            // $rootScope.index = 2;
            setFirstTab();
            //  noOfPageMove = _noOfPageMove;
            window.plugins.spinnerDialog.hide();
            $rootScope.successShow = false;
            $scope.inputVal = $rootScope.inputVal_;
            if ($rootScope.vehicleDetailShowStatus == true)
                $scope.vechileDetail($rootScope.vehicleId);
            if ($rootScope.vehicleDetailShowStatus) {
                if ($scope.edit) {
                    $rootScope.successShow = true;
                    $rootScope.successMessage = "Vehicle details updated successfully.";
                } 
                else{
                     $rootScope.successShow = false;
                }
            }
            $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
        };
        $scope.vechileDetail = function (vechileId) {
                 linkedModule.setScope($scope);
            vehicle_id = vechileId;
            $rootScope.vehicleAddShowStatus = false;
            $rootScope.vehicleDetailShowStatus = true;
            $rootScope.vehicleListShowStatus = false;
            setFirstTab();
            TaskAndCheckList.getTaskList("Vehicle", vechileId, function (status, data) {
                 $scope.$apply(function () {
                    if (status) {
                        $scope.showChecklist = true;
                        $('#vehTasksTab1').removeClass("hideTab");
                    }
                    else {
                        $scope.showChecklist = false;
                        $('#vehTasksTab1').addClass("hideTab");
                    }
                    $scope.taskAndCheckList = data;
                });
               
                //console.log("");
            });
            window.scrollTo(0, 0);
            webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleDetailsById + vechileId,
                    $scope.VechileDetails, constanObject.WebRequestType.VechileDetailsById, true);
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

        var getCommsDetails = function (vechileId) {
            webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
                    null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
        };
        $scope.nextButtonClicked = function (callBack) {

            if ($rootScope.vehicleDetailShowStatus) {
                window.scrollTo(0, 0);
                $rootScope.successShow = false;
                $rootScope.show = false;
                var vechileListScope = angular.element($("#207")).scope();
                $rootScope.vehicleListShowStatus = false;
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = false;
                var data = $scope.vechileData;
                $scope.vechileData.make_vtk = data.make_vtk == "<b>Not Entered</b>" ? "" : data.make_vtk;
                $scope.vechileData.model_vtk = data.model_vtk == "<b>Not Entered</b>" ? "" : data.model_vtk;
                $scope.vechileData.taxed_vtk = data.taxed_vtk == "<b>Not Entered</b>" ? "" : data.taxed_vtk;
                $scope.vechileData.colour_vtk = data.colour_vtk == "<b>Not Entered</b>" ? "" : data.colour_vtk;
                $scope.vechileData.mot_details_vtk = data.mot_details_vtk == "<b>Not Entered</b>" ? "" : data.mot_details_vtk;
                $scope.vechileData.description_vtk = data.description_vtk == "<b>Not Entered</b>" ? "" : data.description_vtk;
                vechileListScope.addRemoveVechile($scope.vechileData, false);
                return callBack(true, 1);
            }


        };
        $scope.back = function (callBack) {
            if ($rootScope.vehicleDetailShowStatus) {
                window.scrollTo(0, 0);
                $rootScope.successShow = false;
                $rootScope.show = false;
                $scope.page = null;

                $rootScope.vehicleListShowStatus = true;
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = false;
                var scope = angular.element('#207').scope();

                if (scope.Vechiles.length > 0)
                    return callBack(false);
                else {
                    scope.inputVal = "";
                    scope.getVechiles();
                    return callBack(false);
                }

                $scope.vechileData = null;
            }


        };
        $scope.saveButtonAction = function () {

        };

        $scope.getImageSrc = function (data) {
            var img = [];
            var imgCount = 0;
            try {
                imgCount = data.images;
            } catch (e) {
            }
            if (imgCount > 0) {
                for (var i = 0; i < imgCount; i++) {

                    img.push({url: constanObject.getVechileImages + data.id_vtk + "/" + (i + 1), id: (i + 1)});

                }
            } else {
                img.push({url: "images/car_img.jpg", id: 1});

            }
            return img;
        };



        $scope.addnote = {};
        $scope.showAddNotePopup = function () {
            $scope.ListStaff = new Array();
            $scope.addnote.selectedMethod = new Array();
            $scope.addnote.selectedStaff = new Array();
            $scope.notes.note_type_jnt = 0;
            var url = constanObject.CommsConfig + moduleId + "/" + vehicle_id;
            webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
            webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);
        };

        $scope.hideAddNotePopup = function () {
            $scope.isNotePopUp = false;
        };

        $scope.methodChange = function (method) {
            $scope.notes = {};
            $scope.isNoteDesc = method.detail == 1 ? true : false;
            $scope.isDeadLine = method.deadline == 1 ? true : false;
            $scope.isRemind = method.remind_me == 1 ? true : false;
            $scope.isWith = method.opt_with == 1 ? true : false;
            $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
            $scope.isDuration = method.duration == 1 ? true : false;
            $scope.notes.note_type_jnt = method.id_comms;
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
            $scope.notes.id_jno_jnt = vehicle_id;
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



        var linkedLocationData;
        function handleLinkedNavigation(data) {
            if (!data.length > 0)
            {
                document.getElementById("linkedMapVehicleDetail").style.display = "none";
                return;
            }
            linkedLocationData = data;//,
            document.getElementById("linkedMapVehicleDetail").style.display = "block";
            var mapDiv = document.getElementById("linkedMapVehicleDetail");
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
            setTimeout(function () {
                $scope.$apply(function () {
                    handleLinkedNavigation(linkedLocationData);
                });
            }, 1000);
        }



        $scope.webRequestResponse = function (requestType, status, responseData) {
             $rootScope.successShow = false;
            if (status == constanObject.ERROR) {
                if (responseData.responseJSON.error != "Comms Config Not Generated") {
                  //  $rootScope.show = false;

                    $rootScope.alertMsg = responseData.responseJSON.error;
                } else {
                    $scope.commsNote = [];
                }
                return;
            }

            switch (requestType) {
                case constanObject.WebRequestType.VechileDetailsById:
                    var vehicleListScope = angular.element("#207").scope();
//                     //alert("UPDATE : "+$rootScope.isEditVechile);
                    var data = angular.copy(responseData.data);
                    $scope.images = data.linked_images;
                    data.linked_offender.forEach(function (obj) {
                        obj.image = constanObject.offenderImageBaseUrl + obj.id + "/" + 1;
                        var name = "";
                        if (obj.firstname_usr != null || obj.firstname_usr != "")
                            name = obj.firstname_usr;
                        if (obj.lastname_usr != null || obj.lastname_usr != "")
                            name = name + " " + obj.lastname_usr;
                        if (name.length <= 0)
                            name = "";
                        obj.fullName = name;
                    });
                    $scope.data = data;
                    if ($rootScope.isEditVechile) {
                        globalService.getVehicle().forEach(function (obj) {
                            if (obj.id_vtk === vehicle_id) {
                                var index = globalService.getVehicle().indexOf(obj);
                                globalService.getVehicle().splice(index, 1, new vechileDetailData1(responseData.data.vehicle_detail[0]));
                                //globalService.removeVehicle(obj);

                                isSelection = true;
                            }
                        });
                        vehicleListScope.Vechiles.forEach(function (obj) {
                            if (obj.id_vtk === vehicle_id) {
                                var index = vehicleListScope.Vechiles.indexOf(obj);
                                vehicleListScope.Vechiles.splice(index, 1, new vechileDetailData1(responseData.data.vehicle_detail[0]));

                            }
                        });
                        //vehicleListScope.Vechiles.push();
                    }
                    if($rootScope.isAddVechile){
                  
                    $rootScope.successShow = true;
                    $rootScope.successMessage = "Vehicle added successfully.";
                 }
                
                    $scope.$apply(function () {
                        $scope.incidents = [];
                        $scope.vechileData = new vechileDetailData(responseData.data.vehicle_detail[0]);
//                        $scope.images = $scope.getImageSrc(responseData.data.vehicle_detail[0]);
                        $scope.incidents = responseData.data.incident;
                        if (responseData.data.vehicle_detail[0].add_comm == 1) {
                            $scope.isCommAllowed = true;
                            $('#vehCommsTab1').removeClass("hideTab");
                            getCommsDetails(vehicle_id);
                        } else {
                            $('#vehCommsTab1').addClass("hideTab");
                            $scope.isCommAllowed = false;
                        }
                        //   vehicleListScope.selectItem(responseData.data[0]);

                        document.getElementById("linkedMapVehicleDetail").style.display = "none";
                        if (data.linked_locations.length > 0) {
                            $scope.showMapInVehicle = true;
                             $('#vehLocationTab1').removeClass("hideTab");
                            handleLinkedNavigation(data.linked_locations);
                        }
                        else {
                             $('#vehLocationTab1').addClass("hideTab");
                            $scope.showMapInVehicle = false;
                        }
                    });


                    if (isSelection) {
                        vehicleListScope.selectItem(new vechileDetailData1(responseData.data.vehicle_detail[0]));
                        isSelection = false;
                    }
                         if ($scope.data) {
                            if ($scope.data.linked_offender.length > 0 || $scope.data.incident.length > 0 || $scope.data.linked_locations.length > 0) {
                                $scope.showVehLinkedDetailsTab1 = true;
                                if ($scope.data.linked_offender.length > 0)
                                    $('#vehLinkedOffenderTab1').removeClass("hideTab");
                                else
                                    $('#vehLinkedOffenderTab1').addClass("hideTab");
                                if ($scope.data.incident.length > 0)
                                    $('#vehIncidentTab1').removeClass("hideTab");
                                else
                                    $('#vehIncidentTab1').addClass("hideTab");

                            } else {
                                $scope.showVehLinkedDetailsTab1 = false;
                            }

                        }

                    break;
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
                            getCommsDetails(vehicle_id);
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
                        getCommsDetails(vehicle_id);
                    });

                    break;
                case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                 
                    $scope.commsNote = responseData.data.list_data;

                    break;
            }
        };
        $scope.editVechile = function (vechileId) {
            $rootScope.isAddVechile = false;
            $rootScope.isEditVechile = true;
            $rootScope.show = false;
            var addEditVehicleScope = angular.element("#206").scope();
            addEditVehicleScope.setDataForEditing($scope.vechileData, $scope.images);
        };
        function setFirstTab() {
            $("#208").find(".parentHorizontalTab ul.hor_1 li:first-child").addClass("resp-tab-active");
            $("#208").find(".parentHorizontalTab ul.hor_1 li:first-child").siblings().removeClass("resp-tab-active");
            $("#208").find(".parentHorizontalTab div.tab_container h2:first-child").addClass("resp-tab-active");
            $("#208").find(".parentHorizontalTab div.tab_container h2:first-child").siblings().removeClass("resp-tab-active");
            $("#208").find(".parentHorizontalTab div.tab_container div.tab_content").first().addClass("resp-tab-content-active");
            $("#208").find(".parentHorizontalTab div.tab_container div.tab_content").first().css("display", "block");
            $("#208").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().css("display", "none");
            $("#208").find(".parentHorizontalTab div.tab_container div.tab_content").first().siblings().removeClass("resp-tab-content-active");
            if ($(window).width() < 768) {
                $("#208").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
            } else {
                $("#208").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
            }
            $(window).resize(function () {
                if ($(window).width() < 768) {
                    $("#208").find(".parentHorizontalTab div.tab_container h2").css("display", "block");
                } else {
                    $("#208").find(".parentHorizontalTab div.tab_container h2").css("display", "none");
                }
            });
        }
        ;
$scope.$on('myTabSelectEvent', function (event, data) {
            if (data.pane.title == "Locations") {
                $scope.resizeMap();
            }
        });

        function vechileDetailData(data) {

            this.id_vtk = data.id_vtk;
            this.has_task = data.has_task;
            this.licence_plate_type = data.licence_plate_type;
            this.licence_plate_vtk = data.licence_plate_vtk;
            this.possible_false_plate = data.possible_false_plate;
            this.link_to_existing_incident = data.link_to_existing_incident;
            this.site_no = data.site_no;
            this.location = data.location;
            this.location_sel = data.location_sel;
            this.longitude = data.longitude;
            this.latitude = data.latitude;
            this.site_code = data.site_code;
            if (data.make_vtk == null || data.make_vtk == "") {

                this.make_vtk = "<b>Not Entered</b>";
            } else {
                this.make_vtk = data.make_vtk;
            }
            if (data.model_vtk == null || data.model_vtk == "") {

                this.model_vtk = "<b>Not Entered</b>";
            } else {
                this.model_vtk = data.model_vtk;
            }
            if (data.taxed_vtk == 0) {

                this.taxed_vtk = "<b>Not Entered</b>";
            } else {
                this.taxed_vtk = data.taxed_vtk;
            }

            this.six_month_rate_vtk = data.six_month_rate_vtk;
            this.twelve_month_rate_vtk = data.twelve_month_rate_vtk;
            this.date_of_first_registration_vtk = data.date_of_first_registration_vtk;
            this.cylinder_capacity_vtk = data.cylinder_capacity_vtk;
            this.co2_emissions_vtk = data.co2_emissions_vtk;
            this.fuel_type_vtk = data.fuel_type_vtk;

            if (data.colour_vtk == null || data.colour_vtk == "") {

                this.colour_vtk = "<b>Not Entered</b>";
            } else {
                this.colour_vtk = data.colour_vtk;
            }
            this.type_approval_vtk = data.type_approval_vtk;
            this.wheel_plan_vtk = data.wheel_plan_vtk;
            this.revenue_weight_vtk = data.revenue_weight_vtk;
            if (data.tax_details_vtk == 0) {

                this.tax_details_vtk = "<b>Not Entered</b>";
            } else {
                this.tax_details_vtk = data.tax_details_vtk;
            }
            if (data.mot_details_vtk == null) {

                this.mot_details_vtk = "<b>Not Entered</b>";
            } else {
                this.mot_details_vtk = data.mot_details_vtk;
            }
            if (data.description_vtk == null) {

                this.description_vtk = "<b>Not Entered</b>";
            } else {
                this.description_vtk = data.description_vtk;
            }

            this.updated_time = data.updated_time;
            this.images = data.images;


        }
        ;
    }]);



function vechileDetailData1(data) {

    this.id_vtk = data.id_vtk;
    this.has_task = data.has_task;
    this.licence_plate_type = data.licence_plate_type;
    this.licence_plate_vtk = data.licence_plate_vtk;
    this.possible_false_plate = data.possible_false_plate;
    this.link_to_existing_incident = data.link_to_existing_incident;
    this.site_no = data.site_no;
    this.location = data.location;
    this.location_sel = data.location_sel;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
    this.site_code = data.site_code;

    this.make_vtk = data.make_vtk;
    this.model_vtk = data.model_vtk;
    this.taxed_vtk = data.taxed_vtk;

    this.year_of_manufacture_vtk = data.year_of_manufacture_vtk;
    this.colour_vtk = data.colour_vtk;
    this.tax_details_vtk = data.tax_details_vtk;
    this.mot_details_vtk = data.mot_details_vtk;
    this.mot_vtk = data.mot_vtk;
    this.description_vtk = data.description_vtk;

    this.six_month_rate_vtk = data.six_month_rate_vtk;
    this.twelve_month_rate_vtk = data.twelve_month_rate_vtk;
    this.date_of_first_registration_vtk = data.date_of_first_registration_vtk;

    this.cylinder_capacity_vtk = data.cylinder_capacity_vtk;
    this.co2_emissions_vtk = data.co2_emissions_vtk;
    this.fuel_type_vtk = data.fuel_type_vtk;
    this.tax_status_vtk = data.tax_status_vtk;
    this.type_approval_vtk = data.type_approval_vtk;
    this.wheel_plan_vtk = data.wheel_plan_vtk;
    this.revenue_weight_vtk = data.revenue_weight_vtk;

    this.updated_time = data.updated_time;
    this.images = data.images;


}
//
//function dateFormat(date) {
//    return moment(date).format('Do MMM YYYY');
//}
