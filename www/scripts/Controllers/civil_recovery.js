var angular;
BandQModule.controller("civilRecoveryCtrl", ['$scope', '$rootScope', 'globalService', function
            ($scope, $rootScope, globalService) {
        $scope.isSkipPage = true;
        $rootScope.show = false;
        $rootScope.message = false;
        $rootScope.FirstOffenderIndexInvolvedInCivilRecovery = -1;
        var noOfPageMove;
        $scope.advanceFilterData;
        $scope.offenderInfo = '';

        $scope.init = function () {
            globalService.getCompGlobalData();
            // noOfPageMove = _noOfPageMove;
            $scope.productData = globalService.getProductDetail();
            $scope.offenderDataservice = globalService.getOffender();
            $scope.offenderData = $scope.offenderDataservice.offenderDetails;
            $scope.reset();
        }
        $scope.civilRecoveryText = function (value) {
            $scope.civilRec = value;
            if (angular.equals($scope.civilRec, 'true')) {
                $rootScope.civilRecovery = true;
                $scope.isSkipPage = false;
                $scope.productData.whyNotIssued = '';
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
                        globalService.setCivilRecovery({'whyNot': $scope.productData.whyNotIssued, 'civilRecOffender': '', 'hasCivilRec': 'no'});
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
                            globalService.setCivilRecovery({'whyNot': '', 'civilRecOffender': $scope.offenderInfo, 'hasCivilRec': 'yes'});
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
        $scope.saveButtonClicked =function (callBack){
            if($rootScope.civilRecovery ==true)
              globalService.setCivilRecovery({'whyNot': '', 'civilRecOffender': $scope.offenderInfo, 'hasCivilRec': 'yes'});
            else if($rootScope.civilRecovery ==false)
            globalService.setCivilRecovery({'whyNot': $scope.productData.whyNotIssued, 'civilRecOffender': '', 'hasCivilRec': 'no'});
           
            return callBack(true);                      
        }
        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);
            $rootScope.message = false;
        }
       
        $scope.closeDetail = function (value) {
            $scope.showData = value;
        };
       
        $scope.reset = function () {
            var data = globalService.getCivilRecovery();
            if (!data.hasCivilRec)
                return;
            if (data.hasCivilRec == "no") {
                $scope.civilRecoveryText('false');
                $scope.productData.whyNotIssued = data.whyNot;
                //   $scope.whyNotDesc = $scope.commentText;
            } else {
                $scope.offenderInfo = globalService.getCivilRecovery().civilRecOffender;
                $scope.civilRecoveryText('true');
            }
        };
        $scope.init();
    }]);

