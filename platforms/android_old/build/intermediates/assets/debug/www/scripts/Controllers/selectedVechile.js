BandQModule.controller('SelectedVechiles',['$scope',  '$rootScope', 'globalService','checkInternetConnectionService',function($scope,$rootScope,globalService,checkInternetConnectionService) {
    $scope.Vechiles = [];
    $scope.vechilId = "";
    $scope.isImageOption = false;
    $scope.isCameraOption = false;
    $scope.tempVehicle=null
    var noOfPageMove;
    $scope.closeVechileItem = function(obj) {
        $scope.tempVehicle = obj;
       $scope.isRemoveVehicleModal = true;
       $scope.vehicleAddRemoveMsg = "Are you sure you want to remove this vehicle?";
    };
    
    $scope.removeVehicle = function () {
         $scope.isRemoveVehicleModal = false;
       // var vechileListScope = angular.element($("#207")).scope();
      var obj =  $scope.tempVehicle;
        for (var i = 0; i < $scope.Vechiles.length; i++) {
            if ($scope.Vechiles[i].id_vtk == obj.id_vtk)
            {
                angular.element($("#207")).scope().removeItem(obj);
                globalService.removeVehicleIndex(i);
            }


        }
    };
    $scope.hidePopUp = function(){
        $scope.isRemoveVehicleModal = false;
    };
    $scope.init = function (_noOfPageMove) {
       
        noOfPageMove=_noOfPageMove;
        $scope.Vechiles= globalService.getVehicle();
         //console.log("Selected Vehicles : "+JSON.stringify($scope.Vechiles));
//        $scope.Vechiles.make_vtk = data.make_vtk == "<b>Not Entered</b>" ? "" : data.make_vtk;
//        $scope.Vechiles.model_vtk = data.model_vtk == "<b>Not Entered</b>" ? "" : data.model_vtk;
//        $scope.Vechiles.taxed_vtk = data.taxed_vtk == "<b>Not Entered</b>" ? "" : data.taxed_vtk;
//        $scope.Vechiles.year_of_manufacture_vtk = data.year_of_manufacture_vtk == "<b>Not Entered</b>" ? "" : data.year_of_manufacture_vtk;
//        $scope.Vechiles.colour_vtk = data.colour_vtk == "<b>Not Entered</b>" ? "" : data.colour_vtk;
//        $scope.Vechiles.tax_details_vtk = data.tax_details_vtk == "<b>Not Entered</b>" ? "" : data.tax_details_vtk;
//        $scope.Vechiles.mot_details_vtk = data.mot_details_vtk == "<b>Not Entered</b>" ? "" : data.mot_details_vtk;
//        $scope.Vechiles.mot_vtk = data.mot_vtk == "<b>Not Entered</b>" ? "" : data.mot_vtk;
//        $scope.Vechiles.description_vtk = data.description_vtk == "<b>Not Entered</b>" ? "" : data.description_vtk;
//        
        //console.log("Selected Vechiles : "+JSON.stringify($scope.Vechiles));
    };
    
    
     $scope.previousPageRequest = function () {
        if ($scope.page == 1)
            $scope.page = 1;
        else
            $scope.page--;

    };
    $scope.nextPageRequest = function () {
        return false;
    };

    $scope.nextButtonClicked = function (callback) {
        //$rootScope.index = 1;
//        if (!checkInternetConnectionService.checkNetworkConnection()) {
//            
//        }
        
        globalService.setVehicleData({isVehicleInvolved: "Yes", vehicles: $scope.Vechiles});
         //console.log("Selected Vechiles : "+JSON.stringify($scope.Vechiles));
        return callBack(true, 1);
    };
    $scope.back = function (callBack) {

        if (!checkInternetConnectionService.checkNetworkConnection()) {
               // $scope.$apply(function () {
                    $rootScope.vehicleListShowStatus = false;
                    $rootScope.vehicleAddShowStatus = false;
                    $rootScope.vehicleDetailShowStatus = false;
                //});
            return callBack(true, 2);
        }
        else{
            //$scope.$apply(function(){
                $rootScope.vehicleListShowStatus = true;
                $rootScope.vehicleAddShowStatus = false;
                $rootScope.vehicleDetailShowStatus = false;
            //});
            
            return callBack(true, 1);
        }
       

    }
    $scope.saveButtonAction = function() {
        //alert("saveButtonAction");
        
    }
    
    
    $scope.getImage = function (vechileId) {
        $scope.vechilId = vechileId;
        $scope.isCameraOption = true;
    };
    
   $scope.openCamera = function(){
         navigator.camera.getPicture(uploadPhoto, function (message) {
            //console.log('get picture failed');
        }, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            allowEdit: true,
        });
       $scope.isCameraOption = false;
    };
    
    $scope.openGallery = function() {
        navigator.camera.getPicture(uploadPhoto, function (message) {
            //console.log('get picture failed');
        }, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }); 
        $scope.isCameraOption = false;
    };
    $scope.closeCameraOption = function() {
        $scope.isCameraOption = false;
    };
    function uploadPhoto(imageURI) {
        imagePath = imageURI;
        
        webRequestObject.fileUpload($scope,imagePath,constanObject.UploadVechileFile+$scope.vechilId,constanObject.VEHICLE_IMAGE_KEY,constanObject.WebRequestType.FILE_UPLOAD,true);
    }
    
    $scope.webRequestResponse = function (requestType, status, responseData) {
       
         switch(requestType){
              case constanObject.WebRequestType.FILE_UPLOAD : 
                 //console.log(responseData.response);
                 break;
         }
     }
}]);