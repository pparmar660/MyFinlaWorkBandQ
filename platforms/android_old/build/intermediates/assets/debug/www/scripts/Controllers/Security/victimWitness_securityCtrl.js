BandQModule.controller('victimWitness_securityCtrl', function ($scope, $rootScope, VictimWitness, checkInternetConnectionService) {

//
//
//    $rootScope.isVictimWitnessList = false;
//    $rootScope.isVictimWitnessDetail = false;
//    $rootScope.isVictimWitnessAdd = true;


    $scope.model = {};
    $scope.filterParam = {};
    $scope.victimWitnessData = [];
    $scope.selectedWitness = [];
    $scope.page = null;
    $scope.url_witnessList = constanObject.WITNESS_LIST;
    $scope.VictimData = [];
    $scope.WitnessData = [];
    $scope.selectedVictims = [];
    $scope.url_victimList = constanObject.VICTIME_LIST;
    $scope.ListCatagory = [];


    $scope.getVictimList = function () {

        if (!checkInternetConnectionService.checkNetworkConnection()) {
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "No internet connection.";
            return;
        }
        var filterData = {search: $scope.filterParam};
        $scope.page = 1;

        VictimWitness.getVictimeData($scope.page, $scope.url_victimList, filterData, function (status, data, dataperPage) {
            if (status) {
                $scope.$apply(function () {
                    $scope.infoShow1 = false;
                    //console.log("Victim Data" + JSON.stringify(data));
                    $scope.VictimWitnessData = data;
                    //console.log("Victim Data" + JSON.stringify($scope.VictimWitnessData));

                    if (data.length >= dataperPage) {
                        $scope.prevShowStatus = true;
                        $scope.nextShowStatus = true;
                        if ($scope.page == 1)
                            $scope.prevShowStatus = false;
                    } else {
                        $scope.prevShowStatus = false;
                        $scope.nextShowStatus = false;
                    }
                });
//                hilightVictim();
            } else {
                $scope.$apply(function () {
                    $scope.VictimWitnessData = [];
                    $scope.infoShow1 = true;
                    $scope.prevShowStatus = false;
                    $scope.nextShowStatus = false;
                });
            }
        });


    };

    $scope.getVictimList();

    this.getCatagory = function () {
        webRequestObject.postRequest(this, "GET", constanObject.VICTIME_CATEGORY, null, 101, true);
        this.webRequestResponse = function (requestType, status, response) {
            if (status == constanObject.ERROR) {
                return callback(false, JSON.parse(response.responseText).error);
            }
            switch (requestType) {
                case 101:
                    {
                        response.data.forEach(function (obj) {
                            if (obj.title_uct =="Member of Public") {
                                obj.selected = true;
                            } else {
                                obj.selected = false;
                            }
                        });
                        $scope.ListCatagory = response.data;
                        //console.log("ListCatagory" + JSON.stringify($scope.ListCatagory));
                        // callback(true, response.data);
                    }

                    break;
            }
        };
    }

    //this.getCatagory();
});