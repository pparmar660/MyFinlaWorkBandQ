var angular;
BandQModule.controller("dashboardCtrl", ['$rootScope', '$scope', '$location', 'checkInternetConnectionService',
    'toolTipDownload', 'appMenuConfig', '$timeout', 'moduleAccessPermission', '$window',
    "getListIncidentReportFieldLabels", "getAllFieldLabel", "getVictimWitnessCategory", "globalService",
    function ($rootScope, $scope, $location, checkInternetConnectionService, toolTipDownload, appMenuConfig,
            $timeout, moduleAccessPermission, $window, getListIncidentReportFieldLabels, getAllFieldLabel,
            getVictimWitnessCategory, globalService) {

        $rootScope.menuTitle = 'Welcome';
        $rootScope.subMenuTitle = '';
        $rootScope.subMenuTitle1 = '';
        $rootScope.dashboardLink = '';
        $("#ftDashbord").addClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
        $scope.username = localStorage.getItem("loginUsername");

        $scope.modulePermission = {};
        var NEWS_MANAGER = 5,
                FAQ_MANAGER = 8,
                LINKS_MANAGER = 10,
                DOCUMENTS_LIBRARY = 11,
                VIDEO_GALLERIES_MANAGER = 17,
                VENUES_MANAGER = 33,
                ALERT_NOTIFICATION = 35,
                VICTIM_WITNESS = 257,
                OFFENDER = 258,
                STAFF = 145,
                STAFF_INMAIL = 203,
                TASK_CHECKLISTS = 204,
                INCIDENT_REPORTS = 213,
                COMMS = 249,
                VEHICLE_TRACKING = 265,
                MY_PROFILE = 272;
        moduleAccessPermission.setModuleAccess();

        $timeout(function () {
            var module_menus = appMenuConfig.getModuleMenus();
//            if(Object.keys(module_menus).length<1){
//               module_menus = appMenuConfig.getModuleMenus();
//                 console.log("module_menus : " + Object.keys(module_menus).length);
//            }
            $scope.dashboardMenu = {};
            angular.forEach(module_menus, function (value, key) {

                if (key == VICTIM_WITNESS) {
                    $scope.dashboardMenu.victimWitness = value;
                } else if (key == OFFENDER) {
                    $scope.dashboardMenu.offender = value;
                } else if (key == INCIDENT_REPORTS) {
                    $scope.dashboardMenu.incidentReport = value;
                } else if (key == VEHICLE_TRACKING) {
                    $scope.dashboardMenu.vehicle = value;
                } else if (key == NEWS_MANAGER) {
                    $scope.dashboardMenu.newsManager = value;
                } else if (key == FAQ_MANAGER) {
                    $scope.dashboardMenu.faqManager = value;
                } else if (key == LINKS_MANAGER) {
                    $scope.dashboardMenu.linksManager = value;
                } else if (key == DOCUMENTS_LIBRARY) {
                    $scope.dashboardMenu.documentsLibrary = value;
                } else if (key == VIDEO_GALLERIES_MANAGER) {
                    $scope.dashboardMenu.videoGalleryManager = value;
                } else if (key == VENUES_MANAGER) {
                    $scope.dashboardMenu.venuesManager = value;
                } else if (key == ALERT_NOTIFICATION) {
                    $scope.dashboardMenu.alertNotification = value;
                } else if (key == STAFF) {
                    $scope.dashboardMenu.staff = value;
                } else if (key == STAFF_INMAIL) {
                    $scope.dashboardMenu.inMail = value;
                } else if (key == TASK_CHECKLISTS) {
                    $scope.dashboardMenu.taskCheckLists = value;
                } else if (key == COMMS) {
                    $scope.dashboardMenu.comms = value;
                } else if (key == MY_PROFILE) {
                    $scope.dashboardMenu.profile = value;
                }
            });
            $scope.modulePermission = moduleAccessPermission.getModulePermission();
        }, 1000);

        var DASHBOARD = 0,
                REPORTING = 8,
                EMPLOYMENT = 24,
                RESOURCES = 27,
                COMMSTASK = 36,
                SECURITY = 38;
        $scope.menu = {};
        $timeout(function () {
            var data = appMenuConfig.getAppMenuConfig();
            angular.forEach(data, function (value, key) {

                if (key == DASHBOARD) {
                    $scope.menu.dashboard = value;
                } else if (key == REPORTING) {
                    $scope.menu.reporting = value;
                } else if (key == EMPLOYMENT) {
                    $scope.menu.employment = value;
                } else if (key == RESOURCES) {
                    $scope.menu.resources = value;
                } else if (key == COMMSTASK) {
                    $scope.menu.commsTask = value;
                } else if (key == SECURITY) {
                    $scope.menu.security = value;
                }
            });
        }, 1000);


        $rootScope.addIncidentMainCtrl = function () {
            // $window.location.reload();
            globalService.resetall();
            if (window.location.hash == "#/createIncident")
                if (angular.element(document.getElementById("incidenctCreateMainId")).scope()) {
                    angular.element(document.getElementById("incidenctCreateMainId")).scope().pageArray = [];
                    angular.element(document.getElementById("incidenctCreateMainId")).scope().resetAll();
                }
            window.location.href = "dashboard.html#/createIncident";
            initFirstTemplate();

        }
        var initFirstTemplate = function () {

            if (angular.element(document.getElementById("30")).scope() && angular.element(document.getElementById("32")).scope()) {
                angular.element(document.getElementById("30")).scope().init();
                angular.element(document.getElementById("32")).scope().init();
                if (document.getElementById("pageReadyLoder"))
                    document.getElementById("pageReadyLoder").style.visibility = "hidden";
            } else {
                setTimeout(function () {
                    initFirstTemplate();
                }, 20);
            }
        }




        $scope.handleDashBoardMenu = function (menu) {
            if (menu == "incident") {
                $rootScope.addIncidentMainCtrl();
                //window.location.href = "dashboard.html#/createIncident";
            }
        };

        $rootScope.showOffenderList = function (val) {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (val == 'moveToOffenderList') {
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = true;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.menuTitle = 'Security';
                $rootScope.subMenuTitle = 'Offenders & OCGs';
                $rootScope.subMenuTitle1 = '';
                $rootScope.dashboardLink = '#/dashboard';
            }
        };
        $scope.addNewOffender = function () {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.internetConnection = true;

            } else {
                $rootScope.title = "Add New Offender";
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.offenderAddShowStatus = true;
                $rootScope.moveToSecurityDashboard = true;
            }
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.subMenuTitle1 = 'Add New';
            $rootScope.dashboardLink = '#/dashboard';
        };

        $scope.addNewVehicle = function () {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.isNewVehicle = true;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = false;
                $rootScope.backStatus = "main";
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "Add New";
        };

        $scope.viewVehicle = function () {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = true;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = false;
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "";
        };


        $scope.addNewVictimWitness = function () {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isVictimWitnessAdd = false;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.title = "Add New Victims & Witnesses";
                $rootScope.isVictimWitnessAdd = true;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = false;
                $rootScope.backStatus = "main";
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            $rootScope.subMenuTitle1 = "Add New";
        };

        $scope.viewVictimWitness = function () {

            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isVictimWitnessAdd = false;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.isVictimWitnessAdd = false;
                $rootScope.isVictimWitnessList = true;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = false;
                $rootScope.backStatus = "List_VW";
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            $rootScope.subMenuTitle1 = "";
        };

        $scope.viewCommsTask = function () {

            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'all';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "active";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };

        $scope.viewCommsTaskAiert = function () {

            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'alert';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "active";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };
        $scope.viewCommsTaskNotification = function () {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'notification';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "active";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };
        $scope.viewCommsTaskComms = function () {
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'comms';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "active";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };
        //  redirecting form main dashboard canvas areas to corrosponding employment  page.
        $scope.employmentStaffProfile = function () {
            resetAllTemplate();
            $rootScope.staffDetailtemplate = true;
            callMainPageInit();
            window.location.href = "dashboard.html#/employmentMain";
        };
        $scope.employmentStaffDirectory = function () {
            resetAllTemplate();
            $rootScope.staffDirectorytemplate = true;
            callMainPageInit();
            window.location.href = "dashboard.html#/employmentMain";
        };
        $scope.employmentVenueDirectory = function () {
            resetAllTemplate();
            $rootScope.venueDirectorytemplate = true;
            callMainPageInit();
            window.location.href = "dashboard.html#/employmentMain";
        };
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
        // end
//        $scope.incidentView = function () {
//            localStorage.setItem("showDetail", true);
//            window.location.href = "incidentMainDiv.html";
//        };


        var checkNetAvailable = function () {

            if (checkInternetConnectionService.netWorkConnectionLoaded)
            {
                toolTipDownload.download();
                getListIncidentReportFieldLabels.loadFromLocal();
                getAllFieldLabel.loadFromLocal();
                getVictimWitnessCategory.loadDataFromLocal();
            } else {

                setTimeout(function () {
                    checkNetAvailable();
                }, 1000);
            }

        }

        checkNetAvailable();
        checkInternetConnectionService.setValueOfNetWorkConnection();
    }]);

