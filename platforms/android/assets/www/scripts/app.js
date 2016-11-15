'use strict';
var BandQModule = angular.module('BandQModule', ["mn", "ngSanitize", "ngRoute", "ui.select", "ngTouch", "angularRangeSlider", "angular-carousel", "nya.bootstrap.select", '720kb.datepicker', 'angucomplete-ie8', 'angularTrix']);


BandQModule.config(function ($sceProvider) {


    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
})
        .config(['$compileProvider', function ($compileProvider) {
                $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|content|file|local|data):/);
            }]);
;

BandQModule.filter('startFrom_', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return start;
        }
        return [];
    }
});
BandQModule.run(function ($rootScope) {
    $rootScope.breadcrumbMenu = function (val) {
          window.scrollTo(0, 0);
        if (val == "Security") {

            window.location.href = "dashboard.html#/security";
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "";
            $rootScope.subMenuTitle1 = "";
        } else if (val == "Vehicles") {
            $rootScope.isNewVehicle = false;
            $rootScope.isVehicleList = true;
            $rootScope.isVehicleDetails = false;
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Vehicles";
            $rootScope.subMenuTitle1 = "";
        } else if (val == "Victims & Witnesses") {
             $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Victims & Witnesses";
          $rootScope.subMenuTitle1 = "";
            window.location.href = "dashboard.html#/securityVictimwitness";
            $rootScope.isVictimWitnessAdd = false;
            $rootScope.isVictimWitnessDetail = false;
            $rootScope.isVictimWitnessList = true;
           
        } else if (val == "Incident Reports") {
            $rootScope.incidentDetail = false;
            window.location.href = "dashboard.html#/incidentView";
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Incident Reports';
            $rootScope.subMenuTitle1 = '';
        } else if (val == 'Offenders & OCGs') {
            $rootScope.menuTitle = "Security";
            $rootScope.subMenuTitle = "Offenders & OCGs";
            $rootScope.subMenuTitle1 = "";
            window.location.href = "dashboard.html#/offenderView";
            $rootScope.offenderDetailShowStatus = false;
            $rootScope.offenderListShowStatus = true;
            $rootScope.offenderAddShowStatus = false;
        } else if (val == 'Comms & Tasks') {
            $rootScope.menuTitle = "Comms & Tasks";
            $rootScope.subMenuTitle = "";
            $rootScope.subMenuTitle1 = "";
            window.location.href = "dashboard.html#/commsTasks";
        } else if (val == 'Employment') {
            $rootScope.menuTitle = 'Employment';
            window.location.href = "dashboard.html#/employmentHome";

        }
//        else if (val == 'Venue Directory') {
//            $rootScope.menuTitle = "Employment";
//            $rootScope.subMenuTitle = "Venue Directory";
//            $rootScope.subMenuTitle1 = "";
//            
//            $rootScope.staffDetailtemplate = false;
//            $rootScope.staffDirectorytemplate = false;
//            $rootScope.venueDirectorytemplate = true;
//            $rootScope.venueDetailtemplate = false;
//            $('#link_Ep4').addClass("active");
//            $('#link_Ep1').removeClass("active");
//            $('#link_Ep3').removeClass("active");
//            $('#link_Ep1').removeClass("active");
//            $rootScope.menuTitle = 'Employment';
//            window.location.href = "dashboard.html#/employmentHome";
//                $rootScope.staffDetailtemplate = false;
//                $rootScope.staffDirectorytemplate = false;
//                $rootScope.venueDirectorytemplate = false;
//                $rootScope.venueDetailtemplate = false;
//                $('#link_Ep1').addClass("active");
//                $('#link_Ep1').removeClass("active");
//                $('#link_Ep3').removeClass("active");
//                $('#link_Ep4').removeClass("active");
//
//                 $rootScope.menuTitle = 'Employment';
//                window.location.href = "dashboard.html#/employmentMain";
//                
//
//            }
        else if (val == 'Staff Directory') {
            $rootScope.menuTitle = "Employment";
            $rootScope.subMenuTitle = "Staff Directory";
            $rootScope.subMenuTitle1 = "";
            $rootScope.staffDetailtemplate = false;
            $rootScope.staffDirectorytemplate = true;
            $rootScope.isStaffDirectoryAdd = false;
            $rootScope.venueDirectorytemplate = false;
            $rootScope.venueDetailtemplate = false;
            $('#link_Ep4').removeClass("active");
            $('#link_Ep2').removeClass("active");
            $('#link_Ep3').addClass("active");
            $('#link_Ep1').removeClass("active");
            window.location.href = "dashboard.html#/employmentMain";

        }
        else if (val == 'Venue Directory') {
            $rootScope.menuTitle = "Employment";
            $rootScope.subMenuTitle = "Venue Directory";
            $rootScope.subMenuTitle1 = "";
            $rootScope.staffDetailtemplate = false;
            $rootScope.staffDirectorytemplate = false;
             $rootScope.isEditVenue = false;
            $rootScope.venueDirectorytemplate = true;
            $rootScope.venueDetailtemplate = false;
            $('#link_Ep4').addClass("active");
            $('#link_Ep1').removeClass("active");
            $('#link_Ep3').removeClass("active");
            $('#link_Ep1').removeClass("active");
            $rootScope.menuTitle = 'Employment';
            window.location.href = "dashboard.html#/employmentMain";


        }

    };


});
//
//BandQModule.run(function() {
//    FastClick.attach(document.body);
//});