BandQModule.controller("issuingCivilRecovery", ['$scope', '$rootScope', '$http', 'globalService',
    'getAdvanceFilter',
    function ($scope, $rootScope, $http, globalService, getAdvanceFilter) {
        var noOfPageMove;
        var result = {};
        $scope.genderList = [];
        $scope.residentTialStatus = [];
        $scope.identityForm = [];

        $scope.offenderData = [];
        $scope.previousOffenderData = [];
        $scope.civilRecoveryData = [];
        $scope.maxDate="";
        $scope.init = function () {
            // noOfPageMove = _noOfPageMove;
            
            //  $scope.issuingCivilRecoveryToolTipMessage = $scope.AllFieldData[59].question_hint;
            webRequestObject.postRequest(this, "GET", constanObject.SEARCH_CINFIG_URL, null, constanObject.WebRequestType.OFFENDER_SEARCH, true);
            $scope.productData = globalService.getProductDetail();
            $scope.offenderData = globalService.getOffender().offenderDetails;
            ;
            getGenderListAndResidentialList();
            $scope.offenderData.forEach(function (result) {

                if (result.dob_usr == "0000-00-00" || result.dob_usr == "")
                    result.dob_usr = "";
                if (result.images > 0) {
                    result.image = constanObject.offenderImageBaseUrl + result.id_usr + "/" + "1";
                } else {
                    result.image = "images/offenders-pic/pic08.jpg";
                }
            });

            $scope.offenderPath = constanObject.offenderImageBaseUrl;




            // forum identity --------------------------




            for (var i = 0; i < $scope.offenderData.length; i++) {

                if ($scope.offenderData[i].formOfIdentity)
                {

                    $scope.offenderData[i].formOfIdentity = $.grep($scope.offenderData[i].formOfIdentity, function (e) {

                        if (!e.comefromeOffender)
                            return true
                        return false;

                    });
                }


                for (var k = 0; k < $scope.offenderData[i].form_identity.length; k++) {
                    var key = $scope.offenderData[i].form_identity[k].form_identity_usr;
                    var value;
                    for (var j = 0; j < $scope.advanceFilterData.form_identity_usr.length; j++) {
                        if ($scope.advanceFilterData.form_identity_usr[j].keys == key)
                        {
                            value = $scope.advanceFilterData.form_identity_usr[j];
                            var form_identity_refernce = $scope.offenderData[i].form_identity[k].form_identity_refernce;
                            var form_identity_other = $scope.offenderData[i].form_identity[k].form_identity_other;
                            if (!$scope.offenderData[i].formOfIdentity)
                                $scope.offenderData[i].formOfIdentity = [];
                            $scope.offenderData[i].formOfIdentity.push({"index": k, "form_identity_usr": value, "form_identity_refernce": form_identity_refernce, "form_identity_other": form_identity_other, "comefromeOffender": "true"});
                            break;

                        }
                    }

                }


                //set product value

                if (i == $rootScope.FirstOffenderIndexInvolvedInCivilRecovery) {
                    $scope.offenderData[i].productStockValue = $scope.productData.totalItemVal;
                    $scope.stockValue($scope.offenderData[i].productStockValue, $scope.offenderData[i]);
                } else {
                    $scope.offenderData[i].productStockValue = 0;
                    $scope.stockValue($scope.offenderData[i].productStockValue, $scope.offenderData[i]);
                }

            }

            //----------------------------------------------------------


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

            $scope.maxDate = mnSelect + "/" + dtSelect + "/" + yrSelect;
            $scope.reset();

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
                $scope.offenderData[i].form_identity = [];
                if ($scope.offenderData[i].formOfIdentity.length > 0) {
                    for (var j = 0; j < $scope.offenderData[i].formOfIdentity.length; j++)
                    {
                        $scope.offenderData[i].form_identity.push({"form_identity_usr": $scope.offenderData[i].formOfIdentity[j].form_identity_usr.keys, "form_identity_refernce": $scope.offenderData[i].formOfIdentity[j].form_identity_refernce, "form_identity_other": $scope.offenderData[i].formOfIdentity[j].form_identity_other});
                    }
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
                $rootScope.show = false;
                globalService.setCivilRecovery({'whyNot': '', 'civilRecOffender': $scope.offenderInfo, 'hasCivilRec': 'yes'});
                globalService.setOffender({'whyNot': "", 'offenderDetails': $scope.offenderData, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
                return callBack(true, 1);


            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = "Please note, the combined total between the Offenders does not match the total Product - Stock & Value";
                // alert("product value is not valid");
                return callBack(false, 0);

            }
        };

         $scope.saveButtonClicked =function (callBack){
             $scope.offenderInfo = [];
            for (var i = 0; i < $scope.offenderData.length; i++)
            {
                if ($scope.offenderData[i].civil_recovery_it == 1) {
                    $scope.offenderInfo.push($scope.offenderData[i].id_usr);
                }
                $scope.offenderData[i].form_identity = [];
                if ($scope.offenderData[i].formOfIdentity.length > 0) {
                    for (var j = 0; j < $scope.offenderData[i].formOfIdentity.length; j++)
                    {
                        $scope.offenderData[i].form_identity.push({"form_identity_usr": $scope.offenderData[i].formOfIdentity[j].form_identity_usr.keys, "form_identity_refernce": $scope.offenderData[i].formOfIdentity[j].form_identity_refernce, "form_identity_other": $scope.offenderData[i].formOfIdentity[j].form_identity_other});
                    }
                }
            }
            globalService.setCivilRecovery({'whyNot': '', 'civilRecOffender': $scope.offenderInfo, 'hasCivilRec': 'yes'});
                globalService.setOffender({'whyNot': "", 'offenderDetails': $scope.offenderData, 'isOffenderInvolved': 'yes', "actionTaken": $scope.mySelectedValues});
          return callBack(true);                    
        }
        $scope.back = function (callBack) {
            return callBack(true, noOfPageMove);

        };
        $scope.getData = function (value, index) {
            $scope.offenderData[index].civilRecoveryStatus = value.id_it;
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
            if (!$scope.offenderData[index].formOfIdentity)
                $scope.offenderData[index].formOfIdentity = [];
            var productArray = {"form_identity_usr": "", "key": 0, "form_identity_refernce": "", "form_identity_other": ""};
            productArray.index = $scope.offenderData[index].formOfIdentity.length;
            $scope.offenderData[index].formOfIdentity.push(productArray);


        }

        $scope.remove = function (indexOfOffender, indexofProduct) {
            $scope.offenderData[indexOfOffender].formOfIdentity.splice(indexofProduct, 1);

        };
        $scope.reset = function () {
            $scope.resetCivilRecovery = globalService.getCivilRecovery();
            $scope.offenderData = globalService.getOffender().offenderDetails;
            $scope.mySelectedValues = globalService.getOffender().actionTaken;
            if (!$scope.resetCivilRecovery.civilRecOffender)
                return;

            for (var i = 0; i < $scope.offenderData.length; i++) {
                $scope.offenderData[i].productStockValue = $scope.offenderData[i].pre_productStockValue;
                $scope.stockValue($scope.offenderData[i].productStockValue, $scope.offenderData[i]);
            }
        };
        $scope.init();
    }]);