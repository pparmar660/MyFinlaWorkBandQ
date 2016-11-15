BandQModule.controller('linkedWitnessDetail', function ($scope, WitnessService,
        getAllFieldLabel) {
    $scope.witnessData = {};

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


        setFormFieldLableData();

        WitnessService.getWitnessDetaile($scope.witnessId, function (status, data, witnessDetails) {



            $scope.$apply(function () {
                $scope.images = witnessDetails.linked_images;
                $scope.witness = angular.copy(data.data);
                $scope.witnessData = data.data[0];
                $scope.incidents = witnessDetails.incident;

                $scope.witnessCategories = $scope.witnessData.categories;
                for (var i in $scope.witnessData) {
//                            //console.log(i);
                    ($scope.witnessData[i] == null || $scope.witnessData[i] == "") ? $scope.witnessData[i] = "<b>Not Entered</b>" : $scope.witnessData[i] = $scope.witnessData[i];
                }
                $scope.witnessData.firstname_usr == "<b>Not Entered</b>" ? $scope.witnessData.firstname_usr = "" : $scope.witnessData.firstname_usr = $scope.witnessData.firstname_usr;
                $scope.witnessData.lastname_usr == "<b>Not Entered</b>" ? $scope.witnessData.lastname_usr = "" : $scope.witnessData.lastname_usr = $scope.witnessData.lastname_usr;
                $scope.witnessData.images == "<b>Not Entered</b>" ? $scope.witnessData.images = 0 : $scope.witnessData.images = $scope.witnessData.images;
                $scope.witnessData.last_updated == "<b>Not Entered</b>" ? $scope.witnessData.last_updated = "Not Entered" : $scope.witnessData.last_updated = $scope.witnessData.last_updated;

                if ($scope.witnessData.sex_usr == 0)
                    $scope.witnessData.sex_usr = "<b>Not Entered</b>";
                if ($scope.witnessData.sex_usr == 1)
                    $scope.witnessData.sex_usr = "Male";
                if ($scope.witnessData.sex_usr == 2)
                    $scope.witnessData.sex_usr = "Female";
                if ($scope.witnessData.sex_usr == 3)
                    $scope.witnessData.sex_usr = "Transgender";


                if ($scope.witnessData.firstname_usr == "Not Entered") {
                    $scope.witnessData.firstname_usr = "";
                }
            });
        });
    }


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
                });


            }, 10);
        }

    }

    $scope.init();

});
