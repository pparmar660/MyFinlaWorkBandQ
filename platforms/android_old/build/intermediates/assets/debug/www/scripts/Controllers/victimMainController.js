BandQModule.controller("victimMainController",
        ['$scope', '$http', '$rootScope', 'globalService',
            function ($scope, $http, $rootScope, globalService) {

                $scope.MainOffenderTemplates;
                var noOfPageMove;

                $scope.init = function (_noOfPageMove) {
                    noOfPageMove = _noOfPageMove;
                     showSpinner(true, true, SPINNER_MESSAGE);
                    setTimeout(function () {
                        if (angular.element($('#212')).scope())
                            angular.element($('#212')).scope().init(noOfPageMove);

                        if (angular.element($('#215')).scope())
                            angular.element($('#215')).scope().init(noOfPageMove);


                        if (angular.element($('#214')).scope())
                            angular.element($('#214')).scope().init(noOfPageMove);
                    window.plugins.spinnerDialog.hide();
                    }, 2000);






                }


                $scope.nextButtonClicked = function (callBack) {
                    if (angular.element($('#212')).scope())
                        angular.element($('#212')).scope().nextButtonClicked(callBack);

                    if (angular.element($('#215')).scope())
                        angular.element($('#215')).scope().nextButtonClicked(callBack);


                    if (angular.element($('#214')).scope())
                        angular.element($('#214')).scope().nextButtonClicked(callBack);


                };




                $scope.back = function (callBack) {
                    if (angular.element($('#212')).scope())
                        angular.element($('#212')).scope().back(callBack);

                    if (angular.element($('#215')).scope())
                        angular.element($('#215')).scope().back(callBack);


                    if (angular.element($('#214')).scope())
                        angular.element($('#214')).scope().back(callBack);
                }


            }]);