BandQModule.controller("witnessMainController",
        ['$scope', '$http', '$rootScope', 'globalService',
            function ($scope, $http, $rootScope, globalService) {

                $scope.MainOffenderTemplates;
                var noOfPageMove;

                $scope.init = function () {
                    //  noOfPageMove = _noOfPageMove;
                    showSpinner(true, true, SPINNER_MESSAGE);
                    $rootScope.uiLoadedwitnessConfig=false;
                    setTimeout(function () {
                        if (angular.element($('#218')).scope())
                            angular.element($('#218')).scope().init();

                        if (angular.element($('#219')).scope())
                            angular.element($('#219')).scope().init();


                        if (angular.element($('#217')).scope())
                            angular.element($('#217')).scope().init();
                        window.plugins.spinnerDialog.hide();
                    }, 2000);

                }


                $scope.nextButtonClicked = function (callBack) {
                    if (angular.element($('#218')).scope())
                        angular.element($('#218')).scope().nextButtonClicked(callBack);

                    if (angular.element($('#219')).scope())
                        angular.element($('#219')).scope().nextButtonClicked(callBack);
                    if (angular.element($('#217')).scope())
                        angular.element($('#217')).scope().nextButtonClicked(callBack);

                };

                $scope.back = function (callBack) {
                    if (angular.element($('#218')).scope())
                        angular.element($('#218')).scope().back(callBack);

                    if (angular.element($('#219')).scope())
                        angular.element($('#219')).scope().back(callBack);


                    if (angular.element($('#217')).scope())
                        angular.element($('#217')).scope().back(callBack);
                }

                $scope.init();
            }]);