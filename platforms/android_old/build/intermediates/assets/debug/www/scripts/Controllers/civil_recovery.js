var angular;
BandQModule.controller("civilRecoveryCtrl", ['$scope', '$rootScope', 'globalService', function ($scope, $rootScope, globalService) {
        $scope.isSkipPage = true;
        $rootScope.show = false;
        $rootScope.message = false;
        $rootScope.FirstOffenderIndexInvolvedInCivilRecovery = -1;
        var noOfPageMove;
        $scope.advanceFilterData;

        $scope.init = function (_noOfPageMove) {
            globalService.getCompGlobalData();
            ////console.log(JSON.stringify(globalService.getCompGlobalData()));

        //    $scope.civilRecoveryToolTipMessage = $scope.AllFieldData[60].question_hint;
         //   $scope.civilRecoveryWhyNotToolTipMessage = $scope.AllFieldData[60].question_hint;


            noOfPageMove = _noOfPageMove;
            $scope.productData = globalService.getProductDetail();
            $scope.offenderDataservice = globalService.getOffender();
            $scope.offenderData = $scope.offenderDataservice.offenderDetails;

        }
        $scope.civilRecoveryText = function (value) {
            $scope.civilRec = value;
            if (angular.equals($scope.civilRec, 'true')) {
                $rootScope.civilRecovery = true;
                $scope.isSkipPage = false;
                $("#yesRec1").addClass("active");
                $("#noRec1").removeClass("active");
            } else if (angular.equals($scope.civilRec, 'false')) {
                $rootScope.civilRecovery = false;
                $scope.isSkipPage = false;
                $("#noRec1").addClass("active");
                $("#yesRec1").removeClass("active");
            }
        }

        $scope.nextButtonClicked = function (callBack) {
            var count = 0;
            if (!$scope.isSkipPage) {
                $rootScope.message = false;
                $rootScope.show = false;
                if (!$rootScope.civilRecovery) {
                    if (!$scope.civilRecForm.$valid) {
                        $rootScope.show = true;
                        $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                        // alert('Please check the error messages displayed on the screen');
                        return callBack(false, 0);
                    } else {
                        $rootScope.show = false;
                        // //console.log($scope.productData.civilRecoveryData);
                        globalService.setCivilRecovery({'whyNot': $scope.productData.whyNotIssued, 'civilRecOffender': '', 'hasCivilRec': 'No'});
                        return callBack(true, 2);
                    }

                } else {

                    if ($scope.offenderData.length == 0 || $scope.productData.recProdect == 0) {
                        $rootScope.show = true;
                        $rootScope.alertMsg = "Please add an Offender to this Incident in order to issue Civil Recovery.";
                        // alert("please select offender which have civil recovery status true");
                        return callBack(false, 0);
                    } else {
                        // alert($scope.offenderData.length);
                        var count = 0;
                        $rootScope.FirstOffenderIndexInvolvedInCivilRecovery = -1;
                        for (var k = 0; k < $scope.offenderData.length; k++)
                        {
                            if ($scope.offenderData[k].civil_recovery_it == 1) {

                                count++;
                                if ($rootScope.FirstOffenderIndexInvolvedInCivilRecovery < 0)
                                    $rootScope.FirstOffenderIndexInvolvedInCivilRecovery = k;


                            }

                        }

                        if (count > 0) {
                            $rootScope.show = false;
                            return callBack(true, 1);
                        } else {
                            $rootScope.show = true;
                            $rootScope.alertMsg = "Please add an Offender to this Incident in order to issue Civil Recovery.";
                            // alert("please select offender which have civil recovery status true");
                            return callBack(false, 0);
                        }
                    }
                }
            } else {
                $rootScope.message = true;
                $rootScope.show = true;
                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
                $rootScope.requiredMsg = "Required";
                //  alert("Please select YES or NO.");
                return callBack(false, 0);
            }
        };
        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);
            $rootScope.message = false;
        }
        $scope.saveButtonAction = function (callBack) {
            return callBack(true);
        };

        $scope.closeDetail = function (value) {
            $scope.showData = value;
        }
    }]);