BandQModule.controller("securityCtrl", ['$rootScope', '$scope', '$timeout', 'checkInternetConnectionService', 'toolTipDownload', 'appMenuConfig', 'moduleAccessPermission', function ($rootScope, $scope, $timeout, checkInternetConnectionService, toolTipDownload, appMenuConfig, moduleAccessPermission) {

        var VICTIM_WITNESS = 257,
                OFFENDER = 258,
                INCIDENT_REPORTS = 213,
                VEHICLE_TRACKING = 265;

        $scope.internetConnection = false;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = '';
        $rootScope.subMenuTitle1 = '';
        $rootScope.dashboardLink = '#/dashboard';
        $scope.incidentSlide = false;
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").addClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
//        $("#linkSidebar1").addClass("activate");
//        $("#linkSidebar1").removeClass("activate");
        $scope.userName = localStorage.getItem("loginUsername");
        $scope.securityMenu = {};
        $scope.modulePermission = {};
        moduleAccessPermission.setModuleAccess();
        $timeout(function () {
            var module_menus = appMenuConfig.getModuleMenus();

            $scope.modulePermission = moduleAccessPermission.getModulePermission();
            angular.forEach(module_menus, function (value, key) {

                if (key == VICTIM_WITNESS) {
                    $scope.securityMenu.victimWitness = value;
                } else if (key == OFFENDER) {
                    $scope.securityMenu.offender = value;
                } else if (key == INCIDENT_REPORTS) {
                    $scope.securityMenu.incidentReport = value;
                } else if (key == VEHICLE_TRACKING) {
                    $scope.securityMenu.vehicle = value;
                }

            });
        }, 1000)


        $scope.handleDashBoardMenu = function (menu) {
            setTimeout(function () {
                $("#link_3").removeClass("activate active");
                $("#link_1").removeClass("activate active");
                $("#link_2").addClass("activate active");
                $("#link_4").removeClass("activate active");
                $("#link_5").removeClass("activate active");
            }, 100);
            if (menu == "incident_view") {
                $rootScope.incidentDetail = false;
                window.location.href = "dashboard.html#/incidentView";
            }
            if (menu == "incident") {
                $rootScope.addIncidentMainCtrl();
                //window.location.href = "dashboard.html#/createIncident";
            }
        };
        function setToolTip() {
            var toolTipData = toolTipDownload.getToolTipData();
            if (toolTipData) {
                $scope.incidentReportToolTipMessage = toolTipData.module_menue["213"].hint;
                $scope.ofenderOcgToolTipMessage = toolTipData.module_menue["258"].hint;
                $scope.vechicleToolTipMessage = toolTipData.module_menue["265"].hint;
                $scope.victimWitnessToolTipMessage = toolTipData.module_menue["257"].hint;
            }
        }

        $rootScope.showOffenderList = function (val) {
            if (val == 'moveToOffenderList') {
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = true;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.menuTitle = 'Security';
                $rootScope.subMenuTitle = 'Offenders & OCGs';
                $rootScope.subMenuTitle1 = '';
                $rootScope.dashboardLink = '#/dashboard';
            }
        };
        $scope.offenderListView = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = true;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.internetConnection = false;
            }
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
            window.location.href = "dashboard.html#/offenderView";

        };
        $scope.addNewOffender = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.internetConnection = true;

            } else {
                $rootScope.title = "Add New Offender";

                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.offenderAddShowStatus = true;
                $rootScope.moveToSecurityDashboard = true;
            }
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.subMenuTitle1 = 'Add New';
            $rootScope.dashboardLink = '#/dashboard';
            window.location.href = "dashboard.html#/offenderView";
        };
        $scope.addNewVehicle = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.isNewVehicle = true;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = false;
                $rootScope.backStatus = "main";
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "Add New";
            window.location.href = "dashboard.html#/vehicle";
        };

        $scope.viewVehicle = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleList = true;
                $rootScope.isVehicleDetails = false;
                $rootScope.internetConnection = false;
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "";
            window.location.href = "dashboard.html#/vehicle";
        };


        $scope.addNewVictimWitness = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isVictimWitnessAdd = false;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.title = "Add New Victims & Witnesses";
                $rootScope.isVictimWitnessAdd = true;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = false;
                $rootScope.backStatus = "main";
            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            $rootScope.subMenuTitle1 = "Add New";
            window.location.href = "dashboard.html#/securityVictimwitness";
        };

        $scope.viewVictimWitness = function () {


            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.isVictimWitnessAdd = false;
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = true;
            } else {
                $rootScope.isVictimWitnessAdd = false;
                $rootScope.isVictimWitnessList = true;
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.internetConnection = false;
                $rootScope.backStatus = "List_VW";


            }
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            $rootScope.subMenuTitle1 = "";
            window.location.href = "dashboard.html#/securityVictimwitness";

        };


        setToolTip();

        $scope.$on('toolTipData', function (event, arg) {
            $scope.$apply(function () {
                setToolTip();

            });
        });

    }]);

