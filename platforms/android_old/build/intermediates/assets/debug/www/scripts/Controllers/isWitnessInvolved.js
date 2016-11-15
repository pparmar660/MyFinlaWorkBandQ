BandQModule.controller('isWintnessInvolvedCntrl', function ($scope, WitnessService, $rootScope,globalService) {
    $scope.whoIsthevictimshowstatus = null;
    $scope.witness = null;
    $scope.whorequired = false;
    $scope.yesnorequired = false;
    $scope.isWitness = null;
    $scope.categorty = [];
    var noOfPageMove;
    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;
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
        $scope.whorequired = false;
        $("#btw_" + obj.id_uct).children("button").addClass("active");
        $("#btw_" + obj.id_uct).siblings("div").children("button").removeClass("active");
        $scope.witness = obj;
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
                    WitnessService.setWitnessCategory($scope.categorty);
                    return callback(true, 1);
                }
            } else {
                globalService.setWitness({"isWitnessInvolves":"No",witnesses:""});
                return callback(true, 3);
            }
        }
    };
    $scope.back = function (callback) {
        $scope.yesnorequired = false;
            $rootScope.show = false;
             $scope.whorequired = false;
        return callback(true, noOfPageMove);
    };
    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
});