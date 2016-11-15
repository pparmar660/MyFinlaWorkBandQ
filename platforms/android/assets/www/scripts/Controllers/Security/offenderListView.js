BandQModule.controller('OffenderListCtrl', function ($scope, advanceFilter, OffenderService, $rootScope, checkInternetConnectionService, imageService, globalService, getAdvanceFilter) {
    $scope.Time = 0;
    $rootScope.show = false;
    $scope.canclebtntitle = "Yes";
    $scope.prevShowStatus = null;
    $scope.nextShowStatus = null;
    $scope.nextPageURL = null;
    $scope.infoShow1 = false;
    $scope.page = 1;
    $scope.prevPageURL = null;
    $scope.country = [{id_cnt: 0, name_cnt: "Select Country"}];
    $scope.region = null;
    $scope.zone = null;
    $scope.venue = null;
    $scope.relation = null;
    $scope.advanceFilterResultShow = false;

    $scope.offendersVal = [];
    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];

    $scope.countrySelect = new Array(0);
    $scope.selectedregion = new Array(0);
    $scope.selectedzone = new Array(0);
    $scope.selectedvanue = new Array(0);
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
    $scope.Offender_List_Advance_filter = {};
    $scope.filterData = {
        country: [],
        region: [],
        zone: [],
        venue: []
    };

    $scope.advanceFilterData = {};
    $scope.searchParameter = null;
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

    $scope.noInternetConnectionOnList = false;
    $scope.categoryTitle = {};
    var isCountryReverse = false;
    var isRegieonReverse = false;
    var isZoneReverse = false;
    var isVenueReverse = false;

    $scope.offCountryDisable = false;
    $scope.offRegionDisable = false;
    $scope.offZoneDisable = false;
    $scope.offVenueDisable = false;
    var parent = $("#listOffender_202").parents(".incident_report_wrapper");
    parent.removeClass("incident_report_wrapper");


    var addActiveCalss = function () {

        setTimeout(function () {
            if (!angular.element('#securitySidePanelController').scope()) {
                addActiveCalss();
            } else {
                $scope.$apply(function () {
                    var scopeOfSidePannel = angular.element('#securitySidePanelController').scope();
                    scopeOfSidePannel.offender();
                });
            }


        }
        , 1000);
    }

    $scope.init = function () {

        if (localStorage.getItem("pushItemId")) {
            $rootScope.offenderDetailShowStatus = true;
            $rootScope.offenderListShowStatus = false;
            $rootScope.offenderAddShowStatus = false;

        }
        addActiveCalss();
        getFilterData();
        $scope.activeMenu = 'All';
        $rootScope.show = false;
        $scope.Offender_List_Advance_filter.countrySelect = {name_cnt: "Country"};
        $scope.Offender_List_Advance_filter.selectedregion = {id_rgs: 0, name_rgs: "Region"};
        $scope.Offender_List_Advance_filter.selectedzone = {pk_zone: 0, zone_name: "Zone"};
        $scope.Offender_List_Advance_filter.selectedvanue = {id: 0, venue_name: "Venue"};
        $scope.incidentListStaff = globalService.getUserProfileTypeAndId();

        if (globalService.getUserProfileTypeAndId().userId) {
            if (globalService.getUserProfileTypeAndId().type == 'staff') {
                $scope.staffParameter = '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
                $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter;
                globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
            } else if (globalService.getUserProfileTypeAndId().type == 'venue') {
                $scope.staffParameter = '/' + globalService.getUserProfileTypeAndId().type + '/' + globalService.getUserProfileTypeAndId().userId;
                $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter;
                globalService.setUserProfileTypeAndId({'type': '', 'userId': ''});
            }
        } else {
            $scope.staffParameter = '';
            $scope.url = constanObject.OFFENDERS_LIST_URL;
        }

        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_FILTER_PRESELECTION, function (result) {
            var data = result;
            var preData = data.location_selection;
            console.log("PreSelection Data : " + JSON.stringify(preData));
            $scope.$apply(function () {
                $scope.country = $scope.allCountryList = data.country;
                if ($scope.country.length > 0)
                    $scope.offCountryDisable = false;
                else
                    $scope.offCountryDisable = true;
                $scope.region = $scope.allRegionList = data.regions;
                if ($scope.region.length > 0)
                    $scope.offRegionDisable = false;
                else
                    $scope.offRegionDisable = true;
                $scope.zone = $scope.allZoneList = data.zones;
                if ($scope.zone.length > 0)
                    $scope.offZoneDisable = false;
                else
                    $scope.offZoneDisable = true;
                $scope.venue = $scope.allVenueList = data.venues.data;
                if ($scope.venue.length > 0)
                    $scope.offVenueDisable = false;
                else
                    $scope.offVenueDisable = true;

                for (var i = 0; i < $scope.country.length; i++) {
                    var obj = $scope.country[i];
                    // $scope.selectedCountry = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id_cnt == preData[j].country_vns) {
                            $scope.countrySelect.push(obj);
                            break;
                        }
                    }

                }

                for (var i = 0; i < $scope.venue.length; i++) {
                    var obj = $scope.venue[i];
                    //$scope.selectedVenue = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id == preData[j].id) {
                            $scope.selectedvanue.push(obj);
                            break;
                        }
                    }
                }

                for (var i = 0; i < $scope.zone.length; i++) {
                    var obj = $scope.zone[i];
                    // $scope.selectedZone = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.pk_zone == preData[j].zone_vns) {
                            $scope.selectedzone.push(obj);
                            break;
                        }
                    }
                }


                for (var i = 0; i < $scope.region.length; i++) {
                    var obj = $scope.region[i];
                    // $scope.selectedRegion = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id_rgs == preData[j].region_vns) {
                            $scope.selectedregion.push(obj);
                            break;
                        }
                    }
                }

                for (var i = 0; i < preData.length; i++) {
                    $scope.filterData.country.push(preData[i].country_vns);
                    $scope.filterData.region.push(preData[i].region_vns);
                    $scope.filterData.zone.push(preData[i].zone_vns);
                    $scope.filterData.venue.push(preData[i].id);
                }

