
BandQModule.controller('incidentReportHamburger', function ($scope, $rootScope, $location, $window, checkInternetConnectionService) {


    $scope.showRecent = false;
    $scope.init = function () {
        if (webRequestObject && constanObject) {
            webRequestObject.postRequest($scope, "GET", constanObject.MyDraftIncidentsCount, {},
                    constanObject.WebRequestType.MyDraftIncidentsCount, false);
        } else {
            setTimeout(function () {
                $scope.init();
            }, 100);
        }
    };



    $scope.addNewIncident = function () {
        $rootScope.addIncidentMainCtrl();

        //window.location.href = "dashboard.html#/createIncident";

    };


    $scope.viewIncident = function () {
        if (angular.element($("#221")).scope())
            angular.element($("#221")).scope().init();
        else
            window.location.href = "dashboard.html#/incidentView";
        $("#securitySidePanelController").removeClass("active");

    }

    $scope.viewMyIncident = function () {
        localStorage.setItem("listType", "myincident");
        if (angular.element($("#221")).scope())
            angular.element($("#221")).scope().init();
        else
            window.location.href = "dashboard.html#/incidentView";

        $("#securitySidePanelController").removeClass("active");

    }

    $scope.viewDraftIncident = function () {
        localStorage.setItem("listType", "mydraft");
        if (angular.element($("#221")).scope()) {
            angular.element($("#221")).scope().init();
            angular.element($("#221")).scope().incidentStatus = 0;
            angular.element($("#221")).scope().colouOfSelectedStatus = 0;
        } else
            window.location.href = "dashboard.html#/incidentView";

        $("#securitySidePanelController").removeClass("active");

    }
    $scope.search = function () {
        $scope.showRecent = false;
        $scope.serachList = new Array(0);
        $scope.filterData = {};
        $scope.filterData.name = $scope.searchText;
        var searchJSON = {search: $scope.filterData};
        webRequestObject.postRequest($scope, "GET", constanObject.INCIDENT_REPORT_LIST, searchJSON,
                constanObject.WebRequestType.SearchIncident, false);
    }
    $scope.showDetail = function (data) {

        localStorage.setItem("pushItemId", data.inc_id);
        localStorage.setItem("moduleId", "213");
        var currentLocation = window.location;
        currentLocation = currentLocation.href;
        if (angular.element($("#222")).scope())
            angular.element($("#222")).scope().init();
        else
            window.location.href = "dashboard.html#/incidentView";

        $("#securitySidePanelController").removeClass("active");

    }

    $scope.webRequestResponse = function (requestType, status, responseData) {

        if (status == constanObject.ERROR) {
            showErrorAlert(requestType, responseData);
            //              alert(JSON.stringify(responseData.responseText));
            return;
        }

        switch (requestType) {

            case constanObject.WebRequestType.MyDraftIncidentsCount:
                $scope.draftCount = 0;
                if (responseData.count) {
                    $scope.$apply(function () {
                        if (responseData.count > 0)
                            $scope.draftCount = responseData.count;
                        else
                            $scope.draftCount = 0;
                    });
                }
                break;

            case constanObject.WebRequestType.SearchIncident:
                $scope.$apply(function () {
                    $scope.showRecent = true;
                    $scope.serachList = responseData.data;
                });
                break;
        }
    };

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