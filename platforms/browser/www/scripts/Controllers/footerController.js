BandQModule.controller("footerController", function ($scope, $rootScope, checkInternetConnectionService, $timeout, appMenuConfig) {
    var DASHBOARD = 0,
            REPORTING = 8,
            EMPLOYMENT = 24,
            RESOURCES = 27,
            COMMSTASK = 36,
            SECURITY = 38;
    $scope.footerMenu = {};
    appMenuConfig.setAppMenuConfig();
    $scope.init = function () {
        
        $timeout(function () {
            
            var data = appMenuConfig.getAppMenuConfig();
            
             if(!data){
               $scope.init();
                 return;                 
             }
            angular.forEach(data, function (value, key) {
               if (key == DASHBOARD) {
                    $scope.footerMenu.dashboard = value;
                }
                else if (key == REPORTING) {
                    $scope.footerMenu.reporting = value;
                }
                else if (key == EMPLOYMENT) {
                    $scope.footerMenu.employment = value;
                 }
                else if (key == RESOURCES) {
                    $scope.footerMenu.resources = value;
                }
                else if (key == COMMSTASK) {
                    $scope.footerMenu.commsTask = value;
                }
                else if (key == SECURITY) {
                    $scope.footerMenu.security = value;
                }
            });
        }, 1000);


    };
    $scope.init();
    $scope.goToEmployment = function () {

       window.location.href = "dashboard.html#/employmentHome";
        
//         if (!checkInternetConnectionService.checkNetworkConnection()) {
//            $rootScope.internetconnection = true;
//            $rootScope.hometemplate = false;
//            $rootScope.staffDetailtemplate = false;
//        } else {
            //breadCrum
            $rootScope.menuTitle = 'Employment';
            $rootScope.subMenuTitle = '';
            $rootScope.subMenuTitle1 = '';
            $rootScope.dashboardLink = '#/dashboard';
            $rootScope.internetconnection = false;
            $rootScope.hometemplate = true;
            $rootScope.staffDetailtemplate = false;
            $('#link_Ep1').addClass("active");
            $('#link_Ep2').removeClass("active");
           // callProfile = false;
      //  }
    
    };
//    
//    $scope.goToResource = function(){
//         window.location.href = "resource/index.html";
//
//    };
    
    $rootScope.isFooterMenu = false;
    $rootScope.toggleFooterMenu = function(){
     $rootScope.isFooterMenu = !$rootScope.isFooterMenu;
     $rootScope.messageHeaderShow = false;
     $rootScope.showSyncTab = false;
    };

    $scope.hideFooterMenu = function(){
        
        $rootScope.isFooterMenu = false;
    
    }

});