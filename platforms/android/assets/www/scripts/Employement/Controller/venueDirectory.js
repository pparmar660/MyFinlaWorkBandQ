BandQModule.controller("venueDirectory", ['$scope', '$rootScope', '$filter', 'checkInternetConnectionService', 'appMenuConfig', 'moduleAccessPermission', function ($scope, $rootScope, $filter, checkInternetConnectionService, appMenuConfig, moduleAccessPermission) {

        $scope.ListVenueAll = [];
        $scope.DerivedVenue = new Array(0);
        $scope.derivedvenueAcesslevel = [];
        $scope.venueAcesslevel = [];
        $scope.venueListCategory = [];
        $scope.staffMiniProfile = [];
        $scope.filterdata = [];
        $scope.staffvenueMiniProfile = [];
        $scope.venueImage = [];
        $scope.venuecatIdforAllSearch = 0;
        $scope.Organisations = [];
        $scope.Countries = [];
        $scope.Regions = [];
        $scope.Zones = [];
        $scope.VenueSectorlevel = [];
        $scope.allCountryList = [];
        $scope.allRegionList = [];
        $scope.allZoneList = [];
        $scope.organisationDisable = false;
        $scope.countryDisable = false;
        $scope.regionDisable = false;
        $scope.zoneDisable = false;
        $scope.search = {
            name: "",
            "organisation": [],
            "country": [],
            category: [],
            "region": [],
            "zone": []
        };

        $scope.search.country = 0;
        $scope.search.region = 0;
        $scope.search.zone = 0;
        $scope.search.organisation = 0;
        var x = -1;
        $scope.isVenueNotFound = false;
        var appMenu = appMenuConfig.getModuleMenus();
        $scope.employment = {};
        var VENUES_MANAGER = 33,
                STAFF = 145,
                MY_PROFILE = 272;
        angular.forEach(appMenu, function (value, key) {

            if (key == VENUES_MANAGER) {
                $scope.employment.venuePermission = value;
            }
            else if (key == STAFF) {
                $scope.employment.staffPermission = value;
            }
            else if (key == MY_PROFILE) {
                $scope.employment.myProfilePermission = value;
            }
        });
        $scope.moduleAccessInVenue = {};
        $scope.moduleAccessInVenue = moduleAccessPermission.getModulePermission();
        $scope.init = function () {
            window.scrollTo(0, 0);
            if ($rootScope.venueDirectorytemplate) {
                $scope.showHideTemplate($scope.employmentTemplateType.VENUE_DIRECTORY);

                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                    return;
                }
                $scope.venueminiprofile = false;

                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_ALL, null, constanObject.employmentWebRequestType.GET_LIST_VENUE_ALL, true);
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_SECTOR, null, constanObject.employmentWebRequestType.GET_LIST_VENUE_SECTOR, true);
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_CATEGORIES, null, constanObject.employmentWebRequestType.GET_LIST_VENUE_CATEGORIES, true);
                webRequestObject.postRequest($scope, "GET", constanObject.FILTER_DATA, null, constanObject.employmentWebRequestType.FILTER_DATA, true);
                // reset previous selected staffcatiergy and search input when change from one to another page.
                $scope.select(0);
                $scope.search.name = "";
                $scope.selectedOrganisation = "";
                $scope.selectedCountry = "";
                $scope.selectedRegion = "";
                $scope.selectedZone = "";

            }
        }
        // Search at ALL a/c to ListVenuesByCategory
        $scope.classOfAllStaff = "active";
        $scope.searchAllVenue = function (venuecatIdforAllSearch) {
            $scope.classOfAllStaff = "active";
            for (var i = 0; i < $scope.alphabet.length; i++)
                $scope.alphabet[i].class = "";
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            $scope.venueminiprofile = false;
            if (venuecatIdforAllSearch == 0)
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_ALL, null, constanObject.employmentWebRequestType.GET_LIST_VENUE_ALL, true);
            else
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_BY_CATEGORIES + venuecatIdforAllSearch + '/' + 'all', null, constanObject.employmentWebRequestType.GET_LIST_VENUE_BY_CATEGORIES, true);


        }
        $scope.getVenueDetail = function (id, gLat, gLng) {

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            for (var i = 0; i < $scope.DerivedVenue.length; i++) {
                if ($scope.DerivedVenue[i].id == id)
                    $scope.DerivedVenue[i].class = "active";
                else
                    $scope.DerivedVenue[i].class = "";
            }
            $scope.venueminiprofile = true;
            x = id;
            webRequestObject.postRequest($scope, "GET", constanObject.GET_VENUE_DETAIL + id, null, constanObject.employmentWebRequestType.GET_VENUE_DETAIL, true);
            // google map marker
            function venue_map() {
                var mapDiv = document.getElementById("map1");
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
                    position: new google.maps.LatLng(gLat, gLng),
                    map: map,
                    title: 'Set lat/lon values for this property'
                });
                
                google.maps.event.addListenerOnce(map, 'idle', function () {
                google.maps.event.trigger(map, 'resize');
                marker.setPosition(new google.maps.LatLng(gLat, gLng));
                map.panTo(new google.maps.LatLng(gLat, gLng));
            });
            }
            ;
            venue_map();

        }

        $scope.ListVenuesByCategory = function (id_venuectg) {
            $scope.classOfAllStaff = "active";
            for (var i = 0; i < $scope.DerivedVenue.length; i++) {
                $scope.DerivedVenue[i].class = "";
            }

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }

            $scope.search.category = id_venuectg;
            $scope.venuecatIdforAllSearch = id_venuectg;
            $scope.venueminiprofile = false;
            if (id_venuectg == 0) {
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_ALL, null, constanObject.employmentWebRequestType.GET_LIST_VENUE_ALL, true);
            } else
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_VENUE_BY_CATEGORIES + id_venuectg + '/' + 'all', null, constanObject.employmentWebRequestType.GET_LIST_VENUE_BY_CATEGORIES, true);

        }
        $scope.getOrganisation = function (selectedOrganisation) {
            $scope.search.organisation = [];
            if (selectedOrganisation.length == 0) {
                $scope.selectedOrganisation = new Array(0);
                $scope.search.organisation = 0;
            } else {
                for (var i = 0; i < selectedOrganisation.length; i++) {
                    //console.log("Selected organisations are " + selectedOrganisation[i].id);
                    $scope.search.organisation.push(selectedOrganisation[i].id);
                }
                //console.log("Selected organisations Ids : " + $scope.search.organisation);
            }
            if ($scope.Countries.length > 0)
                $scope.countryDisable = false;
            else
                $scope.countryDisable = true;
            if ($scope.Regions.length > 0)
                $scope.regionDisable = false;
            else
                $scope.regionDisable = true;
            if ($scope.Zones.length > 0)
                $scope.zoneDisable = false;
            else
                $scope.zoneDisable = true;

        };
        $scope.getCountry = function (selectedCountry) {

            $scope.Regions = [];//$scope.allRegionList = $scope.filterdata.regions;
            $scope.Zones = [];// $scope.allZoneList = $scope.filterdata.zones;

            $scope.search.country = [];
            if (selectedCountry.length == 0) {
                $scope.selectedCountry = new Array(0);
                $scope.selectedRegion = new Array(0);
                $scope.selectedZone = new Array(0);
                $scope.search.country = 0;
            } else {
                for (var i = 0; i < selectedCountry.length; i++) {
                    //console.log("Selected countries are " + selectedCountry[i].id_cnt);
                    $scope.search.country.push(selectedCountry[i].id_cnt);
                }
            }
            for (var i = 0; i < $scope.allRegionList.length; i++) {

                for (var j = 0; j < selectedCountry.length; j++) {

                    for (var k = 0; k < $scope.allRegionList[i].country.length; k++) {

                        if ($scope.allRegionList[i].country[k].id_cnt == selectedCountry[j].id_cnt)
                            if ($.inArray($scope.allRegionList[i], $scope.Regions) < 0)
                                $scope.Regions.push($scope.allRegionList[i]);
                    }
                }
            }
              if ($scope.Regions.length > 0)
                $scope.regionDisable = false;
            else
                $scope.regionDisable = true;
            if ($scope.Zones.length > 0)
                $scope.zoneDisable = false;
            else
                $scope.zoneDisable = true;
        };
        $scope.getRegion = function (selectedRegion) {
            $scope.search.region = [];
            $scope.Zones = [];// $scope.allZoneList = $scope.filterdata.zones;
            if (selectedRegion.length == 0) {
                $scope.search.region = 0;
                $scope.regionId = new Array(0);
                $scope.selectedRegion = new Array(0);
                $scope.selectedZone = new Array(0);
            } else {
                for (i = 0; i < selectedRegion.length; i++) {
                    //console.log("Selected regions are " + selectedRegion[i].id_rgs);
                    $scope.search.region.push(selectedRegion[i].id_rgs);
                }
                //console.log("Selected regions Ids : " + $scope.search.region);
            }


            for (var i = 0; i < $scope.allZoneList.length; i++) {

                for (var j = 0; j < selectedRegion.length; j++) {

                    for (var k = 0; k < $scope.allZoneList[i].region.length; k++) {

                        if ($scope.allZoneList[i].region[k].fk_region == selectedRegion[j].id_rgs)
                            if ($.inArray($scope.allZoneList[i], $scope.Zones) < 0)
                                $scope.Zones.push($scope.allZoneList[i]);

                    }
                }
            }
             if ($scope.Zones.length > 0)
                $scope.zoneDisable = false;
            else
                $scope.zoneDisable = true;
        };
        $scope.getZone = function (selectedZone) {
            $scope.search.zone = [];
            if (selectedZone.length == 0) {
                $scope.search.zone = 0;
                $scope.selectedZone = new Array(0);
            } else {
                for (i = 0; i < selectedZone.length; i++) {
                    //console.log("Selected Zones are " + selectedZone[i].pk_zone);
                    $scope.search.zone.push(selectedZone[i].pk_zone);
                }
                //console.log("Selected Zone Ids : " + $scope.search.zone);
            }
        };
        $scope.venueFilter = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            $scope.venueminiprofile = false;
            var search = {
                search: $scope.search
            };
            // console.log(JSON.stringify(search));
            webRequestObject.postRequest($scope, "GET", constanObject.GET_VENUELIST_WISE_FILTER, search, constanObject.employmentWebRequestType.GET_VENUELIST_WISE_FILTER, true);

        }
        $scope.webRequestResponse = function (requestType, status, response) {


            if (status == constanObject.ERROR) {
                $scope.$apply(function () {
                    $scope.showFalureMessage = true;
                    $scope.showSucessMessage = false;
                    //showErrorAlert(requestType, responseData);
                });


                if (requestType == constanObject.employmentWebRequestType.GET_LIST_VENUE_ALL || requestType == constanObject.employmentWebRequestType.GET_LIST_VENUE_BY_CATEGORIES || requestType == constanObject.employmentWebRequestType.GET_VENUELIST_WISE_FILTER)
                {

                    $scope.$apply(function () {
                        $scope.isVenueNotFound = true;
                        $scope.venueNotFound = response.responseJSON.error;
                    });
                    $scope.DerivedVenue = [];
                    $scope.$digest();

                }
                return;
            }

            switch (requestType) {
                case constanObject.employmentWebRequestType.GET_LIST_VENUE_ALL:
                case constanObject.employmentWebRequestType.GET_LIST_VENUE_BY_CATEGORIES:
                case constanObject.employmentWebRequestType.GET_VENUELIST_WISE_FILTER:
                    $scope.isVenueNotFound = false;
                    $scope.$apply(function () {
                        $scope.ListVenueAll = response.data;
                        var sm = function (el, i, ar) {
                            try {

                                $scope.ListVenueAll[i].venue_name = el.venue_name.trim();

                            } catch (e) {
                            }
                        }
                        $scope.ListVenueAll.map(sm);
                        $scope.filteredListVenue = [];
                        $scope.filteredListVenue = $filter('orderBy')($scope.ListVenueAll, "venue_name");
                        $scope.DerivedVenue = $scope.filteredListVenue;


                        for (var i = 0; i < $scope.DerivedVenue.length; i++) {

                            $scope.DerivedVenue[i].class = "";
                        }
                        $scope.classOfAllStaff = "active";
                    })
                    break;
                    //listvenue sector
                case constanObject.employmentWebRequestType.GET_LIST_VENUE_SECTOR:
                    $scope.$apply(function () {
                        $scope.derivedvenueAcesslevel = response.data;
                        var venueDetailScope = angular.element('#editVenueSection').scope();
                        venueDetailScope.sector = response.data;
                        var sm = function (el, i, ar) {
                            $scope.derivedvenueAcesslevel[i].sector_title = el.sector_title.trim();
                        }
                        $scope.derivedvenueAcesslevel.map(sm);
                        $scope.filteredsectorVenue = [];
                        $scope.filteredsectorVenue = $filter('orderBy')($scope.derivedvenueAcesslevel, "sector_title");
                        $scope.venueAcesslevel = $scope.filteredsectorVenue;

                        for (var j = 0; j < $scope.venueAcesslevel.length; j++) {
                            $scope.VenueSectorlevel.push($scope.venueAcesslevel[j].sector_title);
                        }
                    });
                    break;
                    // venue catogery 
                case constanObject.employmentWebRequestType.GET_LIST_VENUE_CATEGORIES:
                    $scope.venueListCategory = response.data;
                    var venueDetailScope = angular.element('#editVenueSection').scope();
                    venueDetailScope.categories = response.data;
                    break;
                case constanObject.employmentWebRequestType.GET_VENUE_DETAIL:
                    $scope.$apply(function () {
                        $scope.telephoneUser = false;
                        $scope.venuEmail = false;
                        $scope.staffvenueMiniProfile = response.data[x][0];
                        $scope.venueImage = response.data.linked_images;
                        $scope.venueCount = response.data.count;
                        if ($scope.staffvenueMiniProfile.telephone == "" || $scope.staffvenueMiniProfile.telephone == null) {
                            $scope.telephoneUser = true;
                        }
                        if ($scope.staffvenueMiniProfile.email_venue == "" || $scope.staffvenueMiniProfile.email_venue == null) {
                            $scope.venuEmail = true;
                        }
                    });
                    break;
                case constanObject.employmentWebRequestType.FILTER_DATA:
                    //console.log("GET FILTER DATA: "+JSON.stringify(response));
                    $scope.$apply(function () {
                        $scope.filterdata = response;
                        var venueDetailScope = angular.element('#editVenueSection').scope();
                        venueDetailScope.filterData = response;

                        $scope.Organisations = $scope.filterdata.organisations;
                        if ($scope.Organisations.length > 0)
                            $scope.organisationDisable = false;
                        else
                            $scope.organisationDisable = true;
                        $scope.Countries = $scope.allCountryList = $scope.filterdata.country;
                        if ($scope.Countries.length > 0)
                            $scope.countryDisable = false;
                        else
                            $scope.countryDisable = true;
                        $scope.Regions = $scope.allRegionList = $scope.filterdata.regions;
                        if ($scope.Regions.length > 0)
                            $scope.regionDisable = false;
                        else
                            $scope.regionDisable = true;
                        $scope.Zones = $scope.allZoneList = $scope.filterdata.zones;
                        if ($scope.Zones.length > 0)
                            $scope.zoneDisable = false;
                        else
                            $scope.zoneDisable = true;

                    })
                    break;
            }

        }
        //store selected checkbox data checkbox data
        $scope.lst = [];
        $scope.change = function (accesslevel, active) {
            if (active)
                $scope.lst.push(accesslevel);
            else
                $scope.lst.splice($scope.lst.indexOf(accesslevel), 1);
        };
        //active class for hilighting venue catogery
        $scope.select = function (item) {
            $scope.selected = item;

        };
        $scope.select(0);
        $scope.isActive = function (item) {
            return $scope.selected === item;
        };
        // bind  alphabet and search venue_directory alphabetically... 
        $scope.alphabet = [];
        for (var i = 65; i < 91; i++) {
            var data = {};
            data.value = String.fromCharCode(i);
            data.class = "";
            $scope.alphabet.push(data);
        }
        $scope.searchStaff = function (y) {
            $scope.classOfAllStaff = "";
            for (var i = 0; i < $scope.alphabet.length; i++) {
                if ($scope.alphabet[i] == y)
                    $scope.alphabet[i].class = "active";
                else
                    $scope.alphabet[i].class = "";
            }


            $scope.venueminiprofile = false;
            $scope.DerivedVenue = $scope.filteredListVenue;
            var temp = new Array(0);
            for (var i = 0, n = $scope.DerivedVenue.length; i < n; i++) {
                if ($scope.DerivedVenue[i].venue_name != null) {
                    if ($scope.DerivedVenue[i].venue_name[0] == y.value) {
                        temp.push($scope.DerivedVenue[i]);
                    }
                    if (i == n - 1) {
                        $scope.DerivedVenue = angular.copy(temp);
                        temp = null;
                    }
                }
            }
        }
        //venu sector accesslevel
        $scope.select = function (item) {

            $scope.selected = item;
        };
        $scope.select(0);
        $scope.isActive = function (item) {
            return $scope.selected === item;
        };

        $scope.filterByLevel = function (sector_title) {
            // filtering 
            var i = $.inArray(sector_title, $scope.VenueSectorlevel);
            if (i > -1) {
                $scope.VenueSectorlevel.splice(i, 1);
            } else {
                $scope.VenueSectorlevel.push(sector_title);
            }
        }
        $scope.accessFilter = function (DerivedVenue) {
            if ($scope.VenueSectorlevel.length >= 0) {
                if ($.inArray(DerivedVenue.sector_title, $scope.VenueSectorlevel) < 0)
                    return;
            }
            return DerivedVenue;
        }
        //redirect to  venue profile 
        $scope.venueProfile = function () {
            window.scrollTo(0, 0);
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            var venueScope = angular.element($("#venuedetail")).scope();
            $scope.showHideTemplate($scope.employmentTemplateType.VENUE_DETAIL);
            //not supplied for empty data  
            venueScope.title = false;
            venueScope.venueCode = false;
            venueScope.venueSite = false;
            venueScope.catVenue = false;
            venueScope.sectorTitle = false;
            venueScope.telephoneNo = false;
            venueScope.venueEmailuser = false;
            venueScope.telephoneNo = false;
            venueScope.Address = false;
            venueScope.Adrress2 = false;
            venueScope.Address3 = false;
            venueScope.postCode = false;
            venueScope.countyNo = false;
            venueScope.nameregion = false;
            venueScope.zoneVenue = false;
            venueScope.countryName = false;
            venueScope.venueprofile = [];
            venueScope.count = [];
            venueScope.venueprofile.push($scope.staffvenueMiniProfile);
            venueScope.venueImages = $scope.venueImage;
            venueScope.count.push($scope.venueCount);
            //venueScope.venueprofile.updateddate = moment($scope.staffvenueMiniProfile.last_updated).format('Do MMMM YYYY');
            // for empyt data 
            if (venueScope.venueprofile[0].title_vna == "" || venueScope.venueprofile[0].title_vna == null) {
                venueScope.title = true;
            }
            if (venueScope.venueprofile[0].venue_code == "" || venueScope.venueprofile[0].venue_code == null) {
                venueScope.venueCode = true;
            }
            if (venueScope.venueprofile[0].venue_site_number == "" || venueScope.venueprofile[0].venue_site_number == null) {
                venueScope.venueSite = true;
            }
            if (venueScope.venueprofile[0].category_venuectg == "" || venueScope.venueprofile[0].category_venuectg == null) {
                venueScope.catVenue = true;
            }
            if (venueScope.venueprofile[0].sector_title == "" || venueScope.venueprofile[0].sector_title == null) {
                venueScope.sectorTitle = true;
            }
            if (venueScope.venueprofile[0].telephone == "" || venueScope.venueprofile[0].telephone == null) {
                venueScope.telephoneNo = true;
            }
            if (venueScope.venueprofile[0].email_venue == "" || venueScope.venueprofile[0].email_venue == null) {
                venueScope.venueEmailuser = true;
            }
            if (venueScope.venueprofile[0].address == "" || venueScope.venueprofile[0].address == null) {
                venueScope.Address = true;
            }
            if (venueScope.venueprofile[0].address2 == "" || venueScope.venueprofile[0].address2 == null) {
                venueScope.Adrress2 = true;
            }
            if (venueScope.venueprofile[0].address3 == "" || venueScope.venueprofile[0].address3 == null) {
                venueScope.Address3 = true;
            }
            if (venueScope.venueprofile[0].postcode == "" || venueScope.venueprofile[0].postcode == null) {
                venueScope.postCode = true;
            }
            if (venueScope.venueprofile[0].county == "" || venueScope.venueprofile[0].county == null) {
                venueScope.countyNo = true;
            }
            if (venueScope.venueprofile[0].name_rgs == "" || venueScope.venueprofile[0].name_rgs == null) {
                venueScope.nameregion = true;
            }
            if (venueScope.venueprofile[0].zone_vns == "" || venueScope.venueprofile[0].zone_vns == null) {
                venueScope.zoneVenue = true;
            }
            if (venueScope.venueprofile[0].name_cnt == "" || venueScope.venueprofile[0].name_cnt == null) {
                venueScope.countryName = true;
            }
            venueScope.venueDetailTab = true;
            venueScope.Venueimagemedias = false;
            $rootScope.venueDetailtemplate = true;
            $("#venueDetailId").addClass('resp-tab-active');
            $("#imageMediaVenueId").removeClass('resp-tab-active');
            venueScope.init($scope.staffvenueMiniProfile.gLat, $scope.staffvenueMiniProfile.gLng);
            //for venueDetail page tab 
            //send id to venuDetailPage
            venueScope.venueId = $scope.staffvenueMiniProfile.id;
        }
    }]);