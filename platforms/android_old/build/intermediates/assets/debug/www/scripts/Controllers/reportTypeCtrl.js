BandQModule.controller("ReportTypeCtrl",
        function ($scope, $http, $rootScope, CategoryOutcomeTypeService, globalService, showHidePageService) {

            $scope.ts = [];
            var tempArray = [];

            $scope.iconBaseUrl = constanObject.MainUrl;
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.derivedMsg = "";
            var prevOutcomeId = -1;
            var resetType = false;
            $scope.isThereAnyQuestion = true;
            //    var rawOuts = [];.

            function clearActive() {
                for (var i = 0; i < $scope.ts.length; i++) {
                    $scope.ts[i].active = false;
                }
            }

            function fillTypes() {

                //    //console.log(CategoryOutcomeTypeService.tempData);

                var allTypes = CategoryOutcomeTypeService.tempData.type;
                var allOutcomes = CategoryOutcomeTypeService.tempData.outcome;
                // //console.log(allTypes);
                ////console.log(allOutcomes);
                var cLimit = allOutcomes.length; // all outcome
                var oLimit = allTypes.length; // all types
                $scope.ts = [];

                var targetOutcomeId = globalService.getOutcomeId();

                //        //console.log(targetOutcomeId);

                for (var c = 0; c < cLimit; c++) {
                    if (targetOutcomeId == allOutcomes[c].id_otc) {

                        //                                //console.log(allOutcomes[c]);

                        var userDefaultTypeIds = allOutcomes[c].typeId; // users types

                        var outTypeLimit = userDefaultTypeIds.length;


                        for (var so = 0; so < outTypeLimit; so++) {
                            for (var o = 0; o < oLimit; o++) {
                                //                        if(o == oLimit - 1){
                                //                            $scope.$apply(function(){
                                //                                $scope.outs = tempArray;
                                //                                //console.log($scope.outs);
                                //                            })
                                //                        }
                                //                        //console.log(parseInt(userDefaultTypeIds[so]), parseInt(allOutcomes[o].id_otc));
                                if (parseInt(userDefaultTypeIds[so]) == parseInt(allTypes[o].id_it)) {
                                    // fill outcomesArray
                                    //                            tempArraypush(allOutcomes[o]);
                                    //                            tempArray.push(allTypes[o]);
                                    if (resetType) {
                                        allTypes[o].activeClass = false;
                                    }
                                    $scope.ts.push(allTypes[o]);

                                    break;
                                }

                            }

                        }
                        //                $scope.$apply(function(){
                        //    $scope.outs.push(allOutcomes[o]);
                        //                                //console.log(tempArray);

                        //                $scope.ts = tempArray;
                        //                angular.copy();
                        //                //console.log($scope.ts);
                        //                    rawOuts = tempArray;
                        //                    //console.log($scope.outs);
                        //                })
                        //                //console.log($scope.outs);
                    }
                    if (c == cLimit - 1 & resetType) {
                        clearActive();
                        resetType = false;
                    }

                }

            }


            //.postRequest =   function(classObject,type,webUrl,parameters,requestType,showProgress)
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

            //   webRequestObject.postRequest($scope, "GET", constanObject.LinkedStaffMember, {}, constanObject.WebRequestType.LinkedStaffMember, false);


            function selectType(obj) {

                //        //console.log(obj);

                for (var i = 0; i < $scope.ts.length; i++) {
                    if ($scope.ts[i].id_it == obj.id_it) {
                        $scope.ts[i].activeClass = true;
                        $scope.derivedMsg = $scope.ts[i].description_it;
                        //                //console.log($scope.derivedMsg, $scope.ts[i].description_it);
                        //                $scope.cats[i].activeClass = 'active';
                        //                return false;
                        //                //console.log($scope.cats[i].activeClass);
                    } else {
                        $scope.ts[i].activeClass = false;
                        //                $scope.cats[i].activeClass = '';
                    }
                }
            }


            $scope.changeOutcome = function (obj) {
                globalService.setTypeId(obj.id_it);
                // check is there any question on the base of  outcome and type.-----------------------------
                var getQuestionQuery = "SELECT dq.question_id, dq.sort_order, dq.question_title,dq.question_type,dq.question_man,dq.errmessage_opt,dq.question_hint," +
                        "dq.questionoptions,dq.childquestionsbyoption,dq.showStatus,dq.questionIncidentCategory,otr.typeId,otr.outcomeId,dq.question_ctg,dq.use_fieldsetoption,dq.fieldset_display_options from "
                        + TABLE_DYNAMIC_QUESTION + " dq  INNER JOIN " + TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION +
                        " otr ON dq.question_id =otr.question_id WHERE dq.is_child='0' AND dq.questionIncidentCategory LIKE '%," +
                        globalService.getCategoryId() + ",%' AND otr.outcomeId = " + globalService.getOutcomeId() +
                        " AND otr.typeId LIKE '%," + globalService.getTypeId() + ",%' AND ((dq.location_option='0') OR (( dq.location_countries LIKE '%" + globalService.getVenueId().country_vns +
                        "%') OR ( dq.location_regions LIKE '%" +
                        globalService.getVenueId().region_vns + "%' ) OR ( dq.location_zones LIKE '%" +
                        globalService.getVenueId().zone_vns + "%' )  OR ( dq.location_venues LIKE '%" +
                        globalService.getVenueId().id + "%'))) GROUP BY dq.question_id ORDER BY dq.sort_order asc";



                dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {

                    if (result.length > 0)
                        $scope.isThereAnyQuestion = true;
                    else
                        $scope.isThereAnyQuestion = false;


                });




                selectType(obj);
            }







            $scope.nextButtonClicked = function (callBack) {
                //        //console.log(typeof globalService.getSwasAreaId());
                //        //console.log(globalService.getSwasAreaId());
                if (parseInt(globalService.getTypeId()) > 0) {

                    showHidePageService.updateHideFieldsetArray();
                    $rootScope.show = false;
                    $scope.req1 = false;
                    $scope.req2 = false;

                    if ($scope.isThereAnyQuestion)
                        return callBack(true, 1);
                    else
                        return callBack(true, 2);


                    //-----------------------------------------------------------------------

                } else {
                    $rootScope.show = true;
                    $scope.req1 = true;
                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                    //            alert('Kindly select your Type');
                    return callBack(false, 1);
                }
            };
            var noOfPageMove = 1;
            $scope.init = function (_noOfPageMove) {
                noOfPageMove = _noOfPageMove;
                $scope.typeToolTipMessage = $scope.fieldData[12].question_hint;
                //            //console.log('init form report type');
                if (prevOutcomeId != -1 & prevOutcomeId != parseInt(globalService.getOutcomeId())) {
                    resetType = true;
                    $scope.derivedMsg = "";
                    globalService.setTypeId(-1);
                }
                if (prevOutcomeId == -1)
                    resetType = true;
                if (parseInt(globalService.getOutcomeId()) > 0 & resetType) {
                    prevOutcomeId = parseInt(globalService.getOutcomeId());
                    $scope.ts = [];
                    fillTypes();
                }
            }

            $scope.back = function (callBack) {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                //        globalService.setTypeId(-1);
                return callBack(true, noOfPageMove);
            }
        }
);