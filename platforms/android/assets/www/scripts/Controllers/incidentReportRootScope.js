BandQModule.run(function ($rootScope) {


    document.addEventListener("deviceready", function () {
        if (document.getElementById("pageReadyLoder"))
            document.getElementById("pageReadyLoder").style.visibility = "block";

       // initFirstTemplate();

    }, false);


});


initFirstTemplate = function () {

    if (angular.element(document.getElementById("30")).scope() && angular.element(document.getElementById("32")).scope()) {
        angular.element(document.getElementById("30")).scope().init();
        angular.element(document.getElementById("32")).scope().init();
        if (document.getElementById("pageReadyLoder"))
            document.getElementById("pageReadyLoder").style.visibility = "hidden";
    } else {
        setTimeout(function () {
            initFirstTemplate();
        }, 20);
    }

}
