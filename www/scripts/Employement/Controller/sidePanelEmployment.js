BandQModule.controller("sidePanelEmployment", function ($scope, $rootScope, checkInternetConnectionService, appMenuConfig, moduleAccessPermission) {
    $scope.loggedstaffProfile = [];
    $scope.modulePermission = moduleAccessPermission.getModulePermission();
    $scope.employmentPanel = {};
    var module_menus = appMenuConfig.getModuleMenus();
    var VENUES_MANAGER = 33,
            STAFF = 145,
            MY_PROFILE = 272;
    angular.forEach(module_menus, function (value, key) {

        if (key == VENUES_MANAGER) {
            $scope.employmentPanel.venuesManager = value;
        } else if (key == STAFF) {
            $scope.employmentPanel.staff = value;
        } else if (key == MY_PROFILE) {
            $scope.employmentPanel.myProfile = value;
        }
    });
    $scope.homeFunction = function () {
        $rootScope.menuTitle = 'Employment';
        $rootScope.subMenuTitle = '';
        $rootScope.subMenuTitle1 = '';
        $rootScope.dashboardLink = '#/dashboard';
        $('#link_Ep1').addClass("active");
        $('#link_Ep2').removeClass("active");
        $('#link_Ep3').removeClass("active");
        $('#link_Ep4').removeClass("active");
        window.location.href = "dashboard.html#/employmentHome";
    }

    $scope.showStaff = function () {
        resetAllTemplate();
        $rootScope.staffDetailtemplate = true;
        callMainPageInit();
        window.location.href = "dashboard.html#/employmentMain";
        $('#link_Ep3').removeClass("active");
        $('#link_Ep1').removeClass("active");
        $('#link_Ep2').addClass("active");
        $('#link_Ep4').removeClass("active");
    }
    $scope.staffDirectory = function () {
        resetAllTemplate();
        $rootScope.staffDirectorytemplate = true;
        callMainPageInit();
        window.location.href = "dashboard.html#/employmentMain";

    }
    $scope.venueDirectory = function () {
        resetAllTemplate();
        $rootScope.venueDirectorytemplate = true;
        callMainPageInit();
        window.location.href = "dashboard.html#/employmentMain";
        $('#link_Ep3').removeClass("active");
        $('#link_Ep1').removeClass("active");
        $('#link_Ep2').removeClass("active");
        $('#link_Ep4').addClass("active");
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
});