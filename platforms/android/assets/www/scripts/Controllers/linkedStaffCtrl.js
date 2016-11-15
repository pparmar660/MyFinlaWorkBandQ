BandQModule.controller("LinkedStaffCtrl", ['$scope', '$http', '$rootScope', 'globalService', "getLinkedStaffList", function ($scope, $http, $rootScope, globalService, getLinkedStaffList) {

        $scope.IncidentReports = []; // List of all incident
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


        // Get list of all Linked Offender from Local Data Base 
        getLinkedStaffList.loadFromLocal();
        
        
       
        $scope.$watch("showLinkedStaff", function (newValue, oldValue) {
            if (newValue == true & oper == false) {
                oper = true;
            }
        })
        // Fetch data from service  
        $scope.updateLinkedStaff = function () {
            globalService.setLinkedStaffIds({
                'isSet': true,
                'linkedStaff': $scope.multipleDemo.selectedReport
            });
        }
        
        $scope.saveButtonClicked = function (callBack){
             if ($scope.yes == 3) {
                globalService.setLinkedStaffIds({
                    'isSet': true,
                    'linkedStaff': $scope.multipleDemo.selectedReport
                }, function () {
                    return callBack(true);

                });

            } else {
            
                globalService.setLinkedStaffIds({
                    'isSet': false,
                    'linkedStaff': {}
                }, function () {
                    return callBack(true);


                });
                return callBack(true);
            } 
        };

        $scope.nextButtonClicked = function (callBack) {

            if ($scope.yes == 3 & $scope.multipleDemo.selectedReport.length > 0) {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                globalService.setLinkedStaffIds({
                    'isSet': true,
                    'linkedStaff': $scope.multipleDemo.selectedReport
                }, function () {
                    return callBack(true, 1);

                });

            } else if (oper == false) {
                $rootScope.show = true;
                $scope.req1 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                return callBack(false, 1);

            } else if (oper == true & $scope.no == 3) {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                globalService.setLinkedStaffIds({
                    'isSet': false,
                    'linkedStaff': {}
                }, function () {
                    return callBack(true, 1);

                });
                return callBack(true, 1);
            } else {
                $rootScope.show = true;
                $scope.req2 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                return callBack(false, 1);
            }

        };

        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
            $rootScope.currentPagesScopeArray = [];
            $rootScope.currentPagesScopeArray.push($scope);
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            $scope.resetData();
            document.getElementById("pageReadyLoder").style.visibility = "hidden";

        }

        $scope.back = function (callBack) {
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            $scope.resetData();
            return callBack(true, noOfPageMove);

        }


        $scope.resetData = function () {


            var data = globalService.getLinkedStaffIds();

            if (!data)
                return;
            oper = true;
            if (data.isSet) {
                $scope.yes = 3;
                $scope.no = 1;
                $scope.showLinkedStaff = true;
                $scope.multipleDemo.selectedReport = data.linkedStaff;



            } else if (!data.isSet) {
                $scope.yes = 1;
                $scope.no = 3;
                $scope.showLinkedStaff = false;
                $scope.multipleDemo.selectedReport = "";
            }

        }

        $scope.showStaff = function (bl) {
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

        $scope.init();

    }]);