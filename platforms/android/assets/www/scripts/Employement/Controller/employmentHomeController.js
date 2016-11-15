
BandQModule.controller('employmentHomeController', function ($scope, $rootScope, checkInternetConnectionService, toolTipDownload, appMenuConfig, moduleAccessPermission) {

    $scope.firstname_usr = localStorage.getItem("loginUsername");
    $scope.fullName = localStorage.getItem("fullUsername");
    var module_menus = appMenuConfig.getModuleMenus();
     $rootScope.highlightedFooter = 'Employment';
      $rootScope.moduleIconClass = 'employment-icon';
       $rootScope.moveToPage = '#/employmentHome';
    $scope.employment = {};
    var VENUES_MANAGER = 33,
            STAFF = 145,
            MY_PROFILE = 272;
    angular.forEach(module_menus, function (value, key) {

        if (key == VENUES_MANAGER) {
            $scope.employment.venuesManager = value;
        }
        else if (key == STAFF) {
            $scope.employment.staff = value;
        }
        else if (key == MY_PROFILE) {
            $scope.employment.myProfile = value;
        }
    });
    $scope.modulePermission = {};
    $scope.modulePermission = moduleAccessPermission.getModulePermission();
    $scope.init = function () {
        window.scrollTo(0, 0);
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").addClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
        $rootScope.menuTitle = "Employment";
       $rootScope.highlightedFooter = 'Employment';
        $rootScope.moveToPage = '#/employmentHome';
      $rootScope.moduleIconClass = 'employment-icon';
        $rootScope.subMenuTitle = "";
        $rootScope.subMenuTitle1 = "";
        var toolTipData = toolTipDownload.getToolTipData();
        if (toolTipData) {
            $scope.MyProfileToolTipMessage = toolTipData.module_menue["272"].hint;
            $scope.StaffDirectoryToolTipMessage = toolTipData.module_menue["145"].hint;
            $scope.VenuDirectoryToolTipMessage = toolTipData.module_menue["33"].hint;
        }
    };
    $scope.showProfile = function () {
        resetAllTemplate();
        $rootScope.staffDetailtemplate = true;
        callMainPageInit();
        window.location.href = "dashboard.html#/employmentMain";

    }
    $scope.showStaffDirectory = function () {
        resetAllTemplate();
        $rootScope.staffDirectorytemplate = true;
        callMainPageInit();
        window.location.href = "dashboard.html#/employmentMain";
    }
    $scope.showVenueDirectory = function () {
        resetAllTemplate();
        $rootScope.venueDirectorytemplate = true;
        callMainPageInit();
        window.location.href = "dashboard.html#/employmentMain";
    }

    function resetAllTemplate() {
        $rootScope.staffDetailtemplate = false;
        $rootScope.staffDirectorytemplate = false;
        $rootScope.venueDetailtemplate = false;
        $rootScope.venueDirectorytemplate = false;
        $rootScope.internetconnection = false;
    }


    function callMainPageInit() {

        if (angular.element($("#employmentMainScope")).scope())
            angular.element($("#employmentMainScope")).scope().init();

    }
    $scope.init();
}
);
