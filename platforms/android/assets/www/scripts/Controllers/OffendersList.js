BandQModule.controller('OffendersCntrl', function ($scope, OffenderService,
        $rootScope, $interval, checkInternetConnectionService, globalService, getAdvanceFilter,
        getCountryStateRegion) {
    $scope.Time = 0;
    $rootScope.show = false;
    $scope.canclebtntitle = "Yes";
    $scope.alertMessage = "";
    $scope.alertshowstatus = false;
    $scope.prevShowStatus = null;
    $scope.nextShowStatus = null;
    $scope.nextPageURL = null;
    $scope.infoShow1 = false;
    $scope.url = constanObject.OFFENDERS_LIST_URL;
    $scope.page = 1;
    $scope.prevPageURL = null;
    $scope.country = [{id_cnt: 0, name_cnt: "Select Country"}];
    $scope.region = null;
    $scope.zone = null;
    $scope.venue = null;
    $scope.relation = null;
    $scope.advanceFilterResultShow = false;
    $scope.selectedcountry = null;
    $scope.selectedregion = null;
    $scope.selectedzone = null;
    $scope.responseData = null;
    $scope.selectedvenue = null;
    $scope.relation = null;
    $scope.offendersVal = [];
    $scope.searchText = "";
    $scope.selectedOffenders = [];
    $scope.gender = [];
    $scope.ethnicity = [];
    $scope.eyecolour = [];
    $scope.facialhair = [];
    $scope.haircolour = [];
    $scope.severity = [];
    $scope.category = [];
    $scope.build = [];
    $scope.height = [];
    $scope.piercings = [];
    $scope.position = [];
    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];
    //$scope.selectedVictims = [];
    $scope.selectedCountry = [];
    $scope.selectedVenue = [];
    $scope.selectedZone = [];
    $scope.selectedRegion = [];
    $scope.countryDisable = false;
    $scope.regionDisable = false;
    $scope.zoneDisable = false;
    $scope.disable = false;
    $scope.Offender_List_Advance_filter = {};
    $scope.filterData = {};
    $scope.filterData = {
        "country": [],
        "region": [],
        "zone": [],
        "venue": [],
        "name": ""
    };

    $scope.advanceFilterData = {};
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
    var successMsg = "";
    $scope.isSuccess = false;
    var offenderId = 0;
    var isSelection = false;
    var moduleId = 258;
    $scope.commsNote = [];
    $scope.staffImage = "";
    $scope.isUploadSuccess = false;
    $scope.isCommAllowed = false;

    var parent = $("#202").parents(".incident_report_wrapper");
    parent.removeClass("incident_report_wrapper");
    var noOfPageMove;
    $scope.position = [
        {id: 0, val: "Please Select"},
        {id: 1, val: "Face"},
        {id: 2, val: "Neck"},
        {id: 3, val: "Left arm"},
        {id: 4, val: "Right arm"},
        {id: 5, val: "Front of body"},
        {id: 6, val: "Back"},
        {id: 7, val: "Left leg upper"},
        {id: 8, val: "Right leg upper"},
        {id: 9, val: "Left leg lower"},
        {id: 10, val: "Right leg lower"},
        {id: 11, val: "Left foot"},
        {id: 12, val: "Right foot"},
    ];
    // $scope.categoryTitle = {};
    $scope.init = function () {
        
        $scope.page = 1;
        $rootScope.show = false;
        $scope.advanceFilterData = {};
        $scope.filterData = {};
        $scope.advanceFilterResultShow = false;
        $scope.activeMenu = 'All';
    
        $rootScope.offenserAddShowStatus = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderListShowStatus = true;

        if ($rootScope.addOffenderFromSelectedOfenderList)
        {
            $rootScope.offenserAddShowStatus = true;
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderListShowStatus = false;
            $rootScope.addOffenderFromSelectedOfenderList = false;

        }

        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.offenserAddShowStatus = true;
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderListShowStatus = false;
            return;

        } else {
              showSpinner(true, true, SPINNER_MESSAGE);
            loadCountryData();
            getFilterData();
            webRequestObject.postRequest($scope, "GET", constanObject.ListOffenderCategories, "", constanObject.WebRequestType.ListOffenderCategory, true);
            var preData = globalService.getVenueId();
            $scope.filterData.country = preData.country_vns;
            $scope.filterData.region = preData.region_vns;
            $scope.filterData.zone = preData.zone_vns;
            $scope.filterData.venue = preData.id;
            window.plugins.spinnerDialog.hide();   

            var searchData = {search: $scope.filterData};
            OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
                $scope.$apply(function () {
                    if (!status) {
                        $scope.infoShow1 = true;
                        $scope.offendersVal = [];
                        if (responseData.count)
                            $scope.offenderCount = responseData.count;
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    } else {
                        $scope.allOfenderCount = responseData.total;
                        $scope.infoShow1 = false;
                        $scope.offenderCount = responseData.category_count;
                        $scope.offendersVal = data;
                        setCommsStatus($scope.offendersVal);
                        if (responseData.next_page_url != null) {
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.nextShowStatus = false;
                        }
                        $scope.prevShowStatus = false;

                    }
                });
                if ($scope.selectedOffenders.length > 0) {
                    hilightoffender();
                }
            });
        }
        ;

        $scope.reset();
    }

    function getFilterData() {

        var data = getAdvanceFilter.getData();
        if (!data) {
            setTimeout(function () {
                getFilterData();
            }, 50);
        } else {
            setTimeout(function () {

                $scope.$apply(function () {
                    $scope.gender = data.gender;
                    $scope.ethnicity = data.ethnicity;
                    $scope.eyecolour = data.eyecolour;
                    $scope.facialhair = data.facialhair;
                    $scope.haircolour = data.haircolour;
                    $scope.build = data.build;
                    $scope.height = data.height;
                    $scope.piercings = data.piercings;
                    $scope.position = data.position;
                    $scope.category = data.category;
                    //console.log("$scope.category : "+JSON.stringify($scope.category));
                    $scope.severity = data.severity;
                    $scope.severityLen = $scope.severity.length;
                    $scope.categoryLen = $scope.severity.category;
                    $scope.ethnicityLen = $scope.ethnicity.length;
                    $scope.genderLen = $scope.gender.length;
                    $scope.heightLen = $scope.height.length;
                    $scope.buildLen = $scope.build.length;
                    $scope.haircolourLen = $scope.haircolour.length;
                    $scope.facialhairLen = $scope.facialhair.length;
                    $scope.positionLen = $scope.position.length;
                    $scope.piercingsLen = $scope.piercings.length;
                })

            }, 10);
        }

    }


    $scope.addNewOffenders = function ($event) {
        var scope = angular.element('#204').scope();
        scope.editOffender = false;
        $rootScope.show = false;
        $rootScope.offenderListShowStatus = false;
        $rootScope.offenserAddShowStatus = true;
        scope.init();
    };

    $scope.allOffender = function (category, index) {
        $scope.activeMenu = category.title_uct;
        $scope.url = constanObject.OFFENDER + category.id_uct;
        $scope.page = 1;
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        // var preData = globalService.getVenueId();
        // var searchData = {search: {country: preData.country_vns, zone: preData.zone_vns, venue: preData.id, region: preData.region_vns}};

        var searchData = {search: $scope.filterData};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.allOfenderCount = responseData.total;
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.offenderCount = responseData.category_count;
                    $scope.offendersVal = data;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;

                } else {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.offendersVal = [];
                    if (responseData.count)
                        $scope.offenderCount = responseData.count;
                }
            });
            hilightoffender();
        });
    };

    $scope.countryChangeAction = function (val) {

        if (val.country_id.length <= 0)
            return;
    };

    $scope.searchBtnAction = function (searchName) {
//        $scope.filterData = {}
        $scope.page = 1;
        $scope.filterData.name = $scope.searchText;

        $scope.filteroffender($scope.filterData);
    };

    $scope.clickOffender = function (obj) {
        $rootScope.offenderListShowStatus = false;
        $rootScope.offenderDetailShowStatus = true;
        var scope = angular.element('#203').scope();
        scope.last_updated = obj.last_updated;
        scope.offender = obj;
        $rootScope.show = false;
        scope.edit = null;
        // 872
        // scope.getOffenderDetail("872");
        scope.getOffenderDetail(obj.id_usr);
    };
    $scope.longTapOffender = function (obj, status) {
        $rootScope.multiSelection = true;
//        $("#" + obj.id_usr).addClass("selectedOffenders");
//        $scope.selectedOffenders.push(obj);
        $rootScope.show = false;
        var scope = angular.element('#203').scope();
        scope.edit = true;
        OffenderService.getOffenderDetail(obj.id_usr, function (status, offenderData, data) {
            $scope.$apply(function () {
                $scope.selectedOffenderDetail = offenderData;
                $scope.addAndRemoveOffenders($scope.selectedOffenderDetail, status);
            })
        });


        // //console.log($scope.selectedOffenders);
    };

    $scope.addAndRemoveOffenders = function (obj, status) {
        var result = $scope.selectedOffenders.filter(
                function (obj1) {
                    return (obj1.id_usr == obj.id_usr);
                }
        );
        if (result.length > 0) {
            //if selected 
            if (status) {
                $scope.alertShow("Are you sure you want to remove this offender?", function (status) {
                    if (status) {
                        $scope.removeOffender(obj);
                    }
                });
            }
        } else {
            $scope.alertShow("Are you sure you want to add this offender?", function (status) {
                if (status) {
                    $scope.addOffender(obj);
                }
            });

        }
    };

    $scope.addOffender = function (obj) {
        $("div .offenders-view ul li").children("#" + obj.id_usr).addClass("active");

        $scope.selectedOffenders.push(obj);
        //     //console.log("offenderListData" + JSON.stringify($scope.selectedOffenders));
    };
    $scope.removeOffender = function (obj) {
        $("div .offenders-view ul li").children("#" + obj.id_usr).removeClass("active");
        var index = $scope.selectedOffenders.indexOf(obj);
        $scope.selectedOffenders = $.grep($scope.selectedOffenders, function (e) {
            return e.id_usr != obj.id_usr;

        });
        if ($scope.selectedOffenders.length <= 0) {
            $rootScope.multiSelection = false;
        }

        //  //console.log("removeOffenderListData" + JSON.stringify($scope.selectedOffenders));  
    };

    $scope.alertShow = function (msg, callBack) {
        $scope.alertMessage = msg;
        $scope.alertshowstatus = true;
        $scope.yesAction = function () {
            $scope.alertshowstatus = false;
            callBack(true);
        };
        $scope.noAction = function () {
            $scope.alertshowstatus = false;
            callBack(false);
        };
    };

    $scope.nextPageRequest = function () {
        window.scrollTo(0, 0);
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;

            $rootScope.alertMsg = "No internet connection.";
            return;
        }

        $scope.page++;
        var searchData = {search: $scope.filterData};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.allOfenderCount = responseData.total;
                    $rootScope.show = false;
                    $scope.infoShow1 = false;
                    $scope.prevShowStatus = true;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }

                    $scope.offenderCount = responseData.category_count;
                    $scope.offendersVal = data;
                } else {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = false;
                    $scope.page--;
                }
            });
            hilightoffender();
        });
    }

    $scope.previousPageRequest = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        if ($scope.page > 1) {
            window.scrollTo(0, 0);
            var page = ($scope.page > 1 ? (--$scope.page) : 1);
            var searchData = {search: $scope.filterData};
            OffenderService.getOffenderList(page, $scope.url, searchData, function (status, responseData, data) {
                $scope.$apply(function () {
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
                    if (responseData.prev_page_url != null) {
                        $scope.prevShowStatus = true;
                    } else {
                        $scope.prevShowStatus = false;
                    }
                    $scope.nextShowStatus = true;
                });
                $rootScope.show = false;
                hilightoffender();
                $scope.infoShow1 = false;
            });
        } else {
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
        }
    };




    function loadCountryData() {
        var data = getCountryStateRegion.getData();
        if (!data) {
            setTimeout(function () {
                loadCountryData();
            }, 50);
        } else {
            setTimeout(function () {

                $scope.$apply(function () {
                    $scope.Countries = $scope.allCountryList = data.country;
                    if ($scope.Countries.length > 0)
                        $scope.countryDisable = false;
                    else
                        $scope.countryDisable = true;
                    $scope.Regions = $scope.allRegionList = data.regions;
                    if ($scope.Regions.length > 0)
                        $scope.regionDisable = false;
                    else
                        $scope.regionDisable = true;
                    $scope.Zones = $scope.allZoneList = data.zones;
                    if ($scope.Zones.length > 0)
                        $scope.zoneDisable = false;
                    else
                        $scope.zoneDisable = true;
                    $scope.Venues = $scope.allVenueList = data.venues.data;
                    if ($scope.Venues.length > 0)
                        $scope.disable = false;
                    else
                        $scope.disable = true;
                    var preData = globalService.getVenueId();
                    for (var i = 0; i < $scope.Countries.length; i++) {
                        var obj = $scope.Countries[i];
                        $scope.selectedCountry = new Array(0);
                        if (obj.id_cnt == preData.country_vns) {
                            $scope.selectedCountry.push(obj);
                            break;
                        }
                    }

                    for (var i = 0; i < $scope.Venues.length; i++) {
                        var obj = $scope.Venues[i];
                        $scope.selectedVenue = new Array(0);
                        if (obj.id == preData.id) {
                            $scope.selectedVenue.push(obj);
                            break;
                        }
                    }

                    for (var i = 0; i < $scope.Zones.length; i++) {
                        var obj = $scope.Zones[i];
                        $scope.selectedZone = new Array(0);
                        if (obj.pk_zone == preData.zone_vns) {
                            $scope.selectedZone.push(obj);
                            break;
                        }
                    }
                    for (var i = 0; i < $scope.Regions.length; i++) {
                        var obj = $scope.Regions[i];
                        $scope.selectedRegion = new Array(0);
                        if (obj.id_rgs == preData.region_vns) {
                            $scope.selectedRegion.push(obj);
                            break;
                        }
                    }

                })

            }, 10);
        }

    }

    $scope.filteroffender = function (data) {
        $scope.filterData.name = data.name;
        if (data.country)
            $scope.filterData.country = data.country;
        else
            $scope.filterData.country = "0";
        if (data.region)
            $scope.filterData.region = data.region;
        else
            $scope.filterData.region = "0";
        if (data.zone)
            $scope.filterData.zone = data.zone;
        else
            $scope.filterData.zone = "0";
        if (data.venue)
            $scope.filterData.venue = data.venue;
        else
            $scope.filterData.venue = "0";
        var searchData = {search: $scope.filterData};
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            window.scrollTo(0, 0);
            $rootScope.show = true;
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        // //console.log(JSON.stringify(searchData));
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            if (status) {


                $scope.$apply(function () {
                    $scope.allOfenderCount = responseData.total;
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
//                    document.getElementById("nooffenderfoundview").style.display = "none";


                    if (responseData.prev_page_url != null) {
                        $scope.prevShowStatus = true;
                    } else {
                        $scope.prevShowStatus = false;
                    }
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
                });

                hilightoffender();
            } else {
                $scope.$apply(function () {
                    $scope.infoShow1 = true;
//                    document.getElementById("nooffenderfoundview").style.display = "block";
                    $scope.offendersVal = [];
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    if (responseData.count)
                        $scope.offenderCount = responseData.count;
                });
//                $rootScope.infoMessage = "No matching offenders found.";
            }
        });
    };

    $scope.adavanceFilterOffender = function () {

        $scope.advanceFilterData.region = [$scope.filterData.region];
        $scope.advanceFilterData.country = [$scope.filterData.country];
        $scope.advanceFilterData.zone = [$scope.filterData.zone];
        $scope.advanceFilterData.venue = [$scope.filterData.venue];

        var searchData = {adavancesearch: $scope.advanceFilterData};
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            window.scrollTo(0, 0);
            $rootScope.show = true;
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        ////console.log(JSON.stringify(searchData));
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            if (status) {
                $scope.advanceFilterResultShow = true;
                $scope.responseData = responseData;
                $scope.$apply(function () {
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.allOfenderCount = responseData.total;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    if (responseData.prev_page_url != null) {
                        $scope.prevShowStatus = true;
                    } else {
                        $scope.prevShowStatus = false;
                    }
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
                });

                hilightoffender();
            } else {
                $scope.advanceFilterResultShow = false;
                $rootScope.infoShow1 = true;
                $scope.$apply(function () {
                    $scope.infoShow1 = true;
                    $scope.offendersVal = [];
                    if (responseData.count)
                        $scope.offenderCount = responseData.count;
                });
            }
        });
    };
    $scope.closeInfo = function () {
        $scope.advanceFilterResultShow = false;
    }
    /*
     * Advance Filter list Actions
     */
    $scope.severityChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.severity = arr;
        }
    };

    $scope.categoryChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.category = arr;
        }
    };
    $scope.ethnicityChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.ethnicity = arr;
        }
    };
    $scope.genderChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.gender = arr;
        }
    };
    $scope.heightChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.height = arr;
        }
    };
    $scope.buildChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.build = arr;
        }
    };
    $scope.haircolorChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.hair_color = arr;
        }
    };
    $scope.tatoosChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.tatoos = arr;
        }
    };
    $scope.facialhairChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.facial_hair = arr;

        }
    };
    $scope.piercingChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.piercings = arr;
        }
    };
    $scope.scarificationChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.advanceFilterData.scarification = arr;
        }
    };

    $scope.getCountry = function (selectedCountry) {


        // set region, zone and venue
        $scope.Regions = new Array(0);
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        $scope.filterData.country = [];
        if (selectedCountry.length == 0) {
            $scope.filterData.country = 0;
            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;

            $scope.selectedCountry = new Array(0);
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);


        } else {
            for (var i = 0; i < selectedCountry.length; i++) {
                //console.log("Selected countries are " + selectedCountry[i].id_cnt);
                $scope.filterData.country.push(selectedCountry[i].id_cnt);
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
        if ($scope.Venues.length > 0)
            $scope.disable = false;
        else
            $scope.disable = true;

        $scope.filteroffender($scope.filterData);

    };
    $scope.regionChange = function (selectedRegion) {

        // set  zone and venue
        $scope.Zones = new Array(0);
        $scope.Venues = new Array(0);
        $scope.filterData.region = [];
        if (selectedRegion.length == 0) {
            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.selectedRegion = new Array(0);
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (var i = 0; i < selectedRegion.length; i++) {
                //console.log("Selected regions are " + selectedRegion[i].id_rgs);
                $scope.filterData.region.push(selectedRegion[i].id_rgs);
            }

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
        if ($scope.Venues.length > 0)
            $scope.disable = false;
        else
            $scope.disable = true;
        $scope.filteroffender($scope.filterData);

    };
    $scope.zoneChange = function (selectedZone) {
        $scope.Venues = new Array(0);
        $scope.filterData.zone = [];
        if (selectedZone.length == 0) {
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.selectedZone = new Array(0);
            $scope.selectedVenue = new Array(0);
        } else {
            for (var i = 0; i < selectedZone.length; i++) {

                $scope.filterData.zone.push(selectedZone[i].pk_zone);
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
            $scope.disable = false;
        else
            $scope.disable = true;
        $scope.filteroffender($scope.filterData);
    };
    $scope.getVenue = function (selectedVenue) {
        $scope.filterData.venue = [];
        if (selectedVenue.length == 0) {
            $scope.filterData.venue = 0;
        } else {
            for (var i = 0; i < selectedVenue.length; i++) {
                //console.log("Selected venue are " + selectedVenue[i].id);

                $scope.filterData.venue.push(selectedVenue[i].id);
            }


        }
        $scope.filteroffender($scope.filterData);

    };

    $scope.infoClose = function () {
        $scope.infoShow1 = false;
    }

    $scope.refreshData = function (selOff) {
    };
    $scope.nextButtonClicked = function (callback) {
        //  //console.log("NEXT");
        window.scrollTo(0, 0);
        if ($rootScope.offenderListShowStatus) {
            if ($scope.selectedOffenders.length > 0) {
                $rootScope.show = false;
//                var scope = angular.element('#205').scope();
//                scope.selectedOff = $scope.selectedOffenders;
                globalService.setOffender({'whyNot': '', 'offenderDetails': $scope.selectedOffenders, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
                return callback(true, 1);
            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = "Please add/select an offender.";
                window.scrollTo(0, 0);
                return callback(false, 0);
            }
        }
    };
    $scope.saveButtonClicked = function (callback) {
        if ($rootScope.offenderListShowStatus) {
        if ($scope.selectedOffenders.length > 0)
            globalService.setOffender({'whyNot': '', 'offenderDetails': $scope.selectedOffenders, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
      
        }
        return callback(true);

    };
    $scope.back = function (callback) {

        //console.log("BACK");
        if ($rootScope.offenderListShowStatus) {

            $rootScope.show = false;
            return callback(true);
        }
    };


    function hilightoffender() {
        $scope.selectedOffenders.forEach(function (obj) {
            $("div .offenders-view ul li").children("#" + obj.id_usr).addClass("active");
        });
    }
    ;

    var getCommsDetails = function (vechileId) {
        webRequestObject.postRequest($scope, "GET", constanObject.GetCommsDetails + moduleId + "/" + vechileId,
                null, constanObject.CommsAndTaskWebRequestType.CommsDetails, true);
    };
    $scope.addnote = {};
    $scope.showAddNotePopup = function (offenderID) {
        offenderId = offenderID;
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;
        var url = constanObject.CommsConfig + moduleId + "/" + vehicle_id;
        //function(classObject,type,webUrl,parameters,requestType,showProgress)
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

        //$scope.isNotePopUp = true;
    };

    $scope.hideAddNotePopup = function () {
        $scope.isNotePopUp = false;
    };



    $scope.methodChange = function (method) {
        //console.log("Method : " + JSON.stringify(method));
        $scope.$apply(function () {
            $scope.notes = {};
            $scope.isNoteDesc = method.detail == 1 ? true : false;
            $scope.isDeadLine = method.deadline == 1 ? true : false;
            $scope.isRemind = method.remind_me == 1 ? true : false;
            $scope.isWith = method.opt_with == 1 ? true : false;
            $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
            $scope.isDuration = method.duration == 1 ? true : false;
            $scope.notes.note_type_jnt = method.id_comms;
        });



    };

    $scope.staffChange = function (staff) {

        $scope.notes.tagged_user = [];
        $scope.$apply(function () {
            if (staff.length > 1) {
                for (var i = 0; i < staff.length; i++) {

                    $scope.notes.tagged_user.push(staff[i].id_usr);

                }

            } else {
                $scope.notes.tagged_user.push(staff[0].id_usr);
            }
        });

        //console.log("Selected Staff : " + JSON.stringify(staff));


    };

    $scope.uploadImage = function () {
        $scope.CommsImages = [];
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
        //console.log("imageURI : " + imageURI);
        $scope.isUploadSuccess = true;
        var arr = imageURI.src.split("/");
        var name = arr[arr.length - 1];
        $scope.$apply(function () {
            $scope.CommsImages.push({name: name, url: imageURI.src});
        });
        hideUploadSuccessMsg();
    }
    function hideUploadSuccessMsg() {
        $timeout(function () {
            $scope.isUploadSuccess = false;
        }, 5000);
    }

    $scope.AddNote = function () {
        $scope.notes.module_id = moduleId;
        $scope.notes.id_jno_jnt = vehicle_id;
        $scope.notes.id_usr_jnt = localStorage.getItem("userId");
        $scope.notes.note_by = localStorage.getItem("userId");
        $scope.notes.latitude = CURRENT_LATITUDE;
        $scope.notes.longitude = CURRENT_LONGITUDE;
        //console.log("Add Note Data : " + JSON.stringify($scope.notes));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.InsertComms, JSON.stringify($scope.notes), constanObject.CommsAndTaskWebRequestType.AddComms, true);
    };
    function setCommsStatus(data) {

        for (var i = 0; i < data.length; i++) {
            if (data[i].add_comm == 1) {
                $scope.offendersVal[i].isAddComm = true;
            } else {
                $scope.offendersVal[i].isAddComm = false;
            }
        }

        //console.log("$scope.offendersVal : " + JSON.stringify($scope.offendersVal));
    }
    $scope.closeSuccess = function () {
        $scope.isSuccess = false;
    };

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {


            return;
        }
        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.CommsConfigType:
                //console.log("responseData : " + JSON.stringify(responseData));
                //console.log("responseData.data.comms.comm_row_title : " + responseData.data.comm_row_title);
                $scope.$apply(function () {
                    $scope.commsTitle = responseData.data.comm_row_title;
                    $scope.comms = responseData.data.comms;
                    if ($scope.comms.length < 2)
                        $scope.isMethod = false;
                    else
                        $scope.isMethod = true;

                    //console.log(" $scope.isMethod : " + $scope.isMethod);
                    $scope.isNotePopUp = true;
                });
                $scope.selectedMethod = responseData.data.comms[0];
                $scope.methodChange($scope.selectedMethod);
                break;
            case constanObject.CommsAndTaskWebRequestType.ListStaff:

                $scope.$apply(function () {
                    $scope.ListStaff = responseData.data;
                });
                //console.log("$scope.ListStaff : " + JSON.stringify($scope.ListStaff));

                break;
            case constanObject.CommsAndTaskWebRequestType.AddComms:

                //console.log("AddComms : " + JSON.stringify(responseData));
                //{"data":{"note_id":400,"message":" Comms Inserted Successfully"}}
                var note_id = responseData.data.note_id;
                successMsg = responseData.data.message;
                if ($scope.CommsImages.length > 0) {
                    for (var i = 0; i < $scope.CommsImages.length; i++) {

                        webRequestObject.fileUpload($scope, $scope.CommsImages[i].url, constanObject.UploadCommsFile + note_id, constanObject.COMMS_IMAGE_KEY, constanObject.CommsAndTaskWebRequestType.UploadCommsFile, true);
                    }
                } else {
                    $scope.$apply(function () {
                        $scope.isSuccess = true;
                        $scope.successMsg = successMsg;
                        $scope.isNotePopUp = false;
                        getCommsDetails(offenderId);
                    });

                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                //console.log(JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.CommsImages = [];
                    $scope.isSuccess = true;
                    $scope.successMsg = successMsg;
                    $scope.isNotePopUp = false;
                    getCommsDetails(offenderId);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.CommsDetails:
                $scope.$apply(function () {
                    $scope.commsNote = responseData.data.list_data;

//                    for(var i=0;i<$scope.commsNote.length;i++){
//                        $scope.staffImage.push({src:constanObject.GetStaffImage+$scope.commsNote[i].id_usr+"/1"})
//                    }
                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    }
    $scope.reset = function () {
        if (!globalService.getOffender().offenderDetails)
            return;
        if (globalService.getOffender().offenderDetails) {
            $scope.mySelectedValues = globalService.getOffender().actionTaken;
            $scope.selectedOffenders = globalService.getOffender().offenderDetails;
        }
    }
});