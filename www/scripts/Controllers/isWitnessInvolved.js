BandQModule.controller('isWintnessInvolvedCntrl', function ($scope, WitnessService, $rootScope, globalService, checkInternetConnectionService) {
    $scope.whoIsthevictimshowstatus = null;
    $scope.witness = null;
    $scope.whorequired = false;
    $scope.yesnorequired = false;
    $scope.isWitness = null;
    $scope.categorty = [];
    $scope.witnessList = [];
   // var noOfPageMove;
    $scope.init = function () {
       $scope.setCatagory();
        $scope.isWitnessInvolvedToolTipMessage = $scope.fieldData[99].question_hint;
        $scope.whoIsWitnessInvolvedToolTipMessage = $scope.fieldData[99].question_hint;

        WitnessService.getWitnessCategory(function (status, data) {
            if (status) {
                var milliseconds = new Date().getTime();
                dataBaseObj.deleteTableData(VICTIME_WITNESS_CATAGORY);
                dataBaseObj.insertData(VICTIME_WITNESS_CATAGORY, JSON_DATA_KEY, [JSON.stringify(data), milliseconds], null);
                $scope.setCatagory();
            }
        });
        $scope.reset();
    };

    $scope.setCatagory = function () {
        dataBaseObj.getDatafromDataBase("SELECT * FROM " + VICTIME_WITNESS_CATAGORY, function (result) {
            if (result[0]) {
                var data = JSON.parse(result[0].json_data);
                $scope.$apply(function () {
                    //console.log(JSON.stringify(data));
                    $scope.categorty = data;
                });
                if ($scope.witness != null)
                    $("#99").children("div.victim_wrap").children("#btw_" + $scope.witness.id_uct).children("button").addClass("active");
            }
        });
    };

    $scope.yesAction = function () {
        $scope.yesnorequired = false;
        $scope.whoIstheWitnessShowStatus = true;
        $rootScope.isWitnessInvolved = true;
        $("#wityesBtn").addClass("active");
        $("#witnoBtn").removeClass("active");
    };
    $scope.noAction = function () {
        $scope.yesnorequired = false;
        $scope.whoIstheWitnessShowStatus = false;
        $rootScope.isWitnessInvolved = false;
        $("#witnoBtn").addClass("active");
        $("#wityesBtn").removeClass("active");
    };
    $scope.catagoryClick = function (obj) {
        $scope.selectedCategory = [];
        $scope.whorequired = false;
        $("#btw_" + obj.id_uct).children("button").addClass("active");
        $("#btw_" + obj.id_uct).siblings("div").children("button").removeClass("active");
        $scope.witness = obj;
        $scope.selectedCategory.push($scope.witness.id_uct);
        WitnessService.setSelectedVitnessCategory($scope.witness.id_uct,true)
//        var witnessListScope = angular.element('#218').scope();
//        witnessListScope.selectedCategory = [];
//        witnessListScope.selectedCategory.push($scope.witness.id_uct);
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.isWitnessInvolved == null) {
            $scope.yesnorequired = true;
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
            return callback(false, 0);
        } else {
            if ($rootScope.isWitnessInvolved) {
                $rootScope.witnessTemplates = new Array(0);
                $rootScope.witnessTemplates = ["217", "218", "219"];
                 if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.witnessAddShowStatus = true;
                    $rootScope.witnessDetailShowStatus = false;
                    $rootScope.witnessListShowStatus = false;
                } else {
                    $rootScope.witnessAddShowStatus = false;
                    $rootScope.witnessDetailShowStatus = false;
                    $rootScope.witnessListShowStatus = true;
                }
                if ($scope.witness == null) {
                    $scope.whorequired = true;
                    $rootScope.show = true;
                    window.scrollTo(0, 0);
                    $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                    return callback(false, 0);
                } else {
                    //var scope = angular.element('#218').scope();
                    $scope.categorty.forEach(function (catObj) {
                        if (catObj.id_uct == $scope.witness.id_uct) {
                            catObj.selected = true;
                        } else {
                            catObj.selected = false;
                        }

                    });
                    //scope.categoryList = $scope.categorty;
                    WitnessService.setWitnessCategory({'category':$scope.categorty, 'selectedWitnessCategory': $scope.selectedCategory});
                    globalService.setWitness({'witnesses': $scope.witnessList, 'isWitnessInvolves': 'yes'});
                    return callback(true, 1);
                }
            } else {
                globalService.setWitness({'witnesses': "", 'isWitnessInvolves': 'no'});
                return callback(true, 3);
            }
        }
    };
    $scope.back = function (callback) {
        $scope.yesnorequired = false;
        $rootScope.show = false;
        $scope.whorequired = false;
        return callback(true);
    };
    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
    $scope.reset = function () {
        if (!globalService.getWitness())
            return;
        if (globalService.getWitness().isWitnessInvolves == 'yes') {
             $scope.setCatagory();
            $scope.yesAction();
            $scope.witnessList = globalService.getWitness().witnesses;
            if(WitnessService.getWitnessCategory().category)
             $scope.categorty=WitnessService.getWitnessCategory().category;
           if(WitnessService.getWitnessCategory().selectedWitnessCategory)
            $scope.selectedCategory = WitnessService.getWitnessCategory().selectedWitnessCategory;
            for (var i = 0; i < $scope.categorty.length; i++) {
                if ($scope.categorty[i].id_uct == $scope.selectedCategory[0]) {
                    $scope.cat = $scope.categorty[i];
                    $scope.witness = $scope.categorty[i];
                }
            }
        }
        else {
            $scope.noAction();
        }
    };
    $scope.init();
});