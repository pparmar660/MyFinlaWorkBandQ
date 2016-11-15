var uiLoadedvictimConfig = false;
BandQModule.directive("victimConfig", ["$http", "$compile","$timeout", function ($http, $compile,$timeout) {

        var fieldsArray = {
            212: "views/FieldTemplate/victimList_212.html",
            214: "views/FieldTemplate/AddNewVictime_214.html",
            215: "views/FieldTemplate/VictimDetail_215.html",
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
                if (uiLoadedvictimConfig)
                    return;
                uiLoadedvictimConfig = true;

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
