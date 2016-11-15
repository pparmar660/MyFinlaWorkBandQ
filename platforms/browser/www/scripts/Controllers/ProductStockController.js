BandQModule.controller("ProductStockController", ["$scope", "$rootScope", "globalService", function ($scope, $rootScope, globalService) {

        /*    var map={"incident_where":"",
         "incident_brand":"",
         "incident_code":"",
         "incident_name":"",
         "incident_unitValue":"",
         "incident_quantity":"",
         "incident_recoverd_quantity":"",
         "incident_checkbox":"",
         "incident_recoverd_damaged":"",
         "incident_subTotal":""
         };*/
        $scope.isCheked = false;
        $scope.idCheck = 0;
        $rootScope.show = false;
        $scope.inputs = [];
        $scope.value = ["Ravi", "Deepak", "Ruchi"];
        $scope.inputs.push({"id": $scope.idCheck, "rowType": "add", "incident_quantity": "1"});
        $scope.editinputs = [];
        $scope.swasAreaDropdownValue = [];
        var parent = $("#57").parents(".incident_report_wrapper");
        parent.removeClass("incident_report_wrapper");
        $scope.init = function () {
            $scope.isStockLoad = globalService.getStockLoad();
            $scope.productDefaultValue = globalService.getProductDefaultValue();
            if ($scope.productDefaultValue) {
                $scope.inputs = [];
                $scope.inputs.push({"id": $scope.idCheck, "rowType": "add", "incident_quantity": "1", "incident_unitValue": $scope.productDefaultValue});
            }
            $scope.swasAreaDropdown = globalService.getSwasArea();
            for (var i = 0; i < $scope.swasAreaDropdown.length; i++) {
                $scope.swasAreaDropdownValue.push($scope.swasAreaDropdown[i].title_vna);
            }

            $scope.resetData();
        };

        $scope.nextButtonClicked = function (callBack) {
            $scope.submitted = true;
            if ($scope.productForm.$valid && !$scope.isCheked) {
                $scope.productDetail = {"recProdect": $scope.getRecoverProductsItem(), "recProdectVal": $scope.getRecoverProductsvalue(), "demProduct": $scope.getDamagedProductsItem(), "demProducVal": $scope.getDamagedProductsvalue(), "totalItem": $scope.getTotalProductItem(), "totalItemVal": $scope.getTotalProductValue(), "productCheck": $scope.isCheked, "stockLoad": $scope.isStockLoad};
                globalService.setProductDetail($scope.productDetail);
                $rootScope.show = false;
                if ($scope.getTotalProductValue() == 0) {
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Please add a product";
                    return callBack(false, 0);
                } else {

                    $rootScope.show = false;
                    var tempArray = angular.copy($scope.inputs);
                    for (var i = 0; i < tempArray.length; i++) {
                        tempArray[i].rowType = "save";
                        if (!tempArray[i].incident_checkbox) {
                            tempArray[i].incident_checkbox = false;
                            tempArray[i].incident_recoverd_quantity = '';
                            tempArray[i].incident_recoverd_damaged = '';
                        }
                        // console.log("product" + JSON.stringify(tempArray[i]));
                    }
                    $scope.inputs = [];
                    $scope.inputs = tempArray;
                    globalService.setAllProduct($scope.inputs);
                    return callBack(true, 1);
                }

            } else if ($scope.isCheked) {
                $scope.productDetail = {"recProdect": 0, "recProdectVal": 0, "demProduct": 0, "demProducVal": 0, "totalItem": 0, "totalItemVal": 0, "productCheck": $scope.isCheked, "stockLoad": $scope.isStockLoad};
                globalService.setProductDetail($scope.productDetail);
                return callBack(true, 1);
            } else {
                $rootScope.show = true;
                $rootScope.alertMsg = "'Where?', 'Brand', 'Unit Value' and 'Quantity' Columns are mandatory";
                return callBack(false, 0);
            }

        };
        $scope.back = function (callBack) {
            $rootScope.show = false;
            return callBack(true);
        };

        $scope.change = function (active) {
            if (active) {
                $scope.isCheked = true;
                $rootScope.show = false;
                if ($scope.productDefaultValue)
                    $scope.inputs = [{"id": 0, "rowType": "add", "incident_quantity": "1", "incident_unitValue": $scope.productDefaultValue}];
                else
                    $scope.inputs = [{"id": 0, "rowType": "add", "incident_quantity": "1"}];
                globalService.setAllProduct($scope.inputs);
            } else
                $scope.isCheked = false;
        }
        $scope.saveButtonClicked = function (callBack) {

            $scope.productDetail = {"recProdect": $scope.getRecoverProductsItem(), "recProdectVal": $scope.getRecoverProductsvalue(), "demProduct": $scope.getDamagedProductsItem(), "demProducVal": $scope.getDamagedProductsvalue(), "totalItem": $scope.getTotalProductItem(), "totalItemVal": $scope.getTotalProductValue(), "productCheck": $scope.isCheked, "stockLoad": $scope.isStockLoad};
            globalService.setProductDetail($scope.productDetail);
            var tempArray = angular.copy($scope.inputs);
            for (var i = 0; i < tempArray.length; i++) {
                tempArray[i].rowType = "save";
                if (!tempArray[i].incident_checkbox) {
                    tempArray[i].incident_checkbox = false;
                    tempArray[i].incident_recoverd_quantity = '';
                    tempArray[i].incident_recoverd_damaged = '';
                }
            }
            $scope.inputs = [];
            $scope.inputs = tempArray;
            globalService.setAllProduct($scope.inputs);
            return callBack(true);

        };

        $scope.addNewProduct = function () {// $scope.inputs.push($scope.item);
            $scope.idCheck++;
            if ($scope.productDefaultValue)
                $scope.inputs.splice(0, 0, {"id": $scope.idCheck, "rowType": "add", "incident_quantity": "1", "incident_unitValue": $scope.productDefaultValue});
            else
                $scope.inputs.splice(0, 0, {"id": $scope.idCheck, "rowType": "add", "incident_quantity": "1"});
        }

        $scope.getRecoverProductsItem = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_quantity && !$scope.isStockLoad)
                {
                    total += parseInt(p.incident_recoverd_quantity);
                } else if (p.incident_where && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_quantity && $scope.isStockLoad)
                {
                    total += parseInt(p.incident_recoverd_quantity);
                } else
                {
                    total += 0;
                }
            }
            return total;
        }



        $scope.keyPress = function (value) {
            var index = $scope.inputs.indexOf(value);

            if (parseInt($scope.inputs[index].incident_recoverd_quantity) > parseInt($scope.inputs[index].incident_quantity))
                $scope.inputs[index].incident_recoverd_quantity = parseInt($scope.inputs[index].incident_quantity);
        }
        $scope.damagedproduct = function (value) {
            var index = $scope.inputs.indexOf(value);
            if (parseInt($scope.inputs[index].incident_recoverd_damaged) > parseInt($scope.inputs[index].incident_quantity))
                $scope.inputs[index].incident_recoverd_damaged = parseInt($scope.inputs[index].incident_quantity);

        }

        $scope.getRecoverProductsvalue = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_quantity && !$scope.isStockLoad)
                    total += parseFloat(p.incident_unitValue * p.incident_recoverd_quantity);
                else if (p.incident_where && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_quantity && $scope.isStockLoad)
                    total += parseFloat(p.incident_unitValue * p.incident_recoverd_quantity);
                else
                    total += 0;
            }
            return total.toFixed(2);
        }

        $scope.getDamagedProductsItem = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_damaged && !$scope.isStockLoad)
                {
                    total += parseInt(p.incident_recoverd_damaged);
                } else if (p.incident_where && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_damaged && $scope.isStockLoad)
                {
                    total += parseInt(p.incident_recoverd_damaged);
                } else
                {
                    total += 0;
                }
            }
            return total;
        }

        $scope.getDamagedProductsvalue = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_damaged && !$scope.isStockLoad)
                    total += parseFloat(p.incident_unitValue * p.incident_recoverd_damaged);
                else if (p.incident_where && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_damaged && $scope.isStockLoad)
                    total += parseFloat(p.incident_unitValue * p.incident_recoverd_damaged);
                else
                    total += 0;
            }
            return total.toFixed(2);
        }
        $scope.getTotalProductItem = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && !$scope.isStockLoad)
                    total += parseInt(p.incident_quantity);
                else if (p.incident_where && p.incident_unitValue && p.incident_quantity && $scope.isStockLoad)
                    total += parseInt(p.incident_quantity);
                else
                    total += 0;
            }
            return total;
        }

        $scope.getTotalProductValue = function () {
            var total = 0;

            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && !$scope.isStockLoad)
                {
                    total += parseFloat(p.incident_unitValue * p.incident_quantity);
                    $scope.inputs[i].subTotal = parseFloat(p.incident_unitValue * p.incident_quantity).toFixed(2);
                } else if (p.incident_where && p.incident_unitValue && p.incident_quantity && $scope.isStockLoad) {
                    total += parseFloat(p.incident_unitValue * p.incident_quantity);
                    $scope.inputs[i].subTotal = parseFloat(p.incident_unitValue * p.incident_quantity).toFixed(2);
                } else {
                    total += 0;
                    $scope.inputs[i].subTotal = 0;
                }

            }
            return total.toFixed(2);
        }

        $scope.deleteProduct = function (item) {
//        alert(item);
            var index = $scope.inputs.indexOf(item);
            $scope.inputs.splice(index, 1);
        }

        $scope.updateProduct = function (item) {

            var index = $scope.inputs.indexOf(item);
            var tempArray = angular.copy($scope.inputs);
            tempArray[index].rowType = "add";
            $scope.inputs = angular.copy(tempArray);
        }

        $scope.incidentItem = function (val) {

            $scope.inputs.incident_unitValue = parseFloat(val.incident_unitValue).toFixed(2);

            //console.log($scope.inputs.incident_unitValue);
            $rootScope.show = false;
        }

        $scope.resetData = function () {
            var data = globalService.getAllProduct();
            if(globalService.getProductDetail().stockLoad == $scope.isStockLoad){
            if (data) {
                if (data.length > 0)
                    $scope.inputs = data;

                //console.log(JSON.stringify($scope.inputs));
                $scope.productDetail = globalService.getProductDetail();
                $scope.isCheked = globalService.getProductDetail().productCheck;

            }
        }
        }

        $scope.init();

    }]);


