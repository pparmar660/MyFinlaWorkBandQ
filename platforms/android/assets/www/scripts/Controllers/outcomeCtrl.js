BandQModule.controller("OutcomeCtrl", ['$scope', '$http', '$rootScope', 'CategoryOutcomeTypeService', 'globalService', function ($scope, $http, $rootScope, CategoryOutcomeTypeService, globalService) {

        $scope.outs = [];
        $rootScope.show = false;
        $scope.req1 = false;
        $scope.derivedMsg = "";
        var prevCatId = -1;
        var resetOut = false;

        function clearActive() {
            for (var i = 0, n = $scope.outs.length; i < n; i++) {
                $scope.outs[i].active = false;
            }
        }

        function fillOutcomes() {
            var allCats = CategoryOutcomeTypeService.tempData.category;
            var allOutcomes = CategoryOutcomeTypeService.tempData.outcome;
            var cLimit = allCats.length;
            var oLimit = allOutcomes.length; // all outcome
            var targetCatId = globalService.getCategoryId();
            $scope.outs = [];
            for (var c = 0; c < cLimit; c++) {
                if (targetCatId == allCats[c].pk_incident_category) {
                    var userDefaultOutcomeIds = allCats[c].outcomeId; // users outcome
                    var outLoopLimit = allCats[c].outcomeId.length;
                    for (var so = 0; so < outLoopLimit; so++) {
                        for (var o = 0; o < oLimit; o++) {
                            if (parseInt(allCats[c].outcomeId[so]) == parseInt(allOutcomes[o].id_otc)) {
                                if (resetOut) {
                                    allOutcomes[o].activeClass = false;
                                }
                                //                            $scope.$apply(function(){
                                $scope.outs.push(allOutcomes[o]);
                                break;
                            }
                        }
                    }
                    if (c == cLimit - 1 & resetOut) {
                        clearActive();
                        resetOut = false;
                    }
                }
            }
            $scope.reset();
        }
        $scope.webRequestResponse = function (requestType, status, responseData) {
            //        //console.log('in web request response from doYouHaveAnyFileController.js');
            //        //console.log(responseData);
            //        $scope.IncidentReports = [];
            //        var tempItem = [];
            //        for(var i = 1; i < responseData.data.length; i++){
            //           tempItem = {
            //              "caption": responseData.data[i].firstname_usr + " " + responseData.data[i].lastname_usr,
            //              "value":responseData.data[i].E_pin_usr
            //           }
            //           $scope.IncidentReports.push(tempItem);
            //        }
        };

        function selectCat(obj) {
            for (var i = 0; i < $scope.outs.length; i++) {
                if ($scope.outs[i].id_otc == obj.id_otc) {
                    $scope.outs[i].activeClass = true;
                    $scope.derivedMsg = $scope.outs[i].description_otc;
                } else {
                    $scope.outs[i].activeClass = false;
                }
            }
        }

        $scope.changeOutcome = function (obj) {


            if (globalService.getOutcomeId() != obj.id_otc){
                globalService.setTypeId(-1);
                globalService.setTypeObj(null);
            }

            globalService.setOutcomeObj(obj.id_otc);
            globalService.setOutcomeId(obj.id_otc);
            selectCat(obj);
        }

        $scope.nextButtonClicked = function (callBack) {
            if (parseInt(globalService.getOutcomeId()) > 0) {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                return callBack(true, 1);
            } else {
                $rootScope.show = true;
                $scope.req1 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                return callBack(false, 1);
            }
        };

        $scope.init = function () {

            $scope.outcomeToolTipMessage = $scope.fieldData[11].question_hint;
            if (prevCatId != -1 & prevCatId != parseInt(globalService.getCategoryId())) {
                resetOut = true;
                $scope.derivedMsg = "";
                globalService.setOutcomeId(-1);
            }
            if (prevCatId == -1)
                resetOut = true;
            if (prevCatId == parseInt(globalService.getCategoryId()))
                resetOut = false;
            if (parseInt(globalService.getCategoryId()) > 0 & resetOut) {
                prevCatId = parseInt(globalService.getCategoryId());
                $scope.ts = [];
                fillOutcomes();
            }

        };
        $scope.saveButtonClicked = function (callBack){
                            return callBack(true);
           
        };
        $scope.reset = function () {
            $scope.hasSelectedOutcome = false;
            if (globalService.getOutcomeObj())
            {
                var selectedOutcome = globalService.getOutcomeObj();
                for (var i = 0; i < $scope.outs.length; i++) {
                    if (selectedOutcome == $scope.outs[i].id_otc) {
                        selectCat($scope.outs[i]);
                        $scope.hasSelectedOutcome = true;
                    }
                }
                if ($scope.hasSelectedOutcome) {
                    globalService.setOutcomeObj(selectedOutcome);
                    globalService.setOutcomeId(selectedOutcome);
                } else {
                    globalService.setOutcomeObj(-1);
                    globalService.setOutcomeId(-1);
                }
            }
        }
        $scope.back = function (callBack) {
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            return callBack(true);
        }
        $scope.init();
    }]);
