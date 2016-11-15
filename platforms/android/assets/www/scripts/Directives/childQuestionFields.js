BandQModule.directive("childQuestionFields", ["$http", "$compile", "$rootScope", "dynamicQuestion",
    "imageService", "getUniqueId", "globalService", function ($http, $compile, $rootScope, dynamicQuestion,
            imageService, getUniqueId, globalService) {


        var linker = function (scope, element, attr) {
            scope.images = new Array(0);
            var imageNum = 0;
            scope.preSelectedOption = -1;
            //scope.question.answer = new Array(0);
            $http.get(dynamicQuestion.getTemplate(scope.question.question_type)).then(function (response) {
                element.html(response.data);
                $compile(element.contents())(scope);
            });
            //scope.OptionArray = scope.question.questionoptions.split(',');
            scope.OptionArray = [];
            scope.childQusDetail = [];

            scope.OptionArray = JSON.parse(scope.question.questionoptions);
            ;// angular.copy(scope.question.questionoptions.split(','));
            //  scope.question.isOptionSelected = false;
            scope.showAction = false;
            scope.errorMsgShow = false;
            scope.question.index = dynamicQuestion.getCurrentVisibleQuestionIndex();
            scope.question.isChildQestion = true;
            dynamicQuestion.setValidationData(scope.question);
            scope.subQuestion = function (value, index, type) {
                if (scope.preSelectedOption >= 0 && type != 2) {
                    if (index == scope.preSelectedOption)
                        return;
                    else
                        scope.preSelectedOption = index;

                } else
                    scope.preSelectedOption = index;
                if (typeof value.answer == "object")
                    if (value.answer.length > 0) {
                        if ($.inArray(scope.OptionArray[index], value.answer) <= -1) {
                            console.log(JSON.stringify(scope.childQusDetail));

                            scope.childQusDetail = $.grep(scope.childQusDetail, function (e) {
                                return e.parentIndex != index;

                            });

                            return;

                        } else {
                        }
                    } else {
                        dynamicQuestion.setAndUpdaeAnswer(dynamicQuestion.getJsonData(), value, false, index,dynamicQuestion.getCurrentVisibleQuestionId());
                        scope.question.isOptionSelected = false;
                        scope.childQusDetail = [];
                        return;
                    }


                setTimeout(function () {
                    //console.log("answer" + JSON.stringify(value))

                    if (value.answer == "")
                        scope.question.isOptionSelected = false;
                    else
                        scope.question.isOptionSelected = true;

                    value.inputType = type;
                    dynamicQuestion.setAndUpdaeAnswer(dynamicQuestion.getJsonData(), value, false, index,dynamicQuestion.getCurrentVisibleQuestionId());
                    var hasChildQus = JSON.parse(value.childquestionsbyoption);
                    if (hasChildQus[index] && value.answer) {
                        var getQuestionQuery1 = "SELECT * from dynamicQuestion WHERE question_id IN (" + hasChildQus[index] + ")";
                        dataBaseObj.getDatafromDataBase(getQuestionQuery1, function (result) {
                            scope.$apply(function () {



                                angular.forEach(result, function (value_, key) {
                                    value_.parentIndex = index;

                                });

                                if (type != 2)
                                    scope.childQusDetail = angular.copy(result);
                                else {
                                    angular.forEach(result, function (value_, key) {



                                        scope.childQusDetail.push(value_);

                                    });
                                }

                            });
                        });
                    } else {
                        scope.$apply(function () {
                            if (type != 2)
                                scope.childQusDetail = [];
                        });
                    }


                }, 100);

            }



            // RESET DATA -------------------------------------------------------------------------------------

            var ResetSubQuestion = function (value) {

                // console.log(typeof value.answer);
                for (var i = 0; i < scope.OptionArray.length; i++) {
                    if (typeof value.answer == "object") {
                        for (var j = 0; j < value.answer.length; j++)
                            if (value.answer[j] == scope.OptionArray[i]) {
                                loadSubQuestion(value, i);
                                return;
                            }
                    } else if (value.answer == scope.OptionArray[i]) {
                        loadSubQuestion(value, i);
                        return;
                    }
                }
            }



            var loadSubQuestion = function (value, index) {

                var preData = dynamicQuestion.getAndUpdaeAnswer();

                var hasChildQus = JSON.parse(value.childquestionsbyoption);
                if (hasChildQus[index] && value.answer) {
                    var getQuestionQuery1 = "SELECT * from dynamicQuestion WHERE question_id IN (" + hasChildQus[index] + ")";
                    dataBaseObj.getDatafromDataBase(getQuestionQuery1, function (result) {
                        scope.$apply(function () {

                            //set data
                            if (preData)
                                if (preData.length > 0) {
                                    for (var i = 0; i < result.length; i++)
                                        for (var j = 0; j < preData.length; j++)
                                            for (var k = 0; k < preData[j].answer.length; k++)
                                                if (preData[j].answer[k].question_id == result[i].question_id)
                                                {
                                                    result[i].answer = preData[j].answer[k].answer;
                                                    result[i].isOptionSelected = preData[j].answer[k].isOptionSelected;
                                                    break;
                                                }
                                }


                            scope.childQusDetail = angular.copy(result);
                        });
                    });
                } else {
                    // scope.$apply(function () {
                    scope.childQusDetail = [];
                    // });
                }

            }

            if (scope.question.answer)
                ResetSubQuestion(scope.question)

//------------------------------------------------------------------------------------------------



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
                showSpinner(true, true, SPINNER_MESSAGE);
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
                showSpinner(true, true, SPINNER_MESSAGE);
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
                showSpinner(true, true, SPINNER_MESSAGE);
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