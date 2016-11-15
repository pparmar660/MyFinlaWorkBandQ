

var emailaddress = "";
BandQModule.controller('ForgetPasswordCntrl', function ($scope, checkInternetConnectionService) {

    $scope.loginErrorForgotPassword = false;
    $scope.noInternetForgotPassword = false;
    $scope.ForgotPasswordErrorMessage = "Please provide valid email id ";


    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        if ($("#header_forgot_password").is(":visible")) {
            $scope.loginErrorForgotPassword = false;
            $scope.noInternetForgotPassword = false;
        }
    }

    $scope.resetPassword = function () {
        emailaddress = $('#forgot_email').val();
        //console.log(checkEmail(emailaddress) + ',' + emailaddress);
//checkEmail(emailaddress)
        if (checkEmail(emailaddress)) {
//if(true){
            $("#forgot_email").removeClass("tx_erorr");
            $scope.loginErrorForgotPassword = false;


            if (!checkInternetConnectionService.checkNetworkConnection()) {
                $scope.noInternetForgotPassword = true;
                return;
            } else
                $scope.noInternetForgotPassword = false;



            var requestJson = {'email': emailaddress};
            webRequestObject.postRequest($scope, "POST", constanObject.forgotPassword, requestJson, constanObject.WebRequestType.FORGOT_PASSWORD, true);


        } else {
            $("#forgot_email").addClass("tx_erorr");
            $scope.ForgotPasswordErrorMessage = "Error: Please provide a valid email address";
            $scope.loginErrorForgotPassword = true;



            return;

        }
    }
    $scope.buttonLoginFromReset = function () {
        $('#header_reset_password').hide();
        $('#header_login').show();
    };

    $scope.moveToLoginProfile = function () {

        $scope.loginErrorForgotPassword = false;
        $scope.noInternetForgotPassword = false;
        $("#header_forgot_password").hide();
        $("#header_login").show();
    }

    $scope.closeInternetAlert = function () {
        $scope.noInternetForgotPassword = false;
    }


    $scope.webRequestResponse = function (requestType, status, responseData) {
        if (status == constanObject.ERROR) {
            //console.log("Forget Password Error : " + JSON.stringify(responseData));
            $("#forgot_email").addClass("tx_erorr");
            $scope.$apply(function(){
                $scope.loginErrorForgotPassword = true;
                $scope.ForgotPasswordErrorMessage=responseData.responseJSON.error;
            });
            return;
        }

        switch (requestType) {
            case constanObject.WebRequestType.FORGOT_PASSWORD:
                //alert(responseData);
                $scope.loginErrorForgotPassword = false;
                $('#header_forgot_password').hide();
                $('#header_reset_password').show();
                $('#message_email').html('Please check ' + emailaddress);
                break;
        }
    };
    function isEmail(email) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);

    }

    function checkEmail(email) {

        var filter = "/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/";

//        if (!filter.test(email)) {
        if (isEmail(email) == false) {
//alert('Please provide a valid email address');
            //email.focus;
            return false;
        }
        return true;
    }
});

BandQModule.directive('changeColorDirective', [function () {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attr) {
                scope.$watch('changebtncolor', function (v) {

                    if (typeof v == 'undefined')
                        return;
                    if (v.length > 0) {
                        $('#button_forgot').addClass('btn-login');
                        $('#button_forgot').removeClass('btn-deactive');

                    } else {
                        $('#button_forgot').addClass('btn-deactive');
                        $('#button_forgot').removeClass('btn-login');
                    }
                });
            }
        };
    }]);


function gotoLoginPage() {
//     $("#header_forgot_password").hide();
//        $("#header_login").show();
    if ($("#header_pin").is(":visible")) {
        $("#header_pin").hide();
        $("#header_login").show();

        return;
    }
    if ($("#header_forgot_password").is(":visible")) {
        $("#header_forgot_password").hide();
        $("#header_login").show();

        return;
    }
    if ($("#header_reset_password").is(":visible")) {
        $("#header_reset_password").hide();
        $("#header_forgot_password").show();
        return;
    }
}
