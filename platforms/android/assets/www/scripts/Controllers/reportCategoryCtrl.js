BandQModule.controller('ReportCategoryCtrl', ['$scope', '$http', '$rootScope', '$timeout', 
    'CategoryOutcomeTypeService', 'globalService', "getCategoryOutcomeType",
    function ($scope, $http, $rootScope, $timeout, CategoryOutcomeTypeService,
    globalService, getCategoryOutcomeType) {

        $scope.cats = [];

        $scope.outService = "CategoryOutcomeTypeService";
        $scope.userSelectedCat;
        $rootScope.show = false;
        var noOfPageMove;

//        $scope.selectCat = function (obj) {
//            for (var i = 0; i < $scope.cats.length; i++) {
//                if ($scope.cats[i].pk_incident_category == obj.pk_incident_category) {
//                    $scope.cats[i].activeClass = true;
//                    //                $scope.cats[i].activeClass = 'active';
//                    //                return false;
//                    //                //console.log($scope.cats[i].activeClass);
//                } else {
//                    $scope.cats[i].activeClass = false;
//                    //                $scope.cats[i].activeClass = '';
//                }
//            }
//        }


        $scope.setCat = function (id) {

            $scope.userSelectedCat = id;
            globalService.setCategoryId(id);
             resetCategory();
        }



        function setData() {

            var data = getCategoryOutcomeType.getData();
            if (!data) {
                setTimeout(function () {
                    setData();
                }, 50);
            } else {
                setTimeout(function () {

                    $scope.$apply(function () {
                        $scope.cats = data.category;
                        if ($scope.cats.length == 1) {
                            $scope.userSelectedCat = data.category[0].pk_incident_category;
                            globalService.setCategoryId($scope.userSelectedCat);
                            $scope.selectedCategory = data.category[0].name;
                            $scope.cats[0].activeClass = true;
                        } else {
                            //$scope.userSelectedCat = '';
                            //globalService.setCategoryId($scope.userSelectedCat);
                           // $scope.cats[].activeClass = false;
                            resetCategory();
                        }

                    });
                    CategoryOutcomeTypeService.setTempData(data);

                }, 10);
            }

        }


        function resetCategory() {

            if (!globalService.getCategoryId())
                return;

            if (globalService.getCategoryId() <= 0)
                return;

            for (var i = 0; i < $scope.cats.length; i++) {

                if ($scope.cats[i].pk_incident_category == globalService.getCategoryId())
                {
                    $scope.userSelectedCat = $scope.cats[i].pk_incident_category;
                    globalService.setCategoryId($scope.userSelectedCat);
                    $scope.selectedCategory = $scope.cats[i].name;
                    $scope.cats[i].activeClass = true;
                    break;
                }
            }
        }





        $scope.nextButtonClicked = function (callBack) {
            //     //console.log(typeof $scope.userSelectedCat);
            if (typeof $scope.userSelectedCat == "number") {
                $rootScope.show = false;
                $scope.req1 = false;
                $scope.req2 = false;
                return callBack(true, 1);
            } else {
                $rootScope.show = true;
                $scope.req1 = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                //            alert('Select your category');
                return callBack(false, 1);

            }
        };
        
             $scope.saveButtonClicked = function (callBack){
                            return callBack(true);
           
        };

        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
            $scope.categoryToolTipMessage = $scope.fieldData[10].question_hint;

        }


        $scope.back = function (callBack) {
            $rootScope.show = false;
            $scope.req1 = false;
            $scope.req2 = false;
            // $('div.incident_btn_wrap.fl').css('display', 'none');
            return callBack(true, noOfPageMove);
        }


        setData();


    }]);