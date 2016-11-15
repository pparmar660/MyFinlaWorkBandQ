BandQModule.controller("DateTimeCtrl", ['$scope', '$http', '$rootScope', 'globalService', function ($scope, $http, $rootScope, globalService) {

        $scope.ts = [];
        var tempArray = [];

        var hrs = 24;
        var mins = 60;
        var start = 1;

        $scope.dt = "";
        $scope.hrSelect = 1;
        $scope.minSelect = 1;

        $scope.intiDt = "";
        $scope.inithr = "";
        $scope.initMn = "";
        $scope.maxDt = "";

        $scope.hrsA = [];
        $scope.minsA = [];
        $rootScope.show = false;
        $scope.req1 = false;
        $scope.req2 = false;
        //   var noOfPageMove;

        $scope.nextButtonClicked = function (callBack) {
            //        //console.log($scope.dt);
            if ($scope.dt.length > 0) {
                if ($scope.dt == $scope.intiDt) {
                    if ($scope.hrSelect > $scope.inithr) {
                        $rootScope.show = true;
                        $scope.req1 = true;
                        $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
//                    alert("Given Date and time could be set in future period");
                        return callBack(false, 1);
                    } else {
                        if ($scope.hrSelect == $scope.inithr & $scope.minSelect > $scope.initMn) {
                            $rootScope.show = true;
                            $scope.req1 = true;
                            $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
//                        alert("Given Date and time could be set in future period");
                            return callBack(false, 1);
                        } else {
                            globalService.setDate($scope.dt + " " + $scope.hrSelect + " " + $scope.minSelect);
                            $rootScope.show = false;
                            $scope.req1 = false;
                            $scope.req2 = false;
                            return callBack(true, 1);
                        }
                    }
                } else {
                    $rootScope.show = false;
                    $scope.req1 = false;
                    $scope.req2 = false;
                    globalService.setDate($scope.dt + " " + $scope.hrSelect + " " + $scope.minSelect);
                    return callBack(true, 1);
                }
            } else {
                $rootScope.show = true;
                $scope.req1 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
//            alert("Kindly fill date");
                globalService.setDate("");
                return callBack(false, 1);
            }
        };


       $scope.saveButtonClicked = function (callBack){
 
                            globalService.setDate($scope.dt + " " + $scope.hrSelect + " " + $scope.minSelect);
                            return callBack(true);
           
        };


        function setPreviousDateTime() {

            //console.log('set previous date time');
            $scope.hrsA = [];
            $scope.minsA = [];
            for (var i = 0; i < hrs; i++) {
                if (i < 10)
                    $scope.hrsA.push("0" + i.toString());
                else
                    $scope.hrsA.push(i.toString());
            }
            for (var j = 0; j < mins; j++) {
                if (j < 10)
                    $scope.minsA.push("0" + j.toString());
                else
                    $scope.minsA.push(j.toString());
            }
        }

        function setCurrentDateTime() {

//        //console.log('set current date time');
            $scope.hrsA = [];
            $scope.minsA = [];
            for (var i = 0; i <= parseInt($scope.inithr); i++) {
                if (i < 10)
                    $scope.hrsA.push("0" + i.toString());
                else
                    $scope.hrsA.push(i.toString());
            }

            var d = new Date();
            var n = d.getHours();

            if ($scope.hrSelect < n) {
                for (var j = 0; j < mins; j++) {
                    if (j < 10)
                        $scope.minsA.push("0" + j.toString());
                    else
                        $scope.minsA.push(j.toString());
                }
            } else {
                for (var j = 0; j <= $scope.initMn; j++) {
                    if (j < 10)
                        $scope.minsA.push("0" + j.toString());
                    else
                        $scope.minsA.push(j.toString());
                }
            }
        }


        $scope.$watch('dt', function (newVal, oldVal) {
//        //console.log(newVal);
//        //console.log(oldVal);

            var iP = $scope.intiDt.split("-");
            var oP = newVal.split("-");

            var selectDate = new Date(oP[2], oP[1] - 1, oP[0]);
            var initDate = new Date(iP[2], iP[1] - 1, iP[0]);
            if (selectDate < initDate) {
                setPreviousDateTime();
            } else {
                setCurrentDateTime();
            }
        }, true);


        $scope.$watch('hrSelect', function (newVal, oldVal) {
            //console.log(newVal);
            //console.log(oldVal);

            var iP = $scope.intiDt.split("-");
            var oP = $scope.dt.split("-");

            var selectDate = new Date(oP[2], oP[1] - 1, oP[0]);
            var initDate = new Date(iP[2], iP[1] - 1, iP[0]);
            if (selectDate < initDate) {
                setPreviousDateTime();
            } else {
                setCurrentDateTime();
            }



        }, true);

        function dateFunction() {
//        alert('dateFunc');
            var currentDate = new Date();
//        var locale = "en-us";
            var yrSelect = currentDate.getFullYear();
            var dtSelect = currentDate.getDate();
            if (dtSelect < 10) {
                dtSelect = '0' + dtSelect;
            }
            var mnSelect = currentDate.getMonth() + 1;
            if (mnSelect < 10) {
                mnSelect = '0' + mnSelect;
            }

            $scope.intiDt = dtSelect + "-" + mnSelect + "-" + yrSelect;
            $scope.maxDt = mnSelect + "/" + dtSelect + "/" + yrSelect;
            $scope.dt = $scope.intiDt.toString();
            if(currentDate.getHours() < 10)
            $scope.hrSelect = $scope.inithr = '0' +currentDate.getHours().toString();
            else
               $scope.hrSelect = $scope.inithr = currentDate.getHours().toString();  
           if(currentDate.getMinutes() < 10)
               $scope.minSelect = $scope.initMn = '0' +currentDate.getMinutes().toString();
               else
            $scope.minSelect = $scope.initMn = currentDate.getMinutes().toString();
            setCurrentDateTime();
        }

        $scope.init = function () {
            //   noOfPageMove = _noOfPageMove;
            // if (typeof globalService.getDate() == 'undefined') {
//            alert('date time init');
            dateFunction();
            // } else {
            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.resetData();
                });
            }, 500);
            // }

            $scope.dateToolTipMessage = $scope.fieldData[55].question_hint;
            $scope.timeToolTipMessage = $scope.fieldData[55].question_hint;
        }

        $scope.resetData = function () {

            var data = globalService.getDate();
            if (!data)
                return;
            if (data) {
                var res = data.split(" ");
                $scope.hrsA = [];
                $scope.minsA = [];
                var currentDate = new Date();
                $scope.inithr = currentDate.getHours().toString();
                $scope.initMn = currentDate.getMinutes().toString();
                for (var i = 0; i <= parseInt($scope.inithr); i++) {
                    if (i < 10)
                        $scope.hrsA.push("0" + i.toString());
                    else
                        $scope.hrsA.push(i.toString());
                }
                for (var j = 0; j <= $scope.initMn; j++) {
                    if (j < 10)
                        $scope.minsA.push("0" + j.toString());
                    else
                        $scope.minsA.push(j.toString());
                }
                $scope.dt = res[0];
                $scope.hrSelect = res[1];
                $scope.minSelect = res[2];
            }
        }
        $scope.back = function (callBack) {
            return callBack(true, 1);
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            $scope.resetData();
        }
        $scope.init();
    }]);