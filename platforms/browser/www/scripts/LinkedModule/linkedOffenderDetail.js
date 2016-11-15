BandQModule.controller('linkedOffenderDetail', function ($scope, OffenderService, getAllFieldLabel) {
    $scope.offender = null;
    $scope.isLargImage = false;
    $scope.edit = null;
    $scope.images = [];
    $scope.data = {};
    $scope.offenderDetail = {};
    $scope.last_updated = null;
    $scope.offenderStatus = null;
    var eyecolor = [{id: 0, val: "Please Select"}, {id: 1, val: "Blue"}, {id: 2, val: "Brown"}, {id: 3, val: "Green"}, {id: 4, val: "Hazel"}];
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
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isCommAllowed = false;
    $scope.imageIndex = 0;
    $scope.isLargeImageView = false;
    $scope.showMapInOffender = false;
    $scope.init = function () {
        window.scrollTo(0, 0);
        $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1"; //http://api247.org/v1/getStaffImage/832/1
        setFirstTab();
        $scope.getOffenderDetail($scope.offenderId);
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
    $scope.getOffenderDetail = function (offender_id) {
        window.scrollTo(0, 0);
        row_id = offender_id;
        $scope.imageIndex = 0;

     

        OffenderService.getOffenderDetail(offender_id, function (status, offenderData, data) {
            $scope.images = data.linked_images;
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
            });
            $scope.data = data;
            dataBaseObj.getDatafromDataBase("SELECT * FROM " + ADVANCE_FILTER_DATA, function (result) {
                if (result[0]) {


                    var Jsondata = JSON.parse(result[0].json_data);
                    Jsondata.form_identity_usr.forEach(function (obj) {
                        data.form_identity.forEach(function (formData) {
                            if (formData.form_identity_usr == obj.keys) {
                                formData.idDis = obj.val;
                            }
                        });
                    });

                    $scope.$apply(function () {
                        $scope.offenderDetail = data;
                        $scope.incidents = $scope.offenderDetail.incident;
                        $scope.offender = offenderData;

                        $scope.offenderLastUpdate = $scope.offender.last_updated;

                        if (moment($scope.offender.dob_usr, 'YYYY/MM/DD').format('DD/MM/YYYY') != "Invalid date") {
                            $scope.offender.dob_usr = moment($scope.offender.dob_usr, 'YYYY/MM/DD').format('DD/MM/YYYY');
                        } else {
                            $scope.offender.dob_usr = "<b>Not Entered</b>"
                        }



                        if ($scope.offender.eye_color_usr == "<b>Not Entered</b>" || $scope.offender.eye_color_usr == "0") {
                            $scope.offender.eye_color_title = "<b>Not Entered</b>";
                        } else {
                            eyecolor.forEach(function (obj) {
                                if (obj.id == $scope.offender.eye_color_usr)
                                    $scope.offender.eye_color_title = obj.val;

                            });
                        }

                        if ($scope.offender.lastname_usr == "" && $scope.offender.firstname_usr == "Unknown" && $scope.offender.middlename_usr == "Unknown") {
                            $scope.offender.lastname_usr = "";
                            $scope.offender.middlename_usr = "";

                        } else if ($scope.offender.lastname_usr == "" && $scope.offender.middlename_usr == "Unknown") {
                            $scope.offender.lastname_usr = "";
                            $scope.offender.middlename_usr = "";
                        } else if ($scope.offender.firstname_usr == "Unknown" && $scope.offender.middlename_usr == "Unknown") {
                            $scope.offender.firstname_usr = "";
                            $scope.offender.middlename_usr = "";
                        } else if ($scope.offender.firstname_usr == "Unknown" && $scope.offender.lastname_usr == "") {
                            $scope.offender.firstname_usr = "";
                            $scope.offender.lastname_usr = "";
                        } else if ($scope.offender.firstname_usr == "Unknown") {
                            $scope.offender.firstname_usr = "";
                        } else if ($scope.offender.lastname_usr == "") {
                            $scope.offender.lastname_usr = "";
                        } else if ($scope.offender.middlename_usr == "Unknown") {

                            $scope.offender.middlename_usr = ""
                        }
                        if ($scope.offender.lastname_usr == "" && $scope.offender.firstname_usr == "" && $scope.offender.middlename_usr == "") {
                            $scope.offender.lastname_usr = "";
                            $scope.offender.firstname_usr = "Unknown";
                        }
                        if ($scope.offender.offender_category == null) {
                            $scope.offenderStatus = "(Unknown Offender)";
                        } else {
                            $scope.offenderStatus = "(" + $scope.offender.offender_category + ")";
                        }




                    });
                }
            });

            $scope.$apply(function () {
                $scope.offender = offenderData;

                if ($scope.offender.lastname_usr == "Unknown" && $scope.offender.firstname_usr == "Unknown") {
                    $scope.offender.lastname_usr = "";
                } else if ($scope.offender.lastname_usr == "Unknown") {
                    $scope.offender.lastname_usr = "";
                } else if ($scope.offender.firstname_usr == "Unknown") {
                    $scope.offender.firstname_usr = "";
                }
            });

        });
    };

    $scope.init();

});