BandQModule.controller("commsTaskCtrl", ['$rootScope', '$scope', '$timeout', 'checkInternetConnectionService', 'toolTipDownload', 'appMenuConfig', 'moduleAccessPermission', function ($rootScope, $scope, $timeout, checkInternetConnectionService, toolTipDownload, appMenuConfig, moduleAccessPermission) {



        $rootScope.menuTitle = 'Comms & Tasks';
        $rootScope.subMenuTitle = '';
        $rootScope.dashboardLink = '#/dashboard';
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").addClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
        $scope.username = localStorage.getItem("loginUsername");
        $rootScope.homeClass = "active";
        $rootScope.inboxClass = "";
        $rootScope.alertAndNotificationClass = "";
        $rootScope.commsClass = "";
        $rootScope.taskAndCheckListClass = "";
        var ALERT_NOTIFICATION = 35,
                STAFF_INMAIL = 203,
                TASK_CHECKLISTS = 204,
                COMMS = 249;
        $scope.commsTaskMenu = {};
        $scope.modulePermission = {};
        moduleAccessPermission.setModuleAccess();
        $timeout(function () {
            var module_menus = appMenuConfig.getModuleMenus();

            $scope.modulePermission = moduleAccessPermission.getModulePermission();
            angular.forEach(module_menus, function (value, key) {
                if (key == ALERT_NOTIFICATION) {
                    $scope.commsTaskMenu.alertNotification = value;
                } else if (key == STAFF_INMAIL) {
                    $scope.commsTaskMenu.inmail = value;
                } else if (key == TASK_CHECKLISTS) {
                    $scope.commsTaskMenu.taskChecklist = value;
                } else if (key == COMMS) {
                    $scope.commsTaskMenu.comms = value;
                }
            });
        }, 1000);

 function setToolTip() {
            var toolTipData = toolTipDownload.getToolTipData();
            if (toolTipData) {
                $scope.CommstaskinmailToolTipMessage = toolTipData.module_menue["203"].hint;
                $scope.CommstaskalertNotificationToolTipMessage = toolTipData.module_menue["35"].hint;
                $scope.CommsComsToolTipMessage = toolTipData.module_menue["249"].hint;
                $scope.CommsTaskchecklistToolTipMessage = toolTipData.module_menue["204"].hint;
            }

        }
        $scope.viewCommsTask = function () {



            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'inbox';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "active";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };

        $scope.viewCommsTaskAiert = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;

            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'alert';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "active";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };
        $scope.viewCommsTaskNotification = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;

            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'notification';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "active";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };
        $scope.viewCommsTaskComms = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;

            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'comms';
                $rootScope.showCompose = false;
            }
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "active";
            $rootScope.taskAndCheckListClass = "";

            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = 'In-Mail';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
        };
        setToolTip();

        $scope.$on('toolTipData', function (event, arg) {
            $scope.$apply(function () {
                setToolTip();

            });
        });
        $scope.AddNewMail = function () {

            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "active";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            $rootScope.menuTitle = 'Comms & Tasks';
            $rootScope.subMenuTitle = '';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
            $rootScope.messageType = 'new';
            $rootScope.messageId = 0;
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.showCompose = true;
            }
        };
    }]);



