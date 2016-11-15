BandQModule.controller('ResetPasswordCntrl',function($scope){
    $scope.buttonLoginFromReset = function() {
        $('#header_reset_password').hide();
        $('#header_login').show();
    };
});