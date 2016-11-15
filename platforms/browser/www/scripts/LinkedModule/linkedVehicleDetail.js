
BandQModule.controller("linkedVehicleDetail", ['$scope', '$rootScope', 'globalService', 'getAllFieldLabel',
 function ($scope, $rootScope, globalService,getAllFieldLabel) {
        var parent = $("#208").parents(".incident_report_wrapper");
        parent.removeClass("incident_report_wrapper");
        $rootScope.show = false;
        $scope.vechileData = [];
        $scope.backPage = null;
        $scope.imageIndex = 0;
        $scope.images = [];
        $scope.isLargeImageView = false;
        $scope.edit = null;
        $scope.vehicle_id = null;
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
        $scope.isSuccess = false;
        var vehicle_id = 0;
        var isSelection = false;
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
          
            $scope.vechileDetail($scope.vehicleId);
            setFormFieldLableData();
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
        $scope.vechileDetail = function (vechileId) {
            vehicle_id = vechileId;
            $rootScope.vehicleAddShowStatus = false;
            $rootScope.vehicleDetailShowStatus = true;
            $rootScope.vehicleListShowStatus = false;
         

            window.scrollTo(0, 0);
            webRequestObject.postRequest($scope, "GET", constanObject.GetVehicleDetailsById + vechileId,
                    $scope.VechileDetails, constanObject.WebRequestType.VechileDetailsById, true);
        };


        $scope.webRequestResponse = function (requestType, status, responseData) {

            if (status == constanObject.ERROR) {
                if (responseData.responseJSON.error != "Comms Config Not Generated") {
                    $rootScope.show = true;

                    $rootScope.alertMsg = responseData.responseJSON.error;
                } else {
                    $scope.commsNote = [];
                }
                return;
            }

            switch (requestType) {
                case constanObject.WebRequestType.VechileDetailsById:
                    var vehicleListScope = angular.element("#207").scope();
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

                                isSelection = true;
                            }
                        });
                        vehicleListScope.Vechiles.forEach(function (obj) {
                            if (obj.id_vtk === vehicle_id) {
                                var index = vehicleListScope.Vechiles.indexOf(obj);
                                vehicleListScope.Vechiles.splice(index, 1, new vechileDetailData1(responseData.data.vehicle_detail[0]));

                            }
                        });

                    }
                    $scope.$apply(function () {
                        $scope.incidents = [];
                        $scope.vechileData = new vechileDetailData(responseData.data.vehicle_detail[0]);
                        $scope.incidents = responseData.data.incident;
                        if (responseData.data.vehicle_detail[0].add_comm == 1) {
                            $scope.isCommAllowed = true;
                            getCommsDetails(vehicle_id);
                        } else {
                            $scope.isCommAllowed = false;
                        }

                        document.getElementById("linkedMapVehicleDetail").style.display = "none";
                        if (data.linked_locations.length > 0) {
                            $scope.showMapInVehicle = true;
                            handleLinkedNavigation(data.linked_locations);
                        } else {
                            $scope.showMapInVehicle = false;
                        }
                    });


                    if (isSelection) {
                        vehicleListScope.selectItem(new vechileDetailData1(responseData.data.vehicle_detail[0]));
                        isSelection = false;
                    }

                    break;

            }
        };

   

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

        $scope.init();

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

