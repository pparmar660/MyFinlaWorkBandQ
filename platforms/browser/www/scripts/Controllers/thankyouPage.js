BandQModule.controller("thankyouCtrl", ["$scope", "$rootScope", "globalService", function ($scope, $rootScope, globalService) {

        $scope.init = function () {
            // hide next and save , show submit
            $scope.locationVanue = globalService.getVenueId();
            $scope.vanueLat = $scope.locationVanue.gLat;
            $scope.vanueLong = $scope.locationVanue.gLng;
            venue_map($scope.vanueLat, $scope.vanueLong);

            $rootScope.showHomeButton = true;
            $scope.incidentData = globalService.getIncidentResData();


        };
        function venue_map(glat, glong) {
            var mapProp = {
                center: new google.maps.LatLng(glat, glong),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };
            var map = new google.maps.Map(document.getElementById("mapForThakyouPage"), mapProp);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(glat, glong),
                map: map,
                title: 'Set lat/lon values for this property'
            });

//        // Creating a latLng for the center of the map
//        var latlng = new google.maps.LatLng(28.6139,77.2090);//new google.maps.LatLng(gLat, gLng);
//        // Creating an object literal containing the properties 
//        // we want to pass to the map  
//        var options = {
//            center: latlng,
//            zoom: 11,
//            mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
//        // Creating the map
//        var map = new google.maps.Map(mapDiv, options);

        };


        $rootScope.addIncident = function () {
             $rootScope.addIncidentMainCtrl();

            // window.location.href = "dashboard.html#/createIncident";
            // $("#addNewButton").addClass("active");
            // $("#homeButton").removeClass("active");


        };

        $rootScope.goToHome = function () {
            window.location.href = "dashboard.html#/dashboard";
            $("#addNewButton").removeClass("active");
            $("#homeButton").addClass("active");

        };
        $scope.init();
    }]);




