    
BandQModule.controller('isVictimInvolvedCntrl', function ($scope, VictimWitness, $rootScope, globalService,checkInternetConnectionService) {
    $scope.whoIsthevictimshowstatus = null;
    $scope.victime = null;
    $scope.isvictime = null;
    $scope.categorty = [];
    $scope.whorequired = false;
    $scope.yesnorequired = false;
    $scope.selectedVictims = [];
    $scope.init = function () {
        $scope.yesnorequired = false;
        $scope.whorequired = false;
        $rootScope.show = false;
        $scope.areVictimsInvolvedToolTipMessage = $scope.AllFieldLabelData[98].question_hint;
        $scope.whoIsVictimToolTipMessage = $scope.AllFieldLabelData[98].question_hint;

        $scope.setCatagory();
        VictimWitness.getVictimeCategory(function (status, data) {
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
                if ($scope.victime != null)
                    $("#98").children("div.victim_wrap").children("#" + $scope.victime.id_uct).children("button").addClass("active");
            }
        });
    };

    $scope.yesAction = function () {
        $scope.yesnorequired = false;
        $scope.whoIsthevictimshowstatus = true;
        $rootScope.isVictimInvolved = true;
        $("#vicyesBtn").addClass("active");
        $("#vicnoBtn").removeClass("active");
    };
    $scope.noAction = function () {
        $scope.yesnorequired = false;
        $scope.whoIsthevictimshowstatus = false;
        $rootScope.isVictimInvolved = false;
        $("#vicnoBtn").addClass("active");
        $("#vicyesBtn").removeClass("active");
    };
    $scope.catagoryClick = function (obj) {
        $scope.selectedCategory = [];
        $("#98").children("div.victim_wrap").children("#" + obj.id_uct).children("button").addClass("active");
        $("#98").children("div.victim_wrap").children("#" + obj.id_uct).siblings("div").children("button").removeClass("active");
        $scope.whorequired = false;
        $scope.victime = obj;
        $scope.selectedCategory.push(obj.id_uct);
        VictimWitness.setSelectedVictimCategory(obj.id_uct,true);
    };

    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.isVictimInvolved == null) {
//            alert("Victim involved or not");
            $scope.yesnorequired = true;
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
            return callback(false, 0);
        } else {
            if ($rootScope.isVictimInvolved) {
                $rootScope.victimTemplates = new Array(0);
                $rootScope.victimTemplates = ["212", "214", "215"];
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.victimAddShowStatus = true;
                    $rootScope.victimDetailShowStatus = false;
                    $rootScope.victimListShowStatus = false;
                } else {
                    $rootScope.victimAddShowStatus = false;
                    $rootScope.victimDetailShowStatus = false;
                    $rootScope.victimListShowStatus = true;
                }
                if ($scope.victime == null) {
                    $scope.whorequired = true;
                    $rootScope.show = true;
                    window.scrollTo(0, 0);
                    $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                    return callback(false, 0);
                } else {

                    // var scope = angular.element('#212').scope();
                    $scope.categorty.forEach(function (catObj) {
                        if (catObj.id_uct == $scope.victime.id_uct) {
                            catObj.selected = true;
                        } else {
                            catObj.selected = false;
                        }

                    });
                    VictimWitness.setVictimCategory({'category': $scope.categorty, 'selectedVictimCategory': $scope.selectedCategory});
                     globalService.setVictim({'victimDetails': $scope.selectedVictims, 'isvictimInvolved': 'yes'});
                  return callback(true, 1);
                }
            } else {
                globalService.setVictim({'victimDetails': "", 'isvictimInvolved': 'no'});
                return callback(true, 3);
            }
        }
    };
    $scope.back = function (callback) {

        return callback(true);
    };
    $scope.saveButtonAction = function () {
        //console.log("SAVE");
    };
    $scope.reset = function () {
        if (!globalService.getVictim())
            return;
        if (globalService.getVictim().isvictimInvolved == 'yes') {
            $scope.setCatagory();
            $scope.yesAction();
             $scope.categorty=VictimWitness.getVictimCategory().category;
            $scope.selectedVictims = globalService.getVictim().victimDetails;
          $scope.selectedCategory = VictimWitness.getVictimCategory().selectedVictimCategory;
            if ($scope.selectedCategory)
                for (var i = 0; i < $scope.categorty.length; i++) {
                    if ($scope.categorty[i].id_uct == $scope.selectedCategory[0]) {
                        $scope.cat = $scope.categorty[i];
                        $scope.victime = $scope.categorty[i];
                    }
                }
        } else {
            $scope.noAction();
        }
    };
    $scope.init();
});