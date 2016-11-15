BandQModule.service('reportCategories', function ($http) {


      this.initialData = function (dynQusDetail) {
        $http({

            method: 'GET',
            url: constanObject.Listcategory,

        }).then(function successCallback(response) {

             var key = ["question_id", "question_title", "option_type", "question_ctg", "question_type", "question_man", "questionOutcomes", "validate_opt", "location_countries", "location_venues", "location_regions", "location_zones", "questionoptions", "childquestionsbyoption"];

             var value = [
                dynamicQuestion.question_id == null ? "" : dynamicQuestion.question_id,
                dynamicQuestion.question_title == null ? "" : dynamicQuestion.question_title,
                dynamicQuestion.option_type == null ? "" : dynamicQuestion.option_type,
                dynamicQuestion.question_ctg == null ? "" : dynamicQuestion.question_ctg,
                dynamicQuestion.question_type == null ? "" : dynamicQuestion.question_type,
                dynamicQuestion.question_man == null ? "" : dynamicQuestion.question_man,
                dynamicQuestion.questionOutcomes == null ? "" : dynamicQuestion.questionOutcomes,
                dynamicQuestion.validate_opt == null ? "" : dynamicQuestion.validate_opt,
                dynamicQuestion.location_countries == null ? "" : dynamicQuestion.location_countries,
                dynamicQuestion.location_venues == null ? "" : dynamicQuestion.location_venues,
                dynamicQuestion.location_regions == null ? "" : dynamicQuestion.location_regions,
                dynamicQuestion.location_zones == null ? "" : dynamicQuestion.location_zones,
                dynamicQuestion.questionoptions == null ? "" : dynamicQuestion.questionoptions,
                dynamicQuestion.childquestionsbyoption == null ? "" : JSON.stringify(dynamicQuestion.childquestionsbyoption)
             ];

             dataBaseObj.insertData("dynamicQuestion", key, value);

        }, function errorCallback(response) {

        });
    };


});