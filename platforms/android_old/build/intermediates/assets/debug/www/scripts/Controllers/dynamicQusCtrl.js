BandQModule.controller("DynamicQuesCtrl", function ($scope, $rootScope, dynamicQuestion, globalService, showHidePageService) {

    var totalQuestion = 0;
    var currentlyVisibleQuestionIndex = 0;
    $scope.previousQuery = "-1";
    //$scope.DynamicQuestionData = [];
    $scope.DynamicQuestionArr = [];
    var questionArray = [2, 4, 3];
    var noOfPageMove;
    $rootScope.show = false;
    $scope.init = function (_noOfPageMove) {
        noOfPageMove = _noOfPageMove;

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
                        {        var val=$.inArray($rootScope.hideFieldSetArray[j],fieldSetArray);
                            if ($.inArray($rootScope.hideFieldSetArray[j],fieldSetArray) > -1)
                                if (!($.inArray( $rootScope.hideFieldSetArray[j],tempArray) > -1))
                                    tempArray.push($rootScope.hideFieldSetArray[j]);

                        }
                    }
                }

                var tempArray2=[];
                
                for(var i=0;i<$rootScope.hideFieldSetArray.length;i++){
                    if(!($.inArray( $rootScope.hideFieldSetArray[i],tempArray) > -1))
                        tempArray2.push($rootScope.hideFieldSetArray[i]);
                }

                $rootScope.hideFieldSetArray = tempArray2;
                globalService.setDynamicQuestionData(dynamicQuestion.getAndUpdaeAnswer());
                return callBack(true, 1);

            } else
                return callBack(false, 0);
        }
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
                " AND otr.typeId LIKE '%," + globalService.getTypeId() + ",%' AND ((dq.location_option='0') OR (( dq.location_countries LIKE '%" + globalService.getVenueId().country_vns +
                "%') OR ( dq.location_regions LIKE '%" +
                globalService.getVenueId().region_vns + "%' ) OR ( dq.location_zones LIKE '%" +
                globalService.getVenueId().zone_vns + "%' )  OR ( dq.location_venues LIKE '%" +
                globalService.getVenueId().id + "%'))) GROUP BY dq.question_id ORDER BY dq.sort_order asc";


        if ($scope.previousQuery == getQuestionQuery)
            return;
        $scope.previousQuery = getQuestionQuery;

        dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
            $scope.$apply(function () {
                $scope.DynamicQuestionData = angular.copy(result);
                dynamicQuestion.SetParentQuestionArray(result);

                // //console.log(JSON.stringify(result));

                if ($scope.DynamicQuestionData.length > 0) {
                    totalQuestion = $scope.DynamicQuestionData.length;
                    currentlyVisibleQuestionIndex = 0;
                    $scope.DynamicQuestionData[0].showStatus = true;
                    dynamicQuestion.setCurrentVisibleQuestionId($scope.DynamicQuestionData[currentlyVisibleQuestionIndex].question_id);

                    window.plugins.spinnerDialog.hide();

                }
            });


        });
    }



});

