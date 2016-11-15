BandQModule.controller('isOffenderInvolvedCnt', function ($scope, OffenderService, globalService, 
$rootScope, checkInternetConnectionService) {
    $rootScope.show = false;
    $scope.whyrequired = false;
    $rootScope.yesnorequired = false;
    $scope.whyNotShowStatus = false;
    $scope.offenderTemplates = null;
    $scope.offenderInfo = {};
    $scope.mySelectedValues = '';
    //  var noOfPageMove;
    $scope.selectedOffenders = [];
    $scope.offenderInvolvedNotes = "";

    $scope.init = function () {
        $scope.isOffenderInvolvedToolTipMessage = $scope.AllFieldLabelData[97].question_hint;
        $scope.whyNotOffenderToolTipMessage = $scope.AllFieldLabelData[69].question_hint;
        $scope.reset();
    };
    $scope.yesAction = function () {
        $rootScope.yesnorequired = false;
        $("#main_next_Btn").addClass("active");
        $rootScope.isOffenderInvolved = true;
        $scope.whyNotShowStatus = false;
        $("#yesBtn").addClass("active");
        $("#noBtn").removeClass("active");
        $scope.offenderInvolvedNotes = '';
    };
    $scope.noAction = function () {
        $rootScope.yesnorequired = false;
        $("#main_next_Btn").addClass("active");
        $rootScope.isOffenderInvolved = false;
        $scope.whyNotShowStatus = true;
        $("#noBtn").addClass("active");
        $("#yesBtn").removeClass("active");

    };
    $scope.nextButtonClicked = function (callback) {
        if ($rootScope.isOffenderInvolved != null) {
            $rootScope.yesnorequired = false;
            if ($rootScope.isOffenderInvolved) {

                $rootScope.offenderTemplates = new Array(0);
                $rootScope.offenderTemplates = ["202", "203", "204"];
                if (!checkInternetConnectionService.checkNetworkConnection()) {
                    $rootScope.offenserAddShowStatus = true;
                    $rootScope.offenderDetailShowStatus = false;
                    $rootScope.offenderListShowStatus = false;
                } else {
                    $rootScope.offenserAddShowStatus = false;
                    $rootScope.offenderDetailShowStatus = false;
                    $rootScope.offenderListShowStatus = true;
                }
                globalService.setOffender({'whyNot': '', 'offenderDetails': $scope.selectedOffenders, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
                return callback(true, 1);
            } else {
                if ($scope.offenderInvolvedNotes == "") {
                    $scope.whyrequired = true;
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Insufficient Information: Please check the error messages displayed on the screen.";
                    return callback(false, 0);
                } else {
                    globalService.setOffender({'whyNot': $scope.offenderInvolvedNotes, 'offenderDetails': "", 'isOffenderInvolved': 'no', "actionTaken": ''});
                    $rootScope.offenderTemplates = new Array(0);
                    $rootScope.offenderTemplates = null;
                    return callback(true, 3);
                }
            }

        } else {
            $rootScope.yesnorequired = true;
            $rootScope.show = true;
            window.scrollTo(0, 0);
            $rootScope.alertMsg = "You have some form errors. Please check below.";
            return callback(false, 0);
        }

    };
      $scope.saveButtonClicked = function (callBack){
          if ($rootScope.isOffenderInvolved == true) 
              globalService.setOffender({'whyNot': '', 'offenderDetails': $scope.selectedOffenders, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
          else if($rootScope.isOffenderInvolved == false)
              globalService.setOffender({'whyNot': $scope.offenderInvolvedNotes, 'offenderDetails': "", 'isOffenderInvolved': 'no', "actionTaken": ''});
                 return callback(true);
      };

    $scope.textFocus = function () {
        $scope.whyrequired = false;
    }

    $scope.back = function (callBack) {
        return callBack(true);
    }
   
    $scope.reset = function () {
        if (!globalService.getOffender())
            return;
        if (globalService.getOffender().isOffenderInvolved == 'yes') {
            $scope.yesAction();
            $scope.mySelectedValues = globalService.getOffender().actionTaken;
            $scope.selectedOffenders = globalService.getOffender().offenderDetails;
        }
        else {
            $scope.offenderInvolvedNotes = globalService.getOffender().whyNot;
            $scope.noAction();

        }
    };
    $scope.init();
});