BandQModule.controller("issuingCivilRecovery", ['$scope', '$rootScope', '$http', 'globalService', 'getAdvanceFilter',
    function ($scope, $rootScope, $http, globalService, getAdvanceFilter) {
        var noOfPageMove;
        var result = {};
        $scope.genderList = [];
        $scope.residentTialStatus = [];
        $scope.identityForm = [];

        $scope.offenderData = [];
        $scope.previousOffenderData = [];
        $scope.civilRecoveryData = [];
        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;

          //  $scope.issuingCivilRecoveryToolTipMessage = $scope.AllFieldData[59].question_hint;
            webRequestObject.postRequest(this, "GET", constanObject.SEARCH_CINFIG_URL, null, constanObject.WebRequestType.OFFENDER_SEARCH, true);

            if (globalService.getIsProdcuctOrOffenderReset()) {
                globalService.setIsProdcuctOrOffenderReset(false);
                $scope.productData = globalService.getProductDetail();
                ////console.log("productData" + JSON.stringify($scope.productData));
                $scope.offenderDataservice = globalService.getOffender();
                // //console.log($scope.offenderDataservice);
                //console.log("offender data service" + JSON.stringify($scope.offenderDataservice));

                $scope.offenderData = $scope.offenderDataservice.offenderDetails;
                getGenderListAndResidentialList();

                $scope.offenderData.forEach(function (result) {

                    if (result.dob_usr == "0000-00-00" || result.dob_usr == "")
                        result.dob_usr = "";
                    else
                        result.dob_usr = moment(result.dob_usr, 'YYYY-MM-DD').format('DD-MM-YYYY');


                    if (result.images > 0) {
                        result.image = constanObject.offenderImageBaseUrl + result.id_usr + "/" + "1";
                    } else {
                        result.image = "images/offenders-pic/pic08.jpg";
                    }
                });

                $scope.offenderPath = constanObject.offenderImageBaseUrl;
                for (var i = 0; i < $scope.offenderData.length; i++) {

                    var allowContinue = false;

                    for (var j = 0; j < $scope.previousOffenderData.length; j++)
                    {
                        if ($scope.previousOffenderData[j].id_usr == $scope.offenderData[i].id_usr) {
                            $scope.offenderData[i] = $scope.previousOffenderData[j];
                            allowContinue = true;
                            break;
                        }
                    }
                    if (allowContinue)
                        continue;


                    // form Identity User

                    $scope.offenderData[i].residence = $scope.residentTialStatus[$scope.offenderData[i].residential_status];
                    $scope.offenderData[i].productList = [];
                    var indexTrack = 0;
                    for (var k = 0; k < $scope.offenderData[i].form_identity.length; k++) {

                        var key = $scope.offenderData[i].form_identity[k].form_identity_usr;
                        var value;

                        for (var j = 0; j < $scope.advanceFilterData.form_identity_usr.length; j++) {
                            if ($scope.advanceFilterData.form_identity_usr[j].keys == key)
                            {
                                value = $scope.advanceFilterData.form_identity_usr[j];
                                $scope.offenderData[i].productList.push({"index": indexTrack, "form_identity_usr": value, "form_identity_refernce": $scope.offenderData[i].form_identity[k].form_identity_refernce, "form_identity_other": $scope.offenderData[i].form_identity[k].form_identity_other});
                                indexTrack++;

                                break;

                            }
                        }

                    }
                    //


                    if (i == $rootScope.FirstOffenderIndexInvolvedInCivilRecovery) {
                        $scope.offenderData[i].productStockValue = $scope.productData.totalItemVal;
                        $scope.stockValue($scope.offenderData[i].productStockValue, $scope.offenderData[i]);
                    } else {
                        $scope.offenderData[i].productStockValue = 0;
                        $scope.stockValue($scope.offenderData[i].productStockValue, $scope.offenderData[i]);
                    }

                }

                $scope.previousOffenderData = $scope.offenderData;
            }


            //-----------------------------


            var getQuestionQuery = "SELECT * from " + TABLE_INCIDENT_CONFIG;
            dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
                $scope.civilRecoveryData = JSON.parse(result[0].json_data).CivilRecoveryStatus;
                for (var i = 0; i < $scope.offenderData.length; i++)
                {
                    if (!$scope.offenderData[i].civilRecoveryStatusValue) {
                        $scope.offenderData[i].civilRecoveryStatusValue = $scope.civilRecoveryData[0];
                        $scope.offenderData[i].civilRecoveryStatus = $scope.civilRecoveryData[0].id_it;
                    }
                }

            });



        }


        function getGenderListAndResidentialList() {

            if (!$scope.advanceFilterData) {
                $scope.advanceFilterData = getAdvanceFilter.getData();

                if ($scope.advanceFilterData) {
                    $scope.genderList = [];

                    $scope.advanceFilterData.gender.forEach(function (result) {
                        $scope.genderList.push(result.val);
                    });
                    $scope.residentTialStatus = $scope.advanceFilterData.residential_status;


                    $scope.advanceFilterData.form_identity_usr.forEach(function (result) {
                        $scope.identityForm.push(result);
                    });
                } else
                    getGenderListAndResidentialList();


            }
        }

        $scope.webRequestResponse = function (requestType, status, response) {
            //console.log("searchconfigoffender" + JSON.stringify(response));
            $scope.offenderConfigDetail = response.data;
        };

        $scope.nextButtonClicked = function (callBack) {
            
            var totalProductValue = $scope.productTotalValue();
            $scope.offenderInfo = [];
            for (var i = 0; i < $scope.offenderData.length; i++)
            {
                if ($scope.offenderData[i].civil_recovery_it == 1) {
                    $scope.offenderInfo.push($scope.offenderData[i].id_usr);
                }

            }
            if (totalProductValue == $scope.productData.totalItemVal) {
                var returnValidation = false;
                var phonenoPattren = /^[0][0-9].{8,9}$/;
                for (var i = 0; i < $scope.offenderData.length; i++)
                {
                    $scope.offenderData[i].mobileError = false;
                    $rootScope.show = false;
                    if ($scope.offenderData[i].p_mob_usr)
                        if ($scope.offenderData[i].p_mob_usr.length > 0)
                            if (!$scope.offenderData[i].p_mob_usr.match(phonenoPattren))
                            {
                                $scope.offenderData[i].mobileError = true;
                                returnValidation = true;
                                $rootScope.show = true;
                                $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate
                            }

                }


                if (returnValidation)
                    return callBack(false, 0);

//                if (!$scope.issuingCivilRecForm.$valid) {
//                    $rootScope.show = true;
//                    $rootScope.alertMsg = constanObject.ValidationMessageIncidentCreate;
//                    return callBack(false, 0);
//                } else {


                $rootScope.show = false;
                globalService.setCivilRecovery({'whyNot': '', 'civilRecOffender': $scope.offenderInfo, 'hasCivilRec': 'yes'});
                return callBack(true, 1);
                //   }

            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = "Please note, the combined total between the Offenders does not match the total Product - Stock & Value";
                // alert("product value is not valid");
                return callBack(false, 0);

            }
        };


        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);

        };
        $scope.getData = function (value, index) {
            $scope.offenderData[index].civilRecoveryStatus = value.id_it;
        };

        $scope.saveButtonAction = function (callBack) {
            return callBack(true);
        };
        $scope.closeDetail = function (value) {
            $scope.showData = value;
        }


        $scope.productTotalValue = function () {

            var total = 0;
            for (var i = 0; i < $scope.offenderData.length; i++) {

                var p = $scope.offenderData[i];

                total += parseFloat(p.productStockValue);
            }

            return total;
        }
        var parseFloatLocal = function (val) {
            return parseFloat(val || 0)
        }
        var tiemOut;
        $scope.stockValue = function (value, resultval) {

            $rootScope.show = false;

            var index = $scope.offenderData.indexOf(resultval);
            if (tiemOut)
                clearTimeout(tiemOut);
            tiemOut = setTimeout(function () {


                $scope.$apply(function () {
                    var previousValue = parseFloatLocal($scope.offenderData[index].pre_productStockValue);
                    var totalValue = 0;
                    var orignalTotalValue = parseFloatLocal($scope.productData.totalItemVal);

                    for (var i = 0; i < $scope.offenderData.length; i++)
                        totalValue = parseFloatLocal(totalValue) + parseFloatLocal($scope.offenderData[i].productStockValue);

                    if (totalValue > orignalTotalValue) {
                        $scope.offenderData[index].productStockValue = previousValue;
                        return;
                    }

                    if (index < $scope.offenderData.length - 1) {
                        $scope.offenderData[index + 1].productStockValue = parseFloatLocal($scope.offenderData[index + 1].productStockValue) + orignalTotalValue - totalValue;
                    }



                    /// if total value less than total value 
                    for (var i = 0; i < $scope.offenderData.length; i++)
                        totalValue = parseFloatLocal(totalValue) + parseFloatLocal($scope.offenderData[i].productStockValue);

                    if (totalValue < orignalTotalValue) {
                        $rootScope.show = true;
                        $rootScope.alertMsg = "Please note, the combined total between the Offenders does not match the total Product - Stock & Value";


                    }



                    //                    
//                    
//                    else
//                        $scope.offenderData[0].productStockValue = parseFloatLocal($scope.offenderData[0].productStockValue) + parseFloatLocal(orignalTotalValue) - parseFloat(totalValue);

                    //set pre value
                    for (var i = 0; i < $scope.offenderData.length; i++)
                        $scope.offenderData[i].pre_productStockValue = parseFloatLocal($scope.offenderData[i].productStockValue);


                    var getQuestionQuery = "SELECT * from " + TABLE_INCIDENT_CONFIG;
                    dataBaseObj.getDatafromDataBase(getQuestionQuery, function (result) {
                        $scope.civilRecoveryRange = JSON.parse(result[0].json_data).CivilRecoveryRange;
                        for (var i = 0; i < $scope.offenderData.length; i++) {
                            var value = $scope.offenderData[i].productStockValue;
                            var index = i;

                            for (var j = 0; j < $scope.civilRecoveryRange.length; j++) {
                                if (parseFloat($scope.civilRecoveryRange[j].v_from) <= parseFloat(value) && parseFloat($scope.civilRecoveryRange[j].v_to) >= parseFloat(value))
                                {
                                    $scope.$apply(function () {
                                        $scope.offenderData[index].recovery = parseFloat($scope.civilRecoveryRange[j].civil_recovery);
                                    });
                                }
                            }
                        }

                    });
                    var total = 0;
                    for (var i = 0; i < $scope.offenderData.length; i++) {

                        var p = $scope.offenderData[i];

                        total += parseFloat(p.productStockValue);
                    }

                    return total;


                });
            }, 500);


        }




        $scope.addAnotherProduct = function (index) {
            var productArray = {"form_identity_usr": "", "key": 0, "form_identity_refernce": "", "form_identity_other": ""};
            productArray.index = $scope.offenderData[index].productList.length;
            $scope.offenderData[index].productList.push(productArray);

        }

        $scope.remove = function (indexOfOffender, indexofProduct) {
            $scope.offenderData[indexOfOffender].productList.splice(indexofProduct, 1);

        }

    }]);
