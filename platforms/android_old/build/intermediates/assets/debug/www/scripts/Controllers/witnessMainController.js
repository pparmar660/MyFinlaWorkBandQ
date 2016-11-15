BandQModule.controller("witnessMainController",
        ['$scope', '$http', '$rootScope', 'globalService',
            function ($scope, $http, $rootScope, globalService) {

                $scope.MainOffenderTemplates;
                var noOfPageMove;

                $scope.init = function (_noOfPageMove) {
                    noOfPageMove = _noOfPageMove;
                    showSpinner(true, true, SPINNER_MESSAGE);
                    setTimeout(function () {
                        if (angular.element($('#218')).scope())
                            angular.element($('#218')).scope().init(noOfPageMove);

                        if (angular.element($('#219')).scope())
                            angular.element($('#219')).scope().init(noOfPageMove);


                        if (angular.element($('#217')).scope())
                            angular.element($('#217')).scope().init(noOfPageMove);
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


            }]);