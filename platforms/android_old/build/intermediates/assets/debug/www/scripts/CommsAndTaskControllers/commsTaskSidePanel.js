BandQModule.controller("commsAndTaskSidePanel", ['$rootScope', '$scope', 'checkInternetConnectionService', 'appMenuConfig','moduleAccessPermission', function ($rootScope, $scope, checkInternetConnectionService, appMenuConfig,moduleAccessPermission) {

        var ALERT_NOTIFICATION = 35,
                STAFF_INMAIL = 203,
                TASK_CHECKLISTS = 204,
                COMMS = 249;


        var module_menus = appMenuConfig.getModuleMenus();
        $scope.sideCommsMenu = {};
        $scope.modulePermission = moduleAccessPermission.getModulePermission();
        angular.forEach(module_menus, function (value, key) {


            if (key == ALERT_NOTIFICATION) {
                $scope.sideCommsMenu.alertNotification = value;
            }

            else if (key == STAFF_INMAIL) {
                $scope.sideCommsMenu.inMail = value;
            }
            else if (key == TASK_CHECKLISTS) {
                $scope.sideCommsMenu.taskCheckLists = value;
            }
            else if (key == COMMS) {
                $scope.sideCommsMenu.comms = value;
            }

        });



        $scope.viewCommsTaskHome = function () {
            $rootScope.calssSet = true;
            $rootScope.homeClass = "active";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "";
            window.location.href = "dashboard.html#/commsTasks";

        };

        $scope.viewCommsTask = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;
            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'all';
                $rootScope.calssSet = true;
                $rootScope.homeClass = "";
                $rootScope.inboxClass = "active";
                $rootScope.alertAndNotificationClass = "";
                $rootScope.commsClass = "";
                $rootScope.taskAndCheckListClass = "";
                 $rootScope.showMessageview = false;
                  $rootScope.showCompose = false;

                try {
                    var scope = angular.element('#commsAndTask_34').scope();
                    scope.init();
                } catch (e) {
                }
            }
            window.location.href = "dashboard.html#/inboxView";

        };

        $scope.viewCommsTaskNotification = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;

            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'notification';
                $rootScope.calssSet = true;
                $rootScope.homeClass = "";
                $rootScope.inboxClass = "";
                $rootScope.alertAndNotificationClass = "active";
                $rootScope.commsClass = "";
                $rootScope.taskAndCheckListClass = "";
                 $rootScope.showMessageview = false;
                  $rootScope.showCompose = false;
                try {
                    var scope = angular.element('#commsAndTask_34').scope();
                    scope.init();
                } catch (e) {
                }
            }
            window.location.href = "dashboard.html#/inboxView";
        };
        $scope.viewCommsTaskComms = function () {
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $rootScope.internetConnection = true;

            } else {
                $rootScope.internetConnection = false;
                $rootScope.viewCommsAndTask = 'comms';
                $rootScope.calssSet = true;
                $rootScope.homeClass = "";
                $rootScope.inboxClass = "";
                $rootScope.alertAndNotificationClass = "";
                $rootScope.commsClass = "active";
                $rootScope.taskAndCheckListClass = "";
                 $rootScope.showMessageview = false;
                  $rootScope.showCompose = false;
                try {
                    var scope = angular.element('#commsAndTask_34').scope();
                    scope.init();
                } catch (e) {
                }
            }
            window.location.href = "dashboard.html#/inboxView";
        };
        $scope.viewCommsTaskChecklist = function () {
            //   alert($('#commsTask_2')+","+document.getElementById("commsTask_1")+","+document.getElementById("commsTask_2")+","+document.getElementById("commsTask_3")+","+document.getElementById("commsTask_4"));
            $rootScope.calssSet = true;
            $rootScope.homeClass = "";
            $rootScope.inboxClass = "";
            $rootScope.alertAndNotificationClass = "";
            $rootScope.commsClass = "";
            $rootScope.taskAndCheckListClass = "active";
            window.location.href = "dashboard.html#/taskAndCheckList";
        };
    }]);
