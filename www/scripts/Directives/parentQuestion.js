BandQModule.directive("parentQuestion", ["$http", "$rootScope", "$compile",
    "dynamicQuestion", "imageService", "getUniqueId", "globalService", function ($http,
            $rootScope, $compile, dynamicQuestion, imageService, getUniqueId, globalService) {
        var linker = function (scope, element, attr) {
            scope.pop = true;
            scope.showAction = false;
            scope.showUpload = 0;
            scope.items = [];
            scope.hrsA = [];
            scope.minsA = [];
            scope.question.isChildOptionSelected = true;
            scope.errorMsgShow = false;
            var imageNum = 0;
            scope.preSelectedOption = -1;
            scope.images = new Array(0);
            // scope.question.answer = new Array(0);
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
            scope.childQusDetail = [];
            scope.OptionArray = JSON.parse(scope.question.questionoptions);// angular.copy(scope.question.questionoptions.split(','));
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
                            //   console.log(JSON.stringify(scope.childQusDetail));

                            scope.childQusDetail = $.grep(scope.childQusDetail, function (e) {
                                return e.parentIndex != index;

                            });

                            dynamicQuestion.removeChildQuestion(value.question_id, index);
                            return;

                        }
                    }
                else if(type != '11') {

                        dynamicQuestion.removeParentQuestion(value.question_id);
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
                    dynamicQuestion.setAndUpdaeAnswer(dynamicQuestion.getJsonData(), value, true, index);
                    var hasChildQus = JSON.parse(value.childquestionsbyoption);
                    if (hasChildQus[index] && value.answer) {
                        var getQuestionQuery1 = "SELECT * from dynamicQuestion WHERE question_id IN (" +
                                hasChildQus[index] + ")";
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
                    //});
                }
            }

            if (scope.question.answer)
                ResetSubQuestion(scope.question)

//------------------------------------------------------------------------------------------------

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



// date and time 

            var hrs = 24;
            var mins = 60;
            scope.question.answer = {"dt":"", "hrSelect": "", "minSelect": ""};

            function dateFunction() {
                var currentDate = new Date();
                var yrSelect = currentDate.getFullYear();
                var dtSelect = currentDate.getDate();
                if (dtSelect < 10) {
                    dtSelect = '0' + dtSelect;
                }
                var mnSelect = currentDate.getMonth() + 1;
                if (mnSelect < 10) {
                    mnSelect = '0' + mnSelect;
                }

                scope.intiDt = dtSelect + "-" + mnSelect + "-" + yrSelect;
                scope.maxDt = mnSelect + "/" + dtSelect + "/" + yrSelect;
                scope.question.answer.dt = scope.intiDt.toString();
                if (currentDate.getHours() < 10)
                    scope.question.answer.hrSelect = scope.inithr = '0' + currentDate.getHours().toString();
                else
                    scope.question.answer.hrSelect = scope.inithr = currentDate.getHours().toString();
                if (currentDate.getMinutes() < 10)
                    scope.question.answer.minSelect = scope.initMn = '0' + currentDate.getMinutes().toString();
                else
                    scope.question.answer.minSelect = scope.initMn = currentDate.getMinutes().toString();
                setCurrentDateTime();
                
                scope.subQuestion(scope.question, '-1', '11');
                
            }
            function setPreviousDateTime() {

                //console.log('set previous date time');
                scope.hrsA = [];
                scope.minsA = [];
                for (var i = 0; i < hrs; i++) {
                    if (i < 10)
                        scope.hrsA.push("0" + i.toString());
                    else
                        scope.hrsA.push(i.toString());
                }
                for (var j = 0; j < mins; j++) {
                    if (j < 10)
                        scope.minsA.push("0" + j.toString());
                    else
                        scope.minsA.push(j.toString());
                }
            }

            function setCurrentDateTime() {

//        //console.log('set current date time');
                scope.hrsA = [];
                scope.minsA = [];
                for (var i = 0; i <= parseInt(scope.inithr); i++) {
                    if (i < 10)
                        scope.hrsA.push("0" + i.toString());
                    else
                        scope.hrsA.push(i.toString());
                }

                var d = new Date();
                var n = d.getHours();

                if (scope.question.answer.hrSelect < n) {
                    for (var j = 0; j < mins; j++) {
                        if (j < 10)
                            scope.minsA.push("0" + j.toString());
                        else
                            scope.minsA.push(j.toString());
                    }
                } else {
                    for (var j = 0; j <= scope.initMn; j++) {
                        if (j < 10)
                            scope.minsA.push("0" + j.toString());
                        else
                            scope.minsA.push(j.toString());
                    }
                }
            }


            scope.$watch('question.answer.dt', function (newVal, oldVal) {
             if (!scope.question.answer.dt)
                    return;

                var iP = scope.intiDt.split("-");
                var oP = newVal.split("-");

                var selectDate = new Date(oP[2], oP[1] - 1, oP[0]);
                var initDate = new Date(iP[2], iP[1] - 1, iP[0]);
                if (selectDate < initDate) {
                    setPreviousDateTime();
                } else {
                    setCurrentDateTime();
                }
            }, true);


            scope.$watch('question.answer.hrSelect', function (newVal, oldVal) {
                //console.log(newVal);
                //console.log(oldVal);
                if (!scope.question.answer.hrSelect)
                    return;

                var iP = scope.intiDt.split("-");
                var oP = scope.question.answer.dt.split("-");


                var selectDate = new Date(oP[2], oP[1] - 1, oP[0]);
                var initDate = new Date(iP[2], iP[1] - 1, iP[0]);
                if (selectDate < initDate) {
                    setPreviousDateTime();
                } else {
                    setCurrentDateTime();
                }



            }, true);


            if (scope.question.question_type == '11')
                dateFunction();

        }


        //---------------

        return {
            restrict: "EA",
            scope: {question: '=', index: '='},
            link: linker,
        }


    }]);