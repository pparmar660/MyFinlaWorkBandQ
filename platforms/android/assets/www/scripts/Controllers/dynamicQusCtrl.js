BandQModule.controller("DynamicQuesCtrl", function ($scope, $rootScope, dynamicQuestion, globalService, showHidePageService) {

    var totalQuestion = 0;
    var currentlyVisibleQuestionIndex = 0;
    $scope.previousQuery = "-1";
    //$scope.DynamicQuestionData = [];
    $scope.DynamicQuestionArr = [];
    var noOfPageMove;
    $rootScope.show = false;
    $scope.init = function () {


        dataBaseObj.countNoOfRow(TABLE_DYNAMIC_QUESTION, function (noOfRow) {
            if (noOfRow <= 0) {
                showSpinner(true, true, SPINNER_MESSAGE);
                dynamicQuestion.getDynamicQusData(dynQusDetail);
            } else
                dynQusDetail();

        });



    }
    $scope.isParentQuestionAllowedToMove = false;
    $scope.$on('pingBackToNext', function (e, data) {
        $scope.isParentQuestionAllowedToMove = data;
    });


    $scope.nextButtonClicked = function (callBack)
    {

        $scope.$broadcast('callParentQuestion', {id: dynamicQuestion.getCurrentVisibleQuestionId()});
        if (currentlyVisibleQuestionIndex < totalQuestion - 1)
        {
            if ($scope.isParentQuestionAllowedToMove)
            {
                $scope.isParentQuestionAllowedToMove = false;
                try {
                    $scope.DynamicQuestionData[currentlyVisibleQuestionIndex].showStatus = false;
                    currentlyVisibleQuestionIndex++;
                    dynamicQuestion.setCurrentVisibleQuestionIndex(currentlyVisibleQuestionIndex);
                    var parentQuestionArray = dynamicQuestion.getParentQuestionArray();
                    dynamicQuestion.setCurrentVisibleQuestionId(parentQuestionArray[currentlyVisibleQuestionIndex].question_id);
                    $scope.DynamicQuestionData[currentlyVisibleQuestionIndex].showStatus = true;
                } catch (e) {
                    //console.log(e);
                }
            }

            return callBack(false, 0);


        } else {
            if ($scope.isParentQuestionAllowedToMove) {
                showHidePageService.updateHideFieldsetArray();
                var dynamicQuestionAnswer = dynamicQuestion.getAndUpdaeAnswer();
                var tempArray = [];

                for (var i = 0; i < dynamicQuestionAnswer.length; i++) {
                    if (dynamicQuestionAnswer[i].answer[0].use_fieldsetoption == "1") {
                        var fieldSetArray = dynamicQuestionAnswer[i].answer[0].fieldset_display_options;
                        for (var j = 0; j < $rootScope.hideFieldSetArray.length; j++)
                        {
                            var val = $.inArray($rootScope.hideFieldSetArray[j], fieldSetArray);
                            if ($.inArray($rootScope.hideFieldSetArray[j], fieldSetArray) > -1)
                                if (!($.inArray($rootScope.hideFieldSetArray[j], tempArray) > -1))
                                    tempArray.push($rootScope.hideFieldSetArray[j]);

                        }
                    }
                }

                var tempArray2 = [];

                for (var i = 0; i < $rootScope.hideFieldSetArray.length; i++) {
                    if (!($.inArray($rootScope.hideFieldSetArray[i], tempArray) > -1))
                        tempArray2.push($rootScope.hideFieldSetArray[i]);
                }

                $rootScope.hideFieldSetArray = tempArray2;
                //console.log("dynamicQuestioData: " + JSON.stringify(dynamicQuestion.getAndUpdaeAnswer()));
                globalService.setDynamicQuestionData(dynamicQuestion.getAndUpdaeAnswer());
                return callBack(true, 1);

            } else
                return callBack(false, 0);
        }
    };
             $scope.saveButtonClicked = function (callBack){
                            return callBack(true);
           
        };
    $scope.back = function (callBack) {
        $rootScope.show = false;
        if (currentlyVisibleQuestionIndex > 0) {
            $scope.DynamicQuestionData[currentlyVisibleQuestionIndex].showStatus = false;
            currentlyVisibleQuestionIndex--;
            dynamicQuestion.setCurrentVisibleQuestionIndex(currentlyVisibleQuestionIndex);
            var parentQuestionArray = dynamicQuestion.getParentQuestionArray();
            dynamicQuestion.setCurrentVisibleQuestionId(parentQuestionArray[currentlyVisibleQuestionIndex].question_id);
            $scope.DynamicQuestionData[currentlyVisibleQuestionIndex].showStatus = true;
            return callBack(false, 0);

        }


        return callBack(true, noOfPageMove);

    }
    function dynQusDetail() {
        // alert(JSON.stringify(globalService.getVenueId()));

        var getQuestionQuery = "SELECT dq.question_id, dq.sort_order, dq.question_title,dq.question_type,dq.question_man,dq.errmessage_opt,dq.question_hint," +
                "dq.questionoptions,dq.childquestionsbyoption,dq.showStatus,dq.questionIncidentCategory,otr.typeId,otr.outcomeId,dq.question_ctg,dq.use_fieldsetoption,dq.fieldset_display_options from "
                + TABLE_DYNAMIC_QUESTION + " dq  INNER JOIN " + TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION +
                " otr ON dq.question_id =otr.question_id WHERE dq.is_child='0' AND dq.questionIncidentCategory LIKE '%," +
                globalService.getCategoryId() + ",%' AND otr.outcomeId = " + globalService.getOutcomeId() +
                " AND otr.typeId LIKE '%," + globalService.getTypeId() + ",%' AND (dq.checkswas_restrict='0' OR dq.location_swas LIKE '%," 
                + globalService.getSwasAreaId() + ",%' ) AND (dq.sector_restrict='0' OR dq.assigned_sectors LIKE '%," 
                + globalService.getSectorId() + ",%' ) AND (dq.access_level_check='0' OR dq.assgned_access_level LIKE '%," 
                + User_Access_Leve + ",%' )  AND ((dq.checkcountry_restrict='0') OR (( dq.location_countries LIKE '%" + 
                globalService.getVenueId().country_vns + "%') OR ( dq.location_regions LIKE '%" +
                globalService.getVenueId().region_vns + "%' ) OR ( dq.location_zones LIKE '%" +
                globalService.getVenueId().zone_vns + "%' )  OR ( dq.location_venues LIKE '%" +
                globalService.getVenueId().id + "%'))) GROUP BY dq.question_id ORDER BY dq.sort_order asc";


        if ($scope.previousQuery == getQuestionQuery)
            return;
        $scope.previousQuery = getQuestionQuery;

        dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
            $scope.$apply(function () {
                var preData = dynamicQuestion.getAndUpdaeAnswer();
                if (preData)
                    if (preData.length > 0) {
                        for (var i = 0; i < result.length; i++) {

                            for (var j = 0; j < preData.length; j++)
                            {
                                if (preData[j].parentQuestioId == result[i].question_id)
                                {
                                    result[i].answer = preData[j].answer[0].answer;
                                    result[i].isOptionSelected = preData[j].answer[0].isOptionSelected;
                                   // if(preData[j].answer[0].answerIndex)
                                   // if(preData[j].answer[0].answerIndex.length>0)
                                    //result[i].answerIndex = preData[j].answer[0].answerIndex[0];
                                }

                            }

                        }
                    }

                $scope.DynamicQuestionData = angular.copy(result);
                dynamicQuestion.SetParentQuestionArray(result);

                // //console.log(JSON.stringify(result));

                if ($scope.DynamicQuestionData.length > 0) {
                    totalQuestion = $scope.DynamicQuestionData.length;
                    currentlyVisibleQuestionIndex = 0;
                    if ($rootScope.backCalled)
                    {
                        currentlyVisibleQuestionIndex = totalQuestion - 1;
                        $rootScope.backCalled = false;
                    }

                    $scope.DynamicQuestionData[currentlyVisibleQuestionIndex].showStatus = true;
                    dynamicQuestion.setCurrentVisibleQuestionId($scope.DynamicQuestionData[currentlyVisibleQuestionIndex].question_id);
                    window.plugins.spinnerDialog.hide();



                }
            });


        });
    }

    $scope.init();

});



