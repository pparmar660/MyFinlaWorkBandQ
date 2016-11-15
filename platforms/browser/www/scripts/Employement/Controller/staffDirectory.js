BandQModule.controller("staffDirectory", ['$scope', '$rootScope', '$filter', 'checkInternetConnectionService', 'appMenuConfig', 'moduleAccessPermission', function ($scope, $rootScope, $filter, checkInternetConnectionService, appMenuConfig, moduleAccessPermission) {
        $scope.staffAcesslevel = [];
        $scope.staffListMemeber = [];
        $scope.staffListCategory = [];
        $scope.staffMiniProfile = [];
        $scope.staffImage = '';
        $scope.serachAlfa = '';
        $scope.filteredstaffListMemeber = [];
        $scope.derivedStaff = new Array(0);
        $scope.staffFilterCat = [];
        $scope.counrty = [];
        $scope.responseMessage = [];
        $scope.filterdata = [];
        $scope.catIdforAllSearch = 0;
        //multiple select
        $scope.Countries = [];
        $scope.Regions = [];
        $scope.Zones = [];
        $scope.Venues = [];
        $scope.stafflevel = [];
        $scope.search = {
            "name": "",
            "accessLevel": [],
            "country": [],
            category: 0,
            "region": [],
            "venue": [],
            "zone": []
        };

        $scope.selectedCountry = new Array(0);
        $scope.selectedRegion = new Array(0);
        $scope.selectedZone = new Array(0);
        $scope.selectedVenue = new Array(0);
        $scope.search = {};
        $scope.allCountryList = [];
        $scope.allRegionList = [];
        $scope.allZoneList = [];
        $scope.allVenueList = [];

        // $rootScope.staffDirectorytemplate = false;
        $rootScope.isStaffDirectoryAdd = false;


        $scope.isStaffNotFound = false;

        $scope.search.country = 0;
        $scope.search.region = 0;
        $scope.search.zone = 0;
        $scope.search.venue = 0;
        $scope.staffCountryDisable = false;
        $scope.staffRegionDisable = false;
        $scope.staffZoneDisable = false;
        $scope.staffVenueDisable = false;
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
        $scope.moduleAccessInStaff = {};
        $scope.moduleAccessInStaff = moduleAccessPermission.getModulePermission();
        $scope.init = function () {
            window.scrollTo(0, 0);
            if ($rootScope.staffDirectorytemplate) {
                $scope.showHideTemplate($scope.employmentTemplateType.STAFF_DIRECTORY);

                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                    return;
                }

                $scope.staffminiprofile = false;
                $scope.showimage = true;
                webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_ACCESS_LEVEL, null, constanObject.employmentWebRequestType.GET_STAFF_ACCESS_LEVEL, true);
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_STAFF_MEMBERS, null, constanObject.employmentWebRequestType.GET_LIST_STAFF_MEMBERS, true);
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_STAFF_CATEGORIES, null, constanObject.employmentWebRequestType.GET_LIST_STAFF_CATEGORIES, true);
                webRequestObject.postRequest($scope, "GET", constanObject.FILTER_DATA, null, constanObject.employmentWebRequestType.FILTER_DATA, true);
            }
            // reset previous selected staffcatiergy and search input when change from one to another page.
            $scope.select(0);
            $scope.search.name = "";
            $scope.selectedCountry = "";
            $scope.selectedRegion = "";
            $scope.selectedZone = "";
            $scope.selectedVenue = "";
        };
        $scope.addStaff = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }

            var newstaffDetailScope = angular.element('#addStaffSection').scope();
            newstaffDetailScope.profile = null;
            newstaffDetailScope.init();
            $rootScope.staffDirectorytemplate = false;
            $rootScope.isStaffDirectoryAdd = true;
            $rootScope.staffDetailtemplate = false;
            $rootScope.menuTitle = "Employment";
            $rootScope.subMenuTitle = "Staff Directory";
            $rootScope.subMenuTitle1 = "Add Staff";
        };

        $scope.getCountry = function (selectedCountry) {
            $scope.Regions = new Array(0);
            $scope.Zones = new Array(0);
            $scope.Venues = new Array(0);
            $scope.search.country = [];
            if (selectedCountry.length == 0) {
                $scope.selectedCountry = new Array(0);
                $scope.search.country = 0;
                $scope.selectedCountry = new Array(0);
                $scope.selectedRegion = new Array(0);
                $scope.selectedZone = new Array(0);
                $scope.selectedVenue = new Array(0);

            } else {
                for (var i = 0; i < selectedCountry.length; i++) {

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
                $scope.staffRegionDisable = false;
            else
                $scope.staffRegionDisable = true;

            if ($scope.Zones.length > 0)
                $scope.staffZoneDisable = false;
            else
                $scope.staffZoneDisable = true;

            if ($scope.Venues.length > 0)
                $scope.staffVenueDisable = false;
            else
                $scope.staffVenueDisable = true;
        };
        $scope.getRegion = function (selectedRegion) {
            //console.log("regionId: "+regionId.id_rgs);
            $scope.Zones = new Array(0);
            $scope.Venues = new Array(0);

            $scope.search.region = [];
            if (selectedRegion.length == 0) {
                $scope.search.region = 0;
                // $scope.search.zone = 0;
                // $scope.search.venue = 0;

                $scope.regionId = new Array(0);
                $scope.selectedRegion = new Array(0);
                $scope.selectedZone = new Array(0);
                $scope.selectedVenue = new Array(0);
                // $scope.selectedZone = new Array(0);
                //$scope.selectedVenue = new Array(0);

            } else {
                for (i = 0; i < selectedRegion.length; i++) {
                    //console.log("Selected regions are " + selectedRegion[i].id_rgs);
                    $scope.search.region.push(selectedRegion[i].id_rgs);
                }
                //console.log("Selected Region Ids : " + $scope.search.region);
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
                $scope.staffZoneDisable = false;
            else
                $scope.staffZoneDisable = true;

            if ($scope.Venues.length > 0)
                $scope.staffVenueDisable = false;
            else
                $scope.staffVenueDisable = true;
        };
        $scope.getZone = function (selectedZone) {
            $scope.search.zone = [];
            $scope.Venues = new Array(0);
            if (selectedZone.length == 0) {
                $scope.search.zone = 0;
                $scope.selectedZone = new Array(0);
                $scope.selectedVenue = new Array(0);
            } else {
                for (i = 0; i < selectedZone.length; i++) {

                    $scope.search.zone.push(selectedZone[i].pk_zone);
                }

            }
            for (var i = 0; i < $scope.allVenueList.length; i++) {
                for (var j = 0; j < selectedZone.length; j++) {
                    if ($scope.allVenueList[i].zone_vns == selectedZone[j].pk_zone)
                        if ($.inArray($scope.allVenueList[i], $scope.Venues) < 0)
                            $scope.Venues.push($scope.allVenueList[i]);

                }
            }
           
            if ($scope.Venues.length > 0)
                $scope.staffVenueDisable = false;
            else
                $scope.staffVenueDisable = true;
        };
        $scope.getVenue = function (selectedVenue) {
            //console.log("venueId: "+venueId.id);
            // $scope.search.venue = venueId.id;
            $scope.search.venue = [];
            if (selectedVenue.length == 0) {
                $scope.search.venue = 0;
            } else {
                for (i = 0; i < selectedVenue.length; i++) {
                    //console.log("Selected venue are " + selectedVenue[i].id);

                    $scope.search.venue.push(selectedVenue[i].id);
                }
            }

        };
        //location wise filter
        $scope.locationFilter = function () {
            // $("a#removehighlight").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }

            $scope.staffminiprofile = false;
            var search = {
                search: $scope.search
            };
            //console.log(JSON.stringify(search));     
            webRequestObject.postRequest($scope, "GET", constanObject.GET_LOCATION_WISE_FILTER, search, constanObject.employmentWebRequestType.GET_LOCATION_WISE_FILTER, true);

        }
        $scope.getStaffDetail = function (staffDetail) {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }

            for (var i = 0; i < $scope.derivedStaff.length; i++) {
                if ($scope.derivedStaff[i] == staffDetail)
                    $scope.derivedStaff[i].class = "active";
                else
                    $scope.derivedStaff[i].class = "";
            }

            $scope.staffminiprofile = true;
            webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_PROFILE + staffDetail.id_usr, null, constanObject.employmentWebRequestType.STAFF_DETAIL, true);
            webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_IMAGE + staffDetail.id_usr + '/' + '1', null, constanObject.employmentWebRequestType.GET_STAFF_IMAGE, false);

        }
        // filter list satff category
        $scope.catId;
        $scope.staffCatfilter = function (cat_Id) {
            $scope.classOfAllStaff = "active";
            for (var i = 0; i < $scope.derivedStaff.length; i++) {
                $scope.derivedStaff[i].class = "";
            }

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            $scope.catIdforAllSearch = cat_Id;
            $scope.staffminiprofile = false;
            //send catogetry for search 
            $scope.search.category = cat_Id;
            if (cat_Id == 0)
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_STAFF_MEMBERS, null, constanObject.employmentWebRequestType.GET_LIST_STAFF_MEMBERS, false);
            else
                webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_CAT_FILTER + cat_Id + '/' + 'all', null, constanObject.employmentWebRequestType.GET_STAFF_CAT_FILTER, false);


        }

        $scope.classOfAllStaff = "active";
        //search all stafflist
        $scope.searchAllStaff = function (catIdforAllSearch) {
            $scope.classOfAllStaff = "active";

            for (var i = 0; i < $scope.alphabet.length; i++)
                $scope.alphabet[i].class = "";

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            $scope.staffminiprofile = false;
            if (catIdforAllSearch == 0)
                webRequestObject.postRequest($scope, "GET", constanObject.GET_LIST_STAFF_MEMBERS, null, constanObject.employmentWebRequestType.GET_LIST_STAFF_MEMBERS, false);
            else
                webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_CAT_FILTER + catIdforAllSearch, null, constanObject.employmentWebRequestType.GET_STAFF_CAT_FILTER, false);


        }
        $scope.webRequestResponse = function (requestType, status, response) {

            if (status == constanObject.ERROR) {
                $scope.$apply(function () {
                    $scope.showFalureMessage = true;
                    $scope.showSucessMessage = false;

                });
                if (requestType == constanObject.employmentWebRequestType.GET_LIST_STAFF_MEMBERS || requestType == constanObject.employmentWebRequestType.GET_STAFF_CAT_FILTER || requestType == constanObject.employmentWebRequestType.GET_LOCATION_WISE_FILTER)
                {

                    $scope.$apply(function () {
                        $scope.isStaffNotFound = true;
                        $scope.staffNotFound = response.responseJSON.error;
                    });
                    //$scope.responseMessage=response.responseJSON.error;
                    //console.log($scope.responseMessage);
                    $scope.derivedStaff = [];
                    $scope.$digest();

                }

                return;
            }
            switch (requestType) {
                case constanObject.employmentWebRequestType.GET_STAFF_ACCESS_LEVEL:
                    $scope.$apply(function () {
                        $scope.derivedstaffAcesslevel = response.data;
                        var sm = function (el, i, ar) {
                            $scope.derivedstaffAcesslevel[i].level_ulv = el.level_ulv.trim();
                        }
                        $scope.derivedstaffAcesslevel.map(sm);
                        $scope.filteredAcessLevel = [];
                        $scope.filteredAcessLevel = $filter('orderBy')($scope.derivedstaffAcesslevel, "level_ulv");
                        $scope.staffAcesslevel = $scope.filteredAcessLevel;
                        for (var j = 0; j < $scope.staffAcesslevel.length; j++) {
                            $scope.stafflevel.push($scope.staffAcesslevel[j].level_ulv);
                        }

                    });
                    //store selected checkbox data checkbox data
                    $scope.lst = [];
                    $scope.change = function (accesslevel, active) {
                        //  send  aceessLevel for search
                        // $scope.search.accessLevel=accesslevel.id_ulv;


                        if (active)
                            $scope.lst.push(accesslevel);
                        else
                            $scope.lst.splice($scope.lst.indexOf(accesslevel), 1);
                    };
                    //end checkbox
                    break;
                    //STAFF MEMEBER DETAIL 
                case constanObject.employmentWebRequestType.GET_LIST_STAFF_MEMBERS:
                case constanObject.employmentWebRequestType.GET_STAFF_CAT_FILTER:
                case constanObject.employmentWebRequestType.GET_LOCATION_WISE_FILTER:
                    $scope.isStaffNotFound = false;
                    $scope.$apply(function () {

                        $scope.staffListMemeber = response.data;
                        var sm = function (el, i, ar) {
                            try {
                                $scope.staffListMemeber[i].firstname_usr = el.firstname_usr.trim();
                            } catch (e) {
                            }
                        }
                        $scope.staffListMemeber.map(sm);
                        $scope.filteredstaffListMemeber = [];
                        $scope.filteredstaffListMemeber = $filter('orderBy')($scope.staffListMemeber, "firstname_usr");
                        $scope.derivedStaff = $scope.filteredstaffListMemeber;
                        $scope.classOfAllStaff = "active";
                        for (var i = 0; i < $scope.derivedStaff.length; i++) {
                            $scope.derivedStaff[i].class = "";
                        }



                    });
                    break;
                    //LIST STAFF CATEOGRY
                case constanObject.employmentWebRequestType.GET_LIST_STAFF_CATEGORIES:
                    $scope.staffListCategory = response;
                    /* $scope.staffListCategory.unshift({
                     "id_uct": 0,
                     "title_uct": "All"
                     });*/
                    break;
                case constanObject.employmentWebRequestType.STAFF_DETAIL:

                    $scope.staffMiniProfile = response[0];

                    $scope.usersJob = false;
                    $scope.venueUser = false;
                    $scope.usersTelephone = false;
                    $scope.usersMobile = false;
                    $scope.usersEmail = false;
                    if ($scope.staffMiniProfile.is_online == 1) {
                        $scope.IsVisible = true;
                    }
                    if ($scope.staffMiniProfile.is_online == 0) {
                        $scope.NotVisible = true;
                    }
                    if ($scope.staffMiniProfile.view_profile == 1) {
                        $scope.showViewProfile = true;
                    }
                    if ($scope.staffMiniProfile.view_profile == 0) {
                        $scope.showViewProfile = false;
                    }
                    if ($scope.staffMiniProfile.job_usr == "" || $scope.staffMiniProfile.job_usr == null) {
                        $scope.usersJob = true;
                    }
                    if ($scope.staffMiniProfile.venue_usr == "" || $scope.staffMiniProfile.venue_usr == null) {
                        $scope.venueUser = true;
                    }
                    if ($scope.staffMiniProfile.telephone_usr == "" || $scope.staffMiniProfile.telephone_usr == null) {
                        $scope.usersTelephone = true;
                    }
                    if ($scope.staffMiniProfile.mobile_usr == "" || $scope.staffMiniProfile.mobile_usr == null) {
                        $scope.usersMobile = true;
                    }
                    if ($scope.staffMiniProfile.email_usr == "" || $scope.staffMiniProfile.email_usr == null) {
                        $scope.usersEmail = true;
                    }

                    $scope.$apply(function () {
                        $scope.staffImage = constanObject.GET_STAFF_IMAGE + response[0].id_usr + "/1";

                    });
                    //$scope.$digest();          
                    break;
                case constanObject.employmentWebRequestType.FILTER_DATA:
                    //console.log("GET FILTER DATA: "+JSON.stringify(response));  
                    $scope.$apply(function () {
                        $scope.filterdata = response;

                        $scope.Countries = $scope.allCountryList = $scope.filterdata.country;
                        if ($scope.Countries.length > 0)
                            $scope.staffCountryDisable = false;
                        else
                            $scope.staffCountryDisable = true;
                        $scope.Regions = $scope.allRegionList = $scope.filterdata.regions;
                        if ($scope.Regions.length > 0)
                            $scope.staffRegionDisable = false;
                        else
                            $scope.staffRegionDisable = true;
                        $scope.Zones = $scope.allZoneList = $scope.filterdata.zones;
                        if ($scope.Zones.length > 0)
                            $scope.staffZoneDisable = false;
                        else
                            $scope.staffZoneDisable = true;
                        $scope.Venues = $scope.allVenueList = $scope.filterdata.venues.data;
                        if ($scope.Venues.length > 0)
                            $scope.staffVenueDisable = false;
                        else
                            $scope.staffVenueDisable = true;

                    });
                    break;
            }

        }
        //active class for staff category...
        $scope.select = function (item) {
            $scope.selected = item;
        };
        $scope.select(0);
        $scope.isActive = function (item) {
            return $scope.selected === item;
        };
        //alphabet a to z
        $scope.alphabet = [];
        for (var i = 65; i < 91; i++) {
            var data = {};
            data.value = String.fromCharCode(i);
            data.class = "";
            $scope.alphabet.push(data);
        }
        $scope.searchStaff = function (x) {

            $scope.classOfAllStaff = "";
            for (var i = 0; i < $scope.alphabet.length; i++) {
                if ($scope.alphabet[i] == x)
                    $scope.alphabet[i].class = "active";
                else
                    $scope.alphabet[i].class = "";
            }


            $scope.staffminiprofile = false;
            $scope.isStaffNotFound = false;
            $scope.derivedStaff = $scope.filteredstaffListMemeber;
            var temp = new Array(0);
            for (var i = 0, n = $scope.derivedStaff.length; i < n; i++) {
                if ($scope.derivedStaff[i].firstname_usr[0] == x.value) {
                    temp.push($scope.derivedStaff[i]);
                }
                if (i == n - 1) {
                    $scope.derivedStaff = angular.copy(temp);
                    temp = null;
                }
            }

        }
        // redirect view profile page 
        $scope.viewProfile = function () {
            window.scrollTo(0, 0);
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            var staffScope = angular.element($("#staffDetail")).scope();
            //$rootScope.staffDetailtemplate = true;
            //     $scope.showHideTemplate($scope.employmentTemplateType.STAFF_DETAIL);
            $rootScope.staffDetailtemplate = true;

            $rootScope.staffDirectorytemplate = false;
            $rootScope.venueDetailtemplate = false;
            $rootScope.venueDirectorytemplate = false;
            $rootScope.internetconnection = false;

            $rootScope.menuTitle = 'Employment';
            $rootScope.subMenuTitle = 'Staff Directory';
            $rootScope.subMenuTitle1 = 'Staff Profile';

            staffScope.previosbutton = true;
            staffScope.backbutton = false;
            staffScope.staffProfile[0] = $scope.staffMiniProfile;
            staffScope.getProfile();
            staffScope.stafImage = $scope.staffImage;
            staffScope.loggeduser = false;
        };
        //checkbox filter by level_ulv 

        $scope.filterByLevel = function (level_ulv) {
            // send acessLevel to searchdata
            $scope.staffminiprofile = false;
            // filtering 
            // send Access level for searching
            //$scope.search.accessLevel = level_ulv;
            var i = $.inArray(level_ulv, $scope.stafflevel);
            if (i > -1) {
                $scope.stafflevel.splice(i, 1);
            } else {
                $scope.stafflevel.push(level_ulv);
            }

        }
        $scope.accessFilter = function (derivedStaff) {
            if ($scope.stafflevel.length >= 0) {
                if ($.inArray(derivedStaff.level_ulv, $scope.stafflevel) < 0)
                    return;
            }
            return derivedStaff;
        }


    }]);