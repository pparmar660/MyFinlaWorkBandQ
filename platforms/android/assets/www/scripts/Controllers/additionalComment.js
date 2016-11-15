BandQModule.controller("additionalComment", ["$scope", "$rootScope", "globalService", function ($scope, $rootScope, globalService) {
        var noOfPageMove;
        $scope.init = function () {
            $scope.addtionalCommentToolTipMessage = $scope.fieldData[20].question_hint;
           // noOfPageMove = _noOfPageMove;
            // hide next and save , show submit
            $rootScope.hideButton = true;
            $scope.reset();
        };
        $scope.nextButtonClicked = function (callBack) {
            return callBack(true, noOfPageMove);
        };
        $scope.back = function (callBack) {
            //show next and save and hide submit
            $rootScope.hideButton = false;
            return callBack(true, 1);
        };

        $scope.submitBtnAction = function (callBack) {
            globalService.setAdditionalComment({additionalComment: $scope.comment});
// alert('Incident has been submitted');
//window.location.href = 'dashboard.html';
            return callBack(true);
        }
        
        
        $scope.saveButtonClicked = function (callBack){
                 globalService.setAdditionalComment({additionalComment: $scope.comment});
                 return callBack(true);
           
        };

        $scope.reset = function () {
            if (globalService.getAdditionalComment())
                $scope.comment = globalService.getAdditionalComment().additionalComment;
        }

        $scope.init();

    }]);

