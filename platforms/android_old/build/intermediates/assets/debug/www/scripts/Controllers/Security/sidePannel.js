

BandQModule.controller('securitySidePanelController', function ($scope, $rootScope, $timeout, appMenuConfig, moduleAccessPermission) {

    $scope.slide = false;
    $scope.securityPanel = {};
    var VICTIM_WITNESS = 257,
            OFFENDER = 258,
            INCIDENT_REPORTS = 213,
            VEHICLE_TRACKING = 265;
    $scope.modulePermission = {};

    appMenuConfig.setAppMenuConfig();
    moduleAccessPermission.setModuleAccess();
    $scope.init = function () {
        //$scope.$apply(function(){
        $scope.modulePermission = moduleAccessPermission.getModulePermission();
        // });

        var module_menus = appMenuConfig.getModuleMenus();
       if (Object.keys(module_menus).length < 1) {
            $timeout(function () {
                $scope.init();
            }, 1000);

       }

        angular.forEach(module_menus, function (value, key) {

            if (key == VICTIM_WITNESS) {
                $scope.securityPanel.victimWitness = value;
            }
            else if (key == OFFENDER) {
                $scope.securityPanel.offender = value;
            }
            else if (key == INCIDENT_REPORTS) {
                $scope.securityPanel.incidentReport = value;
            }
            else if (key == VEHICLE_TRACKING) {
                $scope.securityPanel.vehicle = value;
            }

        });
    };
    $timeout(function () {
        $scope.init();

    }, 1000);
  $scope.home = function () {
        window.location.href = "dashboard.html#/security";
        setTimeout(function () {
            $("#link_3").removeClass("activate active");
            $("#link_2").removeClass("activate active");
            $("#link_1").addClass("activate active");
            $("#link_4").removeClass("activate active");
            $("#link_5").removeClass("activate active");
        }, 100);
    };
    $scope.closeIncidentReportSlide = function () {
        $("#securitySidePanelController").removeClass("active");
    };
    $rootScope.incidentReportSlide = function () {
        
        $scope.show = !$scope.show;
        if ($scope.show)
            $("#securitySidePanelController").addClass("active");
        else
            $("#securitySidePanelController").removeClass("active");
    };


    $scope.offender = function () {

        setTimeout(function () {

            $("#link_1").removeClass("activate active");
            $("#link_2").removeClass("activate active");
            $("#link_3").addClass("activate active");
            $("#link_4").removeClass("activate active");
            $("#link_5").removeClass("activate active");
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        }, 100);
    };

    $scope.vehicles = function () {

        setTimeout(function () {

            $("#link_1").removeClass("activate active");
            $("#link_2").removeClass("activate active");
            $("#link_3").removeClass("activate active");
            $("#link_4").addClass("activate active");
            $("#link_5").removeClass("activate active");
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Vehicles';
            $rootScope.subMenuTitle1 = '';
            $rootScope.isNewVehicle = false;
            $rootScope.isVehicleList = true;
            $rootScope.isVehicleDetails = false;
            $rootScope.dashboardLink = '#/dashboard';
        }, 100);
    };

    $scope.victimsWitness = function () {

        setTimeout(function () {

            $("#link_1").removeClass("activate active");
            $("#link_2").removeClass("activate active");
            $("#link_3").removeClass("activate active");
            $("#link_4").removeClass("activate active");
            $("#link_5").addClass("activate active");
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Victims & Witnesses';
            $rootScope.subMenuTitle1 = '';
            $rootScope.isVictimWitnessAdd = false;
            $rootScope.isVictimWitnessList = true;
            $rootScope.isVictimWitnessDetail = false;
            $rootScope.dashboardLink = '#/dashboard';
        }, 100);
    };

}); 