/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

BandQModule.controller("appMainController", ['$scope', '$rootScope', 'globalService', function ($scope, $rootScope, globalService) {
        var self = this;
        $rootScope.show = false;
        $rootScope.infoShow = false;
        $rootScope.successShow = false;
        self.appMainPageShowStatus = true;
        self.loginPageShowStatus = false;
        $rootScope.menuTitle = 'Security';
        $rootScope.subMenuTitle = 'Incident Reports';
        $rootScope.dashboardLink = '#/dashboard';


        $rootScope.addIncidentMainCtrl = function () {
            $rootScope.editIncident = false;
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

        $scope.closeMsg = function () {
            $rootScope.show = false;
        }
        $scope.infoClose = function () {
            $rootScope.infoShow = false;
        }
        $scope.successClose = function () {
            $rootScope.successShow = false;
        }
        updateClass();
        // Breadcrum Page Redirection
        $scope.breadcrumbMenu = function (val) {

            if (val == "Security") {
                window.location.href = "dashboard.html#/security";
            } else if (val == "Incident Reports") {
                $rootScope.incidentDetail = false;
                window.location.href = "dashboard.html#/incidentView";
            }
        };


    }]);

var updateClass = function () {
    // alert(document.getElementById("link_2"));
    if (document.getElementById("link_2"))
    {
        $("#link_2").addClass("activate active");
        $("#link_1").removeClass("activate active");
        $("#link_3").removeClass("activate active");
        $("#link_4").removeClass("activate active");
        $("#link_5").removeClass("activate active");
        $('#ftDashbord').removeClass("active");
        $('#ftSecurity').addClass("active");

    } else {
        setTimeout(function () {
            updateClass();
        }, 1000);
    }
}

