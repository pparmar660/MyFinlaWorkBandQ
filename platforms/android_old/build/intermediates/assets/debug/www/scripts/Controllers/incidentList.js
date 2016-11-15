BandQModule.controller('incidentListCnt', function ($scope, IncidentReport, $rootScope, checkInternetConnectionService, $timeout, imageService, appMenuConfig, moduleAccessPermission) {
    $scope.country = [];
    $scope.region = [];
    $scope.zone = [];
    $scope.orderRepo = false;
    $scope.orderIncidentDetail = false;
    $scope.orderRef = false;
    $scope.orderStatusAndPriority = false;
    $scope.venue = [];
    $scope.infoShow1 = false;
    $scope.incidentReportStatus = [];
    $scope.incidentReportCount = [];
    $scope.prevShowStatus = false;
    $scope.nextShowStatus = true;
    $scope.IncidentList = [];
    $scope.page = 1;
    $rootScope.menuTitle = 'Security';
    $rootScope.subMenuTitle = 'Incident Reports';
    $rootScope.subMenuTitle1 = '';

    $scope.allCountryList = [];
    $scope.allRegionList = [];
    $scope.allZoneList = [];
    $scope.allVenueList = [];
    $rootScope.showNoInternetConnectionIncidentList = false;
    $rootScope.showIncidentList = true;

    $scope.filterData = {
        country: [],
        region: [],
        zone: [],
        venue: []
    };

    $scope.filter = {
        countrySelect: [],
        selectedregion: [],
        selectedzone: [],
        selectedvanue: []
    };
    $scope.listType = "";
    $scope.lastPage;
    var noOfPageMove;
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
    $scope.images = [];
    $scope.selectedStaff = [];
    var row_id = 0;
    var successMsg = "";
    $scope.isSuccess = false;
    $scope.isUploadSuccess = false;
    $scope.incidentStatus = 0;
    var appIncidentMenu = appMenuConfig.getModuleMenus();
    $scope.incident = {};
    $scope.incident1 = {};
    var INCIDENT_REPORTS = 213,
            COMMS = 249;
    angular.forEach(appIncidentMenu, function (value, key) {

        if (key == INCIDENT_REPORTS) {
            $scope.incident.incidentPermision = value;
        } else if (key == COMMS) {
            $scope.incident1.comms = value;
        }
    });
    $scope.incidentAccess = {};
    $scope.incidentAccess = moduleAccessPermission.getModulePermission();
    $scope.init = function () {
        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.showNoInternetConnectionIncidentList = true;
            $rootScope.showIncidentList = false;
        } else {
            $rootScope.showNoInternetConnectionIncidentList = false;
            $rootScope.showIncidentList = true;
        }


        $rootScope.incidentDetail = false;
        $scope.listType = "";

//        noOfPageMove = _noOfPageMove;

        if (localStorage.getItem("incidentListType") == 'staff') {
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Incident Reports';
            $rootScope.subMenuTitle1 = 'Detail';
            // $rootScope.incidentDetail = false;
            if (localStorage.getItem("incidentListId")) {
                $scope.listType = "?" + localStorage.getItem("incidentListType") + "=" + localStorage.getItem("incidentListId");
                localStorage.setItem("incidentListType", "");
                localStorage.setItem("incidentListId", "");
            }

        } else if (localStorage.getItem("incidentListType") == 'venue') {
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Incident Reports';
            $rootScope.subMenuTitle1 = 'Detail';
            // $rootScope.incidentDetail = false;

            if (localStorage.getItem("incidentListId")) {
                $scope.listType = "?" + localStorage.getItem("incidentListType") + "=" + localStorage.getItem("incidentListId");
                localStorage.setItem("incidentListType", "");
                localStorage.setItem("incidentListId", "");
            }
        } else {
            var listType;
            if (localStorage.getItem("listType"))
                listType = localStorage.getItem("listType");

            if (listType)
                if (listType.length > 0)
                {
                    $scope.listType = "?" + listType + "=1";


                    localStorage.setItem("listType", "");

                }
        }
        $scope.listName = "";
        if (listType == "myincident")
            $scope.listName = " (My Incidents)";

        if (listType == "mydraft")
            $scope.listName = " (My Draft Incidents)";
        var parent = $("#221").parents(".incident_report_wrapper");
        parent.removeClass("incident_report_wrapper");
        $scope.page = 1;
//        if ($rootScope.victimListShowStatus) {
        $scope.prevShowStatus = false;
        $scope.nextShowStatus = true;

        $scope.setFilterData();

    };


    $scope.setFilterData = function () {
        $scope.filterData = {
            country: [],
            region: [],
            zone: [],
            venue: []
        };
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + TABLE_FILTER_PRESELECTION, function (result) {

            var data = result;

            ////console.log("COUNTRY DATA" + JSON.stringify(data));
            $scope.$apply(function () {
                $scope.country = $scope.allCountryList = data.country;
                $scope.region = $scope.allRegionList = data.regions;
                $scope.zone = $scope.allZoneList = data.zones;
                $scope.venue = $scope.allVenueList = data.venues.data;
                var preData = data.location_selection;
                $scope.filter.countrySelect = [];

                for (var i = 0; i < $scope.country.length; i++) {
                    var obj = $scope.country[i];
                    // $scope.selectedCountry = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id_cnt == preData[j].country_vns) {
                            $scope.filter.countrySelect.push(obj);
                            break;
                        }
                    }

                }
                $scope.filter.selectedzone = [];
                for (var i = 0; i < $scope.zone.length; i++) {
                    var obj = $scope.zone[i];
                    //$scope.selectedVenue = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.pk_zone == preData[j].zone_vns) {
                            $scope.filter.selectedzone.push(obj);
                            break;
                        }
                    }
                }
                $scope.filter.selectedvanue = [];
                for (var i = 0; i < $scope.venue.length; i++) {
                    var obj = $scope.venue[i];
                    // $scope.selectedZone = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id == preData[j].id) {
                            $scope.filter.selectedvanue.push(obj);
                            break;
                        }
                    }
                }

                $scope.filter.selectedregion = [];
                for (var i = 0; i < $scope.region.length; i++) {
                    var obj = $scope.region[i];
                    // $scope.selectedRegion = new Array(0);
                    for (var j = 0; j < preData.length; j++) {
                        if (obj.id_rgs == preData[j].region_vns) {
                            $scope.filter.selectedregion.push(obj);
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
            });
            $scope.getIncidentStatus();
        }, true);
    }

    $scope.getIncidentStatus = function () {

        IncidentReport.getIncidentReportStatus(function (status, data) {
            if (status) {
                data.sort(function (a, b) {
                    return parseFloat(a.display_order_it) - parseFloat(b.display_order_it);
                });
                $scope.$apply(function () {
                    $scope.incidentReportStatus = data;
                });

                $("#221 ul.incident_lists_tabs li").each(function (index, element) {
                    var objec = data[index];
                    $(element).children("span:first-child").css("background", objec.color_it);
                });
                var searchJSON = {search: $scope.filterData};
                $scope.getList(searchJSON);
                //  //console.log(data);
            } else {

            }
        }, $scope.listType);
    };

    $scope.viewIncidentdetail = function (incidentData) {
        $rootScope.incidentDetail = true;
        setTimeout(myFunction, 2000);
        function myFunction() {
            var scope1 = angular.element('#222').scope();
            scope1.getIncidentDetail(incidentData.inc_id);
        }

    };

    $scope.CountryChange = function (country) {
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

            $scope.filter.countrySelect = new Array(0);
            $scope.filter.selectedregion = new Array(0);
            $scope.filter.selectedzone = new Array(0);
            $scope.filter.selectedvanue = new Array(0);
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


            $scope.filter.selectedregion = new Array(0);
            $scope.filter.selectedzone = new Array(0);
            $scope.filter.selectedvanue = new Array(0);

        }
    };
    $scope.regionChange = function (region) {
        $scope.filterData.region = [];
        $scope.zone = new Array(0);
        $scope.newSelectedZone = $scope.filter.selectedzone;
        if (region.length == 0) {

            $scope.filterData.region = 0;
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.filter.selectedregion = new Array(0);
            $scope.filter.selectedzone = new Array(0);
            $scope.filter.selectedvanue = new Array(0);
        } else {
            for (var i = 0; i < region.length; i++) {
                $scope.filterData.region.push(region[i].id_rgs);
            }

            $scope.filterData.country = [];
            $scope.filter.countrySelect = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < region.length; j++) {
                    for (var k = 0; k < region[j].country.length; k++) {
                        if ($scope.allCountryList[i].id_cnt == region[j].country[k].id_cnt)
                            if ($.inArray($scope.allCountryList[i], $scope.filter.countrySelect) < 0) {
                                $scope.filter.countrySelect.push($scope.allCountryList[i]);
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

        $scope.filter.selectedzone = new Array(0);

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.filter.selectedzone = new Array(0);
                for (var i = 0; i < $scope.zone.length; i++) {
                    for (var j = 0; j < $scope.newSelectedZone.length; j++)
                        if ($scope.zone[i].pk_zone == $scope.newSelectedZone[j].pk_zone) {
                            $scope.filter.selectedzone.push($scope.zone[i]);
                            break;
                        }
                }
            });
        }, 200);

    };
    $scope.zoneChange = function (zone) {

        $scope.filterData.zone = [];
        var newSelectedVenue = angular.copy($scope.filter.selectedvanue);

        $scope.venue = [];
        if (zone.length == 0) {
            $scope.venue = new Array(0);
            $scope.filterData.zone = 0;
            $scope.filterData.venue = 0;
            $scope.filter.selectedzone = new Array(0);
            $scope.filter.selectedvanue = new Array(0);
        } else {
            $scope.filter.selectedvanue = new Array(0);
            for (var i = 0; i < zone.length; i++)
                $scope.filterData.zone.push(zone[i].pk_zone);

            if ($scope.filterData.region == 0) {
                $scope.filterData.region = [];
            }
            $scope.filterData.region = [];
            $scope.filter.selectedregion = [];

            for (var i = 0; i < $scope.allRegionList.length; i++) {
                for (var j = 0; j < zone.length; j++) {
                    for (var k = 0; k < zone[j].region.length; k++) {
                        if ($scope.allRegionList[i].id_rgs == zone[j].region[k].fk_region) {
                            if ($.inArray($scope.allRegionList[i], $scope.filter.selectedregion) < 0) {
                                $scope.filter.selectedregion.push($scope.allRegionList[i]);
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

            $scope.filter.countrySelect = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < $scope.filter.selectedregion.length; j++) {
                    for (var k = 0; k < $scope.filter.selectedregion[j].country.length; k++) {
                        if ($scope.allCountryList[i].id_cnt == $scope.filter.selectedregion[j].country[k].id_cnt) {
                            if ($.inArray($scope.allCountryList[i], $scope.filter.countrySelect) < 0) {
                                $scope.filter.countrySelect.push($scope.allCountryList[i]);
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
                $scope.filter.selectedvanue = new Array(0);
                for (var i = 0; i < $scope.venue.length; i++) {
                    for (var j = 0; j < newSelectedVenue.length; j++)
                        if ($scope.venue[i].id == newSelectedVenue[j].id) {
                            $scope.filter.selectedvanue.push($scope.venue[i]);
                            break;
                        }
                }
            });
        }, 200);
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
            $scope.filter.countrySelect = [];
            $scope.filter.selectedzone = [];
            $scope.filter.selectedregion = [];
        } else {
            for (var i = 0; i < venue.length; i++)
                $scope.filterData.venue.push(venue[i].id);

            $scope.filter.selectedzone = [];
            $scope.filter.selectedregion = [];
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
                        $scope.filter.selectedzone.push($scope.allZoneList[i]);
                        $scope.filterData.zone.push($scope.allZoneList[i].pk_zone);
                    }
                }
            }
            for (var i = 0; i < $scope.allRegionList.length; i++) {
                for (var j = 0; j < venue.length; j++) {
                    if ($scope.allRegionList[i].id_rgs == venue[j].region_vns) {
                        if ($.inArray($scope.allRegionList[i], $scope.filter.selectedregion) < 0) {
                            $scope.filter.selectedregion.push($scope.allRegionList[i]);
                            $scope.filterData.region.push(venue[j].region_vns);
                        }
                    }
                }
            }

            if ($scope.filterData.country == 0) {
                $scope.filterData.country = [];
            }

            $scope.filter.countrySelect = [];
            for (var i = 0; i < $scope.allCountryList.length; i++) {
                for (var j = 0; j < venue.length; j++) {

                    if ($scope.allCountryList[i].id_cnt == venue[j].country_vns)
                        if ($.inArray($scope.allCountryList[i], $scope.filter.countrySelect) < 0) {
                            $scope.filter.countrySelect.push($scope.allCountryList[i]);
                            $scope.filterData.country.push(venue[j].country_vns);
                        }

                }
            }

        }




    };

    $scope.preRequest = function () {
        if ($scope.page > 1) {
            $scope.prevShowStatus = true;
            $scope.nextShowStatus = true;
            var page = ($scope.page > 1 ? (--$scope.page) : 1);
            var searchJSON = {search: $scope.filterData};
            $scope.incidentURL = constanObject.INCIDENT_REPORT_LIST_BY_STATUS + $scope.incidentStatus;
            window.scrollTo(0, 0);
            IncidentReport.getIncidentReportList($scope.incidentURL, $scope.listType, $scope.page, searchJSON, function (status, data, lastPage) {
                $scope.lastPage = lastPage;
                if (status) {
                    if ($scope.page == 1) {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = true;
                    }
                    $scope.setData(data);
                } else {
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = true;
                }

            });
        } else {
            $scope.prevShowStatus = false;
            $scope.nextShowStatus = true;
        }

        if ($scope.page == $scope.lastPage)
            $scope.nextShowStatus = false;
    };
    $scope.nextRequest = function () {
        $scope.page++;
        window.scrollTo(0, 0);
        var searchJSON = {search: $scope.filterData};
        $scope.incidentURL = constanObject.INCIDENT_REPORT_LIST_BY_STATUS + $scope.incidentStatus;
        IncidentReport.getIncidentReportList($scope.incidentURL, $scope.listType, $scope.page, searchJSON, function (status, data, lastPage) {
            $scope.lastPage = lastPage;


            if (status) {
                if (data.length >= 20) {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = true;
                } else {
                    $scope.prevShowStatus = true;
                    $scope.nextShowStatus = false;
                }

                $scope.setData(data);
            } else {
                $scope.prevShowStatus = true;
                $scope.nextShowStatus = false;
                $scope.page--;
            }


            if ($scope.page == $scope.lastPage)
                $scope.nextShowStatus = false;

        });
    };

    $scope.getList = function (parameter) {
        $scope.activeMenu = 'All';
        $scope.incidentURL = constanObject.INCIDENT_REPORT_LIST_BY_STATUS + $scope.incidentStatus;
        IncidentReport.getIncidentReportList($scope.incidentURL, $scope.listType, $scope.page, parameter, function (status, data, count, lastPage) {
            $scope.lastPage = lastPage;
            if (status) {
                if (data.length >= 20) {
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = true;
                } else {
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                }
                $scope.infoShow1 = false;
                $scope.setData(data);
                $scope.$apply(function () {
                    $scope.incidentReportCount = count;

                })
            } else {
                $scope.$apply(function () {
                    $scope.infoShow1 = true;
                    $scope.IncidentList = [];
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                    $scope.incidentReportCount = data.count;
                });
            }

            if ($scope.page == $scope.lastPage)
                $scope.nextShowStatus = false;
        });
    };
    $scope.infoClose = function (status) {
        $scope.infoShow1 = false;
    };
    $scope.addIncident = function () {
        $rootScope.addIncidentMainCtrl();
        // window.location.href = "dashboard.html#/createIncident";
    };
    $scope.colouOfSelectedStatus;
    $scope.StatusClick = function (status, index) {
        $scope.incidentStatus = status.id_it;
        $scope.activeMenu = status.name_it;
        $("#221").children("div").children("ul.incident_lists_tabs").children("li:nth-child(" + (++index) + ")").children("a").addClass("active");
        $("#221").children("div").children("ul.incident_lists_tabs").children("li:nth-child(" + index + ")").siblings().children("a").removeClass("active");
        $scope.page = 1;
        $scope.colouOfSelectedStatus = status.color_it;
        var searchJSON = {search: $scope.filterData};
        $scope.getList(searchJSON);
    };
    $scope.searchBtnClick = function () {
        $scope.page = 1;
        var searchJSON = {search: $scope.filterData};
        $scope.getList(searchJSON);
    };

    $scope.nameSearchAction = function (searchText) {
        $scope.page = 1;
        $scope.filterData.name = searchText;
        var searchJSON = {search: $scope.filterData};
        $scope.getList(searchJSON);
    };

    $scope.setData = function (data) {
        if (data.length <= 0)
            return;
        $scope.$apply(function () {
            data.forEach(function (obje) {
                var test = $scope.incidentReportStatus.filter(function (el) {
                    if (el.name_it == obje.status)
                        return el;
                });
                if (test.length > 0) {
                    obje.color_it = test[0].color_it;
                    obje.tint_it = test[0].tint_it;
                }
            });
            data.sort(function (a, b) {
                var x = a["reference"];
                var y = b["reference"];
                if (x == null)
                    return -1;
                if (y == null)
                    return 1;

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            $scope.IncidentList = data;
        });

        $scope.IncidentList.forEach(function (obj) {
            $("div #221 .layout div.table-main table tbody").children("#" + obj.inc_id).children("td:first-child").children("div:first-child").css("background", $scope.colouOfSelectedStatus);
            //$("div #221 .layout div.table-main table tbody").children("#" + obj.inc_id).children("td:first-child").css("background", $scope.colouOfSelectedStatus);
//          
//            if (obj.status == "Closed")
//                $("div #221 .layout div.table-main table tbody").children("#" + obj.inc_id).children("td:first-child").addClass("fifth-level-td");
//            else if (obj.status == "Open")
//                $("div #221 .layout div.table-main table tbody").children("#" + obj.inc_id).children("td:first-child").addClass("second-level-td");
//            else if (obj.status == "Reported")
//                $("div #221 .layout div.table-main table tbody").children("#" + obj.inc_id).children("td:first-child").addClass("first-level-td");
//            else
//                $("div #221 .layout div.table-main table tbody").children("#" + obj.inc_id).children("td:first-child").addClass("fourth-level-td");

        });
    };
    $scope.nextButtonClicked = function (callback) {
        return callback(false, 0);
    };

    $scope.back = function (callback) {
        if ($rootScope.victimListShowStatus)
            return callback(true, noOfPageMove);
    };

    $scope.saveButtonAction = function () {
        ////console.log("SAVE");
    };
    $scope.go_back = function () {
        window.location.href = "dashboard.html#/dashboard";
//        $("#securityTab").addClass("active");
//        $("#dashboardTab").removeClass("active");
        $("#securitySection").show();
        $("#mainDashboardSection").hide();
    };



    $scope.shortByReportedAndLocation = function (order, index) {
        var areng, ele;
        $scope.orderRepo ? $scope.orderRepo = false : $scope.orderRepo = true;

        if ($scope.orderRepo) {
            areng = 1;
            ele = 1;
        } else {
            areng = -1;
            ele = 2;
        }
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(3)").children("span:nth-child(" + ele + ")").addClass("orange-aero");
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(3)").children("span:nth-child(" + ele + ")").siblings("span").removeClass("orange-aero");
        ;
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(3)").siblings().children("span").removeClass("orange-aero");

        $scope.IncidentList.sort(function (a, b) {

            var x = a["reported_by"];
            var y = b["reported_by"];
            if (x == null)
                return -1 * areng;
            if (y == null)
                return 1 * areng;

            var order = ((x < y) ? -1 : ((x > y) ? 1 : 0)) * areng;
            if (order == 0) {
                var x = a["venue"];
                var y = b["venue"];
                if (x == null)
                    return -1 * areng;
                if (y == null)
                    return 1 * areng;

                return order = ((x < y) ? -1 : ((x > y) ? 1 : 0)) * areng;

            } else {
                return order;
            }


        });
    };
    $scope.shortByRefrence = function (order, index) {
        var areng, ele;
        $scope.orderRef ? $scope.orderRef = false : $scope.orderRef = true;
        if ($scope.orderRef) {
            areng = 1;
            ele = 1;
        } else {
            areng = -1;
            ele = 2;
        }
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(1)").children("span:nth-child(" + ele + ")").addClass("orange-aero");
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(1)").children("span:nth-child(" + ele + ")").siblings("span").removeClass("orange-aero");
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(1)").siblings().children("span").removeClass("orange-aero");
        $scope.IncidentList.sort(function (a, b) {

            var x = a["reference"];
            var y = b["reference"];
            if (x == null)
                return -1 * areng;
            if (y == null)
                return 1 * areng;

            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * areng;

        });
    };

    $scope.shortByIncidentDetail = function (order, index) {
        var areng, ele;
        $scope.orderIncidentDetail ? $scope.orderIncidentDetail = false : $scope.orderIncidentDetail = true;
        if ($scope.orderIncidentDetail) {
            areng = 1;
            ele = 1;
        } else {
            areng = -1;
            ele = 2;
        }
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(2)").children("span:nth-child(" + ele + ")").addClass("orange-aero");
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(2)").children("span:nth-child(" + ele + ")").siblings("span").removeClass("orange-aero");
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(2)").siblings().children("span").removeClass("orange-aero");
        $scope.IncidentList.sort(function (a, b) {

            var x = a["name_otc"];
            var y = b["name_otc"];
            if (x == null)
                return -1 * areng;
            if (y == null)
                return 1 * areng;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * areng;
        });
    };



    $scope.shortByStatusAndPriority = function (order, index) {
        var areng, ele;
        $scope.orderStatusAndPriority ? $scope.orderStatusAndPriority = false : $scope.orderStatusAndPriority = true;
        if ($scope.orderStatusAndPriority) {
            areng = 1;
            ele = 1;
        } else {
            areng = -1;
            ele = 2;
        }
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(4)").children("span:nth-child(" + ele + ")").addClass("orange-aero");
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(4)").children("span:nth-child(" + ele + ")").siblings("span").removeClass("orange-aero");
        ;
        $("#221").children("div").children("div.table-main").children("table").children("tbody ").children("tr:first-child").children("th:nth-child(4)").siblings().children("span").removeClass("orange-aero");
        $scope.IncidentList.sort(function (a, b) {

            var x = a["status"];
            var y = b["status"];
            if (x == null)
                return -1 * areng;
            if (y == null)
                return 1 * areng;

            var order = ((x < y) ? -1 : ((x > y) ? 1 : 0)) * areng;
            if (order == 0) {
                var x = a["priority"];
                var y = b["priority"];
                if (x == null)
                    return -1 * areng;
                if (y == null)
                    return 1 * areng;

                return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * areng;

            } else {
                return order;
            }


        });
    }
    $scope.addnote = {};
    $scope.showAddNotePopup = function (incidentId) {
        //console.log("incidentId : " + incidentId);
        var moduleId = 213;
        row_id = incidentId;
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.notes.note_type_jnt = 0;


        var url = constanObject.CommsConfig + moduleId + "/" + incidentId;
        webRequestObject.postRequest($scope, "GET", constanObject.ListStaff, null, constanObject.CommsAndTaskWebRequestType.ListStaff, true);
        webRequestObject.postRequest($scope, "GET", url, null, constanObject.CommsAndTaskWebRequestType.CommsConfigType, true);

    };

    $scope.hideAddNotePopup = function () {
        $scope.ListStaff = new Array();
        $scope.addnote.selectedMethod = new Array();
        $scope.addnote.selectedStaff = new Array();
        $scope.isNotePopUp = false;

    };

    $scope.methodChange = function (method) {
        //console.log("Method : " + JSON.stringify(method));
        $scope.notes.tagged_user = [];
        $scope.notes = {};
        $scope.isNoteDesc = method.detail == 1 ? true : false;
        $scope.isDeadLine = method.deadline == 1 ? true : false;
        $scope.isRemind = method.remind_me == 1 ? true : false;
        $scope.isWith = method.opt_with == 1 ? true : false;
        $scope.isPhotoLibrary = method.attachments == 1 ? true : false;
        $scope.isDuration = method.duration == 1 ? true : false;
        $scope.notes.note_type_jnt = method.id_comms;
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
        $scope.images = [];
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
            $scope.images.push({name: name, url: imageURI.src});
        });
        hideUploadSuccessMsg();
    }
    function hideUploadSuccessMsg() {
        $timeout(function () {
            $scope.isUploadSuccess = false;
        }, 5000);
    }
    $scope.AddNote = function () {
        $scope.notes.module_id = 213;
        $scope.notes.id_jno_jnt = row_id;
        $scope.notes.note_by = localStorage.getItem("userId");
        $scope.notes.id_usr_jnt = localStorage.getItem("userId");
        $scope.notes.latitude = CURRENT_LATITUDE;
        $scope.notes.longitude = CURRENT_LONGITUDE;
        //console.log("Add Note Data : " + JSON.stringify($scope.notes));
        webRequestObject.postRequestJSON($scope, "POST", constanObject.InsertComms, JSON.stringify($scope.notes), constanObject.CommsAndTaskWebRequestType.AddComms, true);
    };

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
                if ($scope.images.length > 0) {
                    for (var i = 0; i < $scope.images.length; i++) {

                        webRequestObject.fileUpload($scope, $scope.images[i].url, constanObject.UploadCommsFile + note_id, constanObject.COMMS_IMAGE_KEY, constanObject.CommsAndTaskWebRequestType.UploadCommsFile, true);
                    }
                } else {
                    $scope.$apply(function () {
                        $scope.ListStaff = [];
                        $scope.isSuccess = true;
                        $scope.successMsg = successMsg;
                        $scope.isNotePopUp = false;
                    });

                }
                break;
            case constanObject.CommsAndTaskWebRequestType.UploadCommsFile:
                //console.log(JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.images = [];
                    $scope.isSuccess = true;
                    $scope.successMsg = successMsg;
                    $scope.isNotePopUp = false;
                });

                break;
        }




    };



    $scope.$on('checkInternetConnection', function (event, arg) {
        $scope.$apply(function () {
            if (!arg.network)
                $scope.networkNotAvailableIncidentList = true;
            else
                $scope.networkNotAvailableIncidentList = false;
        });
    });

    var loadData = function () {

        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            $scope.init();



        } else
            setTimeout(function () {
                $scope.$apply(function () {
                    loadData();
                })

            }, 150);
    }



    loadData();
    checkInternetConnectionService.setValueOfNetWorkConnection();



});

