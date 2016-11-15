BandQModule.controller("securityDashboard",function($scope,$rootScope){
   
   $scope.handleSecurityMenu = function(menuItem){
        if(menuItem == "incident_view")
            window.location.href = "dashboard.html#/incidentView";
        else if(menuItem == "offenders_add"){
        	$rootScope.offenserAddShowStatus=true;
      	    window.location.href = "AddOffenderFullPage.html";
      	}
        else if(menuItem=="vehicle_add"){
            window.location.href = "addNewVehicle.html";
        }
        else
            window.location.href = "dashboard.html#/createIncident";

   };
    
});