//                console.log("countrySelect : " + $scope.countrySelect)
//                console.log("selectedregion : " + $scope.selectedregion)
//                console.log("selectedzone : " + $scope.selectedzone)
//                console.log("selectedvanue : " + $scope.selectedvanue)

                //console.log("PRE SELECTED DATA : " + JSON.stringify($scope.search));
                $scope.searchParameter = {search: $scope.filterData};
                 getOffenderList();
                window.plugins.spinnerDialog.hide();
               
            });


        }, true);

        //  webRequestObject.postRequest($scope, "GET", constanObject.ListOffenderCategories, "", constanObject.WebRequestType.ListOffenderCategory, true);

        window.scrollTo(0, 0);
    };

    function getOffenderList() {

        OffenderService.getOffenderList($scope.page, $scope.url, $scope.searchParameter, function (status, responseData, data) {

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
                    $scope.offenderCount = responseData.category_count;
                    $scope.infoShow1 = false;
                    $scope.offendersVal = data;
                    setVehicleCommsStatus($scope.offendersVal);
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;
                }
            });
        });
    }
    ;
    $scope.init();

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
    $scope.addNewOffenders = function ($event, type) {
        var scope = angular.element('#addOffender_204').scope();
        scope.isEditOffender = false;
        $rootScope.moveToSecurityDashboard = false;
        $rootScope.show = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderListShowStatus = false;
        $rootScope.offenderAddShowStatus = true;
        $rootScope.title = "Add New Offender";
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Offenders & OCGs';
        $rootScope.subMenuTitle1 = 'Add New';
        $rootScope.dashboardLink = '#/dashboard';
        scope.init();
    };

    $scope.allOffender = function (category, index) {
        $scope.page = 1;
        $scope.activeMenu = category.title_uct;
        $scope.url = constanObject.OFFENDER + category.id_uct;
        var searchData = {search: $scope.filterData};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.allOfenderCount = responseData.total;
                    $scope.offenderCount = responseData.category_count;
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
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
        });
    };

    $scope.knownOffender = function () {
        $("div ul.offenderTab li:first-child a").removeClass("active");
        $("div ul.offenderTab li:nth-child(2) a").addClass("active");
        $("div ul.offenderTab li:last-child a").removeClass("active");
        //$scope.url = constanObject.KNOWN_OFFENDER;
        $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter + constanObject.KNOWN_OFFENDER_PARAMETERS;
        $scope.page = 1;

        $scope.searchParameter = {search: $scope.filterData};
        OffenderService.getOffenderTypeList($scope.page, $scope.url, searchParameter, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
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
            //   hilightoffender();
        });
    };
    $scope.unknownOffender = function () {
        $("div ul.offenderTab li:first-child a").removeClass("active");
        $("div ul.offenderTab li:nth-child(2) a").removeClass("active");
        $("div ul.offenderTab li:last-child a").addClass("active");
        //  $scope.url = constanObject.UNKNOWN_OFFENDER;
        $scope.url = constanObject.OFFENDERS_LIST_URL + $scope.staffParameter + constanObject.UNKNOWN_OFFENDER_PARAMETERS;
        $scope.page = 1;
        $scope.searchParameter = {search: $scope.filterData};

        OffenderService.getOffenderTypeList($scope.page, $scope.url, $scope.searchParameter, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $scope.infoShow1 = false;
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
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
            //     hilightoffender();
        });
    };

    $scope.searchBtnAction = function (searchName) {
//        $scope.filterData = {}
        $scope.page = 1;
        $scope.filterData.name = searchName;
        $scope.filteroffender();
    };
    $scope.clickOffender = function (obj) {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.offenderListShowStatus = true;
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderAddShowStatus = false;


        } else {
            $rootScope.offenderListShowStatus = false;
            $rootScope.offenderDetailShowStatus = true;
            $rootScope.offenderAddShowStatus = false;

            var scope = angular.element('#offenderDetail_203').scope();
            scope.last_updated = obj.last_updated;
            scope.offender = obj;
            $rootScope.show = false;
            scope.edit = null;
            scope.getOffenderDetail(obj.id_usr);

        }
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Offenders & OCGs';
        $rootScope.subMenuTitle1 = 'Offender Details';
        $rootScope.dashboardLink = '#/dashboard';

    };

    $scope.$on('checkInternetConnection', function (event, arg) {
        $scope.$apply(function () {
            if (!arg.network)
                $scope.noInternetConnectionOnList = true;
            else {
                $scope.noInternetConnectionOnList = false;

            }
        });
    });

    $scope.editOffender = function (obj, type) {
        var scope = angular.element('#addOffender_204').scope();
        scope.isEditOffender = true;
        $rootScope.moveToSecurityDashboard = false;
        $rootScope.offenderListShowStatus = false;
        $rootScope.offenderDetailShowStatus = false;
        $rootScope.offenderAddShowStatus = true;
        scope.init();
        scope.updateOffender = obj;
        scope.getOffenderData(obj.id_usr);

    };


    $scope.nextPageRequest = function () {
        $scope.page++;
        OffenderService.getOffenderList($scope.page, $scope.url, $scope.searchParameter, function (status, responseData, data) {
            $scope.$apply(function () {
                if (status) {
                    $rootScope.show = false;
                    $scope.infoShow1 = false;
                    $scope.prevShowStatus = true;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
                } else {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = false;
                    $scope.page--;
                }
            });
        });
        window.scrollTo(0, 0);
    }

    $scope.previousPageRequest = function () {
        if ($scope.page > 1) {
            $scope.prevShowStatus = true;
            $scope.nextShowStatus = true;
            var page = ($scope.page > 1 ? (--$scope.page) : 1);

            OffenderService.getOffenderList(page, $scope.url, $scope.searchParameter, function (status, responseData, data) {
                $scope.$apply(function () {
                    $scope.offendersVal = data;
                    $scope.offenderCount = responseData.category_count;
                });
                $rootScope.show = false;
                //    hilightoffender();
                $scope.infoShow1 = false;
            });
        } else {
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
        }
        window.scrollTo(0, 0);
    };


    $scope.filteroffender = function () {
        var searchData = {search: $scope.filterData};

        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            if (status) {
                $scope.$apply(function () {
                    $scope.allOfenderCount = responseData.total;
                    $scope.infoShow1 = false;
                    $rootScope.show = false;

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

            } else {
                $scope.$apply(function () {
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.offendersVal = [];
                    if (responseData.count)
                        $scope.offenderCount = responseData.count;

                });

            }
        });
    };

    $scope.adavanceFilterOffender = function () {
        $scope.searchParameter = {adavancesearch: $scope.advanceFilterData};
        var searchData = {adavancesearch: $scope.advanceFilterData};
        OffenderService.getOffenderList($scope.page, $scope.url, searchData, function (status, responseData, data) {
            if (status) {
                $scope.advanceFilterResultShow = true;
                $scope.responseData = responseData;
                $scope.$apply(function () {
                    $scope.infoShow1 = false;
                    $rootScope.show = false;
                    $scope.offendersVal = responseData.data;
                    $scope.offenderCount = responseData.category_count;
                    if (responseData.next_page_url != null) {
                        $scope.nextShowStatus = true;
                    } else {
                        $scope.nextShowStatus = false;
                    }
                    $scope.prevShowStatus = false;


                });

                //      hilightoffender();
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
    $scope.severityChange = function (eth) {
        if (eth.length <= 4) {
            var arr = [];
            eth.forEach(function (obj) {
                arr.push(obj.keys);
            });
            $scope.SelectedSeverity = arr;
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



    $scope.infoClose = function () {
        $scope.infoShow1 = false;
    }

    $scope.getCountry = function (country) {
        var isCountryHasData = false;
        $scope.filterData.country = [];
        if (country.length == 0) {
            $scope.region = new Array(0);
            $scope.zone = new Array(0);
            $scope.venue = new Array(0);

            $scope.filterData.country = 0;
            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;

            $scope.countrySelect = new Array(0);
            $scope.selectedregion = new Array(0);
            $scope.selectedzone = new Array(0);
            $scope.selectedvanue = new Array(0);
        } else {
            for (var i = 0; i < country.length; i++)
                $scope.filterData.country.push(country[i].id_cnt);
        }

        // set region, zone and venue

        for (var i = 0; i < $scope.allRegionList.length; i++) {

            for (var j = 0; j < country.length; j++) {

                for (var k = 0; k < $scope.allRegionList[i].country.length; k++) {

                    if ($scope.allRegionList[i].country[k].id_cnt == country[j].id_cnt) {
                        if ($.inArray($scope.allRegionList[i], $scope.region) < 0)
                            $scope.region.push($scope.allRegionList[i]);
                        isCountryHasData = true;
                        break;
                    }
                }
            }
        }


        if (!isCountryHasData) {

            $scope.region = new Array(0);
            $scope.zone = new Array(0);
            $scope.venue = new Array(0);


            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;


            $scope.selectedregion = new Array(0);
            $scope.selectedzone = new Array(0);
            $scope.selectedvanue = new Array(0);

        }
        
        if ($scope.region.length > 0)
            $scope.offRegionDisable = false;
        else
            $scope.offRegionDisable = true;
        if ($scope.zone.length > 0)
            $scope.offZoneDisable = false;
        else
            $scope.offZoneDisable = true;
        if ($scope.venue.length > 0)
            $scope.offVenueDisable = false;
        else
            $scope.offVenueDisable = true;
        $scope.filteroffender($scope.filterData);

    };



    $scope.regionChange = function (region) {
        $scope.filterData.region = [];
        $scope.zone = new Array(0);
        $scope.newSelectedZone = $scope.selectedzone;
        if (region.length == 0) {

            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.selectedregion = new Array(0);
            $scope.selectedzone = new Array(0);
            $scope.selectedvanue = new Array(0);
        } else {
            for (var i = 0; i < region.length; i++) {
                $scope.filterData.region.push(region[i].id_rgs);
            }

            $scope.filterData.country = [];
            $scope.countrySelect = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < region.length; j++) {
                    for (var k = 0; k < region[j].country.length; k++) {
                        if ($scope.allCountryList[i].id_cnt == region[j].country[k].id_cnt)
                            if ($.inArray($scope.allCountryList[i], $scope.countrySelect) < 0) {
                                $scope.countrySelect.push($scope.allCountryList[i]);
                                $scope.filterData.country.push(region[j].country[k].id_cnt);
                            }
                    }
                }
            }

        }

        // set region, zone and venue
        // set  zone and venue


        for (var i = 0; i < $scope.allZoneList.length; i++) {

            for (var j = 0; j < region.length; j++) {

                for (var k = 0; k < $scope.allZoneList[i].region.length; k++) {

                    if ($scope.allZoneList[i].region[k].fk_region == region[j].id_rgs) {
                        if ($.inArray($scope.allZoneList[i], $scope.zone) < 0)
                            $scope.zone.push($scope.allZoneList[i]);

                    }
                }
            }
        }

        $scope.selectedzone = new Array(0);

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.selectedzone = new Array(0);
                for (var i = 0; i < $scope.zone.length; i++) {
                    for (var j = 0; j < $scope.newSelectedZone.length; j++)
                        if ($scope.zone[i].pk_zone == $scope.newSelectedZone[j].pk_zone) {
                            $scope.selectedzone.push($scope.zone[i]);
                            break;
                        }
                }
            });
        }, 200);

        if ($scope.zone.length > 0)
            $scope.offZoneDisable = false;
        else
            $scope.offZoneDisable = true;
        if ($scope.venue.length > 0)
            $scope.offVenueDisable = false;
        else
            $scope.offVenueDisable = true;
        $scope.filteroffender($scope.filterData);
    };

    $scope.zoneChange = function (zone) {
        $scope.filterData.zone = [];
        var newSelectedVenue = angular.copy($scope.selectedvanue);

        $scope.venue = [];
        if (zone.length == 0) {
            $scope.venue = new Array(0);
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.selectedzone = new Array(0);
            $scope.selectedvanue = new Array(0);
        } else {
            $scope.selectedvanue = new Array(0);
            for (var i = 0; i < zone.length; i++)
                $scope.filterData.zone.push(zone[i].pk_zone);

            if ($scope.filterData.region == 0) {
                $scope.filterData.region = [];
            }
            $scope.filterData.region = [];
            $scope.selectedregion = [];

            for (var i = 0; i < $scope.allRegionList.length; i++) {
                for (var j = 0; j < zone.length; j++) {
                    for (var k = 0; k < zone[j].region.length; k++) {
                        if ($scope.allRegionList[i].id_rgs == zone[j].region[k].fk_region) {
                            if ($.inArray($scope.allRegionList[i], $scope.selectedregion) < 0) {
                                $scope.selectedregion.push($scope.allRegionList[i]);
                                $scope.filterData.region.push(zone[j].region[k].fk_region);
                            }
                        }
                    }

                    //$scope.region.push($scope.allRegionList[i]);

                }
            }





            if ($scope.filterData.country == 0) {
                $scope.filterData.country = [];
            }

            $scope.countrySelect = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < $scope.selectedregion.length; j++) {
                    for (var k = 0; k < $scope.selectedregion[j].country.length; k++) {
                        if ($scope.allCountryList[i].id_cnt == $scope.selectedregion[j].country[k].id_cnt) {
                            if ($.inArray($scope.allCountryList[i], $scope.countrySelect) < 0) {
                                $scope.countrySelect.push($scope.allCountryList[i]);
                                $scope.filterData.country.push(zone[j].country_vns);
                            }
                        }
                    }
                }
            }

        }

        for (var i = 0; i < $scope.allVenueList.length; i++) {
            for (var j = 0; j < zone.length; j++) {
                if ($scope.allVenueList[i].zone_vns == zone[j].pk_zone) {
                    if ($.inArray($scope.allVenueList[i], $scope.venue) < 0)
                        $scope.venue.push($scope.allVenueList[i]);
                    break;
                }

            }
        }

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.selectedvanue = new Array(0);
                for (var i = 0; i < $scope.venue.length; i++) {
                    for (var j = 0; j < newSelectedVenue.length; j++)
                        if ($scope.venue[i].id == newSelectedVenue[j].id) {
                            $scope.selectedvanue.push($scope.venue[i]);
                            break;
                        }
                }
            });
        }, 200);
        if ($scope.venue.length > 0)
            $scope.offVenueDisable = false;
        else
            $scope.offVenueDisable = true;
        $scope.filteroffender($scope.filterData);
    };

    $scope.vanueChange = function (venue) {
        $scope.filterData.venue = [];
        $scope.filterData.zone = [];
        $scope.filterData.country = [];
        $scope.filterData.region = [];
        if (venue.length == 0) {
            $scope.filterData.venue = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.country = 0;
            $scope.filterData.region = 0;
            $scope.countrySelect = [];
            $scope.selectedzone = [];
            $scope.selectedregion = [];
        } else {
            for (var i = 0; i < venue.length; i++)
                $scope.filterData.venue.push(venue[i].id);

            $scope.selectedzone = [];
            $scope.selectedregion = [];
            if ($scope.filterData.venue == 0) {
                $scope.filterData.venue = []
            }
            if ($scope.filterData.zone == 0) {
                $scope.filterData.zone = [];
            }
            if ($scope.filterData.region == 0) {
                $scope.filterData.region = [];
            }


            for (var i = 0; i < $scope.allZoneList.length; i++) {
                for (var j = 0; j < venue.length; j++) {
                    if ($scope.allZoneList[i].pk_zone == venue[j].zone_vns) {
                        $scope.selectedzone.push($scope.allZoneList[i]);
                        $scope.filterData.zone.push($scope.allZoneList[i].pk_zone);
                    }
                }
            }
            for (var i = 0; i < $scope.allRegionList.length; i++) {
                for (var j = 0; j < venue.length; j++) {
                    if ($scope.allRegionList[i].id_rgs == venue[j].region_vns) {
                        if ($.inArray($scope.allRegionList[i], $scope.selectedregion) < 0) {
                            $scope.selectedregion.push($scope.allRegionList[i]);
                            $scope.filterData.region.push(venue[j].region_vns);
                        }
                    }
                }
            }

            if ($scope.filterData.country == 0) {
                $scope.filterData.country = [];
            }

            $scope.countrySelect = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < venue.length; j++) {

                    if ($scope.allCountryList[i].id_cnt == venue[j].country_vns)
                        if ($.inArray($scope.allCountryList[i], $scope.countrySelect) < 0) {
                            $scope.countrySelect.push($scope.allCountryList[i]);
                            $scope.filterData.country.push(venue[j].country_vns);
                        }

                }
            }

        }
        $scope.filteroffender($scope.filterData);
    };

    $scope.showAdvanceFilter = false;
    $scope.myFunc = function () {
        $scope.showAdvanceFilter = !$scope.showAdvanceFilter;
    };

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

    $scope.closeSuccess = function () {
        $scope.isSuccess = false;
    };

    function setVehicleCommsStatus(data) {

        for (var i = 0; i < data.length; i++) {
            if (data[i].add_comm == 1) {
                $scope.offendersVal[i].isAddComm = true;
            } else {
                $scope.offendersVal[i].isAddComm = false;
            }
        }

        //console.log("$scope.offendersVal : " + JSON.stringify($scope.offendersVal));
    }
//    
    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {


            return;
        }
        switch (requestType) {
//            case constanObject.WebRequestType.ListOffenderCategory:
//                $scope.$apply(function () {
//                    $scope.categoryTitle = responseData.data;
////                    $scope.knownOffenderCount = responseData.data[1].count;
////
////                    $scope.unknownOffenderCount = responseData.data[0].count;
//
//
//                });
//                break;
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
                //console.log("Comms Details : " + JSON.stringify(responseData));
                $scope.$apply(function () {

                    $scope.commsNote = responseData.data.list_data;

//                    for(var i=0;i<$scope.commsNote.length;i++){
//                        $scope.staffImage.push({src:constanObject.GetStaffImage+$scope.commsNote[i].id_usr+"/1"})
//                    }
                });
                //console.log("$scope.commsNote : " + JSON.stringify($scope.commsNote));
                break;
        }
    };



});


BandQModule.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

