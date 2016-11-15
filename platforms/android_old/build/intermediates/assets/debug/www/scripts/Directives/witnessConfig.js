var uiLoadedwitnessConfig = false;
BandQModule.directive("witnessConfig", ["$http", "$compile","$timeout", function ($http, $compile,$timeout) {

        var fieldsArray = {
            217: "views/FieldTemplate/addNewWitness_217.html",
            218: "views/FieldTemplate/witnessList_218.html",
            219: "views/FieldTemplate/witnessDetails_219.html",
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
                if (uiLoadedwitnessConfig)
                    return;
                uiLoadedwitnessConfig = true;

                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'scripts/ui.js';
                document.body.appendChild(s);
           
            }, 1000);
        }

        return {
            restrict: "EA",
            scope: true,
            link: linker,
        }


    }]);