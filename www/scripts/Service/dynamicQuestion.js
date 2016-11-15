BandQModule.service('dynamicQuestion', ["loadDynamicQuestionAndIncidentConfig", function (loadDynamicQuestionAndIncidentConfig) {

        var currentVisibleQuestioIndex = 0;
        var currtnVisibleQuestionId = 0;
        var dynamicQuestionValidation = [];
        var currentParecntQuestionScope = [];
        var parentQuestionArray = [];
        //  var dynamicQuestion = [];
        var dynamicQuestionData = [];


        this.setAndUpdaeAnswer = function (jsonData, question, isParentQuestion,
                index, parentQuestionId) {
            //  alert(JSON.stringify(jsonData));

            if (isParentQuestion) {
                var isContin = false;
                var indexOfExisting;
                var obj;
                for (var i = 0; i < jsonData.length; i++)
                {
                    obj = jsonData[i];
                    if (obj.parentQuestioId == question.question_id)
                    {
                        indexOfExisting = i;
                        isContin = true;
                        break;
                    }

                }


                // updte 
                var jsonObj = {};
                var answerArray = [];
                jsonObj.parentQuestioId = question.question_id;
                var jsonObjForAns = {};
                jsonObjForAns.question_id = question.question_id;
                if (question.isOptionSelected)
                    jsonObjForAns.isOptionSelected = true;
                else
                    jsonObjForAns.isOptionSelected = false;
                jsonObjForAns.answer = question.answer;

                if (question.parentIndex >= 0)
                    jsonObjForAns.parentIndex = question.parentIndex;

                jsonObjForAns.inputType = question.inputType;
                jsonObjForAns.use_fieldsetoption = question.use_fieldsetoption;
                if (jsonObjForAns.use_fieldsetoption == "1")
                {
                    var obj = JSON.parse(question.fieldset_display_options);
                    if (obj.length > index)
                        jsonObjForAns.fieldset_display_options = obj[index];


                }

                if (isContin)
                {

                    if (question.inputType == 2) {

                        if (obj.answer.length > 0) {
                            obj.answer.splice(index, 0);
                            obj.answer[0] = jsonObjForAns;
                            jsonObj.answer = obj.answer;
                        }

                    } else {
                        answerArray.push(jsonObjForAns);
                        jsonObj.answer = answerArray;
                    }

                    jsonData[indexOfExisting] = jsonObj;
                } else
                {
                    answerArray.push(jsonObjForAns);
                    jsonObj.answer = answerArray;
                    jsonData.push(jsonObj);
                }
            } else {
                // child question

                var isContin = false;
                var indexOfExisting;
                var obj;
                for (var i = 0; i < jsonData.length; i++)
                {
                    obj = jsonData[i];
                    if (obj.parentQuestioId == parentQuestionId)
                    {
                        indexOfExisting = i;
                        isContin = true;
                        break;
                    }

                }

                if (isContin) {
                    isContin = false; //set fall to use it for check child table exist or not
                    var answerArray = obj.answer;
                    var answerObj;
                    var indexOfAnswer;
                    for (var j = 0; j < answerArray.length; j++) {
                        answerObj = answerArray[j];

                        if (answerObj.question_id == question.question_id) {
                            indexOfAnswer = j;
                            isContin = true;
                            break;
                        }

                    }
                    var jsonObjForAns = {};
                    jsonObjForAns.question_id = question.question_id;
                    jsonObjForAns.answer = question.answer;

                    jsonObjForAns.inputType = question.inputType;
                    if (question.isOptionSelected)
                        jsonObjForAns.isOptionSelected = true;
                    else
                        jsonObjForAns.isOptionSelected = false;
                    jsonObjForAns.fieldset_display_options = question.fieldset_display_options;
                    jsonObjForAns.use_fieldsetoption = question.use_fieldsetoption;
                    jsonObjForAns.use_fieldsetoption = question.use_fieldsetoption;

                    if (question.parentIndex >= 0)
                        jsonObjForAns.parentIndex = question.parentIndex;

                    if (jsonObjForAns.use_fieldsetoption == "1")
                    {
                        var obj = JSON.parse(question.fieldset_display_options);
                        if (obj.length > index)
                            jsonObjForAns.fieldset_display_options = obj[index];
                    }

                    if (isContin)
                        answerArray[indexOfAnswer] = jsonObjForAns;
                    else
                        answerArray.push(jsonObjForAns);

                }


            }

            dynamicQuestionData = jsonData;

        }


        this.removeParentQuestion = function (questionId) {
            for (var i = 0; i < dynamicQuestionData.length; i++)
            {
                var obj = dynamicQuestionData[i];
                if (obj.parentQuestioId == questionId)
                {
                    dynamicQuestionData.splice(i, 1);
                    return;
                }

            }
        }

        this.removeChildQuestion = function (parentQuestionId, index) {

            for (var i = 0; i < dynamicQuestionData.length; i++)
            {
                var obj = dynamicQuestionData[i];
                if (obj.parentQuestioId == parentQuestionId)
                {
                    dynamicQuestionData[i].answer = $.grep(dynamicQuestionData[i].answer, function (e) {
                        return e.parentIndex != index;

                    });
                    return;
                }

            }

        }


        this.getAndUpdaeAnswer = function () {

            return dynamicQuestionData;
        }

        this._setAndUpdaeAnswer = function (data) {

            dynamicQuestionData = data;
        }

        this.setJsonData = function (obj) {
            dynamicQuestionData = obj;
        }

        this.getJsonData = function () {
            return dynamicQuestionData;
        }


        this.getCurrentParecntQuestionScope = function () {
            return currentParecntQuestionScope;
        }

        this.setCurrentParecntQuestionScope = function (obj) {
            currentParecntQuestionScope.push(obj)
        }

        this.SetParentQuestionArray = function (obj) {
            parentQuestionArray = obj;
        }
        this.getParentQuestionArray = function () {
            return parentQuestionArray;
        }

        this.getCurrentVisibleQuestionId = function () {
            return currtnVisibleQuestionId;
        }

        this.setCurrentVisibleQuestionId = function (n) {
            currtnVisibleQuestionId = n;
        }



        this.getCurrentVisibleQuestionIndex = function () {
            return currentVisibleQuestioIndex;
        }

        this.setCurrentVisibleQuestionIndex = function (n) {
            currentVisibleQuestioIndex = n;
        }

        this.setValidationData = function (obj) {
            dynamicQuestionValidation.push(obj);
            // //console.log(dynamicQuestionValidation);
        }
        this.getValidationData = function () {
            return dynamicQuestionValidation;

        }

        this.getTemplate = function (contentType) {
            var template = '';
            switch (contentType) {
                case '1':
                    template = "views/DynamicQuestionTemplate/input_text.html";
                    break;
                case '2':
                    template = "views/DynamicQuestionTemplate/checkbox.html";
                    break;
                case '3':
                    template = "views/DynamicQuestionTemplate/radio.html";
                    break;
                case '4':
                    template = "views/DynamicQuestionTemplate/dropdown.html";
                    break;
                case '5':
                    template = "views/DynamicQuestionTemplate/dropdown.html";
                    break;
                case '6':
                    template = "views/DynamicQuestionTemplate/textarea.html";
                    break;
                case '7':
                    template = "views/DynamicQuestionTemplate/input_file.html";
                    break;
                case '8':
                    template = "views/DynamicQuestionTemplate/input_file.html";
                    break;

                case '11':
                    template = "views/DynamicQuestionTemplate/date_time.html";
                    break;

            }

            return template;
        };


        this.getDynamicQusData = function (dynQusDetail) {
            loadDynamicQuestionAndIncidentConfig.loadAndShowDynamciQuestion(dynQusDetail);
        };


        this.loadDataToLocalDataBase = function (response, callBack) {

            try {


                response = response;
                dataBaseObj.deleteTableData(TABLE_DYNAMIC_QUESTION);
                //dataBaseObj.deleteTableData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_RELATION);
                dataBaseObj.deleteTableData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION);


                var questionNumber_;
                for (var j = 0; j < response.dynamic.keySeq.length; j++) {

                    questionNumber_ = response.dynamic.keySeq[j];
                    var dynamicQuestion = response.dynamic[questionNumber_];
                    if (dynamicQuestion != "undefind") {
                        var value = [dynamicQuestion.question_id == null ? "" : dynamicQuestion.question_id, dynamicQuestion.sort_order == null ? "" : dynamicQuestion.sort_order, dynamicQuestion.question_title == null ? "" : dynamicQuestion.question_title,
                            dynamicQuestion.option_type == null ? "" : dynamicQuestion.option_type, dynamicQuestion.question_ctg == null ? "" : dynamicQuestion.question_ctg,
                            dynamicQuestion.question_type == null ? "" : dynamicQuestion.question_type, dynamicQuestion.errmessage_opt == null ? "" : dynamicQuestion.errmessage_opt,
                            dynamicQuestion.question_hint == null ? "" : dynamicQuestion.question_hint, dynamicQuestion.question_man == null ? "" : dynamicQuestion.question_man,
                            dynamicQuestion.validate_opt == null ? "" : dynamicQuestion.validate_opt, dynamicQuestion.location_countries == null ? "" : "," + dynamicQuestion.location_countries + ",",
                            dynamicQuestion.location_venues == null ? "" : "," + dynamicQuestion.location_venues + ",", dynamicQuestion.location_regions == null ? "" : "," + dynamicQuestion.location_regions + ",",
                            dynamicQuestion.location_zones == null ? "" : "," + dynamicQuestion.location_zones + ",", dynamicQuestion.questionIncidentCategory == null ? "" : "," + dynamicQuestion.questionIncidentCategory + ",",
                            dynamicQuestion.questionoptions == null ? "" : JSON.stringify(dynamicQuestion.questionoptions), dynamicQuestion.childquestionsbyoption == null ? "" : JSON.stringify(dynamicQuestion.childquestionsbyoption),
                            dynamicQuestion.is_child == null ? 0 : JSON.stringify(dynamicQuestion.is_child),
                            dynamicQuestion.location_option == null ? 0 : JSON.stringify(dynamicQuestion.location_option),
                            dynamicQuestion.fieldset_display_options == null ? 0 : JSON.stringify(dynamicQuestion.fieldset_display_options),
                            dynamicQuestion.use_fieldsetoption == null ? 0 : JSON.stringify(dynamicQuestion.use_fieldsetoption), false];
                        dataBaseObj.insertData(TABLE_DYNAMIC_QUESTION, DYNAMIC_QUESTION_KEY, value);
                        if (dynamicQuestion.questionOutcomes)
                            for (var p = 0; p < dynamicQuestion.questionOutcomes.keyseq.length; p++) {

                                var outcomeId = dynamicQuestion.questionOutcomes.keyseq[p];
                                var outcomeType = "," + dynamicQuestion.questionOutcomes[outcomeId] + ",";
                                //   dataBaseObj.insertData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_RELATION, QUESTOIN_OUTCOME_KEY, [dynamicQuestion.question_id, outcomeId]);
                                dataBaseObj.insertData(TABLE_DYNAMIC_QUESTOIN_OUTCOME_TYPE_RELATION, QUESTOIN_OUTCOME_TYPE_KEY, [dynamicQuestion.question_id, dynamicQuestion.questionOutcomes.keyseq[p], outcomeType]);

                            }

                    }

                }

                return  callBack(true);
            } catch (e) {
                return  callBack(false);
            }
        }


    }]);
