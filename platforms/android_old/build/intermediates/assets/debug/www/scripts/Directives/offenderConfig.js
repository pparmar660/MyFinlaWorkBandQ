var uiLoadedOffender = false;
BandQModule.directive("offenderConfig", ["$http", "$compile", "$timeout", "$window", "$q", function ($http, $compile, $timeout, $window, $q) {

        var fieldsArray = {
            "202": "views/FieldTemplate/offenderListTemplate_202.html",
            "203": "views/FieldTemplate/offenderDetailTemplate_203.html",
            "204": "views/FieldTemplate/offenderAddTemplate_204.html",
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
                if (uiLoadedOffender)
                    return;
                uiLoadedOffender = true;

                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'scripts/ui.js';
                document.body.appendChild(s);

                 s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'scripts/custom.js';
                document.body.appendChild(s);

            }, 1000);
//            

//               var watch = scope.$watch(function() {
//                return element.children().length;
//            }, function() {
            // Wait for templates to render
//                scope.$evalAsync(function() {
//                      if(uiLoaded)
//                        return;
//                    uiLoaded = true;
//
//                    var s = document.createElement('script');
//                    s.type = 'text/javascript';
//                    s.async = true;
//                    s.src = 'scripts/ui.js';
//                    document.body.appendChild(s);
//                });
            // });

//
//            function load_script() {
//                var s = document.createElement('script');
//                s.type = 'text/javascript';
//                s.async = true;
//                s.src = 'scripts/ui.js';
//                document.body.appendChild(s);
//            }
//
//
//            function lazyLoadApi(key) {
//                var deferred = $q.defer();
//                $window.initialize = function () {
//                    deferred.resolve();
//                };
//                // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
//                if ($window.attachEvent) {
//                    $window.attachEvent('onload', load_script);
//                } else {
//                    $window.addEventListener('load', load_script, false);
//                }
//                return deferred.promise;
//            }

        }

        return {
            restrict: "EA",
            scope: true,
            link: linker,
        }


    }]);