BandQModule.controller("resourcesCtrl", ['$rootScope', function ($rootScope) {
        $rootScope.menuTitle = 'Resources';
        $rootScope.subMenuTitle = '';
        $rootScope.dashboardLink = '#/dashboard';
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").addClass("active");
        $("#ftReporting").removeClass("active");


    }]);

BandQModule.controller("reportingCtrl", ['$rootScope', function ($rootScope) {
        $rootScope.menuTitle = 'Reporting';
        $rootScope.subMenuTitle = '';
        $rootScope.dashboardLink = '#/dashboard';
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").addClass("active");
    }]);


BandQModule.controller("commsInboxCtrl", ['$rootScope', function ($rootScope) {
        $rootScope.menuTitle = '';
        $rootScope.subMenuTitle = '';
    }]);


BandQModule.controller("securityMainCtrl", ['$rootScope', '$scope', function ($rootScope, $scope) {
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = '';
        $rootScope.dashboardLink = '#/dashboard';
        $scope.incidentSlide = false;
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").addClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
        $("#linkSidebar1").addClass("activate");
        $("#linkSidebar1").removeClass("activate");
        $scope.handleDashBoardMenu = function (menu) {
            setTimeout(function () {
                $("#link_3").removeClass("activate active");
                $("#link_1").removeClass("activate active");
                $("#link_2").addClass("activate active");
                $("#link_4").removeClass("activate active");
                $("#link_5").removeClass("activate active");
            }, 100);
            if (menu == "incident_view") {
                $rootScope.incidentDetail = false;
                window.location.href = "dashboard.html#/incidentView";
            }
            if (menu == "incident") {
                $rootScope.addIncidentMainCtrl();
                //window.location.href = "dashboard.html#/createIncident";
            }
        };
        $scope.showIncidentslide = function () {
            $scope.incidentSlide = true;
        }

    }





]);



