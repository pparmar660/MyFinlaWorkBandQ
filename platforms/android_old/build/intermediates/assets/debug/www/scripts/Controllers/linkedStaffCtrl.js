BandQModule.controller("LinkedStaffCtrl", ['$scope', '$http', '$rootScope', 'globalService', "getLinkedStaffList", function ($scope, $http, $rootScope, globalService, getLinkedStaffList) {

        $scope.IncidentReports = [];
        $scope.multipleDemo = {};
        $scope.multipleDemo.selectedReport = [];
        $scope.showLinkedStaff = false;

        $scope.yes = 1;
        $scope.no = 1;
        $rootScope.show = false;
        $scope.req1 = false;
        $scope.req2 = false;
        $scope.jointIncidentToolTipMessage;
        $scope.linkedStaffToolTipMessage;

        var oper = false;
        var noOfPageMove;


        getLinkedStaffList.loadFromLocal();
        $scope.$watch("showLinkedStaff", function (newValue, oldValue) {
            //        //console.log(newValue);
            //            //console.log(oldValue);
            if (newValue == true & oper == false) {
                oper = true;
                //console.log('opera set to true');

            }
        })

        $scope.updateLinkedStaff = function () {
            globalService.setLinkedStaffIds({
                'isSet': true,
                'linkedStaff': $scope.multipleDemo.selectedReport
            });
        }


        $scope.nextButtonClicked = function (callBack) {

            if ($scope.yes == 3 & $scope.multipleDemo.selectedReport.length > 0) {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                globalService.setLinkedStaffIds({
                    'isSet': true,
                    'linkedStaff': $scope.multipleDemo.selectedReport
                });
                return callBack(true, 1);
            } else if (oper == false) {
                $rootScope.show = true;
                $scope.req1 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                //                alert('Is this a joint incident or not?');
                return callBack(false, 1);
                //            return callBack(true,1);
            } else if (oper == true & $scope.no == 3) {
                globalService.setLinkedStaffIds({
                    'isSet': false,
                    'linkedStaff': $scope.multipleDemo.selectedReport
                });
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                //                //console.log(globalService.getLinkedStaffIds());
                // $('div.incident_btn_wrap.fl').css('display', 'block');
                return callBack(true, 1);
                //            return callBack(true,1);
            } else {
                $rootScope.show = true;
                $scope.req2 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                //                alert('Please add linked staff');
                return callBack(false, 1);
            }

        };

        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
            $rootScope.currentPagesScopeArray = [];
            $rootScope.currentPagesScopeArray.push($scope);
            //   $('div.incident_btn_wrap.fl').css('display', 'none');
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            //  $scope.jointIncidentToolTipMessage = $scope.fieldData[32].question_hint;
            // $scope.linkedStaffToolTipMessage = $scope.fieldData[33].question_hint;

        }

        $scope.back = function (callBack) {
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            return callBack(true, noOfPageMove);
        }

        $scope.showStaff = function (bl) {
            //            //console.log(bl);
            $scope.showLinkedStaff = bl;
            if (!oper) {
                setData();
            }
            oper = true;
            $scope.yes = 1;
            $scope.no = 1;
            if (bl == false) {
                $scope.yes = 1;
                $scope.no = 3;
            } else {
                $scope.yes = 3;
                $scope.no = 1;
            }
        }
        function setData() {

            var data = getLinkedStaffList.getData();
            if (!data) {
                setTimeout(function () {
                    setData();
                }, 50);
            } else {
                setTimeout(function () {

                    $scope.$apply(function () {
                        $scope.IncidentReports = [];
                        var tempItem = [];
                        for (var i = 0; i < data.length; i++) {
                            tempItem = {
                                "caption": data[i].firstname_usr + " " + data[i].lastname_usr,
                                "value": data[i].id_usr
                            }
                            $scope.IncidentReports.push(tempItem);
                        }
                    })

                }, 10);
            }

        }

        setData();

        //$scope.init();

    }]);