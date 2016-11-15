BandQModule.controller("vehicleMainController",
        ['$scope', function ($scope) {

                $scope.MainVehicleTemplates;
                var noOfPageMove;

                $scope.init = function (_noOfPageMove) {
                    noOfPageMove = _noOfPageMove;
                    showSpinner(true, true, SPINNER_MESSAGE);
                    setTimeout(function () {
                        if (angular.element($('#207')).scope())
                            angular.element($('#207')).scope().init(noOfPageMove);

                        if (angular.element($('#208')).scope())
                            angular.element($('#208')).scope().init(noOfPageMove);


                        if (angular.element($('#206')).scope())
                            angular.element($('#206')).scope().init(noOfPageMove);
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


            }]);
