BandQModule.controller("vehicleMainController",
        ['$scope', "$rootScope", function ($scope, $rootScope) {

                $scope.MainVehicleTemplates;
                var noOfPageMove;

                $scope.init = function () {
                    // noOfPageMove = _noOfPageMove;
                    showSpinner(true, true, SPINNER_MESSAGE);
                    $rootScope.uiLoadedvehicleConfig = false;

                    setTimeout(function () {
                        if (angular.element($('#207')).scope())
                            angular.element($('#207')).scope().init();
                        if (angular.element($('#208')).scope())
                            angular.element($('#208')).scope().init();
                        if (angular.element($('#206')).scope())
                            angular.element($('#206')).scope().init();
                        window.plugins.spinnerDialog.hide();
                    }, 2000);
                }

                $scope.nextButtonClicked = function (callBack) {
                    if (angular.element($('#207')).scope())
                        angular.element($('#207')).scope().nextButtonClicked(callBack);
                    if (angular.element($('#208')).scope())
                        angular.element($('#208')).scope().nextButtonClicked(callBack);
                    if (angular.element($('#206')).scope())
                        angular.element($('#206')).scope().nextButtonClicked(callBack);
                };

                $scope.back = function (callBack) {
                    if (angular.element($('#207')).scope())
                        angular.element($('#207')).scope().back(callBack);
                    if (angular.element($('#208')).scope())
                        angular.element($('#208')).scope().back(callBack);
                    if (angular.element($('#206')).scope())
                        angular.element($('#206')).scope().back(callBack);
                }
                $scope.init();
            }]);