BandQModule.directive("parentQuestion", ["$http", "$rootScope", "$compile", "dynamicQuestion", "imageService", "getUniqueId", "globalService", function ($http, $rootScope, $compile, dynamicQuestion, imageService, getUniqueId, globalService) {
        var linker = function (scope, element, attr) {
            scope.pop = true;
            scope.showAction = false;
            scope.showUpload = 0;
            scope.items = [];
            scope.question.isOptionSelected = false;
            scope.question.isChildOptionSelected = true;
            scope.errorMsgShow = false;
            var imageNum = 0;
            scope.preSelectedOption = -1;
            scope.images = new Array(0);
            scope.question.answer = new Array(0);
            scope.question.index = scope.index;
            dynamicQuestion.setCurrentParecntQuestionScope(scope);

            scope.$on('pingBack', function (e, data) {
                if (scope.question.isChildOptionSelected)
                    scope.question.isChildOptionSelected = data;

                //alert(scope.isChildOptionSelected);

            });



            scope.$on('callParentQuestion', function (event, arg) {
                if (arg.id == scope.question.question_id)
                    scope.$emit("pingBackToNext", scope.CheckValidation());

            });

            scope.CheckValidation = function () {
                //  //console.log("Check Validation : " + JSON.stringify(scope.question));


                var canMove = true;
                $rootScope.show = false;
                scope.question.isChildOptionSelected = true;
                scope.$broadcast('checkChildValidation');



                if (!scope.question.isChildOptionSelected)
                    return false;


                if (scope.question.question_man == 1)
                {
                    canMove = false;
                    if (scope.question.isOptionSelected) {
                        canMove = true;
                        scope.errorMsgShow = false;
                    } else {

                        $rootScope.show = true;
                        $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;

                        if (scope.question.errmessage_opt) {
                            scope.errorMsgShow = true;
                            scope.errorMsg = scope.question.errmessage_opt;
                        } else {
                            scope.errorMsgShow = true;
                            scope.errorMsg = "Please Select.";
                        }
                    }

                }

                return canMove;

            }


            $http.get(dynamicQuestion.getTemplate(scope.question.question_type)).then(function (response) {
                element.html(response.data);
                $compile(element.contents())(scope);

            });
            scope.OptionArray = [];
            scope.OptionArray =JSON.parse(scope.question.questionoptions);// angular.copy(scope.question.questionoptions.split(','));
            scope.subQuestion = function (value, index, type) {
                if (scope.preSelectedOption >= 0) {
                    if (index == scope.preSelectedOption)
                        return;
                    else
                        scope.preSelectedOption = index;


                } else
                    scope.preSelectedOption = index;



                setTimeout(function () {
                    //console.log("answer" + JSON.stringify(value))

                    if (value.answer == "")
                        scope.question.isOptionSelected = false;
                    else
                        scope.question.isOptionSelected = true;

                    value.inputType = type;
                    dynamicQuestion.setAndUpdaeAnswer(dynamicQuestion.getJsonData(), value, true, index);
                    var hasChildQus = JSON.parse(value.childquestionsbyoption);
                    if (hasChildQus[index] && value.answer) {
                        var getQuestionQuery1 = "SELECT * from dynamicQuestion WHERE question_id IN (" + hasChildQus[index] + ")";
                        dataBaseObj.getDatafromDataBase(getQuestionQuery1, function (result) {
                            scope.$apply(function () {
                                scope.childQusDetail = angular.copy(result);
                            });
                        });
                    } else {
                        scope.$apply(function () {
                            scope.childQusDetail = [];
                        });
                    }


                }, 100);



            }

            ///////////////file upload

            scope.pushFile = function () {
                scope.showAction = true;
            }
            scope.showHideUpload = function (it) {
                //        //console.log(it);
                if (it == 0) {
                    scope.noUpload = true;
                    scope.uploadStart = false;
                }
                scope.showUpload = it;
            }

            scope.openCamera = function () {
             //   showSpinner(true, true, SPINNER_MESSAGE);
                imageNum++;
                imageService.getCameraImage(function (item) {
                    scope.$apply(function () {
                        scope.showAction = false;
                        item.id = imageNum;
                        scope.images.push(item);
                        scope.question.answer.push(getUniqueId.getId());
                        scope.saveDynamicQusMediaData(item, 'image', scope.question.answer);
                    });
                    window.plugins.spinnerDialog.hide();
                });

            };
            scope.openGallery = function () {
             //   showSpinner(true, true, SPINNER_MESSAGE);
                imageNum++;
                imageService.getMediaImage(function (item) {
                    scope.$apply(function () {
                        scope.showAction = false;
                        item.id = imageNum;
                        scope.images.push(item);
                        scope.question.answer.push(getUniqueId.getId());
                        scope.saveDynamicQusMediaData(item, 'image', scope.question.answer);
                    });
                    window.plugins.spinnerDialog.hide();
                });

            };
            scope.openVedio = function () {
               // showSpinner(true, true, SPINNER_MESSAGE);
                imageNum++;
                imageService.getVideoImage(function (item) {
                    scope.$apply(function () {
                        item.id = imageNum;
                        scope.showAction = false;
                        scope.images.push(item);
                        scope.question.answer.push(getUniqueId.getId());
                        scope.saveDynamicQusMediaData(item, 'video', scope.question.answer);
                    });
                    window.plugins.spinnerDialog.hide();
                });
            };
            scope.closeCameraOption = function () {
                scope.showAction = false;
            };

            scope.spliceItem = function (id, ev) {
                //        //console.log(ev.target.attributes);
                if (ev.target.attributes[0].nodeValue != "images/cross.png")
                    return false;
                //        alert('in spliceItem and id is ' + id);
                for (var i = scope.images.length - 1; i > -1; i--) {
                    if (scope.images[i].id == id) {
                        scope.images.splice(scope.images.indexOf(scope.images[i]), 1);
                        imageNum--;
                    }
                }
            }
            scope.saveDynamicQusMediaData = function (value, type, tempId) {
                dataBaseObj.insertData(
                        TABLE_CREATE_INCIDENT_REPORT_FILE,
                        FILES_UPLOAD_KEY, [constanObject.FileUploadModuleId.DYNAMIC_QUESTION.toString(), tempId,
                            constanObject.CREATE_INCIDEN_TEMP_ID.toString(), value.src.toString(), type, "0",
                            tempId, globalService.getUserId().toString(), "-1"]
                        );

            }



        }



        return {
            restrict: "EA",
            scope: {question: '=', index: '='},
            link: linker,
        }


    }]);