BandQModule.directive("productStockRow", ["$compile", "$http", function ($compile, $http) {
        var templateArray = ["views/ProductStockDirectiveTemplate/AddEditRow.html", "views/ProductStockDirectiveTemplate/SavedItemRow.html"];
        var getTemplate = function (id) {
            var template = "";

            switch (id) {

                case "add":
                    return templateArray[0];
                    break;
                case "save":
                    return templateArray[1];
                    break;
            }

        }

        var linker = function (scope, element, attrs) {

            $http.get(getTemplate(scope.item.rowType)).then(function (response) {
                element.html(response.data);
                $compile(element.contents())(scope);
            });

        }

        return {
            restrict: 'EA',
            link: linker,
            scope: true,
        };

    }]);

BandQModule.directive('myDirective', [function () {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attr, ctrl) {
                scope.$watch(attr.ngModel, function (newValue) {
                    if (newValue > 7) {

                    } else {

                    }
                })
                scope.$watch('item.incident_recoverd_quantity', function (newValue) {
                    if (newValue > 7) {

                    } else {

                    }
                })
                scope.$watch('inputs', function (newValue, oldValue) {
                    for (var i = 0; i < newValue.length; i++) {
                        if (newValue[i].incident_recoverd_quantity != oldValue[i].incident_recoverd_quantity)
                            var indexOfChangedItem = i;
                        scope.inputs[indexOfChangedItem].incident_recoverd_quantity = scope.inputs[indexOfChangedItem].incident_unitValue;

                    }
                }, true);
            }
        };
    }]);