var uiLoadedvehicleConfig = false;

BandQModule.directive("vehicleConfig", ["$http", "$compile","$timeout","$rootScope", function ($http, $compile,$timeout,$rootScope) {

        var fieldsArray = {
            "206": "views/FieldTemplate/addVehical_206.html",
            "207": "views/FieldTemplate/vehicleList_207.html",
            "208": "views/FieldTemplate/vehicleDetails_208.html",
        };

        var linker = function (scope, element, attr) {
            //     //console.log("Field Id: " + scope.fieldId);
            if (scope.template in fieldsArray) {
                $http.get(fieldsArray[scope.template]).then(function (response) {
                    element.html(response.data);
                    $compile(element.contents())(scope);
                });
            }
            
                 $timeout(function () {
                // wait for plugin to complete...
                if ($rootScope.uiLoadedvehicleConfig)
                    return;
                $rootScope.uiLoadedvehicleConfig = true;

                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'scripts/ui.js';
                document.body.appendChild(s);
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'scripts/custom.js';
                document.body.appendChild(s);
            }, 1000);
        }

        return {
            restrict: "EA",
            scope: true,
            link: linker,
        }


    }]);