BandQModule.directive("childQuestionFields", ["$http", "$compile", "$rootScope", "dynamicQuestion", "imageService", "getUniqueId", "globalService", function ($http, $compile, $rootScope, dynamicQuestion, imageService, getUniqueId, globalService) {


        var linker = function (scope, element, attr) {
            scope.images = new Array(0);
            var imageNum = 0;
            scope.preSelectedOption = -1;
            scope.question.answer = new Array(0);
            $http.get(dynamicQuestion.getTemplate(scope.question.question_type)).then(function (response) {
                element.html(response.data);
                $compile(element.contents())(scope);
            });
            //scope.OptionArray = scope.question.questionoptions.split(',');
            scope.OptionArray = [];

            scope.OptionArray =JSON.parse(scope.question.questionoptions);;// angular.copy(scope.question.questionoptions.split(','));
            scope.question.isOptionSelected = false;
            scope.showAction = false;
            scope.errorMsgShow = false;
            scope.question.index = dynamicQuestion.getCurrentVisibleQuestionIndex();
            scope.question.isChildQestion = true;
            dynamicQuestion.setValidationData(scope.question);
            scope.subQuestion = function (value, index, type) {
                if (scope.preSelectedOption >= 0) {
                    if (index == scope.preSelectedOption)
                        return;
                    else
                        scope.preSelectedOption = index;


                } else
                    scope.preSelectedOption = index;

                //  alert(type);
                setTimeout(function () {

                    if (value.answer == "")
                        scope.question.isOptionSelected = false;
                    else
                        scope.question.isOptionSelected = true;

                    value.inputType = type;

                    // alert(JSON.stringify(dynamicQuestion.getJsonData(),value,false,dynamicQuestion.getCurrentVisibleQuestionId()));
                    dynamicQuestion.setAndUpdaeAnswer(dynamicQuestion.getJsonData(), value, false, index, dynamicQuestion.getCurrentVisibleQuestionId());
                    var hasChildQus = JSON.parse(value.childquestionsbyoption);

                    if (hasChildQus[index] && value.answer) {
                        var getQuestionQuery1 = "SELECT * from dynamicQuestion WHERE question_id IN (" + hasChildQus[index] + ")";
                        dataBaseObj.getDatafromDataBase(getQuestionQuery1, function (result) {
                            scope.$apply(function () {
                                scope.childQusDetail = angular.copy(result);
                            });
                        });
                    } else {
                        scope.$apply(function () {
                            scope.childQusDetail = [];
                        });
                    }
                }, 100);





            }

            scope.$on('checkChildValidation', function (e) {
                scope.$emit("pingBack", scope.checkItMandatory());

            });

            scope.checkItMandatory = function () {
                var canMove = true;
                if (scope.question.question_man == 1)
                {
                    canMove = false;
                    if (scope.question.isOptionSelected) {
                        canMove = true;
                        scope.errorMsgShow = false;
                    } else {
                        $rootScope.show = true;
                        $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;

                        if (scope.question.errmessage_opt) {
                            scope.errorMsgShow = true;
                            scope.errorMsg = scope.question.errmessage_opt;
                        } else {
                            scope.errorMsgShow = true;
                            scope.errorMsg = "Please Select.";
                        }
                    }

                }
                //   alert("child"+": "+canMove);
                return canMove;

            }

            ///////////////file upload

            scope.pushFile = function () {
                scope.showAction = true;
            }
            scope.showHideUpload = function (it) {
                //        //console.log(it);
                if (it == 0) {
                    scope.noUpload = true;
                    scope.uploadStart = false;
                }
                scope.showUpload = it;
            }


            scope.openCamera = function () {
               // showSpinner(true, true, SPINNER_MESSAGE);
                imageNum++;
                imageService.getCameraImage(function (item) {
                    scope.$apply(function () {
                        scope.showAction = false;
                        item.id = imageNum;
                        scope.images.push(item);
                        scope.question.answer.push(getUniqueId.getId());
                        scope.saveDynamicQusMediaData(item, 'image', scope.question.answer);
                    });
                    window.plugins.spinnerDialog.hide();
                });

            };
            scope.openGallery = function () {
            ///    showSpinner(true, true, SPINNER_MESSAGE);
                imageNum++;
                imageService.getMediaImage(function (item) {
                    scope.$apply(function () {
                        scope.showAction = false;
                        item.id = imageNum;
                        scope.images.push(item);
                        scope.question.answer.push(getUniqueId.getId());
                        scope.saveDynamicQusMediaData(item, 'image', scope.question.answer);
                    });
                    window.plugins.spinnerDialog.hide();
                });

            };
            scope.openVedio = function () {
            //    showSpinner(true, true, SPINNER_MESSAGE);
                imageNum++;
                imageService.getVideoImage(function (item) {
                    scope.$apply(function () {
                        item.id = imageNum;
                        scope.showAction = false;
                        scope.images.push(item);
                        scope.question.answer.push(getUniqueId.getId());
                        scope.saveDynamicQusMediaData(item, 'video', scope.question.answer);
                    });
                    window.plugins.spinnerDialog.hide();
                });
            };
            scope.closeCameraOption = function () {
                scope.showAction = false;
            };

            scope.spliceItem = function (id, ev) {
                //        //console.log(ev.target.attributes);
                if (ev.target.attributes[0].nodeValue != "images/cross.png")
                    return false;
                //        alert('in spliceItem and id is ' + id);
                for (var i = scope.images.length - 1; i > -1; i--) {
                    if (scope.images[i].id == id) {
                        scope.images.splice(scope.images.indexOf(scope.images[i]), 1);
                        imageNum--;
                    }
                }
            }
            scope.saveDynamicQusMediaData = function (value, type, tempId) {
                dataBaseObj.insertData(
                        TABLE_CREATE_INCIDENT_REPORT_FILE,
                        FILES_UPLOAD_KEY, [constanObject.FileUploadModuleId.DYNAMIC_QUESTION.toString(), tempId, constanObject.CREATE_INCIDEN_TEMP_ID.toString(), value.src.toString(), type, "0", tempId, globalService.getUserId().toString(), "-1"]
                        );

            }


        }

        return {
            restrict: "EA",
            scope: {
                question: '=question',
                index: '=indexs'
            },
            link: linker,
        }
    }]);