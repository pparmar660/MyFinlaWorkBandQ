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

        $scope.idCheck = 0;
        $rootScope.show = false;
        $scope.inputs = [];
        $scope.value = ["Ravi", "Deepak", "Ruchi"];
        $scope.inputs.push({"id": $scope.idCheck, "rowType": "add", "incident_quantity": "1"});
        $scope.editinputs = [];
        $scope.swasAreaDropdownValue = [];
        var parent = $("#57").parents(".incident_report_wrapper");
        parent.removeClass("incident_report_wrapper");
        $scope.init = function (_noOfPageMove) {
            noOfPageMove = _noOfPageMove;
            $scope.swasAreaDropdown = globalService.getSwasArea();
            for (i = 0; i < $scope.swasAreaDropdown.length; i++) {
                $scope.swasAreaDropdownValue.push($scope.swasAreaDropdown[i].title_vna);
            }
        };

        $scope.nextButtonClicked = function (callBack) {
            $scope.submitted = true;
            $scope.productDetail = {"recProdect": $scope.getRecoverProductsItem(), "recProdectVal": $scope.getRecoverProductsvalue(), "demProduct": $scope.getDamagedProductsItem(), "demProducVal": $scope.getDamagedProductsvalue(), "totalItem": $scope.getTotalProductItem(), "totalItemVal": $scope.getTotalProductValue()};
            globalService.setProductDetail($scope.productDetail);
            if ($scope.productForm.$valid) {
                $rootScope.show = false;
                if ($scope.getTotalProductValue() == 0) {
                    $rootScope.show = true;
                    $rootScope.alertMsg = "Please add a product";
                    return callBack(false, 0);
                }
                else {

                      $rootScope.show=false;
                       var tempArray = angular.copy($scope.inputs);
                for (var i = 0; i < tempArray.length; i++){
                    tempArray[i].rowType = "save";
                   //console.log("product" +JSON.stringify(tempArray[i]));
                    }
                $scope.inputs = [];
                $scope.inputs = tempArray;
                 //console.log("product1" +JSON.stringify( $scope.inputs));
                globalService.setAllProduct($scope.inputs);
                 return callBack(true, 1);
                }
            }
            else {
                $rootScope.show = true;
                $rootScope.alertMsg = "'Where?', 'Brand', 'Unit Value' and 'Quantity' Columns are mandatory";
                return callBack(false, 0);
            }

        };
        $scope.back = function (callBack) {
            $rootScope.show = false;
            return callBack(true, noOfPageMove);
        };
        $scope.saveButtonAction = function(callBack){
        return callBack(true);    
        };
        
        $scope.addNewProduct = function () {// $scope.inputs.push($scope.item);
            $scope.idCheck++;
            $scope.inputs.splice(0, 0, {"id": $scope.idCheck, "rowType": "add", "incident_quantity": "1"});
            // //console.log(JSON.stringify($scope.inputs));

        }

        $scope.getRecoverProductsItem = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_quantity)
                {
                    total += parseInt(p.incident_recoverd_quantity);
                }
                else {

                    total = 0;

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
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_quantity)
                {
                    total += parseFloat(p.incident_unitValue * p.incident_recoverd_quantity);

                }
                else {
                    total = 0;
                }

            }
            return total.toFixed(2);
        }

        $scope.getDamagedProductsItem = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_damaged)
                {
                    total += parseInt(p.incident_recoverd_damaged);
                }
                else {
                    total = 0;
                }

            }
            return total;
        }

        $scope.getDamagedProductsvalue = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity && p.incident_recoverd_damaged)
                {
                    total += parseFloat(p.incident_unitValue * p.incident_recoverd_damaged);

                }
                else {
                    total = 0;
                }

            }
            return total.toFixed(2);
        }
        $scope.getTotalProductItem = function () {
            var total = 0;
            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity)
                {
                    total += parseInt(p.incident_quantity);
                }
                else {
                    total = 0;
                }
            }
            return total;
        }

        $scope.getTotalProductValue = function () {
            var total = 0;

            for (var i = 0; i < $scope.inputs.length; i++) {
                var p = $scope.inputs[i];
                if (p.incident_where && p.incident_brand && p.incident_unitValue && p.incident_quantity)
                {
                    total += parseFloat(p.incident_unitValue * p.incident_quantity);
                    $scope.inputs[i].subTotal = parseFloat(p.incident_unitValue * p.incident_quantity).toFixed(2);
                }
                else {
                    total = 0;
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

// $scope.$watch( $scope.item.incident_unitValue, function () {
//    // //console.log(value);
//       $scope.inputs.incident_unitValue = parseFloat($scope.inputs.incident_unitValue).toFixed(2);
//     //console.log($scope.inputs.incident_unitValue);
//    });
       
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
           
            //console.log(scope.item + "--");

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
                        //alert("yes");
                        //console.log("1yes " + newValue);
                        //console.log("1yes 2 " + scope.item.incident_recoverd_quantity);
                    } else {
                        //console.log("no");
                    }
                })
                scope.$watch('item.incident_recoverd_quantity', function (newValue) {
                    if (newValue > 7) {
                        //alert("yes");
                        //console.log("2yes " + newValue);
                        //console.log("2yes 2 " + scope.item.incident_unitValue);
                    } else {
                        //console.log("no");
                    }
                })
                scope.$watch('inputs', function (newValue, oldValue) {
                    for (var i = 0; i < newValue.length; i++) {
                        if (newValue[i].incident_recoverd_quantity != oldValue[i].incident_recoverd_quantity)
                            var indexOfChangedItem = i;
                        //console.log(indexOfChangedItem);
                        //console.log("cccc" + scope.inputs[indexOfChangedItem].incident_unitValue);
                        scope.inputs[indexOfChangedItem].incident_recoverd_quantity = scope.inputs[indexOfChangedItem].incident_unitValue;

                    }
                }, true);
            }
        };
    }]);