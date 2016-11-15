BandQModule.controller("staffDetail", ['$scope', '$rootScope', 'checkInternetConnectionService', 'globalService', 'appMenuConfig', 'moduleAccessPermission', function ($scope, $rootScope, checkInternetConnectionService, globalService, appMenuConfig, moduleAccessPermission) {
        $scope.staffProfile = [];
        // for showing back mutton

        $scope.userId;
        $scope.showCommsAndTask;
        var appMenu = appMenuConfig.getModuleMenus();
        $scope.employment = {};
        var VENUES_MANAGER = 33,
                STAFF = 145,
                INCIDENT_REPORTS = 213,
                MY_PROFILE = 272,
                STAFF_INMAIL = 203,
                TASK_CHECKLISTS = 204,
                ALERT_NOTIFICATION = 35,
                COMMS = 249;
        angular.forEach(appMenu, function (value, key) {

            if (key == VENUES_MANAGER) {
                $scope.employment.venuePermission = value;
            } else if (key == STAFF) {
                $scope.employment.staffPermission = value;
            } else if (key == INCIDENT_REPORTS) {
                $scope.employment.incidentPermission = value;
            } else if (key == MY_PROFILE) {
                $scope.employment.myProfilePermission = value;
            }else if (key == ALERT_NOTIFICATION) {
                $scope.employment.alertNotification = value;
            } else if (key == STAFF_INMAIL) {
                $scope.employment.inMail = value;
            } else if (key == TASK_CHECKLISTS) {
                $scope.employment.taskCheckLists = value;
            } else if (key == COMMS) {
                $scope.employment.comms = value;
            }
        });
        $scope.moduleAccessInStaffDetail = {};
        $scope.moduleAccessInStaffDetail = moduleAccessPermission.getModulePermission();

        var SECURITY = 38,
                COMMSTASK = 36;
        $scope.menu = {};
        var data = appMenuConfig.getAppMenuConfig();
        angular.forEach(data, function (value, key) {
            if (key == SECURITY) {
                $scope.menu.security = value;
            } else if (key == COMMSTASK) {
                $scope.menu.commsTask = value;
            }
        });

        $scope.init = function () {
            window.scrollTo(0, 0);
            $rootScope.isEditProfile = false;
            if ($rootScope.staffDetailtemplate) {
                $scope.showHideTemplate($scope.employmentTemplateType.STAFF_DETAIL);
                var staffId = $scope.userId = localStorage.getItem("userId");
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                    return;
                }
                //show previos and back button 
                $scope.previosbutton = false;
                $scope.backbutton = true;
                webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_PROFILE + staffId, null, constanObject.employmentWebRequestType.STAFF_DETAIL, true);

            }
        };

        $scope.getStaffDetails = function (staffId) {

            var newstaffDetailScope = angular.element('#addStaffSection').scope();
            newstaffDetailScope.staff_id = staffId;
//       
//              newstaffDetailScope.stafImage = constanObject.GET_STAFF_IMAGE + $scope.staffProfile[0].id_usr + "/5";
//               $scope.stafImage = constanObject.GET_STAFF_IMAGE + $scope.staffProfile[0].id_usr + "/5";
//         
            console.log("staffId : " + JSON.stringify(staffId));

            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }
            //show previos and back button 
            $scope.previosbutton = false;
            $scope.backbutton = true;

            webRequestObject.postRequest($scope, "GET", constanObject.GET_STAFF_PROFILE + staffId, null, constanObject.employmentWebRequestType.STAFF_DETAIL, true);
        };

        $scope.editProfile = function (staff_id) {
            $rootScope.isEditProfile = true;
            $scope.getStaffDetails(staff_id);
        };

        $scope.goToStaffList = function () {
            window.scrollTo(0, 0);
            $scope.showHideTemplate($scope.employmentTemplateType.STAFF_DIRECTORY);
//            $('#personalDetailsId').addClass("resp-tab-active");
//            $('#contactDetailsId').removeClass("resp-tab-active");
//            $('#imageMediaId').removeClass("resp-tab-active");

        };
        $scope.goTohome = function () {
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

        //personal detail tab 
        $scope.personalDetails = function () {
            $scope.personalDetail = true;
            $scope.contactDetail = false;
            $scope.imagemedias = false;
            $("#personalDetailsId").addClass("resp-tab-active");
            $("#contactDetailsId").removeClass("resp-tab-active");
            $("#imageMediaId").removeClass("resp-tab-active");
            $("#changePasswordId").removeClass("resp-tab-active");
        }
        //contact detail tab
        $scope.contactDetails = function () {
            $scope.personalDetail = false;
            $scope.imagemedias = false;
            $scope.contactDetail = true;
            $("#personalDetailsId").removeClass("resp-tab-active");
            $("#contactDetailsId").addClass("resp-tab-active");
            $("#imageMediaId").removeClass("resp-tab-active");
            $("#changePasswordId").removeClass("resp-tab-active");

        }
        $scope.imageMedia = function () {
            $scope.personalDetail = false;
            $scope.contactDetail = false;
            $scope.imagemedias = true;
            $("#personalDetailsId").removeClass("resp-tab-active");
            $("#contactDetailsId").removeClass("resp-tab-active");
            $("#imageMediaId").addClass("resp-tab-active");
            $("#changePasswordId").removeClass("resp-tab-active");
        }
        //change password
        $scope.changePassword = function () {
            $scope.changePasswordTemplate = true;
            $("#changePasswordId").addClass("resp-tab-active");
        }
        $scope.getProfile = function () {

            if (!$scope.staffProfile)
                return;
            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                return;
            }


            // breadcrum
            $rootScope.internetconnection = false;
            $rootScope.hometemplate = false;
            $rootScope.staffDetailtemplate = true;
            //password change for logged user
            $scope.loggeduser = true;
            $scope.showStaffDetailPage = false;
            $scope.personalDetail = true;
            $scope.contactDetail = true;
            $scope.imagemedias = true;

            //$scope.staffProfile.updateddate = $scope.staffProfile[0].last_updated;// moment($scope.staffProfile.last_updated).format('Do MMMM YYYY');
            $scope.staffProfile.dateofbirth = $scope.staffProfile[0].dob_usr;// moment($scope.staffProfile.dob_usr).format('DD-MM-YYYY');
            $scope.titluser = false;
            $scope.firstName = false;
            $scope.middlename = false;
            $scope.lastname = false;
            $scope.emailuser = false;
            $scope.secemailusr = false;
            $scope.jobuser = false;
            $scope.dobuser = false;
            $scope.natonality = false;
            $scope.epinuser = false;
            $scope.epinuser = false;
            $scope.leveluser = false;
            $scope.telephoneUser = false;
            $scope.mobileUser = false;
            $scope.WorkEtensionUser = false;
            $scope.Addressline1 = false;
            $scope.Addressline2 = false;
            $scope.Addressline3 = false;
            $scope.postCode = false;
            $scope.countryUsere = false;
            $scope.userId = localStorage.getItem("userId");
            $scope.staffId = $scope.staffProfile[0].id_usr;
             if ($scope.staffId == $scope.userId)
                $scope.showCommsAndTask = true;
            else
                $scope.showCommsAndTask = false;
            if ($scope.staffProfile[0].title_ttl == "" || $scope.staffProfile[0].title_ttl == null) {
                $scope.titluser = true;
            }

            if ($scope.staffProfile[0].firstname_usr == "") {
                $scope.firstName = true;
            }
            if ($scope.staffProfile[0].middlename_usr == "" || $scope.staffProfile[0].middlename_usr == null) {
                $scope.middlename = true;
            }
            if ($scope.staffProfile[0].lastname_usr == "" || $scope.staffProfile[0].lastname_usr == null) {
                $scope.lastname = true;
            }
            if ($scope.staffProfile[0].email_usr == "" || $scope.staffProfile[0].email_usr == null) {
                $scope.emailuser = true;
            }

            if ($scope.staffProfile[0].secondary_email == null || $scope.staffProfile[0].secondary_email == "") {
                $scope.secemailusr = true;
            }
            if ($scope.staffProfile[0].job_usr == "" || $scope.staffProfile[0].job_usr == null) {
                $scope.jobuser = true;
            }

            //date of birth format
            if ($scope.staffProfile[0].dob_usr == "") {

                $scope.dobuser = true;
            }
            //date of birth format


            if ($scope.staffProfile[0].nationality_usr == "" || $scope.staffProfile[0].nationality_usr == null) {
                $scope.natonality = true;
            }
            if ($scope.staffProfile[0].niss_usr == "" || $scope.staffProfile[0].niss_usr == null) {
                $scope.nissuser = true;
            }
            if ($scope.staffProfile[0].E_pin_usr == "" || $scope.staffProfile[0].E_pin_usr == null) {
                $scope.epinuser = true;
            }
            if ($scope.staffProfile[0].level_usr_title == "" || $scope.staffProfile[0].level_usr_title == null) {
                $scope.leveluser = true;
            }
            $scope.stafImage = constanObject.GET_STAFF_IMAGE + $scope.staffProfile[0].id_usr + "/5";

            if ($scope.staffProfile[0].p_tph_usr == "" || $scope.staffProfile[0].p_tph_usr == null) {
                $scope.telephoneUser = true;
            }
            if ($scope.staffProfile[0].p_mob_usr == "" || $scope.staffProfile[0].p_mob_usr == null) {
                $scope.mobileUser = true;
            }
            if ($scope.staffProfile[0].work_ext_usr == "" || $scope.staffProfile[0].work_ext_usr == null) {
                $scope.WorkEtensionUser = true;
            }
            if ($scope.staffProfile[0].work_ddi_usr == "" || $scope.staffProfile[0].work_ddi_usr == null) {
                $scope.workddi = true;
            }
            if ($scope.staffProfile[0].address_usr == "" || $scope.staffProfile[0].address_usr == null) {
                $scope.Addressline1 = true;
            }
            if ($scope.staffProfile[0].address_2_usr == "" || $scope.staffProfile[0].address_2_usr == null) {
                $scope.Addressline2 = true;
            }
            if ($scope.staffProfile[0].address_3_usr == "" || $scope.staffProfile[0].address_3_usr == null) {
                $scope.Addressline3 = true;
            }
            if ($scope.staffProfile[0].postcode_usr == "" || $scope.staffProfile[0].postcode_usr == null) {
                $scope.postCode = true;
            }
            if ($scope.staffProfile[0].country_name == "" || $scope.staffProfile[0].country_name == null) {
                $scope.countryUsere = true;
            }

            $scope.personalDetail = true;
            $scope.contactDetail = false;
            $scope.imagemedias = false;
        };



        $scope.webRequestResponse = function (requestType, status, response) {

            if (status == constanObject.ERROR) {
                //showErrorAlert(requestType, response);
                return;
            }
            switch (requestType) {
                case constanObject.employmentWebRequestType.STAFF_DETAIL:
                    if ($rootScope.isEditProfile) {
                        var newstaffDetailScope = angular.element('#addStaffSection').scope();
                        $scope.$apply(function () {
                            newstaffDetailScope.profile = response;
                            newstaffDetailScope.init();
                            $rootScope.staffDirectorytemplate = false;
                            $rootScope.isStaffDirectoryAdd = true;
                            $rootScope.staffDetailtemplate = false;
                        });
                    }
                    else {
                        $scope.$apply(function () {
                            $scope.staffProfile = response;
                            $scope.getProfile();
                            $rootScope.staffDirectorytemplate = false;
                            $rootScope.isStaffDirectoryAdd = false;
                            $rootScope.staffDetailtemplate = true;
                        });
                    }

                    break;
            }

        };
        $scope.incidentView = function (type, id) {
            window.location.href = "dashboard.html#/incidentView";
            localStorage.setItem("incidentListType", type);
            localStorage.setItem("incidentListId", id);

        };
        $scope.incidentAdd = function () {
            $rootScope.addIncidentMainCtrl();
            //window.location.href = "dashboard.html#/createIncident";

        };
        $scope.showOffender = function (val, type, id) {
            if (val == 'list') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.offenderListShowStatus = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.offenderListShowStatus = true;
                    $rootScope.internetConnection = false;
                }
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderAddShowStatus = false;
                $rootScope.subMenuTitle1 = '';
                globalService.setUserProfileTypeAndId({'type': type, 'userId': id});
            } else if (val == 'add') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.offenderAddShowStatus = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.offenderAddShowStatus = true;
                    $rootScope.internetConnection = false;
                }
                $rootScope.offenderDetailShowStatus = false;
                $rootScope.offenderListShowStatus = false;
                $rootScope.subMenuTitle1 = 'Add New';

            }
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Offenders & OCGs';
            $rootScope.dashboardLink = '#/dashboard';
            window.location.href = "dashboard.html#/offenderView";
        };

        $scope.showVehicle = function (val, type, id) {
            if (val == 'list') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isVehicleList = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.isVehicleList = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.isNewVehicle = false;
                $rootScope.isVehicleDetails = false;
                globalService.setUserProfileTypeAndId({'type': type, 'userId': id});
            }
            else if (val == 'add') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isNewVehicle = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.isNewVehicle = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.isVehicleList = false;
                $rootScope.isVehicleDetails = false;
            }
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "Add New";
            window.location.href = "dashboard.html#/vehicle";
        };

        $scope.showVictimWitness = function (val, type, id) {
            if (val == 'list') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isVictimWitnessList = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.isVictimWitnessList = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.subMenuTitle1 = "";
                $rootScope.isVictimWitnessDetail = false;
                $rootScope.isVictimWitnessAdd = false;
                globalService.setUserProfileTypeAndId({'type': type, 'userId': id});
            }
            else if (val == 'add') {
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.isVictimWitnessAdd = false;
                    $rootScope.internetConnection = true;
                } else {
                    $rootScope.title = "Add New Victims & Witnesses";
                    $rootScope.isVictimWitnessAdd = true;
                    $rootScope.internetConnection = false;
                    $rootScope.backStatus = "main";
                }
                $rootScope.subMenuTitle1 = "Add New";
                $rootScope.isVictimWitnessList = false;
                $rootScope.isVictimWitnessDetail = false;

            }
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").addClass("active");
            $("#ftComms").removeClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
            window.location.href = "dashboard.html#/securityVictimwitness";
        };
        $scope.showInboxList = function () {
            $rootScope.viewCommsAndTask = 'inbox';
            window.location.href = "dashboard.html#/inboxView";
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
        };
        $scope.showAlertList = function () {
            $rootScope.viewCommsAndTask = 'alert';
            window.location.href = "dashboard.html#/inboxView";
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
        };
        $scope.showCheckList = function () {
            window.location.href = "dashboard.html#/taskAndCheckList";
            $("#ftDashbord").removeClass("active");
            $("#ftSecurity").removeClass("active");
            $("#ftComms").addClass("active");
            $("#ftEmployment").removeClass("active");
            $("#ftResource").removeClass("active");
            $("#ftReporting").removeClass("active");
        };

    }]);
