BandQModule.controller("incidentLocationCtrl", ['$scope', '$timeout', '$rootScope', 'globalService',
    'showHidePageService', '$filter', function ($scope, $timeout,
    $rootScope, globalService, showHidePageService, $filter) {

        var geocoder;
        var store_latitude =CURRENT_LATITUDE;// 28.613939;
        var store_longitude =CURRENT_LONGITUDE;// 77.209021;
        var curr_latitude;
        var curr_longitude, map;
        var distance_radious_miles = 0; // distance in miles

        var start = 0;
        var operation = 0;
        var selectAction = 0;
        var oldData = false;

        $scope.req1 = false;
        $scope.req2 = false;
        $scope.showSwas = false;
        $scope.showMyStore = false;
        $scope.showLocateMe = false;
        $scope.showLetMeChoose = false;
        $scope.selectedLocationType = '2';
        $scope.selectedVenueData = {};
        $scope.selectedSwesArea = '';
        $scope.reSetBollen;

//        $scope.derivedVenues.selectedVenueSiteNumber = "";
//        $scope.derivedVenues.selectedVenueStoreCode = "";

        $scope.userInfo = new Array(0);
        $scope.allVenues = new Array(0);
        $scope.userIncommingDefaultSelectedVenues = new Array(0);
        $scope.derivedVenues = new Array(0);
        $scope.jsonVenue = new Array(0);
        $scope.derivedSwasArea = new Array(0);

        // extras ---
        $scope.staticModel1 = new Array(0);
        $scope.staticModel2 = new Array(0);
        $scope.staticModel3 = new Array(0);
        $scope.staticModel4 = 0;
        $scope.selectedUserVenue = 0;

        $scope.userSelectedVenue = new Array(0);
        $scope.myChooseV = new Array(0);
        $rootScope.show = false;
        $scope.restVenueId;

        function parseIncommingData(responseData) {
            var iLimit = $scope.derivedVenues.length;
            $scope.derivedSwasArea = new Array(0);
            $scope.staticModel2 = new Array(0);
            $scope.showSwas = false;
            $scope.derivedSwasArea = new Array(0);
            for (var i = 0; i < iLimit; i++) {
                if (parseInt($scope.derivedVenues[i].id) == parseInt($scope.selectedUserVenue)) {
                    handleNavigation($scope.derivedVenues[i].gLat, $scope.derivedVenues[i].gLng);
                    var tempDerivedSwas = new Array(0);
                    $scope.selectedVenueData = $scope.derivedVenues[i];
                    globalService.setVenueId($scope.derivedVenues[i]);
                    globalService.setPoliceForceId($scope.derivedVenues[i].police_force);
                    $scope.userSelectedVenue = $scope.derivedVenues[i];
                    ////console.log($scope.derivedVenues[i]);
                    $scope.derivedVenues.selectedVenueSiteNumber = $scope.derivedVenues[i].venue_site_number;
                    $scope.derivedVenues.selectedVenueStoreCode = $scope.derivedVenues[i].venue_code;
                    var userSelectedVenueSwas = $scope.derivedVenues[i].swasareas.split(",");
                    var jLimit = parseInt(userSelectedVenueSwas.length);
                    var kLimit = parseInt(responseData.length);
                    for (var j = 0; j < jLimit; j++) {
                        for (var k = 0; k < kLimit; k++) {
                            var userSwasId = parseInt(userSelectedVenueSwas[j]);
                            var swasId = parseInt(responseData[k].id_vna);
                            if (userSwasId == swasId) {
                                tempDerivedSwas.push({
                                    'active_vna': responseData[k].active_vna,
                                    'assign_vna': responseData[k].assign_vna,
                                    'id_vna': responseData[k].id_vna,
                                    'title_vna': responseData[k].title_vna
                                });
                                break;
                            }
                        }
                        if (j == jLimit - 1) {
                            $scope.$apply(function () {
                                $scope.derivedSwasArea = new Array(0);
                                $scope.staticModel2 = new Array(0);
                                $scope.showSwas = true;
                                $scope.derivedSwasArea = tempDerivedSwas;
                                //                                //console.log(tempDerivedSwas.length);
                                globalService.setSwasArea(tempDerivedSwas);

                                if ($scope.reSetBollen)
                                    if ($scope.reSetBollen.SwasArea) {
                                        $scope.staticModel2 = $scope.selectedSwesArea;
                                        $scope.reSetBollen.SwasArea = false;
                                        globalService.setSwasAreaId($scope.staticModel2);
                                    }

                            });
                        }
                    }
                    break;
                }
            } //  handling responseData ends here
        }

        function setData() {
            var getQuestionQuery = "SELECT * from " + TABLE_SWAS_AREA;

            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
                parseIncommingData(result)
            }, true);

        }

        function handleNavigation(dlt, dln) {
            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(store_latitude, store_longitude),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);

            //        var marker = new google.maps.Marker({
            //            position: store_LatLong,
            //            map: map,
            //            title: 'My Location'
            //        });

            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map,
                suppressMarkers: true
            });

            var dest = {
                lat: parseFloat(dlt),
                lng: parseFloat(dln)
            };

            //  DRIVING WALKING BICYCLING TRANSIT

            var request = {
                destination: dest,
                origin: store_LatLong,
                travelMode: google.maps.TravelMode.DRIVING
            };

            if (typeof directionsService == "undefined") {
                directionsService = new google.maps.DirectionsService();
            }

            function makeMarker(position, icon, title) {
                var m = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: icon,
                    title: title
                });
                //console.log(position);
                getAddressLocation(position, m, map);
            }

            directionsService.route(request, function (response, status) {

                if (status == google.maps.DirectionsStatus.OK) {
                    // Display the route on the map.
                    //                var marker = new google.maps.Marker({
                    //                    position: store_LatLong,
                    //                    map: map,
                    //                    icon: {
                    //                        path: "M27.648 -41.399q0 -3.816 -2.7 -6.516t-6.516 -2.7 -6.516 2.7 -2.7 6.516 2.7 6.516 6.516 2.7 6.516 -2.7 2.7 -6.516zm9.216 0q0 3.924 -1.188 6.444l-13.104 27.864q-0.576 1.188 -1.71 1.872t-2.43 0.684 -2.43 -0.684 -1.674 -1.872l-13.14 -27.864q-1.188 -2.52 -1.188 -6.444 0 -7.632 5.4 -13.032t13.032 -5.4 13.032 5.4 5.4 13.032z",
                    //                        fillColor: "#000",
                    //                        scale: 0.6,
                    //                        strokeWeight: 0.2,
                    //                        strokeColor: 'black',
                    //                        strokeOpacity: 1,
                    //                        fillOpacity: 0.85
                    //                    }
                    //                });
                    directionsDisplay.setDirections(response);
                    var leg = response.routes[0].legs[0];
                    $rootScope.venueLocation = leg.end_location;
                    makeMarker(leg.start_location, "images/map-marker/black.png", "My Location");

                    makeMarker(leg.end_location, "images/map-marker/red.png", 'Venue Location');

                } else if (status == "ZERO_RESULTS") {
                    //                alert('location is too far from  your point');
                    //console.log('location is too far from your point');

                    var des_LatLong = new google.maps.LatLng(parseFloat(dlt), parseFloat(dln));
                    setMarkerOnMap(des_LatLong, false);

                }
            });
            //            showDirection(store_LatLong, {lat: parseFloat(dlt), lng: parseFloat(dln)});
        }
        ;

        function showDirection(src, dest) {

            //toastr.info('show direction');
            //console.log(dest);

            //        if (typeof directionsDisplay == "undefined") {
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
            });

            var request = {
                destination: dest,
                origin: src,
                travelMode: google.maps.TravelMode.DRIVING
            };

            if (typeof directionsService == "undefined") {
                directionsService = new google.maps.DirectionsService();
            }

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    // Display the route on the map.
                    directionsDisplay.setDirections(response);

                }
            });
        }

        function cleanAllDrops() {
            //        $scope.$apply(function(){
            $scope.staticModel1 = new Array(0);
            $scope.staticModel2 = new Array(0);
            $scope.staticModel3 = new Array(0);
            //        });
        }

        function fillLocateMe() {

            $("#div_store").show();
            $("#div_letMeChoose").hide();
            globalService.setSwasAreaId(0);
            $scope.showMyStore = false;
            $scope.showLetMeChoose = false;
            $scope.showLocateMe = true;
            //        //console.log('let me automatic');
            $scope.showSwas = false;
            buttonClickColorChange("id_locateme", "id_store", "id_letmeshoose");
            //        findWithinRadious(server_lat, server_long, id, venuename, venueSiteNumber, venueCode, swasareas);
            var iLimit = $scope.allVenues.length;
            //        //console.log(store_latitude, store_longitude);
            $scope.jsonVenue = new Array(0);
            //        //console.log($scope.allVenues);
            for (var i = 0; i < iLimit; i++) {
                //            //console.log($scope.allVenues[i]);
                var cV = $scope.allVenues[i];
                findWithinRadious2(cV);
                if (i == iLimit - 1) {
                    $scope.derivedVenues = $scope.jsonVenue;
                    //                //console.log($scope.jsonVenue);

                    if ($scope.jsonVenue.length < 1) {
                        $rootScope.show = true;

                        $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;

                        //                    $scope.$digest();
                        $scope.$apply(function () {
                            //                        $scope.req1 = true;
                            $scope.req2 = true;
                        });
                        //                    buttonClickColorChange("", "id_locateme", "id_letmeshoose");
                        //  //console.log("No Locations Available");//You have some form errors. Please check below.
                        //                    alert('No venue near to your location');
                        //                    $scope.myStore();
                    } else {
                        $scope.$apply(function () {
                            $scope.showMyStore = false;
                            $scope.showLetMeChoose = false;
                            $scope.showLocateMe = true;

                            if ($scope.reSetBollen)
                                if ($scope.reSetBollen.Venue) {
                                    $scope.reSetBollen.Venue = false;

                                    for (var i = 0; i < $scope.derivedVenues.length; i++)
                                        if ($scope.derivedVenues[i].id == $scope.restVenueId)
                                        {
                                            $scope.selectedUserVenue = $scope.restVenueId;
                                            $scope.staticModel1 = $scope.derivedVenues[i];
                                            $scope.reSetBollen.SwasArea = true;
                                            passSwasArea();
                                            break;
                                        }
                                }


                        })
                    }
                }
            }
            window.plugins.spinnerDialog.hide();
        }

        function updateUserLocation() {
            try {
                navigator.geolocation.getCurrentPosition(function (position) {
                    store_latitude = position.coords.latitude;
                    store_longitude = position.coords.longitude;
                    //                                alert(store_latitude + " " + store_longitude);
                    store_LatLong = new google.maps.LatLng(store_latitude, store_longitude);
                    setMarkerOnMap(store_LatLong, false, true);


                    globalService.setCurrentLatLong({
                        'store_latitude': store_latitude,
                        'store_longitude': store_longitude
                    });

                    fillLocateMe();
                    //                return true;
                }, function onError(error) {
                    //                alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
                    window.plugins.spinnerDialog.hide();
                    $rootScope.show = true;
                    $scope.req1 = true;
                    $scope.req2 = true;
                    // buttonClickColorChange("id_store", "id_locateme", "id_letmeshoose");
                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                    //                alert('Location sensor is not ON. Kindly turn on location sensor');?

//                    store_latitude = 28.613939;
//                    store_longitude = 77.209021;
//                    globalService.setCurrentLatLong({
//                        'store_latitude': store_latitude,
//                        'store_longitude': store_longitude
//                    });
//                    
//                    
                    //                 store_LatLong = new google.maps.LatLng(store_latitude, store_longitude);
                    //                 setMarkerOnMap(store_LatLong, false);
                    //                                 fillLocateMe();
                    // //                $scope.myStore();
                    //                return false;
                }, {
                    maximumAge: 3000,
                    timeout: 5000,
                    enableHighAccuracy: false
                });
            } catch (e) {

//                store_latitude = 28.613939;
//                store_longitude = 77.209021;
//                globalService.setCurrentLatLong({
//                    'store_latitude': store_latitude,
//                    'store_longitude': store_longitude
//                });


                store_LatLong = new google.maps.LatLng(store_latitude, store_longitude);
                setMarkerOnMap(store_LatLong, false, true);
                window.plugins.spinnerDialog.hide();
                //            fillLocateMe();
                // $scope.myStore();
                //            alert(e.message);
            }
        }

        function storeShow() {
            $("#div_store").show();
            $("#div_letMeChoose").hide();
        }

        $scope.webRequestResponse = function (requestType, status, responseData) {
            //        //console.log(requestType);
            $scope.showSwas = false;
            if (status == constanObject.ERROR) {
                showErrorAlert(requestType, responseData);
                return;
            }
            switch (requestType) {
                case constanObject.WebRequestType.ListVenues:
                    //            //console.log($scope.staticModel1);
                    //            //console.log("Venues jsonVenue : " + JSON.stringify(responseData));
                    for (var i = 0; i < responseData.data.length; i++) {
                        var lat = responseData.data[i].gLat;
                        var log = responseData.data[i].gLng;
                        var id = responseData.data[i].id;
                        var venuename = responseData.data[i].venue_name;
                        var venueSiteNumber = responseData.data[i].venue_site_number;
                        var venueCode = responseData.data[i].venue_code;
                        var swasareas = responseData.data[i].swasareas;
                        findWithinRadious(lat, log, id, venuename, venueSiteNumber, venueCode, swasareas);
                        // //console.log("Lat :"+lat +" , Long :"+log);
                    }
                    //webRequestObject.postRequest($scope, "GET", constanObject.ListSwasArea, 
                    // "", constanObject.WebRequestType.ListSwasArea, false);
                    break;

                case constanObject.WebRequestType.ListSwasArea:
                    //                            //console.log('switch case catched');
                    dataBaseObj.deleteTableData(TABLE_SWAS_AREA);
                    //                //console.log(TABLE_SWAS_AREA, JSON_FIELD_ARRAY, responseData.SWAS.data, true);
                    dataBaseObj.insertData(TABLE_SWAS_AREA, JSON_FIELD_ARRAY, responseData.SWAS.data, true);
                    setData();
                    break;

                default:
                    $scope.req1 = true;
                    //console.log('request type not found in switch statement');
                    //console.log(requestType);
                    break;
            }
            //        window.plugins.spinnerDialog.hide();
        }

        $scope.myStore = function () {
             
            $("#div_store").show();
            $("#div_letMeChoose").hide();
            globalService.setlocationType("2");
            $scope.selectedLocationType = '2';
            start = 0;
            globalService.setSwasAreaId(0);
            $scope.showMyStore = true;
            $scope.showSwas = false;
            $scope.showLetMeChoose = false;
            $scope.req1 = false;
            $scope.req2 = false;
            $scope.showLocateMe = false;
            $scope.userIncommingDefaultSelectedVenues = new Array(0);
            $scope.derivedVenues = new Array(0);


            $scope.staticModel1 = new Array(0);
            cleanAllDrops();
            buttonClickColorChange("id_store", "id_locateme", "id_letmeshoose");


            var query1 = "SELECT * from " + TABLE_VENUE;

            dataBaseObj.getDatafromDataBase(query1, function (result) {

                if (result.length > 1) {
                    $scope.allVenues = result;
                    var query2 = "SELECT * from " + TABLE_USER_INFO;
                    dataBaseObj.getDatafromDataBase(query2, function (responseData) {

                        $scope.userInfo = responseData;

                        var iLimit = responseData.venues_assigned.length;
                        var jLimit = $scope.allVenues.length;
                        //                
                        $scope.userIncommingDefaultSelectedVenues = new Array(0);
                        //
                        for (var i = 0; i < iLimit; i++) {
                            for (var j = 0; j < jLimit; j++) {
                                if (responseData.venues_assigned[i] == $scope.allVenues[j].id) {
                                    $scope.userIncommingDefaultSelectedVenues.push($scope.allVenues[j]);
                                    break;
                                }

                            }

                        }


                        if (iLimit > 0) {
                            start = 0;

                            $scope.staticModel1 = new Array(0);
                            $scope.$apply(function () {
                                $scope.derivedVenues = $scope.userIncommingDefaultSelectedVenues;
                                $scope.showMyStore = true;

                                if ($scope.reSetBollen)
                                    if ($scope.reSetBollen.Venue && $scope.selectedLocationType == "2") {
                                        $scope.reSetBollen.Venue = false;

                                        for (var i = 0; i < $scope.derivedVenues.length; i++)
                                            if ($scope.derivedVenues[i].id == $scope.restVenueId)
                                            {
                                                $scope.selectedUserVenue = $scope.restVenueId;
                                                $scope.staticModel1 = $scope.derivedVenues[i];
                                                $scope.reSetBollen.SwasArea = true;
                                                passSwasArea();
                                                break;
                                            }
                                    }

                            });


                        }




                    }, true);
                }
            }, true);
        }

        $scope.locateMe = function () {
            //        //console.log('locate me');
            //        window.plugins.spinnerDialog.show();
            globalService.setlocationType("1");
            $scope.selectedLocationType = '1';
            showSpinner(true, true, SPINNER_MESSAGE);
            start = 1;
            selectAction = 2;
            updateUserLocation();



        }

        $scope.letMeChoose = function () {
           

            $scope.siteNoIsNotValid = false;
            $scope.venueNoIsNotValid = false;
            globalService.setlocationType("0");
            $scope.selectedLocationType = '0';
            start = 0;

            //  $scope.selectedUserVenue = 0;
            $scope.myChooseV = new Array(0);
            $scope.derivedVenues = new Array(0);

            $scope.showMyStore = false;
            $scope.req1 = false;
            $scope.req2 = false;
            $scope.showLocateMe = false;
            $scope.showLetMeChoose = true;
            globalService.setSwasAreaId(0);

            $scope.derivedVenues.selectedVenueSiteNumber = "";
            $scope.derivedVenues.selectedVenueStoreCode = "";
            $scope.showSwas = false;

            buttonClickColorChange("id_letmeshoose", "id_store", "id_locateme");
            $("#div_store").hide();
            $("#div_letMeChoose").show();
            $scope.derivedVenues = $scope.allVenues;

            if ($scope.reSetBollen)
                if ($scope.reSetBollen.Venue) {
                    $scope.reSetBollen.Venue = false;

                    for (var i = 0; i < $scope.derivedVenues.length; i++)
                        if ($scope.derivedVenues[i].id == $scope.restVenueId)
                        {
                            $scope.selectedUserVenue = $scope.restVenueId;
                            $scope.derivedVenues.myChooseV = $scope.derivedVenues[i];
                            
                            if( $scope.derivedVenues.myChooseV.sector_id)
                            globalService.setSectorId( $scope.derivedVenues.myChooseV.sector_id);
                        
                            $scope.reSetBollen.SwasArea = true;
                            passSwasArea();
                            break;
                        }
                }





        }

        $scope.setSiteNumber = function (number) {
            // //console.log(JSON.stringify($scope));


            for (var i = 0; i < $scope.derivedVenues.length; i++) {

                if ($scope.derivedVenues[i].venue_site_number == number) {
                    $scope.derivedVenues.myChooseV = $scope.derivedVenues[i];
                    $scope.derivedVenues.myChooseV = $scope.derivedVenues[i];
                    var obj = {};
                    obj.derivedVenues = {};
                    obj.derivedVenues.myChooseV = $scope.derivedVenues[i];
                    $scope.changeMyChooseV(obj);
                    break;
                } else {
                    $scope.siteNoIsNotValid = true;
                    $scope.venueNoIsNotValid = false;
                    $scope.showSwas = false;
                    $scope.derivedVenues.selectedVenueStoreCode = "";
                    $scope.derivedVenues.myChooseV = new Array(0);
                }
            }
        }


        $scope.setVenueStoreCode = function (number) {
            // //console.log(JSON.stringify($scope));


            for (var i = 0; i < $scope.derivedVenues.length; i++) {

                if ($scope.derivedVenues[i].venue_code == number) {
                    $scope.derivedVenues.myChooseV = $scope.derivedVenues[i];
                    var obj = {};
                    obj.derivedVenues = {};
                    obj.derivedVenues.myChooseV = $scope.derivedVenues[i];
                    $scope.changeMyChooseV(obj);
                    break;
                } else {
                    $scope.siteNoIsNotValid = false;
                    $scope.venueNoIsNotValid = true;
                    $scope.showSwas = false;
                    $scope.derivedVenues.selectedVenueSiteNumber = "";
                    $scope.derivedVenues.myChooseV = new Array(0);
                }
            }
        }


        $scope.selectAction = function (item) {
            var swasValue = item.swasareas.split(",");
            $scope.splitswasarea = new Array(0);
            $scope.venuesitenumber = item.venue_site_number;
            $scope.venuescode = item.venue_code;
            for (var i = 0; i < swasValue.length; i++) {
                for (var j = 0; j < $scope.jsonSwasArea.length; j++) {
                    if (swasValue[i] == $scope.jsonSwasArea[j].id_vna) {
                        var map = {
                            "id_vna": $scope.jsonSwasArea[j].id_vna,
                            "title_vna": $scope.jsonSwasArea[j].title_vna
                        };
                        $scope.splitswasarea.push(map);
                    }
                }
            }
        }



        $scope.changeMyChooseV = function (obj) {
            //window.plugins.spinnerDialog.show();
            $scope.siteNoIsNotValid = false;
            $scope.venueNoIsNotValid = false;
            if (oldData == true) {
                oldData = false;
                return false;
            }
            if (typeof obj.derivedVenues.myChooseV == "object") {
                $scope.selectedUserVenue = obj.derivedVenues.myChooseV.id;
                $scope.userSelectedVenue = obj.derivedVenues.myChooseV;
            } else {
                $scope.selectedUserVenue = obj.derivedVenues.myChooseV;
            }
            
            if(obj.derivedVenues.myChooseV.sector_id)
            globalService.setSectorId(obj.derivedVenues.myChooseV.sector_id);
        
            var sId = globalService.getSwasAreaId();
            ////console.log(sId);
            if (sId > 0) {
                if (document.getElementById('fillOl'))
                    document.getElementById('fillOl').innerHTML = document.getElementById('fillOl').innerHTML;
                //                //console.log(sId);
                globalService.setSwasAreaId(0);
                $scope.staticModel2 = new Array(0);
            }

            $scope.derivedVenues = $scope.allVenues;


            $scope.showSwas = false;
            passSwasArea();



        }
        $scope.selectSwasArea = function (item) {
        }

        function buttonClickColorChange(id_active, id_locateme, id_letmeshoose) {
            $('#' + id_active).addClass('active');
            $('#' + id_locateme).removeClass('active');
            $('#' + id_letmeshoose).removeClass('active');
        }

        function createPlyline(map) {
            var marker = new google.maps.Marker({
                position: store_LatLong,
                title: 'Store Location',
                map: map
            });
            getAddressLocation(store_LatLong, marker, map);
            var flightPlanCoordinates = [
                {
                    lat: store_latitude,
                    lng: store_longitude
                },
                {
                    lat: curr_latitude,
                    lng: curr_longitude
                }];

            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            flightPath.setMap(map);
        }

        function setMarkerOnMap(latLong, PolylineTAG, bol) {
            //        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
            var mapOptions = {
                center: latLong,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };
            map = new google.maps.Map(document.getElementById("map"), mapOptions);


            var marker = new google.maps.Marker({
                position: latLong,
                map: map
            });

            //        marker.setImage(getIcon('#000').image);

            getAddressLocation(latLong, marker, map);
            if (PolylineTAG == true) {
                createPlyline(map)
            }
        }

        function getAddressLocation(latLong, marker, map) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': latLong
            },
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var add = results[0].formatted_address;
                                var infowindow = new google.maps.InfoWindow({
                                    content: '<font color=#000000>' + add + '</font>'
                                });
                                google.maps.event.addListener(marker, 'click', function () {
                                    if (infowindow) {
                                        infowindow.close();
                                        infowindow = new google.maps.InfoWindow({
                                            content: '<font color=#000000>' + add + '</font>'
                                        });
                                    }
                                    infowindow.open(map, marker);
                                });
                            }
                        } else {
                            //console.log("Geocoder failed due to: " + status);
                        }
                    }
            );
        }

        function findWithinRadious2(obj) {
            //         .gLat, cV.gLng, cV.id, cV.venue_name, cV.venue_site_number, cV.venue_code, cV.swasareas
            //        server_lat, server_long, id, venuename, venueSiteNumber, venueCode, swasareas
            var server_lat = obj.gLat;
            var server_long = obj.gLng;
            var Current_lat = store_latitude;
            var Current_long = store_longitude;
            ////console.log(store_latitude, store_longitude, server_lat, server_long, id, venuename, venueSiteNumber, venueCode, swasareas)
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(server_lat - Current_lat); // deg2rad below
            var dLon = deg2rad(server_long - Current_long);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(Current_lat)) * Math.cos(deg2rad(server_lat)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            var d = R * c; // Distance in km
            if (obj.venuename == "TEST VENUE 1") {
                //console.log('catch sample venues');

            }
            if (d < distance_radious_miles) { // here 2 is miles value
                var item = obj;
                item["d"] = d.toFixed();
                //            obj.d = d.toFixed();
                $scope.jsonVenue.push(item);
            } else {
                //            //console.log('You are not within location ' + d);

            }

        }

        function findWithinRadious(server_lat, server_long, id, venuename, venueSiteNumber, venueCode, swasareas) {

            var Current_lat = store_latitude;
            var Current_long = store_longitude;
            var R = constanObject.IncidentReportVenueRadius; // Radius of the earth in km
            var dLat = deg2rad(server_lat - Current_lat); // deg2rad below
            var dLon = deg2rad(server_long - Current_long);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(Current_lat)) * Math.cos(deg2rad(server_lat)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km

            if (d < 40) {
                //console.log('You are  within location ' + d);
                var map = {
                    "id": id,
                    "venue_name": venuename,
                    "venue_site_number": venueSiteNumber,
                    "venue_code": venueCode,
                    "swasareas": swasareas
                };
                $scope.jsonVenue.push(map);

            } else {
                //   //console.log('You are not within location '+d);
            }

        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        function passSwasArea() {

            dataBaseObj.countNoOfRow(TABLE_SWAS_AREA, function (n) {
                if (n > 0)
                    setData();
                else
                    webRequestObject.postRequest($scope, "GET", constanObject.ListSwasArea, null, constanObject.WebRequestType.ListSwasArea, false);
            });

        }

        function updateMapLocationWithNewVenue(obj) {
            //        //console.log(obj);
        }

        $scope.fillSwasArea = function (n) {
            $scope.req1 = false;
            //        $scope.req2 = false;
            if (oldData == true) {
                oldData = false;
                return false;
            }

            globalService.setSwasAreaId(0);

            if (n == 1) {
                //                        $scope.showSwas = true;
                //                        passSwasArea();
            }
            if (n == 2) {
                //            $scope.derivedVenues = $scope.allVenues;
            }

            if (n == 3) {
                //                    passSwasArea();
            }
        }

        $scope.changeSwasArea = function (o) {
            globalService.setSwasAreaId(o.staticModel2);
            $scope.selectedSwesArea = o.staticModel2;
            //        //console.log(globalService.getSwasAreaId());
        }


        $scope.changeStoreVenue = function (obj) {
            if (oldData == true) {
                oldData = false;
                return false;
            }
            $scope.showSwas = false;
            if (start == 0) {
                $scope.selectedUserVenue = 0;
                $scope.staticModel1 = new Array(0);
                if (typeof obj.staticModel1 == "object") {
                    obj.staticModel1 = new Array(0);
                } else {
                    obj.staticModel1 = null;
                }
                start++;
                return false;
            } else {
                if (typeof obj.staticModel1 == "object") {
                    $scope.selectedUserVenue = obj.staticModel1.id;
                    $scope.userSelectedVenue = obj.staticModel1;
                } else {
                    $scope.selectedUserVenue = obj.staticModel1;
                }
                if($scope.userSelectedVenue.sector_id)
                globalService.setSectorId($scope.userSelectedVenue.sector_id);

                var sId = globalService.getSwasAreaId();
                if (sId > 0) {
                    globalService.setSwasAreaId(0);
                    $scope.staticModel2 = new Array(0);
                }
                $scope.showSwas = false;
                passSwasArea();
            }

            //        updateMapLocationWithNewVenue(obj);
        }

        $scope.previousPageRequest = function () {
            if ($scope.page == 1) {
                $scope.page = 1;
            } else {
                $scope.page--;
            }
        };

        $scope.nextPageRequest = function () {
        };

        $scope.nextButtonClicked = function (callBack) {


            if ($scope.selectedUserVenue == 0) {
                $rootScope.show = true;
                $scope.req1 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                //            alert('Please select your venue');
                return callBack(false, 1);
            } else {
                if (parseInt(globalService.getSwasAreaId()) > 0) {
                    if (typeof globalService.getSwasAreaId() == 'undefined') {
                        return callBack(false, 1);
                    } else {
                        $rootScope.show = false;
                        $scope.req1 = false;
                        $scope.req2 = false;
                        globalService.setLocationVenueData({locationType: $scope.selectedLocationType, venueData: $scope.selectedUserVenue, swasArea: $scope.selectedSwesArea});
                        return callBack(true, 1);
                    }
                } else {
                    $rootScope.show = true;
                    $scope.req1 = true;
                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                    //                alert('Please select Swas Area');
                    return callBack(false, 1);
                }
            }

        };
        
           $scope.saveButtonClicked = function (callBack){
     
                        globalService.setLocationVenueData({locationType: $scope.selectedLocationType, venueData: $scope.selectedUserVenue, swasArea: $scope.selectedSwesArea});
                        return callBack(true, 1);
           
        };
        
        var noOfPageMove
        $scope.init = function () {

            $scope.locationToolTipMessage = $scope.fieldData[48].question_hint;
            distance_radious_miles = showHidePageService.getVenuRadious();

            $scope.showSwas = false;
            $scope.showMyStore = false;
            $scope.showLocateMe = false;
            $scope.showLetMeChoose = false;
            start = 0;
            $scope.myStore();
            $scope.resetData();
        };







        $scope.resetData = function () {
            if (!globalService.getLocationVenueData().swasArea)
                return;

            var locationData = globalService.getLocationVenueData();
            $scope.selectedLocationType = locationData.locationType;
            $scope.selectedSwesArea = locationData.swasArea;
            $scope.restVenueId = locationData.venueData;
            $scope.reSetBollen = {};
            $scope.reSetBollen.Venue = true;
            showSpinner(true, true, SPINNER_MESSAGE);
            setTimeout(function () {
                $scope.$apply(function () {
                    window.plugins.spinnerDialog.hide();
                    if ($scope.selectedLocationType == "0")
                        $scope.letMeChoose();

                    if ($scope.selectedLocationType == "1")
                        $scope.locateMe();
                })
            }, 2000);


        };


        $scope.init();
        $scope.back = function (callBack) {

            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            globalService.setLocationVenueData({locationType: $scope.selectedLocationType, venueData: $scope.selectedUserVenue, swasArea: $scope.selectedSwesArea});
            return callBack(true);

        };


        function getVenueFromList(id) {

            for (var i = 0; i < $scope.derivedVenues.length; i++)
            {
                if ($scope.derivedVenues[i].id == id)
                    return $scope.derivedVenues[i];
            }

        }


        function getSwasAreaFromList(id) {

            for (var i = 0; i < $scope.derivedSwasArea.length; i++)
            {
                if ($scope.derivedSwasArea[i].id_vna == id)
                    return $scope.derivedSwasArea[i];
            }

        }

        var store_LatLong = new google.maps.LatLng(store_latitude, store_longitude);

        setMarkerOnMap(store_LatLong, false);

    }]);