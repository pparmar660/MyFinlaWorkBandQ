BandQModule.directive("linkedModule", ["$http", "$compile", function ($http, $compile) {

        var fieldsArray = {
            "203": "views/linkedModule/linkedOffenderDetail.html",
            "208": "views/linkedModule/linkedVehicleDetail.html",
            "215": "views/linkedModule/linkedVictimDetails.html",
            "219": "views/linkedModule/linkedWitnessDetails.html",
            "222": "views/linkedModule/linkedIncidentDetails.html"
        };

        var linker = function (scope, element, attr) {
       

                $http.get(fieldsArray[scope.moduleId]).then(function (response) {
                    try {
                        element.html(response.data);
                        $compile(element.contents())(scope);

                    } catch (e) {

                        console.log("error Linked module" + JSON.stringify(response));
                    }
                });
            
        }

        return {
            restrict: "EA",
            scope: true,
            link: linker,
        }


    }]);


