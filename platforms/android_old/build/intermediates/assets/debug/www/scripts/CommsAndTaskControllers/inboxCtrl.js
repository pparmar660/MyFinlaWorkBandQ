BandQModule.controller('inboxCtrl', ['$scope', '$rootScope', '$timeout', '$filter', 'messageFilter', 'MessageView', 'checkInternetConnectionService', 'moduleAccessPermission', 'appMenuConfig', 'getLinkedStaffList', 'imageService', 'compossMail', function ($scope, $rootScope, $timeout, $filter, messageFilter, MessageView, checkInternetConnectionService, moduleAccessPermission, appMenuConfig, getLinkedStaffList, imageService, compossMail) {
        $scope.prevShowStatus = null;
        $scope.nextShowStatus = null;
        $scope.sortingOrder = '';
        $scope.items = [];
        $scope.reverse = null;
        $rootScope.menuTitle = 'Comms & Tasks';
        $rootScope.subMenuTitle = 'In-Mail';
        $rootScope.subMenuTitle1 = '';
        $rootScope.dashboardLink = '#/dashboard';
        $scope.currentPage = 0;
        $scope.deletedMessageCount = 0;
        $scope.messageCount = 0;
        $rootScope.showMessageview = false;
        $scope.messageNotExist = false;
        $scope.noInternetAvailable = false;
        $scope.composeMail = {};
        $scope.composeMail.ToStaffIds = [];
        $scope.composeMail.ccStaffIds = [];
        $scope.composeMail.bccStaffIds = [];
        var imageNum = 0;
        $scope.attachments = [];
        $scope.draftStatus = false;
        $scope.showAddNew = false;
        $scope.isError = false;
        $scope.isReminder = false;
        $scope.showMessageCancelPopup = false;
        /* inbox functions -------------------------------------- */
        $scope.custom = false;
        $scope.isMessageDeleted = false;
        $scope.replyAll = false;
        $scope.staffList = [];
        $scope.showCC = false;
        // get data and init the filtered items
        $scope.toggleCC = function () {
            $scope.custom = $scope.custom === false ? true : false;
        };
        $scope.showUloadPopUp = function () {
            $scope.showUploadAction = true;

        };
        $scope.menu = {};
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
            $scope.menu = {};
            angular.forEach(module_menus, function (value, key) {

                if (key == VICTIM_WITNESS) {
                    $scope.menu.victimWitness = value;
                } else if (key == OFFENDER) {
                    $scope.menu.offender = value;
                } else if (key == INCIDENT_REPORTS) {
                    $scope.menu.incidentReport = value;
                } else if (key == VEHICLE_TRACKING) {
                    $scope.menu.vehicle = value;
                } else if (key == NEWS_MANAGER) {
                    $scope.menu.newsManager = value;
                } else if (key == FAQ_MANAGER) {
                    $scope.menu.faqManager = value;
                } else if (key == LINKS_MANAGER) {
                    $scope.menu.linksManager = value;
                } else if (key == DOCUMENTS_LIBRARY) {
                    $scope.menu.documentsLibrary = value;
                } else if (key == VIDEO_GALLERIES_MANAGER) {
                    $scope.menu.videoGalleryManager = value;
                } else if (key == VENUES_MANAGER) {
                    $scope.menu.venuesManager = value;
                } else if (key == ALERT_NOTIFICATION) {
                    $scope.menu.alertNotification = value;
                } else if (key == STAFF) {
                    $scope.menu.staff = value;
                } else if (key == STAFF_INMAIL) {
                    $scope.menu.inMail = value;
                } else if (key == TASK_CHECKLISTS) {
                    $scope.menu.taskCheckLists = value;
                } else if (key == COMMS) {
                    $scope.menu.comms = value;
                } else if (key == MY_PROFILE) {
                    $scope.menu.profile = value;
                }
            });
            $scope.modulePermission = moduleAccessPermission.getModulePermission();
            //  console.log("$scope.menu : " + JSON.stringify($scope.menu));
        }, 1000);
        $scope.init = function () {
            window.scrollTo(0, 0);
            $scope.isMessageDeleted = false;
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            if (localStorage.getItem("headerMessageId") || localStorage.getItem("moduleId")) {
                $rootScope.showMessageview = true;

                if (localStorage.getItem("headerMessageType") == 'inbox') {
                    //  $rootScope.showCompose = false;

                    $scope.messageUrl = constanObject.INMAIL_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("headerMessageId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';
                            }
                            $scope.btnFilter = 'inbox';
                            $scope.message = 'inmail';
                            $scope.showAddNew = true;
                            $scope.messageTitle = 'In-Mail';
                            $scope.messageTitleClass = 'd-icon5';
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "active";
                            $rootScope.alertAndNotificationClass = "";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("headerMessageType", "");
                            localStorage.setItem("headerMessageId", "");

                        });
                    });
                } else if (localStorage.getItem("headerMessageType") == 'notification') {
                    // $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.NOTIFICATION_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("headerMessageId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $scope.btnFilter = 'notification';
                            $scope.messageTitle = 'Notifications';
                            $scope.messageTitleClass = 'notification-on ';
                            $scope.showAddNew = false;
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("headerMessageType", "");
                            localStorage.setItem("headerMessageId", "");

                        });
                    });
                } else if (localStorage.getItem("headerMessageType") == 'alert') {
                    //  $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.ALERT_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("headerMessageId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $scope.btnFilter = 'alert';
                            $scope.messageTitle = 'Alerts';
                            $scope.messageTitleClass = 'alert-on ';
                            $scope.showAddNew = false;
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            localStorage.setItem("headerMessageType", "");
                            localStorage.setItem("headerMessageId", "");

                        });
                    });
                } else if (localStorage.getItem("moduleId") == 203) {
                    //  $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.INMAIL_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';
                            }
                            $scope.btnFilter = 'inbox';
                            $scope.showAddNew = true;
                            $scope.message = 'inmail';
                            $scope.messageTitle = 'In-Mail';
                            $scope.messageTitleClass = 'd-icon5';
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "active";
                            $rootScope.alertAndNotificationClass = "";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");

                        });
                    });
                } else if (localStorage.getItem("moduleId") == 35) {
                    // $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.ALERT_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $scope.btnFilter = 'alert';
                            $scope.messageTitle = 'Alerts';
                            $scope.messageTitleClass = 'alert-on ';
                            $scope.showAddNew = false;
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");
                        });
                    });
                } else if (localStorage.getItem("moduleId") == 36) {
                    //    $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.NOTIFICATION_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $scope.btnFilter = 'notification';
                            $scope.messageTitle = 'Notifications';
                            $scope.messageTitleClass = 'notification-on ';
                            $scope.showAddNew = false;
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "active";
                            $rootScope.commsClass = "";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");
                        });
                    });
                } else if (localStorage.getItem("moduleId") == 249) {
                    //   $rootScope.showCompose = false;
                    $scope.messageUrl = constanObject.COMMS_VIEW;
                    MessageView.getMessageDetail(localStorage.getItem("pushItemId"), $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $scope.messageIconDisplay = 'inboxIco';

                            }
                            $scope.btnFilter = 'comms';
                            $scope.messageTitle = 'Comms';
                            $scope.messageTitleClass = 'comms-on';
                            $scope.showAddNew = false;
                            $rootScope.homeClass = "";
                            $rootScope.inboxClass = "";
                            $rootScope.alertAndNotificationClass = "";
                            $rootScope.commsClass = "active";
                            $rootScope.taskAndCheckListClass = "";
                            localStorage.setItem("moduleId", "");
                            localStorage.setItem("pushItemId", "");
                        });
                    });
                }

            } else {

                // $scope.showMessageview = false;
                $scope.reverse = null;
                messageFilter.getUnreadMessageCount(constanObject.MESSAGE_UNREAD_COUNT, function (status, responseData) {
                    $scope.$apply(function () {
                        if (status == true) {
                            $scope.messageCount = responseData;
                            $scope.unreadMessageCount = $scope.messageCount.data.unread_inmail_count + $scope.messageCount.data.unread_notification_count + $scope.messageCount.data.unread_alert_count;

//                        switch ($rootScope.viewCommsAndTask)
//                        {
//                            case 'all':
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_inmail_count + $scope.messageCount.data.unread_notification_count + $scope.messageCount.data.unread_alert_count;
//                                break;
//                            case 'alert':
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_alert_count;
//                                break;
//                            case 'notification':
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_notification_count;
//                                break;
//                            case 'comms' :
//                                $scope.unreadMessageCount = '';
//                                break;
//                            default :
//                                $scope.unreadMessageCount = $scope.messageCount.data.unread_inmail_count + $scope.messageCount.data.unread_notification_count + $scope.messageCount.data.unread_alert_count;
//                                break;
//                        }
                        }

                    });
                });
                switch ($rootScope.viewCommsAndTask) {

                    case 'inbox':
                        //console.log(JSON.stringify($scope.messageCount));
                        $scope.btnFilter = 'inbox';
                        $scope.showCheckbox = true;
                        $scope.messageTitle = 'In-Mail';
                        $scope.messageTitleClass = 'd-icon5';
                        $rootScope.subMenuTitle = 'In-Mail';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "active";
                        $rootScope.alertAndNotificationClass = "";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.btnAllFilter = 'inbox';
                        $scope.showAddNew = true;
                        //  $rootScope.showCompose = false;
                        $scope.url = constanObject.COMMS_AND_TASK_INBOX;
                        break;
                    case 'alert':
                        $scope.messageTitle = 'Alerts';
                        $scope.messageTitleClass = 'alert-on ';
                        $scope.showCheckbox = false;
                        $scope.btnFilter = 'alert';
                        $rootScope.subMenuTitle = 'Alerts & Notifications';
                        $scope.btnAllFilter = 'alert';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "";
                        $rootScope.alertAndNotificationClass = "active";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.showAddNew = false;
                        $scope.url = constanObject.COMMS_AND_TASK_ALERT;
                        //   $rootScope.showCompose = false;
                        break;
                    case 'notification':
                        $scope.messageTitle = 'Notifications';
                        $scope.messageTitleClass = 'notification-on ';
                        $scope.btnFilter = 'notification';
                        $scope.showCheckbox = false;
                        $rootScope.subMenuTitle = 'Alerts & Notifications';
                        $scope.btnAllFilter = 'notification';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "";
                        $rootScope.alertAndNotificationClass = "active";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.showAddNew = false;
                        $scope.url = constanObject.COMMS_AND_TASK_NOTIFICATION;
                        //  $rootScope.showCompose = false;
                        break;
                    case 'comms':
                        $scope.messageTitle = 'Comms';
                        $scope.messageTitleClass = 'comms-on';
                        $scope.showCheckbox = false;
                        $scope.btnFilter = 'comms';
                        $scope.btnAllFilter = 'comms';
                        $rootScope.subMenuTitle = 'Comms';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "";
                        $rootScope.alertAndNotificationClass = "";
                        $rootScope.commsClass = "active";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.showAddNew = false;
                        $scope.url = constanObject.COMMS_AND_TASK_COMMS;
                        //   $rootScope.showCompose = false;
                        break;
                    default:
                        $scope.btnAllFilter = 'In-Mail';
                        $scope.showCheckbox = true;
                        $scope.btnFilter = 'inbox';
                        $scope.messageTitle = 'In-Mail';
                        $rootScope.subMenuTitle = 'In-Mail';
                        $scope.messageTitleClass = 'd-icon5';
                        $rootScope.homeClass = "";
                        $rootScope.inboxClass = "active";
                        $rootScope.alermessageCounttAndNotificationClass = "";
                        $rootScope.commsClass = "";
                        $rootScope.taskAndCheckListClass = "";
                        $scope.showAddNew = true;
                        $scope.url = constanObject.COMMS_AND_TASK_INBOX;
                        //$rootScope.showCompose = false;
                        break;
                }
                $scope.page = 1;
                $scope.deletedMessageCount = 0;
                var searchData = null;
                messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                    //console.log("messaging" + JSON.stringify(responseData));
                    $scope.$apply(function () {
                        if (status == true) {
                            if (responseData.next_page_url != null) {
                                $scope.nextShowStatus = true;
                            } else {
                                $scope.nextShowStatus = false;
                            }
                            $scope.prevShowStatus = false;
                            $scope.filteredItems = responseData;
                            $scope.items = responseData.data;
                            $scope.messageNotExist = false;
                        } else {
                            $scope.items = [];
                            $scope.prevShowStatus = false;
                            $scope.nextShowStatus = false;
                            $scope.filteredItems = '';
                            $scope.messageNotExist = true;
                        }

                    });

                });
            }


        };


        /*--------------------Custom messageing filter---------------------*/

        //Apply selected class initially
        $scope.btnAllFilter = 'all';
        // Apply Filter on click
        $scope.myFilterFunc = function (event, type)
        {
            $scope.selectedAll = false;
            $rootScope.showMessageview = false;
            $scope.reverse = null;
            $rootScope.showCompose = false;
            $scope.isMessageDeleted = false;
            switch (event.target.id) {
                case 'all':
                    $scope.msgType = '';
                    $scope.btnFilter = event.target.id;
                    $scope.showCheckbox = true;
                    $scope.deletedMessageCount = 0;
                    $scope.messageTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnAllFilter = event.target.id;
                    $scope.showAddNew = true;
                    $scope.url = constanObject.GET_ALL_MESSAGE;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                case 'inbox':
                    //console.log(JSON.stringify($scope.messageCount));
                    $scope.btnAllFilter = 0;
                    $scope.showCheckbox = true;
                    $scope.deletedMessageCount = 0;
                    $scope.msgType = 'inbox';
                    $scope.messageTitle = 'In-Mail';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = true;
                    $scope.url = constanObject.COMMS_AND_TASK_INBOX;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'inmail';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }

                        });
                    });
                    break;
                case 'sent':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = true;
                    $scope.msgType = 'sent';
                    $scope.messageTitle = 'Sent';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.messageBox = 'sent';
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = true;
                    $scope.url = constanObject.COMMS_AND_TASK_SENT;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'sent';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });


                    break;
                case 'drafts':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = true;
                    $scope.msgType = 'drafts';
                    $scope.messageTitle = 'Drafts';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.messageBox = 'drafts';
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = true;
                    $scope.url = constanObject.COMMS_AND_TASK_DRAFT;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'drafts';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });


                    break;
                case 'trash':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = true;
                    $scope.msgType = 'trash';
                    $scope.messageTitle = 'Trash';
                    $rootScope.subMenuTitle = 'In-Mail';
                    $scope.messageTitleClass = 'd-icon5';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "active";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.messageBox = 'trash';
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = true;
                    $scope.url = constanObject.COMMS_AND_TASK_TRASH;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                for (var i = 0; i < $scope.items.length; i++) {
                                    $scope.items[i].messageBox = 'trash';
                                }
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });


                    break;

                case 'alert':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = false;
                    $scope.msgType = 'alert';
                    $scope.messageTitle = 'Alerts';
                    $rootScope.subMenuTitle = 'Alerts & Notifications';
                    $scope.messageTitleClass = 'alert-on';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "";
                    $rootScope.alertAndNotificationClass = "active";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = false;
                    $scope.url = constanObject.COMMS_AND_TASK_ALERT;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                case 'notification':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = false;
                    $scope.msgType = 'notification';
                    $scope.messageTitle = 'Notifications';
                    $rootScope.subMenuTitle = 'Alerts & Notifications';
                    $scope.messageTitleClass = 'notification-on';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "";
                    $rootScope.alertAndNotificationClass = "active";
                    $rootScope.commsClass = "";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = false;
                    $scope.url = constanObject.COMMS_AND_TASK_NOTIFICATION;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                case 'comms':
                    $scope.btnAllFilter = 0;
                    $scope.deletedMessageCount = 0;
                    $scope.showCheckbox = false;
                    $scope.msgType = 'comms';
                    $scope.messageTitle = 'Comms';
                    $rootScope.subMenuTitle = 'Comms';
                    $scope.messageTitleClass = 'comms-on';
                    $rootScope.homeClass = "";
                    $rootScope.inboxClass = "";
                    $rootScope.alertAndNotificationClass = "";
                    $rootScope.commsClass = "active";
                    $rootScope.taskAndCheckListClass = "";
                    $scope.btnFilter = event.target.id;
                    $scope.showAddNew = false;
                    $scope.url = constanObject.COMMS_AND_TASK_COMMS;
                    $scope.page = 1;
                    var searchData = null;
                    messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.prevShowStatus = false;
                                if (responseData.next_page_url != null) {
                                    $scope.nextShowStatus = true;
                                } else {
                                    $scope.nextShowStatus = false;
                                }
                                $scope.filteredItems = responseData;
                                $scope.items = responseData.data;
                                $scope.messageNotExist = false;
                            } else {
                                $scope.items = [];
                                $scope.filteredItems = '';
                                $scope.prevShowStatus = false;
                                $scope.nextShowStatus = false;
                                $scope.messageNotExist = true;
                            }
                        });
                    });
                    break;
                default:
                    $scope.btnAllFilter = 'all';
                    break;

            }
        };
        /*--------------------End Custom messageing filter---------------------*/

        /*---------tab wise sorting ----------------*/

        $scope.sort = function (column) {
            if ($scope.sortingOrder === column) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortingOrder = column;
                $scope.reverse = true;
            }
        };


        /*--------------------------Pagination---------------------------*/

        $scope.nextPageRequest = function () {
            $scope.deletedMessageCount = 0;
            $scope.isMessageDeleted = false;
            $scope.page++;
            var searchData = null;
            messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                $scope.$apply(function () {
                    if (status == true) {
                        $scope.prevShowStatus = true;
                        if (responseData.next_page_url != null) {
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.nextShowStatus = false;
                        }
                        $scope.filteredItems = responseData;
                        $scope.items = responseData.data;
                        $scope.messageNotExist = false;
                    } else {
                        $scope.items = [];
                        $scope.filteredItems = '';
                        $scope.prevShowStatus = true;
                        $scope.nextShowStatus = false;
                        $scope.messageNotExist = true;
                    }

                });
            });

        }

        $scope.previousPageRequest = function () {
            $scope.deletedMessageCount = 0;
            $scope.isMessageDeleted = false;
            if ($scope.page > 1) {
                $scope.prevShowStatus = true;
                $scope.nextShowStatus = true;
                var page = ($scope.page > 1 ? (--$scope.page) : 1);
                var searchData = null;
                messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                    $scope.$apply(function () {
                        $scope.filteredItems = responseData;
                        $scope.messageNotExist = false;
                        $scope.items = responseData.data;

                    });
                });
            } else {
                $scope.prevShowStatus = false;
                $scope.nextShowStatus = true;
            }
        };


        /*-----------Multiple checkbox-------------*/
        $scope.selectedAll = false;

        $scope.checkAll = function (value) {
            if (value) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }

            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].message_type == "inmail") {
                    $scope.items[i].Selected = $scope.selectedAll;
                }
            }

        };
        /*----------- delete message -------------*/

        $scope.deleteItem = function () {
            $scope.itemToDelete = [];
            $scope.messageId = [];
            $scope.deletedMessageCount = 0;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].Selected) {
                    $scope.itemToDelete.push($scope.items[i]);
                    $scope.messageId.push($scope.items[i].message_id);
                }

            }
            var Id = {"id": $scope.messageId};
            webRequestObject.postRequest(this, "POST", constanObject.MESSAGES_DELETE, Id, constanObject.WebRequestType.DELETE_INMAIL_MESSAGE, true);

        };
        $scope.webRequestResponse = function (requestType, status, response) {
            if (status == "success") {
                for (var j = 0; j < $scope.itemToDelete.length; j++) {
                    if (j < $scope.itemToDelete.length) {
                        var removeToItem = $scope.itemToDelete[j];
                        var idxInItems = $scope.items.indexOf(removeToItem);
                        $scope.$apply(function () {
                            $scope.items.splice(idxInItems, 1);
                            $scope.deletedMessageCount++;
                            $rootScope.isMessageSend = false;
                            $scope.isMessageDeleted = true;
                            $scope.messageDeleted = 'The conversation has been moved to the Trash.';
                            window.scrollTo(0, 0);
                        });

                    }
                }
            }
            ;
        };

        $scope.closeDeletePopUp = function () {
            $scope.isMessageDeleted = false;
        }
        /*-------------------Search--------------------*/


        $scope.searchBtn = function (searchMailText) {
            $scope.page = 1;
            $scope.filterData = searchMailText;
            $scope.url = constanObject.GET_ALL_MESSAGE;
            $rootScope.showMessageview = false;
            $rootScope.showCompose = false;
            $scope.searchParameter = {search: $scope.filterData};
            var searchData = {search: $scope.filterData};
            messageFilter.getMessage($scope.page, $scope.url, searchData, function (status, responseData) {
                //console.log("messaging" + JSON.stringify(responseData));
                $scope.$apply(function () {
                    if (status == true) {
                        $scope.prevShowStatus = false;
                        if (responseData.next_page_url != null) {
                            $scope.nextShowStatus = true;
                        } else {
                            $scope.nextShowStatus = false;
                        }
                        $scope.filteredItems = responseData;
                        $scope.messageNotExist = false;
                        $scope.items = responseData.data;
                    } else {
                        $scope.items = [];
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                        $scope.filteredItems = '';
                        $scope.messageNotExist = true;
                    }

                });

            });
        };

        $scope.infoClose = function () {
            $scope.messageNotExist = false;
        }

        /*-------------------view message detail----------------*/
        $scope.viewMessageDetail = function (item) {
            //console.log("message_view" +JSON.stringify(item));
            window.scrollTo(0, 0);
            $scope.isMessageDeleted = false;
            $scope.toCcBccIdList1 = [];
            switch (item.message_type) {
                case 'inmail':
                    if ($scope.messageBox == 'trash') {
                        $scope.message = 'inmail';
                        $scope.messageUrl = constanObject.TRASH_VIEW;
                        $scope.showReply = true;
                        $scope.showForword = true;
                        $scope.draftStatus = false;
                    } else if ($scope.messageBox == 'sent') {
                        $scope.messageUrl = constanObject.SENT_VIEW;
                        $scope.showReply = true;
                        $scope.showForword = true;
                        $scope.draftStatus = false;
                        $scope.message = 'sent';
                    } else if ($scope.messageBox == 'drafts') {
                        $scope.messageUrl = constanObject.DRAFTS_VIEW;
                        $scope.showReply = false;
                        $scope.showForword = false;
                        $scope.draftStatus = true;
                        $scope.message = 'drafts';
                    } else {
                        $scope.messageUrl = constanObject.INMAIL_VIEW;
                        $scope.showReply = true;
                        $scope.showForword = true;
                        $scope.draftStatus = false;
                        $scope.message = 'inmail';
                    }
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        if (status == true) {
                            var token = localStorage.getItem("token");
                            token = token.replace('Bearer ', '');
                            if (responseData.data)
                                for (var i = 0; i < responseData.data[0].message_attachment.length; i++)
                                    responseData.data[0].message_attachment[i].attachment_url = responseData.data[0].message_attachment[i].attachment_url + "?token=" + token;


                            $scope.messageData = responseData.data;
                            $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                            $scope.messageIconDisplay = 'inboxIco';
                            if ($scope.message == 'drafts') {
                                $rootScope.showMessageview = false;
                                $scope.draftMail($scope.messageData);
                            } else {
                                $rootScope.showMessageview = true;
                            }
                            if ($scope.messageData[0].message_to_id)
                                var tostaffListId = $scope.messageData[0].message_to_id.split(",");
                            if ($scope.messageData[0].message_cc_id)
                                var ccstaffListId = $scope.messageData[0].message_cc_id.split(",");
                            if ($scope.messageData[0].message_bcc_id)
                                var bccstaffListId = $scope.messageData[0].message_bcc_id.split(",");
                            var toCCIdList = tostaffListId.concat(ccstaffListId);
                            var toCcBccIdList = toCCIdList.concat(bccstaffListId);
                            for (var i = 0; i < toCcBccIdList.length; i++) {
                                if (toCcBccIdList[i])
                                    $scope.toCcBccIdList1.push(toCcBccIdList[i]);
                            }
                            if ($scope.toCcBccIdList1.length > 1)
                                $scope.replyAll = true;
                            else
                                $scope.replyAll = false;

                        } else {
                            $rootScope.showMessageview = false;
                            $scope.messageData = '';
                        }
                    });

                    break;
                case 'alert':
                    $scope.messageUrl = constanObject.ALERT_VIEW;
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'alertIco';

                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';
                            }
                        });
                    });
                    break;
                case 'notification':
                    $scope.messageUrl = constanObject.NOTIFICATION_VIEW;
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'notifiIco';

                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';

                            }
                        });
                    });
                    break;
                case 'comms':
                    $scope.messageUrl = constanObject.COMMS_VIEW;
                    MessageView.getMessageDetail(item.message_id, $scope.messageUrl, function (status, responseData) {
                        $scope.$apply(function () {
                            if (status == true) {
                                $scope.messageData = responseData.data;
                                $scope.profileImage = constanObject.GetStaffImage + $scope.messageData[0].message_to_id + "/1";
                                $rootScope.showMessageview = true;
                                $scope.messageIconDisplay = 'commsIco';
                            } else {
                                $rootScope.showMessageview = false;
                                $scope.messageData = '';
                            }
                        });
                    });
                    break;
            }

        };

        $scope.downloadFile = function (url) {
         
            var fileTransfer = new FileTransfer();
            var uri = encodeURI(url);//("http://some.server.com/download.php");
            var d = new Date();
            var n = d.getTime();
             showSpinner(true, true, SPINNER_MESSAGE);
            var targetPath =cordova.file.externalRootDirectory + "Download/" + n + "_BandQ.png";;// cordova.file.externalDataDirectory + n + "BandQ.png";
            fileTransfer.download(
                    uri,
                    targetPath,
                    function (entry) {
                       //  window.open(encodeURI(entry.toURL()));
                        console.log("download complete: " + entry.toURL());
                          window.plugins.spinnerDialog.hide();
                    },
                    function (error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                          window.plugins.spinnerDialog.hide();
                    }
            );
        }

        $scope.backToMessageListingpage = function () {
            $rootScope.showMessageview = false;
            $rootScope.showCompose = false;
            window.scrollTo(0, 0);
        };

        $scope.addNew = function ()
        {
            angular.element($("#trixDemoId")).scope().trix = "";
            $rootScope.showCompose = true;
            $scope.mailTo = [];
            $scope.mailCc = [];
            $scope.mailBcc = [];
            $scope.attachments=[];
            $scope.showCC = false;
            $scope.showBcc = false;
            $scope.composeMail = {};
            $rootScope.messageType = 'new';
            $rootScope.messageId = 0;
        }
        $scope.cancelComposeMail = function () {
            $scope.showMessageCancelPopup = true;
        }

        $scope.emailContent = "Hi";

        $scope.messageReply = function (messageData) {
            $rootScope.showCompose = true;
            $scope.showCC = false;
            $scope.showBcc = false;
            $rootScope.messageType = 'reply';
            $scope.composeMail.ToStaffIds = [];
            $scope.composeMail.ccStaffIds = [];
            $scope.composeMail.bccStaffIds = [];
            if (messageData[0].message_from_id == localStorage.getItem("userId")) {
                if (messageData[0].message_to_id)
                    var idList = messageData[0].message_to_id.split(",");
                if (idList.length > 0) {

                    for (var j = 0; j < $scope.staffList.length; j++) {

                        if (idList[0] == $scope.staffList[j].id_usr)
                        {
                            $scope.composeMail.ToStaffIds.push($scope.staffList[j]);
                            break;

                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.staffList.length; i++) {

                    if (messageData[0].message_from_id == $scope.staffList[i].id_usr)
                    {
                        $scope.composeMail.ToStaffIds.push($scope.staffList[i]);
                        break;

                    }
                }
            }

            $scope.composeMail.emailSubject = "Re: " + messageData[0].message_subject;
            $rootScope.messageId = messageData[0].message_id;
            $scope.messageContent = "<div><br/><br/></div><div><b>On " + messageData[0].message_date + ", " + messageData[0].message_from + " wrote:</b></div><br/><div>" + messageData[0].message_content + "</div>";
            angular.element($("#trixDemoId")).scope().trix = $scope.messageContent;

        };

        $scope.messageReplyAll = function (messageData) {
            $rootScope.showCompose = true;
            $rootScope.messageType = 'reply';
            $scope.composeMail.ToStaffIds = [];
            $scope.composeMail.ccStaffIds = [];
            $scope.composeMail.bccStaffIds = [];
            $scope.showCC = false;
            $scope.showBcc = false;
            $scope.staffListId = [];
            var toIdList = [];
            var ccIdList = [];
            var bccIdList = [];

            if (messageData[0].message_to_id)
                toIdList = messageData[0].message_to_id.split(",");
            var fromIdList = messageData[0].message_from_id;
            var idList = toIdList.concat(fromIdList);
            //console.log(JSON.stringify("toIdList :" +toIdList + "fromIdList :" + fromIdList + "list : " + idList));
            for (var i = 0; i < idList.length; i++) {
                if (idList[i] != localStorage.getItem("userId")) {
                    $scope.staffListId.push(idList[i]);
                }
            }
            if ($scope.staffListId.length > 0) {
                for (var j = 0; j < $scope.staffListId.length; j++) {
                    for (var k = 0; k < $scope.staffList.length; k++) {

                        if ($scope.staffListId[j] == $scope.staffList[k].id_usr)
                        {
                            $scope.composeMail.ToStaffIds.push($scope.staffList[k]);
                        }
                    }
                }
            }
            if (messageData[0].message_cc_id)
                ccIdList = messageData[0].message_cc_id.split(",");
            if (ccIdList.length > 0) {
                $scope.showCC = true;
                for (var l = 0; l < ccIdList.length; l++) {
                    for (var m = 0; m < $scope.staffList.length; m++) {
                        if (ccIdList[l] == $scope.staffList[m].id_usr) {
                            $scope.composeMail.ccStaffIds.push($scope.staffList[m]);
                        }
                    }
                }
            }
            if (messageData[0].message_bcc_id)
                bccIdList = messageData[0].message_bcc_id.split(",");
            if (bccIdList.length > 0) {
                $scope.showBcc = true;
                for (var p = 0; p < bccIdList.length; p++) {
                    for (var q = 0; q < $scope.staffList.length; q++) {
                        if (bccIdList[p] == $scope.staffList[q].id_usr) {
                            $scope.composeMail.bccStaffIds.push($scope.staffList[q]);
                        }
                    }
                }
            }
            $scope.composeMail.emailSubject = "Re: " + messageData[0].message_subject;
            $rootScope.messageId = messageData[0].message_id;
            $scope.messageContent = "<div><br/><br/></div><div><b>On " + messageData[0].message_date + ", " + messageData[0].message_from + " wrote:</b></div><br/><div>" + messageData[0].message_content + "</div>";
            angular.element($("#trixDemoId")).scope().trix = $scope.messageContent;
        };

        $scope.messageForward = function (messageData) {
            $scope.composeMail.ToStaffIds = [];
            $scope.composeMail.ccStaffIds = [];
            $scope.composeMail.bccStaffIds = [];
            $rootScope.showCompose = true;
            $rootScope.messageType = 'forward';
            $scope.composeMail.emailSubject = "Fwd: " + messageData[0].message_subject;
            $rootScope.messageId = messageData[0].message_id;
            $scope.messageContent = "<div><br/><br/></div><b><div>-------- Forwarded Message --------</div><div><span>Subject: </span></b>" + messageData[0].message_subject + "</div><div><span></span><b>Date: </b>" + messageData[0].message_date + "</div><div><span><b>From: </b></span>" + messageData[0].message_from + "</div><div><span><b>To: </b></span>" + messageData[0].message_to + "</div><br/><div>" + messageData[0].message_content + "</div>";
            angular.element($("#trixDemoId")).scope().trix = $scope.messageContent;

        };

        $scope.draftMail = function (messageData) {
            $rootScope.showCompose = true;
            $rootScope.messageType = 'new';
            $scope.composeMail.ToStaffIds = [];
            $scope.composeMail.ccStaffIds = [];
            $scope.composeMail.bccStaffIds = [];
            $scope.showCC = false;
            $scope.showBcc = false;
            var draftToIdList = [];
            var draftCcIdList = [];
            var draftBccIdList = [];
            if (messageData[0].message_to_id)
                draftToIdList = messageData[0].message_to_id.split(",");
            if (messageData[0].message_cc_id)
                draftCcIdList = messageData[0].message_cc_id.split(",");
            if (messageData[0].message_bcc_id)
                draftBccIdList = messageData[0].message_bcc_id.split(",");
            if (draftToIdList.length > 0) {
                for (var i = 0; i < draftToIdList.length; i++) {
                    for (var j = 0; j < $scope.staffList.length; j++) {
                        if (draftToIdList[i] == $scope.staffList[j].id_usr) {
                            $scope.composeMail.ToStaffIds.push($scope.staffList[j]);
                        }
                    }
                }
            }

            if (draftCcIdList.length > 0) {
                $scope.showCC = true;
                for (var k = 0; k < draftCcIdList.length; k++) {
                    for (var l = 0; l < $scope.staffList.length; l++) {
                        if (draftCcIdList[k] == $scope.staffList[l].id_usr) {
                            $scope.composeMail.ccStaffIds.push($scope.staffList[l]);
                        }
                    }
                }
            }
            if (draftBccIdList.length > 0) {
                $scope.showBcc = true;
                for (var x = 0; x < draftBccIdList.length; x++) {
                    for (var y = 0; y < $scope.staffList.length; y++) {
                        if (draftBccIdList[x] == $scope.staffList[y].id_usr) {
                            $scope.composeMail.bccStaffIds.push($scope.staffList[y]);
                        }
                    }
                }
            }
            $scope.composeMail.emailSubject = messageData[0].message_subject;
            $rootScope.messageId = messageData[0].message_id;
            angular.element($("#trixDemoId")).scope().trix = messageData[0].message_content;
        };
        $scope.saveMail = function () {
            $scope.mailTo = [];
            $scope.mailCc = [];
            $scope.mailBcc = [];
            if ($scope.composeMail.emailSubject) {
                $scope.composeMailSubject = $scope.composeMail.emailSubject;
            } else {
                $scope.composeMailSubject = '';
            }
            $scope.composeMail.messageBody = angular.element($("#trixDemoId")).scope().trix;
            if (!$scope.composeMail.ToStaffIds)
                $scope.composeMail.ToStaffIds = [];
            if ($scope.composeMail.ToStaffIds.length > 0) {
                for (var i = 0; i < $scope.composeMail.ToStaffIds.length; i++) {
                    $scope.mailTo.push($scope.composeMail.ToStaffIds[i].id_usr);
                }
            } else {
                $scope.mailTo[0] = -1;
            }
            if (!$scope.composeMail.ccStaffIds)
                $scope.composeMail.ccStaffIds = [];
            if ($scope.composeMail.ccStaffIds.length > 0) {
                for (var i = 0; i < $scope.composeMail.ccStaffIds.length; i++) {
                    $scope.mailCc.push($scope.composeMail.ccStaffIds[i].id_usr);
                }
            }
            if (!$scope.composeMail.bccStaffIds)
                $scope.composeMail.bccStaffIds = [];
            if ($scope.composeMail.bccStaffIds.length > 0) {
                for (var i = 0; i < $scope.composeMail.bccStaffIds.length; i++) {
                    $scope.mailBcc.push($scope.composeMail.bccStaffIds[i].id_usr);
                }
            }

            $scope.draftSt = 1;
            $scope.mailText = {type: $rootScope.messageType, id: $rootScope.messageId, mail_to: $scope.mailTo, mail_cc: $scope.mailCc, mail_bcc: $scope.mailBcc, mail_subject: $scope.composeMailSubject, mail_message: $scope.composeMail.messageBody, mail_id: 0, is_draft: $scope.draftSt};
            compossMail.compossMailData($scope.mailText, $scope.attachments, constanObject.WebRequestType.COMPOSS_MAIL, constanObject.COMPOSS_MAIL);
        };
        $scope.sendMail = function () {
            $scope.mailTo = [];
            $scope.mailCc = [];
            $scope.mailBcc = [];
            $scope.mailRecipientList1 = [];
            if ($scope.composeMail.emailSubject) {
                $scope.composeMailSubject = $scope.composeMail.emailSubject;
            } else {
                $scope.composeMailSubject = '';
            }
            $scope.composeMail.messageBody = angular.element($("#trixDemoId")).scope().trix;
            //console.log(JSON.stringify($scope.composeMail));
            if (!$scope.composeMail.ToStaffIds)
                $scope.composeMail.ToStaffIds = [];
            if ($scope.composeMail.ToStaffIds.length > 0) {
                for (var i = 0; i < $scope.composeMail.ToStaffIds.length; i++) {
                    $scope.mailTo.push($scope.composeMail.ToStaffIds[i].id_usr);
                }
            }
            if (!$scope.composeMail.ccStaffIds)
                $scope.composeMail.ccStaffIds = [];
            if ($scope.composeMail.ccStaffIds.length > 0) {
                for (var j = 0; j < $scope.composeMail.ccStaffIds.length; j++) {
                    $scope.mailCc.push($scope.composeMail.ccStaffIds[j].id_usr);
                }
            }
            if (!$scope.composeMail.bccStaffIds)
                $scope.composeMail.bccStaffIds = [];
            if ($scope.composeMail.bccStaffIds.length > 0) {
                for (var k = 0; k < $scope.composeMail.bccStaffIds.length; k++) {
                    $scope.mailBcc.push($scope.composeMail.bccStaffIds[k].id_usr);
                }
            }
            $scope.draftSt = 0;
            $scope.mailText = {type: $rootScope.messageType, id: $rootScope.messageId, mail_to: $scope.mailTo, mail_cc: $scope.mailCc, mail_bcc: $scope.mailBcc, mail_subject: $scope.composeMailSubject, mail_message: $scope.composeMail.messageBody, mail_id: 0, is_draft: $scope.draftSt};
//            $scope.mailRecipient = $scope.mailText.mail_to.concat($scope.mailText.mail_cc);
//            $scope.mailRecipientList = $scope.mailRecipient.concat($scope.mailText.mail_bcc);
//            for (i = 0; i < $scope.mailRecipientList.length; i++) {
//                if ($scope.mailRecipientList[i])
//                    $scope.mailRecipientList1.push($scope.mailRecipientList[i]);
//            }
            if ($scope.mailText.mail_to.length > 0) {
                $scope.isError = false;
                if ($scope.mailText.mail_subject || $scope.mailText.mail_message) {
                    $scope.isReminder = false;
                    compossMail.compossMailData($scope.mailText, $scope.attachments, constanObject.WebRequestType.COMPOSS_MAIL, constanObject.COMPOSS_MAIL);
                } else {
                    $scope.isReminder = true;
                    $scope.reminderMsg = 'Send this message without a subject or text in the body?';
                }
            } else {
                $scope.isError = true;
                $scope.errorMsg = 'Please specify at least one recipient.';
            }
        };
        $scope.saveMessage = function (isMessageSend) {
            $scope.showMessageCancelPopup = false;
            if (isMessageSend == 'yes')
                $scope.saveMail();
            else
                $rootScope.showCompose = false;
        }
        $scope.closeErrorMsg = function () {
            $scope.isError = false;
        }
        $scope.cancelMessage = function () {
            $scope.isReminder = false;
        }
        $scope.closeMessage = function () {
            $scope.isReminder = false;
            compossMail.compossMailData($scope.mailText, $scope.attachments, constanObject.WebRequestType.COMPOSS_MAIL, constanObject.COMPOSS_MAIL);
        }
        $scope.closePopUp = function () {
            $rootScope.isMessageSend = false;
        };

        $scope.spliceItem = function (id, ev) {
            //        //console.log(ev.target.attributes);
            if (ev.target.attributes[0].nodeValue != "images/cross.png")
                return false;
            //        alert('in spliceItem and id is ' + id);
            for (var i = $scope.attachments.length - 1; i > -1; i--) {
                if ($scope.attachments[i].id == id) {
                    $scope.attachments.splice($scope.attachments.indexOf($scope.attachments[i]), 1);
                    db.transaction(function (ctx) {
                        var query = "DELETE FROM ";
                        query += TABLE_CREATE_INCIDENT_REPORT_FILE;
                        query += " WHERE ";
                        query += FIELD_JSON_DATA;
                        query += "=";
                        query += item.src;
                        ctx.executeSql(query);
                    }, function (dbError) {
                        //console.log(dbError);
                    });
                    //                    //                    dataBaseObj.insertQuery(TABLE_CREATE_INCIDENT_REPORT_FILE, FIELD_JSON_DATA, item.src);
                    imageNum--;
                }
            }
        };

        $scope.action = function (n) {
            switch (n) {
                case 1:
                    //gallary
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;

                    imageService.getMediaImage(function (item) {
                        $scope.$apply(function () {
                            $scope.showUploadAction = false;
                            item.id = imageNum;
                            $scope.attachments.push(item);

                        });
                        window.plugins.spinnerDialog.hide();
                    });
                    break;

                case 2:
                    // camera
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;
                    imageService.getCameraImage(function (item) {
                        $scope.$apply(function () {
                            $scope.showUploadAction = false;
                            //                        item.dSrc = item.dSrc.slice(6);
                            item.id = imageNum;
                            //                        //console.log(item);
                            $scope.attachments.push(item);
                        });
                        window.plugins.spinnerDialog.hide();
                    });

                    break;

                case 3:
                    // video
                    // start video capture
                    showSpinner(true, true, SPINNER_MESSAGE);
                    imageNum++;
                    $scope.showUploadAction = false;
                    imageService.getVideo(function (item) {
                        $timeout(function () {
                            imageService.createThumb(item, function (i2) {
                                $scope.$apply(function () {
                                    i2.id = imageNum;
                                    $scope.attachments.push(i2);

                                });
                                window.plugins.spinnerDialog.hide();
                            });
                            window.plugins.spinnerDialog.hide();
                        }, 3000);
                    });

                    break;

                case 4:
                    // close
                    $scope.showUploadAction = false;
                    window.plugins.spinnerDialog.hide();
                    break;

                default:
                    $scope.showUploadAction = false;
                    window.plugins.spinnerDialog.hide();
                    break;
            }
        }



        function loadStaffList() {

            var data = getLinkedStaffList.getData();
            if (!data) {
                setTimeout(function () {
                    //       window.plugins.spinnerDialog.show();
                    loadStaffList();
                }, 50);
            } else {
                setTimeout(function () {

                    $scope.$apply(function () {
                        $scope.staffList = data;
                        //      window.plugins.spinnerDialog.hide();
                    })
                }, 10);
            }

        }
        loadStaffList();


        /*------------------------Add Mail----------------------*/

        var scrollToTop = false;

        $scope.$on('checkInternetConnection', function (event, arg) {
            $scope.$apply(function () {
                if (!arg.network) {
                    $scope.noInternetAvailable = true;
                    if (scrollToTop) {
                        window.scrollTo(0, 0);
                        scrollToTop = false;
                    }
                } else {
                    scrollToTop = true;
                    $scope.noInternetAvailable = false;

                }
            });
        });

        $scope.$on('checkMessageCall', function (event, arg) {
            if (arg.headerMessageType && arg.headerMessageId) {
                $scope.init();
            }
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


    }]);
