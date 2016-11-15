BandQModule.controller('editVenueController', function ($scope, $rootScope, checkInternetConnectionService, imageService) {
    $scope.formData = {};
    $scope.modelData = {};
    $scope.selectedSector = [];
    $scope.errorshow = false;
    $scope.isCameraOption = false;
    $scope.isFileUpload = false;
     $scope.closeNoInternetStrip = function () {
        $scope.isNoInterStrip = false;
    };
    $scope.show = false;
    $scope.btnActive = "";
    $scope.selectedCountry = {id_cnt: "", name_cnt: ""};
    function resetField() {
        $scope.formData.name = null;
        $scope.formData.venue_code = null;
        $scope.formData.venue_site_number = null;
        $scope.formData.telephone = null;
        $scope.formData.address = null;
        $scope.formData.address2 = null;
        $scope.formData.address3 = null;
        $scope.formData.postcode = null;
        $scope.formData.county = null;
        $scope.formData.city = null;
        $scope.formData.name_cnt = null;
        $scope.formData.gLat = null;
        $scope.formData.gLng = null;
        $scope.formData.country_vns = null;
        $scope.formData.region_vns = null;
        $scope.formData.zone_vns = null;
        $scope.formData.id_venuectg_vc = null;
        $scope.formData.sector = [];
        $scope.selectedCountry = {};
        $scope.selectedRegion = null;
        $scope.selectedZone = null;
        $scope.selectedCategory = {};
        $scope.selectedSector = [];
        
    }
    $scope.init = function () {
        window.scrollTo(0, 0);
        $scope.show = false;
         $scope.images = [];
        resetField();
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $scope.isNoInterStrip = true;
            return;
        }
        $scope.isNoInterStrip = false;
        imageflag = false;
        $rootScope.show = true;
        $scope.formData = {};
        $scope.modelData = {};
        if ($rootScope.isEditVenue) {
            $rootScope.menuTitle = "Employment";
            $rootScope.subMenuTitle = "Venue Directory";
            $rootScope.subMenuTitle1 = "Venue Edit";
            $scope.isFileUpload = false;
            $scope.Countries = $scope.allCountryList = $scope.filterData.country;
            $scope.Regions = $scope.allRegionList = $scope.filterData.regions;
            $scope.Zones = $scope.allZoneList = $scope.filterData.zones;
            var data = $scope.venueDetail;
            $scope.venueId = data.id;
            $scope.formData.name = data.venue_name;
            $scope.formData.venue_code = data.venue_code;
            $scope.formData.venue_site_number = data.venue_site_number;
            if (data.telephone)
                $scope.formData.telephone = data.telephone.replace(/[\s]/g, '');
            else
                $scope.formData.telephone = '';
            $scope.formData.address = data.address;
            $scope.formData.address2 = data.address2;
            $scope.formData.address3 = data.address3;
            $scope.formData.postcode = data.postcode;
            $scope.formData.county = data.county;
            $scope.formData.city = data.city;
            $scope.formData.name_cnt = data.name_cnt;
            $scope.formData.venue_active = 1;
            $scope.formData.gLat = data.gLat;
            $scope.formData.gLng = data.gLng;
            $scope.formData.country_vns = data.country_vns;
            $scope.formData.sector = [];
            if (data.country_vns) {
                for (var i = 0; i < $scope.Countries.length; i++) {
                    if (data.country_vns == $scope.Countries[i].id_cnt) {
                        $scope.selectedCountry = $scope.Countries[i];
                        $scope.getCountry($scope.selectedCountry);
                    }
                }
            }
            if (data.name_rgs) {
                for (var j = 0; j < $scope.Regions.length; j++) {
                    if (data.name_rgs == $scope.Regions[j].name_rgs) {
                        $scope.selectedRegion = $scope.Regions[j];
                        $scope.formData.region_vns = $scope.Regions[j].id_rgs;
                        $scope.getRegion($scope.selectedRegion);
                    }
                }
            }
            if (data.zone_vns) {
                for (var k = 0; k < $scope.Zones.length; k++) {
                    if (data.zone_vns == $scope.Zones[k].zone_name) {
                        $scope.selectedZone = $scope.Zones[k];
                        $scope.formData.zone_vns = $scope.Zones[k].pk_zone;
                    }
                }
            }
            if (data.category_venuectg) {
                for (var i = 0; i < $scope.categories.length; i++) {
                    if (data.category_venuectg == $scope.categories[i].category_venuectg) {
                        $scope.selectedCategory = $scope.categories[i];
                        $scope.formData.id_venuectg_vc = $scope.categories[i].id_venuectg;
                    }
                }
            }
            if (data.sector_array.length > 0) {
                for (var i = 0; i < data.sector_array.length; i++) {
                    for (var j = 0; j < $scope.sector.length; j++) {
                        if ($scope.sector[j].sector_id == data.sector_array[i]) {
                            $scope.selectedSector.push($scope.sector[j]);
                            $scope.formData.sector.push($scope.sector[j].sector_id);
                        }
                    }
                }
            }
            if($scope.preImages)
            $scope.images = $scope.preImages;
            // $scope.formData.sector = data.address_3_usr;

        }
        map_venue(data.gLat, data.gLng);
    };

    $scope.getCountry = function (selectedCountry) {
        $scope.Regions = [];
        $scope.Zones = [];
        $scope.selectedRegion = null;
        $scope.selectedZone = null;
        for (var i = 0; i < $scope.allRegionList.length; i++) {
            for (var k = 0; k < $scope.allRegionList[i].country.length; k++) {

                if ($scope.allRegionList[i].country[k].id_cnt == selectedCountry.id_cnt)
                    if ($.inArray($scope.allRegionList[i], $scope.Regions) < 0)
                        $scope.Regions.push($scope.allRegionList[i]);
            }

        }
        $scope.formData.country_vns = selectedCountry.id_cnt;
        $scope.address = selectedCountry.name_cnt + ", " + $scope.formData.postcode;
        GetLocation($scope.address);
    };
    $scope.getRegion = function (selectedRegion) {
        $scope.selectedRegion = selectedRegion;
        $scope.selectedZone = null;
        //  $scope.selectedRegion = selectedRegion;
        $scope.Zones = [];// $scope.allZoneList = $scope.filterdata.zones;
        for (var i = 0; i < $scope.allZoneList.length; i++) {

            for (var k = 0; k < $scope.allZoneList[i].region.length; k++) {

                if ($scope.allZoneList[i].region[k].fk_region == selectedRegion.id_rgs)
                    if ($.inArray($scope.allZoneList[i], $scope.Zones) < 0)
                        $scope.Zones.push($scope.allZoneList[i]);

            }

        }
        $scope.formData.region_vns = selectedRegion.id_rgs;


    };
    $scope.getZone = function (selectedZone) {
        //  $scope.selectedZone = selectedZone;
        $scope.formData.zone_vns = selectedZone.pk_zone;
    };
    $scope.categoryChange = function (selectedCategory) {
        $scope.selectedCategory = selectedCategory;
        $scope.formData.id_venuectg_vc = selectedCategory.id_venuectg;
    };
    $scope.sectorChange = function (selectedSector) {
        $scope.formData.sector = [];
        if (selectedSector.length > 0) {
            for (var i = 0; i < $scope.selectedSector.length; i++) {
                $scope.formData.sector.push($scope.selectedSector[i].sector_id);
            }
        }
    };
    function map_venue(gLat, gLng) {
        var mapDiv = document.getElementById("venueEditMap");
        // Creating a latLng for the center of the map
        var latlng = new google.maps.LatLng(gLat, gLng);
        // Creating an object literal containing the properties 
        // we want to pass to the map  
        var options = {
            center: latlng,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Creating the map
        var map = new google.maps.Map(mapDiv, options);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map

        });

        google.maps.event.addListenerOnce(map, 'idle', function () {
            google.maps.event.trigger(map, 'resize');
            marker.setPosition(new google.maps.LatLng(gLat, gLng));
            map.panTo(new google.maps.LatLng(gLat, gLng));
        });
    }
    $scope.uploadExtraImages = function () {
        $scope.extraImages = true;
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
        $scope.isImageAdd = true;
        $scope.$apply(function () {
            $scope.images.push({name: imageURI.title, imageurl: imageURI.src, id: imageURI.id});
        });

    }
    ;

    $scope.deleteImage = function (image) {
        var index = $scope.images.indexOf(image);
        $scope.images.splice(index, 1);
    };

    $scope.$watch('formData.postcode', function () {
        if ($scope.selectedCountry.name_cnt)
            var countryName = $scope.selectedCountry.name_cnt;
        else
            countryName = '';
        $scope.address = countryName + ", " + $scope.formData.postcode;
        GetLocation($scope.address);
    });
    function GetLocation(address) {
        //  console.log(address);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                map_venue(latitude, longitude);
                $scope.formData.gLat = latitude;
                $scope.formData.gLng = longitude;
                //  console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
            } else {
                console.log("Request failed.")
            }
        });
    }
    ;
    $scope.go_back = function () {
        $rootScope.venueDetailtemplate = true;
        $rootScope.venueDirectorytemplate = false;
        $rootScope.isEditVenue = false;
    };
    $scope.saveButtonAction = function () {
        window.scrollTo(0, 0);
        if ($scope.venueForm.$valid) {
            // console.log("Save Venue Details : " + JSON.stringify($scope.formData));
            webRequestObject.postRequest(this, "POST", constanObject.UPDATE_VENUE + $scope.venueId, $scope.formData, constanObject.employmentWebRequestType.UPDATE_VENUE, true);

        } else {
            $scope.show = true;
            $scope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
        }


    };

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            return;
        }
        switch (requestType) {

            case constanObject.employmentWebRequestType.UPDATE_VENUE:
                var venueScope = angular.element('#venuedetail').scope();
                venueScope.venueprofile = [];
                // console.log("UPDATE Venue : " + JSON.stringify(responseData));
                var venueId = $scope.venueId;
                if (responseData) {
                    venueScope.venueprofile = responseData.data[venueId];
                    if ($scope.images.length > 0) {

                        for (var i = 0; i < $scope.images.length; i++) {
                            webRequestObject.fileUpload($scope, $scope.images[i].imageurl, constanObject.UPLOAD_VENUE_IMAGE + venueId, "image_venue", constanObject.FileUploadModuleId.VENUE, true);
                        }
                        imageflag = false;
                    } else {
                        $rootScope.isEditVenue = false;
                        $rootScope.venueDetailtemplate = true;
                    }
                }
                ;
                break;
            case constanObject.FileUploadModuleId.VENUE:
                if (status) {
                    $rootScope.isEditVenue = false;
                    $rootScope.venueDetailtemplate = true;
                }
                break;
        }
    };

});


