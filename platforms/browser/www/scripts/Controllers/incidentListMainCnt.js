BandQModule.controller('incidentListMainCnt', function ($scope, IncidentReport, $rootScope) {
    $rootScope.menuTitle = 'Security';
    $rootScope.subMenuTitle = 'Incident Reports';
    $rootScope.subMenuTitle1 = '';
    $rootScope.dashboardLink = '#/dashboard';
    $rootScope.menuLink = '#/security';
    $scope.init = function () {
        if (localStorage.getItem("pushItemId")) {
            $rootScope.incidentDetail = true;
           
        } else {
            $rootScope.incidentDetail = false;
        }
        $("#ftDashbord").removeClass("active");
        $("#ftSecurity").addClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");
    };
    $scope.init();
    updateClass();
    $scope.breadcrumbMenu = function (val) {
        if (val == "Security") {
            window.location.href = "dashboard.html#/security";
        } else if (val == "Incident Reports") {
            $rootScope.incidentDetail = false;
            $rootScope.menuTitle = 'Security';
            $rootScope.subMenuTitle = 'Incident Reports';
            $rootScope.subMenuTitle1 = '';
            window.location.href = "dashboard.html#/incidentView";
        }
    };
});


var updateClass = function () {

    // alert(document.getElementById("link_2"));
    if (document.getElementById("link_2"))
    {
        $("#link_2").addClass("activate active");
        $("#link_1").removeClass("activate active");
        $("#link_3").removeClass("activate active");
        $("#link_4").removeClass("activate active");
        $("#link_5").removeClass("activate active");
         $("#ftDashbord").removeClass("active");
        $("#ftSecurity").addClass("active");
        $("#ftComms").removeClass("active");
        $("#ftEmployment").removeClass("active");
        $("#ftResource").removeClass("active");
        $("#ftReporting").removeClass("active");

    } else {
        setTimeout(function () {
            updateClass();
        }, 1000);
    }
    

}

//$(document).on("click", "#ftDashbord", function () {
//    window.location.href = "dashboard.html";
//});
//$(document).on("click", "#ftSecurity", function () {
//    window.location.href = "dashboard.html#/security";
//});
//$(document).on("click", "#ftComms", function () {
//    window.location.href = "dashboard.html#/commsTasks";
//});
//$(document).on("click", "#ftEmployment", function () {
//    window.location.href = "dashboard.html#/employmentHome";
//});
//$(document).on("click", "#ftResource", function () {
//    window.location.href = "dashboard.html#/resources";
//});
//$(document).on("click", "#ftReporting", function () {
//    window.location.href = "dashboard.html#/reporting";
//});
//$(document).on("click", "#mainDashboaPage", function () {
//    window.location.href = "dashboard.html";
//});
