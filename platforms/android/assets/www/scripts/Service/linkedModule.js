BandQModule.service("linkedModule", function ($rootScope) {



    var scope;

    this.setScope = function (scopeParmeter) {
        scope = scopeParmeter;
        scope.showLinkedModule = false;
        $rootScope.hideNextBack=false;

        scope.openOffenderDetail = function (offneserData) {

           

            scope.moduleId = "203";
            if (offneserData.ofndr_id)
                scope.offenderId = offneserData.ofndr_id;
            else
            if (offneserData.id)
                scope.offenderId = offneserData.id;
            else
                console.log("Please set id of linked offender");

            scope.showLinkedModule = true;
            $rootScope.hideNextBack=true;

        }

        scope.openVehicleDetail = function (vehicleData) {

            

            scope.moduleId = "208";
            if (vehicleData.id_vtk)
                scope.vehicleId = vehicleData.id_vtk;
            else if (vehicleData.id)
                scope.vehicleId = vehicleData.id;
            else
                console.log("Please set id of linked vehicle");
            scope.showLinkedModule = true;
              $rootScope.hideNextBack=true;

        }

        scope.openVictimDetail = function (victimData) {

        

            scope.moduleId = "215";
            if (victimData.id_victim)
                scope.victimId = victimData.id_victim;
            else if (victimData.id)
                scope.victimId = victimData.id;
            else
                console.log("Please set id of linked victim");

            scope.showLinkedModule = true;
              $rootScope.hideNextBack=true;

        }

        scope.openWitnessDetail = function (witnessData) {




            scope.moduleId = "219";
            if (witnessData.id_wit)
                scope.witnessId = witnessData.id_wit;
            else if (witnessData.id)
                scope.witnessId = witnessData.id;
            else
                console.log("Please set id of linked witness");
            scope.showLinkedModule = true;
              $rootScope.hideNextBack=true;

        }


            scope.openIncidentDetail = function (incidentData) {

           

            scope.moduleId = "222";
             if (incidentData.id)
                scope.incidentId = incidentData.id;
            else
                console.log("Please set id of linked witness");
            scope.showLinkedModule = true;
              $rootScope.hideNextBack=true;

        }


        scope.closeDetail = function () {
            scope.showLinkedModule = false;
              $rootScope.hideNextBack=false;
            
          

        }

    }





});