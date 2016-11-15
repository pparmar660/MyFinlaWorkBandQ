BandQModule.controller('linkedIncident', function ($scope, IncidentReport,linkedModule) {


    $scope.incident = null;
    $scope.image = "images/offenders-pic/pic08.jpg";
    $scope.incident_details = {};
    $scope.incident_data = {};
    $scope.incidentImage = constanObject.INCIDENT_FILE_URL;
    $scope.offenderImage = constanObject.MainUrl + constanObject.VesionNo + 'getOffenderImage';
    $scope.victimImageUrl = constanObject.MainUrl + constanObject.VesionNo + 'getVictimsImage';
    $scope.witnessImageUrl = constanObject.MainUrl + constanObject.VesionNo + 'getWitnessImage';
    var map;
    var myCenter;

    $scope.showLinkedModule = false;
    $scope.linked_offenders = [];
    $scope.linked_vehicles = [];
    $scope.linked_witnesses = [];
    $scope.linked_victims = [];
    $scope.linked_incidents = [];
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
    $scope.isSuccess = false;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.hideMap = '';
    $scope.isCommAllowed = false;
    $scope.isUploadSuccess = false;
    $scope.incidents = [];

    $scope.isNoInterStrip = false;
    $scope.staffImage = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";
    $scope.link = {};
    $scope.isNextRecord = false;
    $scope.isBackRecord = false;
    $scope.incidentId_ = 0;

    $scope.init = function () {

        $scope.getIncidentDetail($scope.incidentId);

    };




    function handleNavigation(dlt, dln) {
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(dlt, dln),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        myCenter = new google.maps.LatLng(dlt, dln);
        var marker = new google.maps.Marker({
            position: myCenter,
            map: map,
            title: 'My Location'
        });
        marker.setMap(map);


    }
    ;

    var linkedLocationData;
    function handleLinkedNavigation(data) {

        linkedLocationData = data;//,
        document.getElementById("linkedMap").style.display = "block";   
        var mapDiv = document.getElementById("linkedMap");
        var gMap = new google.maps.Map(mapDiv);
        var infowindow = new google.maps.InfoWindow();
        var markers = [];
        if (data)
            for (var i = 0; i < data.length; i++) {

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

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        gMap.fitBounds(bounds);
        google.maps.event.trigger(gMap, 'resize');
        gMap.setZoom(5);
    }


    $scope.getIncidentDetail = function (incidentId) {
        $scope.showLinkedModule = false;
        window.scrollTo(0, 0);

        $scope.incidentId_ = incidentId;
        $scope.incident_data = [];
        $scope.addr = "";
        $scope.addr1add2add3 = "";
        $scope.countyPost = "";
      


        IncidentReport.getIncidentReportDetail(incidentId, function (status, data) {




            $scope.$apply(function () {
             
                if (!data.link)
                    return;
                $scope.link = data.link;
                $scope.isBackRecord = $scope.link.previous > 0 ? true : false;
                $scope.isNextRecord = $scope.link.next > 0 ? true : false;
                $scope.incident = data.incident_details;


                data.Civil_recovery_offenders.forEach(function (obj) {
                    var result = data.linked_offenders.filter(
                            function (obj1) {
                                return (obj1.ofndr_id == obj.ofndr_id);
                            }
                    );




                    var offName = "";
                    if (result[0].firstname_usr && result[0].lastname_usr) {
                        if (result[0].firstname_usr.length > 0 && result[0].lastname_usr.length > 0) {
                            offName = result[0].firstname_usr + " " + result[0].lastname_usr;
                        } else if (result[0].firstname_usr.length > 0 && result[0].lastname_usr.length <= 0) {
                            offName = result[0].firstname_usr;
                        } else if (result[0].firstname_usr.length <= 0 && result[0].lastname_usr.length > 0) {
                            offName = result[0].lastname_usr;
                        }
                    }
                    obj.name = offName
                    obj.image = constanObject.offenderImageBaseUrl + obj.ofndr_id + "/1";
                });
                $scope.incident_data = data;

                // victim and witness

                for (var i = 0; i < $scope.incident_data.linked_witness.length; i++) {
                    $scope.incident_data.linked_witness[i].p_tel == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_witness[i].p_tel;
                    $scope.incident_data.linked_witness[i].p_phone == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_witness[i].p_phone;
                    $scope.incident_data.linked_witness[i].p_email == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_witness[i].p_email;

                }

                for (var i = 0; i < $scope.incident_data.linked_victim.length; i++) {
                    $scope.incident_data.linked_victim[i].p_tel == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_victim[i].p_tel;
                    $scope.incident_data.linked_victim[i].p_phone == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_victim[i].p_phone;
                    $scope.incident_data.linked_victim[i].p_email == "" ? "<b>Not Supplied</b>" : $scope.incident_data.linked_victim[i].p_email;

                }

                for (var i = 0; i < $scope.incident_data.Civil_recovery_offenders.length; i++) {
                    $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_number == "" ? "<b>Not Supplied</b>" : $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_number;
                    $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_note == "" ? "<b>Not Supplied</b>" : $scope.incident_data.Civil_recovery_offenders[i].civil_recovery_note;

                }

                //console.log($scope.incident_data);
                $scope.image = constanObject.INCIDENT_USER_IMAGE + $scope.incident_details.reporter + "/1";
                $scope.incident_details = [];
                $scope.incident_details = data.incident_details;
               var postCode = $scope.incident_details.postcode == "<b>Not Supplied</b>" ? "" : $scope.incident_details.postcode;
                var add1 = $scope.incident_details.venue == null ? "" : $scope.incident_details.venue;
                var add2 = $scope.incident_details.address == null ? "" : $scope.incident_details.address;
                var add3 = $scope.incident_details.address2 == null ? "" : $scope.incident_details.address2;
                var add4 = $scope.incident_details.address3 == null ? "" : $scope.incident_details.address3;
                var county = $scope.incident_details.county == null ? "" : $scope.incident_details.county;
                var postCode = $scope.incident_details.postcode == null ? "" : $scope.incident_details.postcode;
                var arr = [];
                if (add2 != "" || add2 != null)
                    arr.push(add2);
                if (add3 != "" || add3 != null)
                    arr.push(add3);
                if (add4 != "" || add4 != null)
                    arr.push(add4);
                if (add1 != "" || add1 != null)
                    $scope.addr = add1 + "";

                if (arr.lenght > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        if (i == arr.length - 1)
                            $scope.addr1add2add3 = $scope.addr1add2add3 + arr[i];
                        else
                            $scope.addr1add2add3 = $scope.addr1add2add3 + arr[i] + ",";
                    }
                }

                $scope.countyPost = [];
                if (county != "" && postCode != "")
                    $scope.countyPost = $scope.countyPost + county + "," + postCode;
                else if (county == "" && postCode != "")
                    $scope.countyPost = $scope.countyPost + postCode;
                else if (county != "" && postCode == "")
                    $scope.countyPost = $scope.countyPost + county;
                else if (county == "" && postCode == "")
                    $scope.countyPost = "";
                $scope.linked_offenders = data.linked_offenders;
                $scope.linked_vehicles = data.linked_vehicles;
                $scope.linked_witnesses = data.linked_witness;
                $scope.linked_victims = data.linked_victim;
                $scope.linked_incidents = data.linked_incident;
//                for(var i=0; i<$scope.linked_offenders.length;i++){
//                    $scope.linked_offenders.push({image:constanObject.offenderImageBaseUrl + $scope.linked_offenders[i].ofndr_id}); 
//                }
                ////console.log("$scope.linked_offenders : "+JSON.stringify($scope.linked_offenders));
                handleNavigation($scope.incident_details.latitude, $scope.incident_details.longitude);
                if (data.linked_locations.length > 0) {
                    $scope.hideMap = false;
                    handleLinkedNavigation(data.linked_locations);

//                    for (var i = 0; i < data.linked_locations.length; i++) {
//                        handleLinkedNavigation(data.linked_locations[i].latitude, data.linked_locations[i].longitude);
//                    }
                } else {
                    $scope.hideMap = true;
                }
            });
        })
    };




    $scope.init();





});
