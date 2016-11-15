BandQModule.controller("offenderMainController", ['$scope', '$http', '$rootScope', 'globalService',
            function ($scope, $http, $rootScope, globalService) {

                $scope.MainOffenderTemplates;
                var noOfPageMove;

                $scope.init = function (_noOfPageMove) {
                    noOfPageMove = _noOfPageMove;
                    showSpinner(true, true, SPINNER_MESSAGE);
                    loadTemmplate();

                }


                function loadTemmplate() {

                    if (angular.element($('#204')).scope()) {
                        if (angular.element($('#202')).scope())
                            angular.element($('#202')).scope().init(noOfPageMove);

                        if (angular.element($('#203')).scope())
                            angular.element($('#203')).scope().init(noOfPageMove);


                        if (angular.element($('#204')).scope())
                            angular.element($('#204')).scope().init(noOfPageMove);

                        window.plugins.spinnerDialog.hide();
                    } else {

                        setTimeout(function () {

                            loadTemmplate();
                        }, 20);

                    }
                }

                $scope.nextButtonClicked = function (callBack) {
                    if (angular.element($('#202')).scope())
                        angular.element($('#202')).scope().nextButtonClicked(callBack);

                    if (angular.element($('#203')).scope())
                        angular.element($('#203')).scope().nextButtonClicked(callBack);


                    if (angular.element($('#204')).scope())
                        angular.element($('#204')).scope().nextButtonClicked(callBack);


                };




                $scope.back = function (callBack) {
                    if (angular.element($('#202')).scope())
                        angular.element($('#202')).scope().back(callBack);

                    if (angular.element($('#203')).scope())
                        angular.element($('#203')).scope().back(callBack);


                    if (angular.element($('#204')).scope())
                        angular.element($('#204')).scope().back(callBack);
                }


            }]);