BandQModule.controller('linkedVictimDetail', function ($scope, VictimWitness, getAllFieldLabel) {
    $scope.victimData = {};
  
    $scope.edit = null;
    $scope.isLargImage = false;
    $scope.images = [];
    $scope.victimCategories = [];

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
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isUploadSuccess = false;
    $scope.incidents = [];
    $scope.imageIndex = 0;
    $scope.isLargeImageView = false;
    $scope.selectedCategory = [];
    $scope.init = function () {

        window.scrollTo(0, 0);

      
         setFormFieldLableData();


        VictimWitness.getVictimeDetaile($scope.victimId, function (status, data, victimDetails) {
            $scope.$apply(function () {
                $scope.images = victimDetails.linked_images;
                $scope.victim = angular.copy(data.data);
                $scope.victimData = data.data[0];
                $scope.incidents = victimDetails.incident;
                $scope.victimCategories = $scope.victimData.categories;
           
                for (var i in $scope.victimData) {
             
                    ($scope.victimData[i] == null || $scope.victimData[i] == "") ? $scope.victimData[i] = "<b>Not Entered</b>" : $scope.victimData[i] = $scope.victimData[i];
                }
                $scope.victimData.firstname_usr == "<b>Not Entered</b>" ? $scope.victimData.firstname_usr = "" : $scope.victimData.firstname_usr = $scope.victimData.firstname_usr;
                $scope.victimData.lastname_usr == "<b>Not Entered</b>" ? $scope.victimData.lastname_usr = "" : $scope.victimData.lastname_usr = $scope.victimData.lastname_usr;
                $scope.victimData.images == "<b>Not Entered</b>" ? $scope.victimData.images = 0 : $scope.victimData.images = $scope.victimData.images;
               $scope.victimData.last_updated == "<b>Not Entered</b>" ? $scope.victimData.last_updated = "Not Entered" : $scope.victimData.last_updated = $scope.victimData.last_updated;

                if ($scope.victimData.sex_usr == 0)
                    $scope.victimData.sex_usr = "<b>Not Entered</b>";
                if ($scope.victimData.sex_usr == 1)
                    $scope.victimData.sex_usr = "Male";
                if ($scope.victimData.sex_usr == 2)
                    $scope.victimData.sex_usr = "Female";
                if ($scope.victimData.sex_usr == 3)
                    $scope.victimData.sex_usr = "Transgender";
                if ($scope.victimData.firstname_usr == "Not Entered") {
                    $scope.victimData.firstname_usr = "";
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
