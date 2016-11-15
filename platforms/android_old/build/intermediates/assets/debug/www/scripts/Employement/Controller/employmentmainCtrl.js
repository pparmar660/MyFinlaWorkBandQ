BandQModule.controller('employmentmainCtrl', function ($scope, $rootScope, checkInternetConnectionService) {

    $scope.employmentTemplateType = {
        STAFF_DETAIL: 1,
        STAFF_DIRECTORY: 2,
        VENUE_DETAIL: 3,
        VENUE_DIRECTORY: 4,
        NO_INTERNET: 5
    }

    $scope.lastVisible = -1;



    $scope.init = function () {
        window.scrollTo(0, 0);
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").removeClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").addClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
        loadTeplate();
    };


    function loadTeplate() {

        if (!angular.element($("#venueDirectory")).scope()) {
            setTimeout(function () {
                loadTeplate()
            }, 20);
            return;
        }

        setTimeout(function () {
            $scope.$apply(function () {

                if (localStorage.getItem("showProfileDetail") == "1") {
                    $rootScope.staffDetailtemplate = true;
                    angular.element($("#staffDetail")).scope().init();
                    localStorage.setItem("showProfileDetail", "0");
                    return;
                }


                if ($rootScope.staffDetailtemplate) {

                    angular.element($("#staffDetail")).scope().init();
                }


                if ($rootScope.staffDirectorytemplate)
                    angular.element($("#staffDirectory")).scope().init();

                if ($rootScope.venueDetailtemplate) {
                    $rootScope.venueDetailtemplate = false;
                    $rootScope.venueDirectorytemplate = true;
                    //angular.element($("#venueDirectory")).scope().init();
                }

                if ($rootScope.venueDirectorytemplate)
                    angular.element($("#venueDirectory")).scope().init();

                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $scope.showHideTemplate($scope.employmentTemplateType.NO_INTERNET);
                    return;

                }
            });
        }, 20);

    }

    $scope.showHideTemplate = function (no) {
        $rootScope.isStaffDirectoryAdd = false;

        switch (no)
        {
            case $scope.employmentTemplateType.STAFF_DETAIL:
                $rootScope.staffDetailtemplate = true;
                $rootScope.staffDirectorytemplate = false;
                $rootScope.venueDetailtemplate = false;
                $rootScope.venueDirectorytemplate = false;
                $rootScope.internetconnection = false;

                $('#link_Ep3').removeClass("active");
                $('#link_Ep1').removeClass("active");
                $('#link_Ep2').addClass("active");
                $('#link_Ep4').removeClass("active");

                $rootScope.menuTitle = 'Employment';
                $rootScope.subMenuTitle = 'My Profile';
                $rootScope.subMenuTitle1 = '';
                $rootScope.dashboardLink = '#/dashboard';

                break;


            case  $scope.employmentTemplateType.STAFF_DIRECTORY:
                $rootScope.staffDetailtemplate = false;
                $rootScope.staffDirectorytemplate = true;
                $rootScope.venueDetailtemplate = false;
                $rootScope.venueDirectorytemplate = false;
                $rootScope.internetconnection = false;
                $('#link_Ep3').addClass("active");
                $('#link_Ep1').removeClass("active");
                $('#link_Ep2').removeClass("active");
                $('#link_Ep4').removeClass("active");
                $rootScope.menuTitle = 'Employment';
                $rootScope.subMenuTitle = 'Staff Directory';
                $rootScope.subMenuTitle1 = '';
                $rootScope.dashboardLink = '#/dashboard';
                break;
            case  $scope.employmentTemplateType.VENUE_DETAIL:
                $rootScope.staffDetailtemplate = false;
                $rootScope.staffDirectorytemplate = false;
                $rootScope.venueDetailtemplate = true;
                $rootScope.venueDirectorytemplate = false;
                $rootScope.internetconnection = false;
                $('#link_Ep3').removeClass("active");
                $('#link_Ep1').removeClass("active");
                $('#link_Ep2').removeClass("active");
                $('#link_Ep4').addClass("active");

                $rootScope.menuTitle = "Employment";
                $rootScope.subMenuTitle = "Venue Directory";
                $rootScope.subMenuTitle1 = "Venue Profile";
                break;

            case  $scope.employmentTemplateType.VENUE_DIRECTORY:
                $rootScope.staffDetailtemplate = false;
                $rootScope.staffDirectorytemplate = false;
                $rootScope.venueDetailtemplate = false;
                $rootScope.venueDirectorytemplate = true;
                $rootScope.internetconnection = false;
                $('#link_Ep3').removeClass("active");
                $('#link_Ep1').removeClass("active");
                $('#link_Ep2').removeClass("active");
                $('#link_Ep4').addClass("active");

                $rootScope.menuTitle = "Employment";
                $rootScope.subMenuTitle = "Venue Directory";
                $rootScope.subMenuTitle1 = "";

                break;

            case  $scope.employmentTemplateType.NO_INTERNET:

                if ($rootScope.staffDetailtemplate)
                    $scope.lastVisible = $scope.employmentTemplateType.STAFF_DETAIL;


                if ($rootScope.staffDirectorytemplate)
                    $scope.lastVisible = $scope.employmentTemplateType.STAFF_DIRECTORY;


                if ($rootScope.venueDetailtemplate)
                    $scope.lastVisible = $scope.employmentTemplateType.VENUE_DETAIL;


                if ($rootScope.venueDirectorytemplate)
                    $scope.lastVisible = $scope.employmentTemplateType.VENUE_DIRECTORY;


                $rootScope.staffDetailtemplate = false;
                $rootScope.staffDirectorytemplate = false;
                $rootScope.venueDetailtemplate = false;
                $rootScope.venueDirectorytemplate = false;
                $rootScope.internetconnection = true;
                break;



        }


    }


    $scope.$on('checkInternetConnection', function (event, arg) {
        $scope.$apply(function () {
            if (arg.network) {
                if ($rootScope.internetconnection) {
                    switch ($scope.lastVisible) {

                        case $scope.employmentTemplateType.STAFF_DETAIL:
                            $rootScope.staffDetailtemplate = true;
                            angular.element($("#staffDetail")).scope().init();
                            break;

                        case $scope.employmentTemplateType.STAFF_DIRECTORY:
                            $rootScope.staffDirectorytemplate = true;
                            angular.element($("#staffDirectory")).scope().init();
                            break;

                        case $scope.employmentTemplateType.VENUE_DETAIL:
                            $rootScope.venueDetailtemplate = true;
                            angular.element($("#venuedetail")).scope().init();
                            break;

                        case $scope.employmentTemplateType.VENUE_DIRECTORY:
                            $rootScope.venueDirectorytemplate = true;
                            angular.element($("#venueDirectory")).scope().init();
                            break;
                    }
                }
            }
        });

    });

// $scope.$on('checkInternetConnection', function (event, arg) {
//        $scope.$apply(function () {
//            if (!arg.network)
//                $scope.noInternetConnectionOnEmployment = true;
//            else {
//                $scope.noInternetConnectionOnEmployment = false;
//
//            }
//        });
//    })
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
