BandQModule.controller("offenderMainController", ['$scope',"$rootScope", function ($scope,$rootScope) {

        $scope.MainOffenderTemplates;

        $scope.init = function () {
            showSpinner(true, true, SPINNER_MESSAGE);
            $rootScope.uiLoadedOffender=false;
            loadTemmplate();

        }

        function loadTemmplate() {

            if (angular.element($('#204')).scope()) {
                if (angular.element($('#202')).scope())
                    angular.element($('#202')).scope().init();

                if (angular.element($('#203')).scope())
                    angular.element($('#203')).scope().init();


                if (angular.element($('#204')).scope())
                    angular.element($('#204')).scope().init();

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
        $scope.saveButtonClicked = function (callBack) {
            if (angular.element($('#202')).scope())
                angular.element($('#202')).scope().saveButtonClicked(callBack);

            if (angular.element($('#203')).scope())
                angular.element($('#203')).scope().saveButtonClicked(callBack);

//            if (angular.element($('#204')).scope())
//                angular.element($('#204')).scope().saveButtonClicked(callBack);

        };
        $scope.back = function (callBack) {
            if (angular.element($('#202')).scope())
                angular.element($('#202')).scope().back(callBack);

            if (angular.element($('#203')).scope())
                angular.element($('#203')).scope().back(callBack);


            if (angular.element($('#204')).scope())
                angular.element($('#204')).scope().back(callBack);
        }
        $scope.init();

    }]);