//var webRequestObject = new WebRequestApi();
BandQModule.controller("headerCntrl", function ($scope, $rootScope, $interval,
        checkInternetConnectionService, appMenuConfig, moduleAccessPermission,
        createIncidentReport, manualSync) {

    var isLoading = false;
    $scope.inComimgMsg = {};
    $scope.offlineLogOutMessage = false;
    $scope.emails = [];
    $scope.tasks = [];
    $scope.alerts = [];
    $scope.profileImg = null;
    $scope.notificationOverlay = [];
    $scope.localNotification = [];
    $scope.alertsOverlay = [];
    $scope.localAlerts = [];
    $scope.isAlertPopUp = false;
    $scope.showProfileImage = false;
    $scope.isNetWorkAvailable = true;

    $rootScope.openInbox = false;
    $rootScope.openAlert = false;
    $rootScope.openTask = false;

    var ALERT_NOTIFICATION = 35,
            STAFF_INMAIL = 203,
            TASK_CHECKLISTS = 204,
            COMMS = 249;
    $scope.callFromHeader = false;

    $interval(function () {
        console.log("Notification emails");
        $rootScope.getNotificationCount();
    }, (5 * 60 * 1000));

    $scope.messNotiOne = function (d) {
        $scope.callFromHeader = true;
        $rootScope.showSyncTab = false;
        switch (d) {
            case '1':
                if ($rootScope.openInbox) {
                    $rootScope.openInbox = false;
                    return;
                }
                $rootScope.openInbox = true;
                $rootScope.openAlert = false;
                $rootScope.openTask = false;
                break;
            case '2':
                if ($rootScope.openAlert) {
                    $rootScope.openAlert = false;
                    return;
                }
                $rootScope.openAlert = true;
                $rootScope.openInbox = false;
                $rootScope.openTask = false;
                break;
            case '3':
                if ($rootScope.openTask) {
                    $rootScope.openTask = false;
                    return;
                }
                $rootScope.openTask = true;
                $rootScope.openInbox = false;
                $rootScope.openAlert = false;
                break;
        }
    }




    var loadMenuConfig = function () {

        if (!appMenuConfig.getModuleMenus())
        {
            setTimeout(function () {
                loadMenuConfig()
            }, 1000);
            return;
        }

        setTimeout(function () {
            $scope.$apply(function () {

                var module_menus = appMenuConfig.getModuleMenus();
                $scope.header = {};
                $scope.modulePermission = moduleAccessPermission.getModulePermission();
                angular.forEach(module_menus, function (value, key) {


                    if (key == ALERT_NOTIFICATION) {
                        $scope.header.alertNotification = value;
                    } else if (key == STAFF_INMAIL) {
                        $scope.header.inMail = value;
                    } else if (key == TASK_CHECKLISTS) {
                        $scope.header.taskCheckLists = value;
                    } else if (key == COMMS) {
                        $scope.header.comms = value;
                    }

                });

                if ($scope.modulePermission.alertNotification == "Full Access" || $scope.modulePermission.alertNotification == "Read Only") {
                    $scope.getNotificationOverlay();
                    $scope.getAppAlerts();
                    $interval(function () {
                        $scope.getNotificationOverlay();
                    }, 300000);
                }


            });
        }, 1);

    }
    $scope.init = function () {
        //console.log("Init Called");


        loadMenuConfig();

        if (checkInternetConnectionService.checkNetworkConnection())
            $scope.profileImg = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";

        $scope.getAppAlerts();
        $scope.getNotificationCount();

        var timeInMin = 10;

        $interval(function () {
            $scope.getAppAlerts();
           // $scope.getNotificationCount();

        }, timeInMin * 60 * 1000);



        // }
        //console.log("$scope.modulePermission : " + JSON.stringify($scope.modulePermission));
        // console.log("$scope.header : " + JSON.stringify($scope.header));
    };



    $rootScope.getNotificationCount = function () {
        var isLoading = false;
        webRequestObject.postRequest($scope, "GET", constanObject.getNotificationCount, null, constanObject.CommsAndTaskWebRequestType.NotificationCount, isLoading);
    };


    $scope.getAppAlerts = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListAppAlerts, null, constanObject.CommsAndTaskWebRequestType.ListAppAlerts, isLoading);
    };
    $scope.getNotificationOverlay = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationOverlay, null, constanObject.CommsAndTaskWebRequestType.ListNotificationOverlay, isLoading);
    };
    $rootScope.getNotificationTask = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationTask, null, constanObject.CommsAndTaskWebRequestType.ListNotificationTask, isLoading);
    };
    $rootScope.getNotificationEmails = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationEmails, null, constanObject.CommsAndTaskWebRequestType.ListNotificationEmails, isLoading);
    };
    $rootScope.getNotificationAlert = function () {
        webRequestObject.postRequest($scope, "GET", constanObject.getListNotificationAlerts, null, constanObject.CommsAndTaskWebRequestType.ListNotificationAlerts, isLoading);
    };

    function getTaskIcon(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == "overdue") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-overdue.png";
            } else if (data[i].type == "pending") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-pending.png";
            } else if (data[i].type == "confirmed") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-completed.png";
            } else if (data[i].type == "In Progress") {
                $scope.tasks[i].icon = "images/icons/top-bar-task-completed.png";
            } else {
                $scope.tasks[i].icon = null;
            }
        }
    }
    function getAlertIcon(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].title == "Notification") {
                $scope.alerts[i].icon = "images/icons/top-bar-notififcation.png";
            } else if (data[i].title == "Alert") {
                $scope.alerts[i].icon = "images/icons/top-bar-alert.png";
            } else {
                $scope.alerts[i].icon = null;
            }
        }

    }
    function getUserIcon(data) {
        for (var i = 0; i < data.length; i++) {
            $scope.emails[i].icon = constanObject.GetStaffImage + data[i].user_id + "/1";
        }

    }
    function getnotificationIcon(data) {
        var notificationLenght = data.length;
        var incr = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].type == "error") {
                $scope.notificationOverlay[i].iconClass = "error-icon";
                $scope.notificationOverlay[i].class = "error";
            } else if (data[i].type == "success") {
                $scope.notificationOverlay[i].iconClass = "success-icon";
                $scope.notificationOverlay[i].class = "success";
            } else if (data[i].type == "information") {
                $scope.notificationOverlay[i].iconClass = "info-icon";
                $scope.notificationOverlay[i].class = "info";
            } else if (data[i].type == "warning") {
                $scope.notificationOverlay[i].iconClass = "warning-icon";
                $scope.notificationOverlay[i].class = "warning";
            } else if (data[i].type == "alert") {
                $scope.notificationOverlay[i].iconClass = "alert-icon";
                $scope.notificationOverlay[i].class = "alert";
            } else {
                $scope.notificationOverlay[i].iconClass = null;
                $scope.notificationOverlay[i].class = null;
            }


        }
        $scope.localNotification.push($scope.notificationOverlay[incr]);
        incr = incr + 1;
        notificationLenght = notificationLenght - 1;

        $interval(function () {
            if (notificationLenght > 0)
                $scope.localNotification.push($scope.notificationOverlay[incr]);
            incr = incr + 1;
            ////console.log("notificationLenght : " + notificationLenght);
            notificationLenght = notificationLenght - 1;
        }, 5000);

    }

    $scope.closeNotification = function (index) {
        $scope.localNotification.splice(index, 1);
    };

    function showAlertOverlays(data) {
        var alertsLength = data.length;
        var incr = 0;
        $interval(function () {
            if ($scope.isAlertPopUp) {
                $scope.isAlertPopUp = false;
                $scope.localAlerts.splice(0, 1);
            }

            if (alertsLength > 0) {
                $scope.localAlerts.push($scope.alertsOverlay[incr]);
                incr = incr + 1;
                ////console.log("alertsLength : " + alertsLength);

                $scope.isAlertPopUp = true;

                alertsLength = alertsLength - 1;
            }

        }, 30000);
    }

    $scope.alertPopUpClose = function (index) {
        $scope.localAlerts.splice(index, 1);
        $scope.isAlertPopUp = false;
    };


    $scope.viewAlertDetail = function (index, alertData) {
        $scope.localAlerts.splice(index, 1);
        $scope.isAlertPopUp = false;

        if (alertData.alert_type == 213) {

            //Incident Reports
            localStorage.setItem("pushItemId", alertData.row_id);
            localStorage.setItem("moduleId", alertData.alert_type);
            window.location.href = "dashboard.html#/incidentView";


        } else if (alertData.alert_type == 258) {

            // offender 
            localStorage.setItem("pushItemId", alertData.row_id);
            localStorage.setItem("moduleId", alertData.alert_type);
            window.location.href = "dashboard.html#/offenderView";

        }


    };

    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            return;
        }
        switch (requestType) {
            case constanObject.CommsAndTaskWebRequestType.NotificationCount:
//                {"data":{"email_count":5,"alert_count":27,"task_count":0,"notification_count":0}}
                //console.log("Notification Count : " + JSON.stringify(responseData));
                $scope.$apply(function () {
                    $scope.inComimgMsg = responseData.data;
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationTask:
                ////console.log("ListNotificationTask  : " + JSON.stringify(responseData))

                $scope.tasks = [];
                $scope.$apply(function () {
                    $scope.tasks = responseData.data;
                    getTaskIcon($scope.tasks);
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.ListAppAlerts:
                // //console.log("ListNotificationTask  : "+JSON.stringify(responseData));
                $scope.alertsOverlay = [];
                $scope.localAlerts = [];
                $scope.$apply(function () {
                    $scope.alertsOverlay = responseData.data;
                    showAlertOverlays($scope.alertsOverlay);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationOverlay:
                //console.log("ListNotification Overlay  : " + JSON.stringify(responseData));
                $scope.notificationOverlay = [];
                $scope.localNotification = [];
                $scope.$apply(function () {
                    $scope.notificationOverlay = responseData.data;
                    getnotificationIcon($scope.notificationOverlay);
                });

                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationEmails:
                //console.log("ListNotification Emails  : " + JSON.stringify(responseData));
                
                $scope.emails = [];
                $scope.$apply(function () {
                    $scope.emails = responseData.data;
                    getUserIcon($scope.emails);
                });
                break;
            case constanObject.CommsAndTaskWebRequestType.ListNotificationAlerts:
                //console.log("ListNotificationTask  : " + JSON.stringify(responseData));
                $scope.alerts = [];
                $scope.$apply(function () {
                    $scope.alerts = responseData.data;
                    getAlertIcon($scope.alerts);
                });
                break;
        }
    };

    function updateFotterClass() {

        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").addClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");

    }
    $scope.messagingData = function (data) {
        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            updateFotterClass();

            localStorage.setItem("headerMessageType", "inbox");
            localStorage.setItem("headerMessageId", data.unique_id);
            window.location.href = "dashboard.html#/inboxView";
            //$('.message-notification').hide();
            $rootScope.$broadcast('checkMessageCall', {headerMessageType: "inbox", headerMessageId: data.unique_id});
            $rootScope.messageHeaderShow = false;
        }

    };
    $scope.alertData = function (data) {
        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            updateFotterClass();


            if (data.title == 'Notification') {
                localStorage.setItem("headerMessageType", "notification");
                localStorage.setItem("headerMessageId", data.unique_id);
                $rootScope.$broadcast('checkMessageCall', {headerMessageType: "notification", headerMessageId: data.unique_id});
            } else {
                localStorage.setItem("headerMessageType", "alert");
                localStorage.setItem("headerMessageId", data.unique_id);
                $rootScope.$broadcast('checkMessageCall', {headerMessageType: "alert", headerMessageId: data.unique_id});
            }
            window.location.href = "dashboard.html#/inboxView";
            //   $('.message-notification').hide();
        }
    };

    $scope.checkListData = function (data) {
        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            updateFotterClass();

            localStorage.setItem("headerMessageType", "tasks");
            localStorage.setItem("headerMessageId", data.unique_id);
            window.location.href = "dashboard.html#/taskAndCheckList";
            if (angular.element('#commsAndTask_34').scope())
                angular.element('#commsAndTask_34').scope().init();
            $rootScope.$broadcast('checkMessageCall', {headerMessageType: "tasks", headerMessageId: data.unique_id});
            //$('.message-notification').hide();
        }

    };
    $rootScope.showSyncTab = false;
    $rootScope.toggleManualSync = function () {
        $rootScope.showSyncTab = !$rootScope.showSyncTab;
        $rootScope.messageHeaderShow = false;
        $rootScope.isFooterMenu = false;
        $rootScope.openInbox = false;
        $rootScope.openAlert = false;
        $rootScope.openTask = false;
    };
    $scope.manualSyncCall = function () {
        if (checkInternetConnectionService.checkNetworkConnection())
            manualSync.updateData();
    }


    $scope.viewStaffProfile = function () {

        window.location.href = "dashboard.html#/employmentMain";
        localStorage.setItem("showProfileDetail", "1");

        if (angular.element($("#employmentMainScope")).scope())
            angular.element($("#employmentMainScope")).scope().init();


    }

    $scope.goBack = function () {
        window.history.back();
    };
    $rootScope.messageHeaderShow = false;
    $rootScope.headerMessageToggle = function () {
        $rootScope.messageHeaderShow = !$rootScope.messageHeaderShow;
        $rootScope.isFooterMenu = false;
        $rootScope.showSyncTab = false;
        $rootScope.openInbox = false;
        $rootScope.openAlert = false;
        $rootScope.openTask = false;
    };
    $rootScope.hideDropdown = function () {
        $rootScope.messageHeaderShow = false;
        $rootScope.isFooterMenu = false;
        $rootScope.showSyncTab = false;
        $rootScope.openInbox = false;
        $rootScope.openAlert = false;
        $rootScope.openTask = false;
    };
    var checkNetAvailable = function () {

        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            var netWorkAvailbla_ = checkInternetConnectionService.checkNetworkConnection();
            $rootScope.$broadcast('checkInternetConnection', {network: netWorkAvailbla_});
        }

        setTimeout(function () {
            checkNetAvailable();
        }, 1000);

    }

    var chekIncidentReportIsInDatabase = true;

    $scope.$on('checkInternetConnection', function (event, arg) {

        //   $scope.$apply(function () {
        if (!arg.network) {
            $scope.showProfileImage = false;
            chekIncidentReportIsInDatabase = true;
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.isNetWorkAvailable = false;
                })
            }, 100);

        } else {
            if (chekIncidentReportIsInDatabase)
            {
                chekIncidentReportIsInDatabase = false;
                dataBaseObj.countNoOfRow(TABLE_CREATE_INCIDENT_REPORT, function (n) {
                    if (n > 0 && (checkNetworkConnection()) && !$rootScope.requestSendToServer) {
                        var getIncidentReport = "SELECT " + FIELD_JSON_DATA + " from " + TABLE_CREATE_INCIDENT_REPORT;
                        createIncidentReport.incidentReportData(getIncidentReport, constanObject.WebRequestType.INCIDENT_REPORT_LOGIN, false);
                    }
                });
            }


            //$scope.profileImg = undefined;

            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.showProfileImage = true;
                    $scope.isNetWorkAvailable = true;
                    $scope.profileImg = constanObject.GetStaffImage + localStorage.getItem("userId") + "/1";

                })
            }, 100);



        }
        //   });
    });

    $scope.$on('profileImage', function (e, data) {
        $scope.profileImg = undefined;

    });
    $scope.logOut = function () {

        if (checkInternetConnectionService.checkNetworkConnection()) {

            var pushNotification = window.plugins.pushNotification;
            pushNotification.unregister(
                    successHandler,
                    errorHandler
                    );


            function errorHandler(error) {
                //console.log('Error: ' + error);
            }

            //localStorage.removeItem("lastTouchTimeStamp");
            var data = {};
            data.uid = localStorage.getItem("userId");
            data.imei = localStorage.getItem("deviceImei");

            function successHandler(result) {
            }

            webRequestObject.postRequest(this, "POST", constanObject.LOG_OUT, data, constanObject.WebRequestType.logOut, false);
            this.webRequestResponse = function (requestType, status, responseData) {
                if (status == constanObject.ERROR) {
                    // alert(JSON.stringify(responseData.responseText));
                    return;
                }
                switch (requestType) {

                    case constanObject.WebRequestType.logOut:
                        $("#logout_timer").hide();
                        window.location.href = "index.html";
                        break;
                }
            };
        } else {
            $scope.offlineLogOutMessage = true;
        }
    }


    $scope.hideLogoutMessage = function () {
        $scope.offlineLogOutMessage = false;
    }
    $rootScope.closeSubmitPopup = function () {
        $rootScope.showIncidentSubmitPopup = false;
    }


    var loadData = function () {


        if (checkInternetConnectionService.netWorkConnectionLoaded)
        {
            $scope.init();
            console.log("header load: " + checkInternetConnectionService.checkNetworkConnection());

            if (!checkInternetConnectionService.checkNetworkConnection()) {

                $.getScript("scripts/googleMap.js");
            }



        } else
            setTimeout(function () {
                $scope.$apply(function () {
                    loadData();
                })

            }, 150);
    }



    loadData();

    checkNetAvailable();
    checkInternetConnectionService.setValueOfNetWorkConnection();


});

