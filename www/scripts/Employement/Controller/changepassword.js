BandQModule.controller("changepassword", ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.showSucessMessage = false;
        $scope.btnEnable = "";
        var userId = localStorage.getItem("userId");

        // hide change password dialouge popup
        var changePwdScope = angular.element($("#staffDetail")).scope();
        $scope.cancelPassword = function () {
            changePwdScope.changePasswordTemplate = false;
            $scope.newPwd = "";
            $scope.reNewPwd = "";
            $scope.currentPwd = "";
            $scope.changePasswordForm.currentPwd.$valid = false;
            $scope.changePasswordForm.currentPwd.$invalid = false;
            $scope.changePasswordForm.currentPwd.$pristine = true;
            // update pk
            $scope.changePasswordForm.newPwd.$invalid = false;
            $scope.changePasswordForm.newPwd.$pristine = true;
            $scope.changePasswordForm.newPwd.$valid = false;
            $scope.changePasswordForm.reNewPwd.crosstick = false;
            $scope.changePasswordForm.reNewPwd.greentick = false;
            $scope.changePasswordForm.reNewPwd.notmach = false;

            //for tab highlighting

            var staffScope = angular.element($("#stafDetail")).scope();
            $("#changePasswordId").removeClass("resp-tab-active");
            $scope.showFalureMessage = false;
            $scope.showSucessMessage = false;
            //disabling confirm  button
            $scope.btnEnable = "";
        }

        $scope.validatCurrentPassword = function (val) {
            $scope.btnEnable = "";
            if (!$scope.currentPwd)
                return false;
            if ($scope.currentPwd.length <= 0)
                return false;

            $scope.btnEnable = "green";
            validatConfirm("currentPassword");

        }

        var currentPasswordValidationCheck = function () {
            if (!$scope.currentPwd)
                return false;
            if (!$scope.currentPwd)
                return false;
            if ($scope.currentPwd.length <= 0)
                return false;

            return true;

        }

        $scope.vlidatePassword = function () {
            $scope.btnEnable = "";
            var inputvalue = $scope.newPwd;
            if (!inputvalue)
                return false;
            // check numaric charachter 
            $scope.changePasswordForm.newPwd.atlestOneNumber = false;
            $scope.changePasswordForm.newPwd.atlestFiveAplhabet = false;
            $scope.changePasswordForm.newPwd.maximumtwochar = false;
            $scope.changePasswordForm.newPwd.$valid = true;
            if (inputvalue.length < 8) {
                $scope.changePasswordForm.newPwd.$error.minlength = true;

                $scope.changePasswordForm.newPwd.$valid = false;
                return false;
            }
            var hasNumber = /\d/;
            if (!hasNumber.test(inputvalue)) {
                $scope.changePasswordForm.newPwd.atlestOneNumber = true;
                $scope.changePasswordForm.newPwd.$valid = false;
                return false;
            }
            // check alphabet charachter
            var totalNoOfAlphabet = 0;
            for (var i = 0; i < inputvalue.length; i++) {
                if (allLetter(inputvalue[i])) {
                    totalNoOfAlphabet++;
                }
            }
            if (totalNoOfAlphabet < 5) {
                $scope.changePasswordForm.newPwd.atlestFiveAplhabet = true;
                $scope.changePasswordForm.newPwd.$valid = false;
                return false;
            }
            // only two same character
            var str = getAlldifferentCharacter(inputvalue);
            for (var i = 0; i < str.length; i++)
                if ((inputvalue.match((new RegExp(str[i], "g")) || []).length > 2)) {
                    $scope.changePasswordForm.newPwd.maximumtwochar = true;
                    $scope.changePasswordForm.newPwd.$valid = false;
                    return false;

                }

            $scope.btnEnable = "green";
            $scope.RePasswordvlaidation();
            validatConfirm("newPassword");


        }


        var newPasswordValidation = function () {
            if (!$scope.newPwd)
                return false;

            var inputvalue = $scope.newPwd;
            if (!inputvalue)
                return false;

            if (inputvalue.length < 8) {

                return false;
            }
            var hasNumber = /\d/;
            if (!hasNumber.test(inputvalue)) {
                return false;
            }
            // check alphabet charachter
            var totalNoOfAlphabet = 0;
            for (var i = 0; i < inputvalue.length; i++) {
                if (allLetter(inputvalue[i])) {
                    totalNoOfAlphabet++;
                }
            }
            if (totalNoOfAlphabet < 5) {
                return false;
            }
            // only two same character
            var str = getAlldifferentCharacter(inputvalue);
            for (var i = 0; i < str.length; i++)
                if ((inputvalue.match((new RegExp(str[i], "g")) || []).length > 2)) {
                    return false;

                }

            return true;
        }


        //confirm password.................................
        $scope.RePasswordvlaidation = function () {
            $scope.btnEnable = "";
            if ($scope.reNewPwd.match($scope.newPwd)) {
                //updae pk
                $scope.changePasswordForm.reNewPwd.notmach = false;
                $scope.changePasswordForm.reNewPwd.crosstick = false;
                $scope.changePasswordForm.reNewPwd.greentick = true;
                $scope.btnEnable = "green";
                validatConfirm("reInsertPassword");
                return true;

            } else {
                $scope.changePasswordForm.reNewPwd.notmach = true;
                $scope.changePasswordForm.reNewPwd.greentick = false;
                $scope.changePasswordForm.reNewPwd.crosstick = true;
                return false;
            }


        }


        var rePasswordValiationCheck = function () {
            if (!$scope.reNewPwd)
                return false;

            if ($scope.reNewPwd.match($scope.newPwd)) {
                return true;

            } else {
                return false;
            }
        }


        function validatConfirm(from) {
            $scope.btnEnable = "";
            if (from == "currentPassword")
            {
                if (newPasswordValidation() && rePasswordValiationCheck())
                    $scope.btnEnable = "green";


            }

            if (from == "newPassword") {
                if (currentPasswordValidationCheck() && rePasswordValiationCheck())
                    $scope.btnEnable = "green";

            }

            if (from == "reInsertPassword")
            {
                if (newPasswordValidation() && currentPasswordValidationCheck())
                    $scope.btnEnable = "green";


            }

        }



        $scope.confirm = function () {
            $scope.showFalureMessage = false;
            if ($scope.btnEnable == "green") {
                if (!$scope.changePasswordForm.newPwd.$invalid && !$scope.changePasswordForm.reNewPwd.$invalid)
                {

                    var data = {};
                    data.uid = userId;
                    data.old_password = $scope.currentPwd;
                    data.new_password = $scope.newPwd
                    webRequestObject.postRequest($scope, "POST", constanObject.CHANGE_PASSWORD,
                            data, constanObject.employmentWebRequestType.CHANGE_PASSWORD, true);
                }
            } else
                $scope.showFalureMessage = true;


        }
        $scope.webRequestResponse = function (requestType, status, responseData) {
            if (status == constanObject.ERROR) {
                $scope.$apply(function () {
                    $scope.showFalureMessage = true;
                    $scope.showSucessMessage = false;
                    showErrorAlert(requestType, responseData);
                });
                return;
            }
            switch (requestType) {
                case constanObject.employmentWebRequestType.CHANGE_PASSWORD:
                    $scope.$apply(function () {
                        $scope.showSucessMessage = true;
                        $scope.showFalureMessage = false;

                    });

                    break;
            }
        };
        // password validation with directive
        /*BandQModule.directive('passwordValidate', function () {
         return {
         restrict: 'A',
         scope: true,
         link: function (scope, element, attrs) {*/








        function newpassword(inputvalue) {
            var newpasswordmatch = "";
            for (var i = 0; i < inputvalue.length; i++) {
                newpasswordmatch = newpasswordmatch + inputvalue[i];
            }
            return newpasswordmatch;
        }
        //confirm password................
        function getAlldifferentCharacter(inputvalue) {
            var allDifferentLetter = "";
            for (var i = 0; i < inputvalue.length; i++) {
                if (!(allDifferentLetter.indexOf(inputvalue[i]) > -1))
                    allDifferentLetter = allDifferentLetter + inputvalue[i];

            }
            return allDifferentLetter;

        }

        function allLetter(inputtxt) {
            var letters = /^[A-Za-z]+$/;
            if (inputtxt.match(letters))
                return true;
            else
                return false;

        }


    }]);

/*     }
 }
 });*/